import React, { useState } from 'react'
import {
    CBadge,
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CDataTable,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CForm,
    CFormGroup,
    CFormText,
    CInput,
    CInputFile,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CInputGroupText,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CLabel,
    CRow,
    CTextarea,
} from '@coreui/react';

import awards from '../../data/MockData/MockAwardTypes'
import licenseData from '../../data/MockData/MockLicense'

const getBadge = status => {
    switch (status) {
        case 'Valid': return 'success'
        case 'Invalid': return 'danger'
        default: return 'primary'
    }
}

const fieldsAwards = [
    {
        key: 'type',
        label: 'Award Type',
    },
    {
        key: 'value',
        label: 'Point Value',
    },
    'actions'
]

const fieldsLicense = [
    'validity',
    {
        key: 'start',
        label: 'Start Date',
    },
    {
        key: 'end',
        label: 'End Date',
    },
    'licenseType',
    'actions'
]

const Settings = () => {
    const [accordion, setAccordion] = useState()
    const [modalAwards, setModalAwards] = useState(false)
    const [modalLicense, setModalLicense] = useState(false)

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Manuel Settings
                        </CCardHeader>
                        <CCardBody>
                            <div id="accordion">
                                <CCard className="mb-0">
                                    <CCardHeader id="headingOne">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 0 ? null : 0)}
                                        >
                                            <h5 className="m-0 p-0">Conference Settings</h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 0}>
                                        <CCardBody>
                                            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="conf-name">Conference Name</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput id="conf-name" name="conf-name" placeholder="Conference Name" />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="conf-abbr">Conference Abbreviation</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput id="conf-abbr" name="conf-abbr" placeholder="Conference Abbreviation" />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="conf-org">Conference Organization</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput id="conf-org" name="conf-org" placeholder="Conference Organization" />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="conf-org">Conference Secretary-General Name</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput id="conf-org" name="conf-secgen" placeholder="Conference Secretary-General Name" />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="conf-date">Conference Date</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="4">
                                                        <CInput type="date" id="conf-start" name="conf-start" />
                                                        <CFormText className="help-block">Start Date</CFormText>
                                                    </CCol>
                                                    <CCol xs="12" md="4">
                                                        <CInput type="date" id="conf-end" name="conf-end" />
                                                        <CFormText className="help-block">End Date</CFormText>
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="conf-addr">Conference Address</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput id="conf-street" name="conf-street" placeholder="Street" />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2"></CCol>
                                                    <CCol xs="12" md="3">
                                                        <CInput id="conf-city" name="conf-city" placeholder="City" />
                                                    </CCol>
                                                    <CCol xs="12" md="3">
                                                        <CInput id="conf-state" name="conf-state" placeholder="State" />
                                                    </CCol>
                                                    <CCol xs="12" md="3">
                                                        <CInput id="conf-postal" name="conf-postal" placeholder="Postal Code" />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CLabel col md="2" htmlFor="conf-logo">Conference Logo</CLabel>
                                                    <CCol xs="12" md="9">
                                                        <CInputFile id="conf-logo" name="conf-logo" />
                                                        <CFormText className="help-block">Recommended Image With 1:1 Aspect Ratio</CFormText>
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="conf-web">Conference Website</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput id="conf-web" name="conf-web" placeholder="Conference Website" />
                                                    </CCol>
                                                </CFormGroup>
                                            </CForm>
                                        </CCardBody>
                                        <CCardFooter>
                                            <CRow className="align-items-right">
                                                <CCol lg="2">
                                                    <CButton block color="primary">Save Changes</CButton>
                                                </CCol>
                                            </CRow>
                                        </CCardFooter>
                                    </CCollapse>
                                </CCard>
                                <CCard className="mb-0">
                                    <CCardHeader id="headingTwo">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 1 ? null : 1)}
                                        >
                                            <h5 className="m-0 p-0">Registration Settings</h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 1}>
                                        <CCardBody>
                                            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="conf-addr">Invoice Address</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput id="conf-stree" name="conf-street" placeholder="Street" />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2"></CCol>
                                                    <CCol xs="12" md="3">
                                                        <CInput id="conf-city" name="conf-city" placeholder="City" />
                                                    </CCol>
                                                    <CCol xs="12" md="3">
                                                        <CInput id="conf-state" name="conf-state" placeholder="State" />
                                                    </CCol>
                                                    <CCol xs="12" md="3">
                                                        <CInput id="conf-postal" name="conf-postal" placeholder="Postal Code" />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="conf-web">Early Registration Fees</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="4">
                                                        <div className="controls">
                                                            <CInputGroup className="input-prepend">
                                                                <CInputGroupPrepend>
                                                                    <CInputGroupText>$</CInputGroupText>
                                                                </CInputGroupPrepend>
                                                                <CInput id="appendedPrependedInput" size="16" type="number" />
                                                                <CInputGroupAppend>
                                                                    <CInputGroupText>.00</CInputGroupText>
                                                                </CInputGroupAppend>
                                                            </CInputGroup>
                                                            <CFormText>Delegate Fee</CFormText>
                                                        </div>
                                                    </CCol>
                                                    <CCol xs="12" md="1"></CCol>
                                                    <CCol xs="12" md="4">
                                                        <div className="controls">
                                                            <CInputGroup className="input-prepend">
                                                                <CInputGroupPrepend>
                                                                    <CInputGroupText>$</CInputGroupText>
                                                                </CInputGroupPrepend>
                                                                <CInput id="appendedPrependedInput" size="16" type="number" />
                                                                <CInputGroupAppend>
                                                                    <CInputGroupText>.00</CInputGroupText>
                                                                </CInputGroupAppend>
                                                            </CInputGroup>
                                                            <CFormText>Delegation Fee</CFormText>
                                                        </div>
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="conf-web">Regular Registration Fees</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="4">
                                                        <div className="controls">
                                                            <CInputGroup className="input-prepend">
                                                                <CInputGroupPrepend>
                                                                    <CInputGroupText>$</CInputGroupText>
                                                                </CInputGroupPrepend>
                                                                <CInput id="appendedPrependedInput" size="16" type="number" />
                                                                <CInputGroupAppend>
                                                                    <CInputGroupText>.00</CInputGroupText>
                                                                </CInputGroupAppend>
                                                            </CInputGroup>
                                                            <CFormText>Delegate Fee</CFormText>
                                                        </div>
                                                    </CCol>
                                                    <CCol xs="12" md="1"></CCol>
                                                    <CCol xs="12" md="4">
                                                        <div className="controls">
                                                            <CInputGroup className="input-prepend">
                                                                <CInputGroupPrepend>
                                                                    <CInputGroupText>$</CInputGroupText>
                                                                </CInputGroupPrepend>
                                                                <CInput id="appendedPrependedInput" size="16" type="number" />
                                                                <CInputGroupAppend>
                                                                    <CInputGroupText>.00</CInputGroupText>
                                                                </CInputGroupAppend>
                                                            </CInputGroup>
                                                            <CFormText>Delegation Fee</CFormText>
                                                        </div>
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="conf-web">Late Registration Fees</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="4">
                                                        <div className="controls">
                                                            <CInputGroup className="input-prepend">
                                                                <CInputGroupPrepend>
                                                                    <CInputGroupText>$</CInputGroupText>
                                                                </CInputGroupPrepend>
                                                                <CInput id="appendedPrependedInput" size="16" type="number" />
                                                                <CInputGroupAppend>
                                                                    <CInputGroupText>.00</CInputGroupText>
                                                                </CInputGroupAppend>
                                                            </CInputGroup>
                                                            <CFormText>Delegate Fee</CFormText>
                                                        </div>
                                                    </CCol>
                                                    <CCol xs="12" md="1"></CCol>
                                                    <CCol xs="12" md="4">
                                                        <div className="controls">
                                                            <CInputGroup className="input-prepend">
                                                                <CInputGroupPrepend>
                                                                    <CInputGroupText>$</CInputGroupText>
                                                                </CInputGroupPrepend>
                                                                <CInput id="appendedPrependedInput" size="16" type="number" />
                                                                <CInputGroupAppend>
                                                                    <CInputGroupText>.00</CInputGroupText>
                                                                </CInputGroupAppend>
                                                            </CInputGroup>
                                                            <CFormText>Delegation Fee</CFormText>
                                                        </div>
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="textarea-input">Terms & Conditions</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CTextarea
                                                            name="textarea-input"
                                                            id="textarea-input"
                                                            rows="9"
                                                            placeholder="Terms & Conditions"
                                                        />
                                                    </CCol>
                                                </CFormGroup>
                                            </CForm>
                                        </CCardBody>
                                        <CCardFooter>
                                            <CRow className="align-items-right">
                                                <CCol lg="2">
                                                    <CButton block color="primary">Save Changes</CButton>
                                                </CCol>
                                            </CRow>
                                        </CCardFooter>
                                    </CCollapse>
                                </CCard>
                                <CCard className="mb-0">
                                    <CCardHeader id="headingThree">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 2 ? null : 2)}
                                        >
                                            <h5 className="m-0 p-0">Award Settings</h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 2}>
                                        <CCardBody>
                                            <CRow className="align-items-left">
                                                <CCol lg="2">
                                                    <CButton block color="primary" onClick={() => setModalAwards(!modalAwards)}>Add New</CButton>
                                                </CCol>
                                            </CRow>
                                            <br></br>
                                            <CDataTable
                                                items={awards}
                                                fields={fieldsAwards}
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
                                                        ),

                                                }}
                                            />
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                                <CCard className="mb-0">
                                    <CCardHeader id="headingFour">
                                        <CButton
                                            block
                                            color="link"
                                            className="text-left m-0 p-0"
                                            onClick={() => setAccordion(accordion === 3 ? null : 3)}
                                        >
                                            <h5 className="m-0 p-0">Manuel License</h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 3}>
                                        <CCardBody>
                                            <CRow className="align-items-left">
                                                <CCol lg="3">
                                                    <CButton block color="primary" onClick={() => setModalLicense(!modalLicense)}>Upload License</CButton>
                                                </CCol>
                                            </CRow>
                                            <br></br>
                                            <CDataTable
                                                items={licenseData}
                                                fields={fieldsLicense}
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
                                                                        <CDropdownItem>
                                                                            Delete
                                                                        </CDropdownItem>
                                                                    </CDropdownMenu>
                                                                </CDropdown>
                                                            </td>
                                                        ),
                                                    'validity':
                                                        (item) => (
                                                            <td>
                                                                <CBadge color={getBadge(item.validity)}>
                                                                    {item.validity}
                                                                </CBadge>
                                                            </td>
                                                        )
                                                }}
                                            />
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                            </div>
                        </CCardBody>
                    </CCard >
                </CCol >
            </CRow >


            <CModal show={modalAwards} onClose={setModalAwards} size="lg">
                <CModalHeader>
                    <CModalTitle>Add Award Type</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-type">Award Type</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput id="award-type" name="award-type" placeholder="Award Type" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-value">Point Value</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput type="number" id="award-value" name="award-value" placeholder="Point Value" />
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalAwards(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={() => setModalAwards(false)}>Submit</CButton>
                </CModalFooter>
            </CModal>

            <CModal show={modalLicense} onClose={setModalLicense} size="lg">
                <CModalHeader>
                    <CModalTitle>Upload Manuel License</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="license-file">License File</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInputFile id="license-file" name="license-file" />
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalLicense(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={() => setModalLicense(false)}>Submit</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default Settings
