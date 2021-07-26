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

import { getIndex, filterAwardData, getAwardTypes, getPositions, getDelegation, exportTable, setField } from './awardHelper'

let header = ""

const Award = ({ match: { params: { committee } } }) => {
    const [modalAdd, setModalAdd] = useState(false)

    const [awardsState, setAwardsState] = useState({
        type: '',
        position: '',
        delegation: '',
        delegate1: '',
        delegate2: ''
    })

    function openModal() {
        setAwardsState({
            type: '',
            position: '',
            delegation: '',
            delegate1: '',
            delegate2: ''
        })

        header = "Add Award"

        setModalAdd(!modalAdd)
    }

    function addAwards() {
        setModalAdd(false)
    }

    function editAwards(item) {
        setAwardsState({
            type: item.type,
            position: item.position,
            delegation: item.delegation,
            delegate1: item.delegate1,
            delegate2: item.delegate2
        })

        header = "Edit Award"

        setModalAdd(!modalAdd)
    }

    let json = getIndex(committee)

    if (getIndex(committee) === null) {
        return <Redirect to={{ pathname: "/404" }} />
    }

    let fields = setField(json)

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
                                    <CButton block color="primary" onClick={() => openModal()}>Add New</CButton>
                                </CCol>
                            </CRow>
                            <br></br>
                            <CDataTable
                                items={filterAwardData(committee)}
                                fields={fields}
                                hover
                                striped
                                sorter
                                itemsPerPage={50}
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
                                                    <CDropdownItem onClick={() => editAwards(item)}>Edit</CDropdownItem>
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
                    <CModalTitle>{header}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-type">Award Type</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect custom name="awardType" value={awardsState.type} onChange={e => {
                                    const val = e.target.value
                                    setAwardsState(prevState => {
                                        return { ...prevState, type: val }
                                    });
                                }}>
                                    {getAwardTypes(awards)}
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-pos">Position</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect custom name="awardPos" value={awardsState.position} onChange={e => {
                                    const val = e.target.value
                                    setAwardsState(prevState => {
                                        return { ...prevState, position: val }
                                    });
                                }}>
                                    {getPositions(json)}
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-delegation">Delegation</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect custom name="select" id="award-delegation">
                                    {getDelegation(awardsState.position, json)}
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-del1">Delegate I Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput name="awardDel1" placeholder="Delegate I Name" value={awardsState.delegate1} onChange={e => {
                                    const val = e.target.value
                                    setAwardsState(prevState => {
                                        return { ...prevState, delegate1: val }
                                    });
                                }} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row hidden={!json.type.includes("Double Delegation")}>
                            <CCol md="3">
                                <CLabel htmlFor="award-del2">Delegate II Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput name="awardDel2" placeholder="Delegate II Name" value={awardsState.delegate2} onChange={e => {
                                    const val = e.target.value
                                    setAwardsState(prevState => {
                                        return { ...prevState, delegate2: val }
                                    });
                                }} />
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalAdd(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={() => addAwards()}>Submit</CButton>
                </CModalFooter>
            </CModal>

        </>
    )
}

export default Award