import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CSelect
} from '@coreui/react'
import { Export } from 'src/reusable'
import { Redirect } from 'react-router-dom'

import awards from '../../data/MockData/MockAwardTypes'

import { getIndex, filterAwardData, getAwardTypes, getPositions, getDelegation, exportTable } from './awardHelper'

const fields = [
    'type',
    'position',
    'delegation',
    {
        key: 'delegate1',
        label: 'Delegate I'
    },
    {
        key: 'delegate2',
        label: 'Delegate II'
    },
    'actions'
]

const Award = ({ match: { params: { committee } } }) => {
    const [modalAdd, setModalAdd] = useState(false)

    let json = getIndex(committee)

    if (getIndex(committee) === null) {
        return <Redirect to={{ pathname: "/404" }} />
    }
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            {committee} - Individual Awards
                            <Export data={exportTable(json)} filename={committee + " Awards.csv"} />
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-left">
                                <CCol lg="3">
                                    <CButton block color="primary" onClick={() => setModalAdd(!modalAdd)}>Add New</CButton>
                                </CCol>
                            </CRow>
                            <br></br>
                            <CDataTable
                                items={filterAwardData(committee)}
                                fields={fields}
                                hover
                                striped
                                sorter
                                itemsPerPage={10}
                                pagination
                                scopedSlots={{
                                    'actions':
                                        (item) => (
                                            <td>
                                                <CDropdown className="m-1">
                                                    <CDropdownToggle color="secondary">
                                                        Select Action
                                                    </CDropdownToggle>
                                                    <CDropdownMenu>
                                                        <CDropdownItem>Edit</CDropdownItem>
                                                        <CDropdownItem>Delete</CDropdownItem>
                                                    </CDropdownMenu>
                                                </CDropdown>
                                            </td>
                                        )
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>


            <CModal show={modalAdd} onClose={setModalAdd} size="lg">
                <CModalHeader>
                    <CModalTitle>Add Position</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-type">Award Type</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect custom name="select" id="award-type">
                                    {getAwardTypes(awards)}
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-pos">Position</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect custom name="select" id="award-pos">
                                    {getPositions(json)}
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-delegation">Delegation</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect custom name="select" id="award-delegation" disabled>
                                    {getDelegation("position 1", json)}
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-del1">Delegate I Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput id="award-del1" name="award-del1" placeholder="Delegate I Name" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-del2">Delegate II Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput id="award-del2" name="award-del2" placeholder="Delegate II Name" />
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalAdd(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={() => setModalAdd(false)}>Submit</CButton>
                </CModalFooter>
            </CModal>

        </>
    )
}

export default Award