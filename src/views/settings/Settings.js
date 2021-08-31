import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import { useDispatch } from 'react-redux'
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
    CSelect,
    CTextarea,
} from '@coreui/react';

import fetchData from '../../data/LiveData/FetchData'

import { getStateList } from 'src/reusable/StateList';
import { checkLicense } from 'src/reusable/checkLicense';

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
    'license',
    'actions'
]

let header = ""
let status = true;
let editItem;

const Settings = () => {
    const { user } = useAuth0()
    const { isAuthenticated } = useAuth0()

    const dispatch = useDispatch()

    const [accordion, setAccordion] = useState()

    const [modalAwards, setModalAwards] = useState(false)
    const [modalLicense, setModalLicense] = useState(false)

    const [settingsState, setSettingsState] = useState({
        default: true,
        name: '',
        abbreviation: '',
        organization: '',
        secgen: '',
        start: '',
        end: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        logo: '',
        website: '',

        invoiceStreet: '',
        invoiceCity: '',
        invoiceState: '',
        invoiceZipcode: '',
        earlydelfee: '',
        earlyschoolfee: '',
        regdelfee: '',
        regschoolfee: '',
        latedelfee: '',
        lateschoolfee: '',
        terms: ''
    })

    const onFileChange = (event) => {
        const val = event.target.files[0]
        setSettingsState(prevState => {
            return { ...prevState, logo: val }
        })
    };

    const [awardsState, setAwardsState] = useState({
        awardType: '',
        awardValue: ''
    })

    const [licenseState, setLicenseState] = useState({
        productKey: '',
    })

    const [data, setData] = useState({
        awardTypes: [],
        licenses: []
    });

    const [isLoading, setIsLoading] = useState(true)

    function openAwardsModal() {
        setAwardsState({
            awardType: '',
            awardValue: ''
        })

        header = "Add Award Type"
        status = true

        setModalAwards(!modalAwards)
    }

    function openLicenseModal() {
        setLicenseState({
            productKey: ''
        })

        setModalLicense(!modalLicense)
    }

    function addAwards(event) {
        event.preventDefault();

        checkLicense(user.sub)
            .then(result => {
                if (result === 0) {
                    alert("No valid MUNWell License found! \nUpload a valid MUNWell License to be able to configure data.")
                } else {
                    let exists = false;

                    let i;
                    for (i = 0; i < data.awardTypes.length; i++) {
                        if (data.awardTypes[i].type === awardsState.awardType) {
                            exists = true;
                        }
                    }

                    if (!exists) {
                        if (status) {
                            const payload = {
                                user: user.sub,
                                type: awardsState.awardType,
                                value: awardsState.awardValue
                            }

                            axios({
                                url: '/api/save/awardType',
                                method: 'POST',
                                data: payload
                            })
                                .then(() => {
                                    alert("Award Type: " + awardsState.awardType + " added successfully!")
                                })
                                .catch(() => {
                                    console.log('Internal server error')
                                })
                        } else {
                            axios.put('/api/update/awardType', {
                                data: {
                                    id: editItem._id,
                                    update: { type: awardsState.awardType, value: awardsState.awardValue }
                                },
                            })
                                .then(() => {
                                    alert("Award Type: " + awardsState.awardType + " updated successfully!")
                                })
                                .catch(() => {
                                    console.log('Internal server error')
                                })
                        }
                    } else {
                        alert("Award type already exists")
                        setModalAwards(true)
                    }
                }
            })

        fetchData("/api/get/awardType", user.sub, 'value').then((res) => {
            setData(prevState => {
                return { ...prevState, awardTypes: res }
            })
        })

        setModalAwards(false)
    }

    function editAwards(item) {
        setAwardsState({
            awardType: item.type,
            awardValue: item.value
        })

        header = "Edit Award Type"
        status = false
        editItem = item

        setModalAwards(!modalAwards)
    }

    function deleteAwards(item) {
        checkLicense(user.sub)
            .then(result => {
                if (result === 0) {
                    alert("No valid MUNWell License found! \nUpload a valid MUNWell License to be able to configure data.")
                } else {
                    axios.delete('/api/delete/awardType', {
                        data: {
                            id: item._id,
                        },
                    })
                        .then(() => {
                            alert("Award Type: " + item.awardType + " deleted successfully!")
                        })
                        .catch(() => {
                            console.log('Internal server error')
                        })
                }
            })

        fetchData("/api/get/awardType", user.sub, 'value').then((res) => {
            setData(prevState => {
                return { ...prevState, awardTypes: res }
            })
        })
    }

    function addLicense(event) {
        event.preventDefault();

        fetchData("/api/get/validlicense", user.sub, 'start').then((res) => {
            let msg = "Invalid MUNWell License Key";

            let i;
            for (i = 0; i < res.length; i++) {
                if (res[i].key === licenseState.productKey) {
                    msg = "";

                    const payload = {
                        user: user.sub,
                        key: licenseState.productKey,
                        license: res[i].license,
                        start: res[i].start,
                        end: res[i].end
                    }

                    axios({
                        url: '/api/save/license',
                        method: 'POST',
                        data: payload
                    })
                        .then(() => {
                            alert("MUNWell License added successfully!")
                            fetchData("/api/get/license", user.sub, 'start').then((res) => {
                                setData(prevState => {
                                    return { ...prevState, licenses: res }
                                })
                            })
                        })
                        .catch(() => {
                            console.log('Internal server error')
                        })
                }
            }

            if (msg.length > 0) {
                alert(msg)
            }
        })

        setModalLicense(false)
    }

    function deleteLicense(item) {
        axios.delete('/api/delete/license', {
            data: {
                id: item._id,
            },
        })
            .then(() => {
                alert("MUNWell License deleted successfully!")
            })
            .catch(() => {
                console.log('Internal server error')
            })

        fetchData("/api/get/license", user.sub, 'start').then((res) => {
            setData(prevState => {
                return { ...prevState, licenses: res }
            })
        })
    }

    function getValidity(item) {
        var dateFrom = item.start;
        var dateTo = item.end;

        var dateCheck = new Date();

        var d1 = dateFrom.split("/");
        var d2 = dateTo.split("/");

        var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
        var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);

        if (dateCheck > from && dateCheck < to) {
            return "Valid"
        }
        return "Invalid"
    }

    async function saveSettings(event) {
        event.preventDefault();
        checkLicense(user.sub)
            .then(result => {
                if (result === 0) {
                    alert("No valid MUNWell License found! \nUpload a valid MUNWell License to be able to configure data.")
                } else {
                    const formData = new FormData();
                    formData.append("file", settingsState.logo);

                    if(settingsState.user === undefined) {
                        formData.append("user", user.sub);
                    }

                    for (let element of Object.keys(settingsState)) {
                        if (element !== "logo" && element !== "_id")
                            formData.append([element], settingsState[element]);
                    }

                    axios({
                        url: '/api/save/settings',
                        method: 'POST',
                        data: formData
                    })
                        .then(() => {
                            alert("MUNWell Settings saved successfully!")
                        })
                        .catch(() => {
                            console.log('Internal server error')
                        })
                }
            })

        fetchData("/api/get/settings", user.sub).then((res) => {
            if(res[res.length - 1] !== undefined) {
                setSettingsState(res[res.length - 1])
            }
            setSettingsState(prevState => {
                return { ...prevState, default: true }
            })
        })
    }

    function resetAccount() {
        let alert = window.confirm("This action is irreversable, are you sure you want to delete all MUNWell data?")

        if (alert) {
            fetchData("/api/get/allotments", user.sub).then((res) => {
                let i;
                for(i = 0; i < res.length; i++) {
                    axios.delete('/api/delete/allotments', {
                        data: {
                            id: res[i]._id,
                        },
                    })
                }
            })

            fetchData("/api/get/awardType", user.sub).then((res) => {
                let i;
                for(i = 0; i < res.length; i++) {
                    axios.delete('/api/delete/awardType', {
                        data: {
                            id: res[i]._id,
                        },
                    })
                }
            })

            fetchData("/api/get/committee", user.sub).then((res) => {
                let i;
                for(i = 0; i < res.length; i++) {
                    axios.delete('/api/delete/committee', {
                        data: {
                            id: res[i]._id,
                        },
                    })
                }
            })

            fetchData("/api/get/individualAward", user.sub).then((res) => {
                let i;
                for(i = 0; i < res.length; i++) {
                    axios.delete('/api/delete/individualAward', {
                        data: {
                            id: res[i]._id,
                        },
                    })
                }
            })

            fetchData("/api/get/registrationData", user.sub).then((res) => {
                let i;
                for(i = 0; i < res.length; i++) {
                    axios.delete('/api/delete/registrationData', {
                        data: {
                            id: res[i]._id,
                        },
                    })
                }
            })

            fetchData("/api/get/settings", user.sub).then((res) => {
                let i;
                for(i = 0; i < res.length; i++) {
                    axios.delete('/api/delete/settings', {
                        data: {
                            id: res[i]._id,
                        },
                    })
                }
            })
/*
            fetchData("/api/get/license", user.sub).then((res) => {
                let i;
                for(i = 0; i < res.length; i++) {
                    axios.delete('/api/delete/license', {
                        data: {
                            id: res[i]._id,
                        },
                    })
                }
            })
*/
            getData().then(() => {
                dispatch({ type: 'set', sidebarShow: false })
                dispatch({ type: 'set', sidebarShow: true })
    
                setSettingsState({
                    default: true,
                    name: '',
                    abbreviation: '',
                    organization: '',
                    secgen: '',
                    start: '',
                    end: '',
                    street: '',
                    city: '',
                    state: '',
                    zipcode: '',
                    logo: '',
                    website: '',
            
                    invoiceStreet: '',
                    invoiceCity: '',
                    invoiceState: '',
                    invoiceZipcode: '',
                    earlydelfee: '',
                    earlyschoolfee: '',
                    regdelfee: '',
                    regschoolfee: '',
                    latedelfee: '',
                    lateschoolfee: '',
                    terms: ''
                })

                window.alert("MUNWell account reset successfully!")
            })
        }
    }

    async function getData() {
        await fetchData("/api/get/awardType", user.sub, 'value').then((res) => {
            if (JSON.stringify(res) !== JSON.stringify(data.awardTypes)) {
                setData(prevState => {
                    return { ...prevState, awardTypes: res }
                })
            }
        })

        await fetchData("/api/get/license", user.sub, 'start').then((res) => {
            if (JSON.stringify(res) !== JSON.stringify(data.licenses)) {
                setData(prevState => {
                    return { ...prevState, licenses: res }
                })
            }
        })

        if (settingsState.default) {
            await fetchData("/api/get/settings", user.sub).then((res) => {
                if (res.length !== 0) {
                    if (JSON.stringify(res[res.length - 1]) !== JSON.stringify(settingsState)) {
                        setSettingsState(res[res.length - 1])
                        setSettingsState(prevState => {
                            return { ...prevState, default: false }
                        })
                    }
                }
            })
        }
    }

    if (isAuthenticated) {
        getData().then(() => {
            if (isLoading) {
                setIsLoading(false)
            }
        })
    }

    return !isLoading? (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            MUNWell Settings
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
                                            <h5 className="m-0 p-0"><strong>Conference Settings</strong></h5>
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
                                                        <CInput name="confName" placeholder="Conference Name" value={settingsState.name} onChange={e => {
                                                            const val = e.target.value
                                                            setSettingsState(prevState => {
                                                                return { ...prevState, name: val }
                                                            })
                                                        }} />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="conf-abbr">Conference Abbreviation</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput name="confAbbr" placeholder="Conference Abbreviation" value={settingsState.abbreviation} onChange={e => {
                                                            const val = e.target.value
                                                            setSettingsState(prevState => {
                                                                return { ...prevState, abbreviation: val }
                                                            })
                                                        }} />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="conf-org">Conference Organization</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput name="confOrg" placeholder="Conference Organization" value={settingsState.organization} onChange={e => {
                                                            const val = e.target.value
                                                            setSettingsState(prevState => {
                                                                return { ...prevState, organization: val }
                                                            })
                                                        }} />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="conf-org">Conference Secretary-General Name</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput name="confSecGen" placeholder="Conference Secretary-General Name" value={settingsState.secgen} onChange={e => {
                                                            const val = e.target.value
                                                            setSettingsState(prevState => {
                                                                return { ...prevState, secgen: val }
                                                            })
                                                        }} />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="conf-date">Conference Date</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="4">
                                                        <CInput type="date" name="confStart" value={settingsState.start} onChange={e => {
                                                            const val = e.target.value
                                                            setSettingsState(prevState => {
                                                                return { ...prevState, start: val }
                                                            })
                                                        }} />
                                                        <CFormText className="help-block">Start Date</CFormText>
                                                    </CCol>
                                                    <CCol xs="12" md="4">
                                                        <CInput type="date" name="confEnd" value={settingsState.end} min={settingsState.start} onChange={e => {
                                                            const val = e.target.value
                                                            setSettingsState(prevState => {
                                                                return { ...prevState, end: val }
                                                            })
                                                        }} />
                                                        <CFormText className="help-block">End Date</CFormText>
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="conf-addr">Conference Address</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput name="confStreet" placeholder="Street" value={settingsState.street} onChange={e => {
                                                            const val = e.target.value
                                                            setSettingsState(prevState => {
                                                                return { ...prevState, street: val }
                                                            })
                                                        }} />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2"></CCol>
                                                    <CCol xs="12" md="3">
                                                        <CInput name="confCity" placeholder="City" value={settingsState.city} onChange={e => {
                                                            const val = e.target.value
                                                            setSettingsState(prevState => {
                                                                return { ...prevState, city: val }
                                                            })
                                                        }} />
                                                    </CCol>
                                                    <CCol xs="12" md="3">
                                                        <CSelect custom name="confState" value={settingsState.state} onChange={e => {
                                                            const val = e.target.value
                                                            setSettingsState(prevState => {
                                                                return { ...prevState, state: val }
                                                            })
                                                        }} >
                                                            {getStateList()}
                                                        </CSelect>
                                                    </CCol>
                                                    <CCol xs="12" md="3">
                                                        <CInput name="confPostal" placeholder="Postal Code" value={settingsState.zipcode} onChange={e => {
                                                            const val = e.target.value
                                                            setSettingsState(prevState => {
                                                                return { ...prevState, zipcode: val }
                                                            })
                                                        }} />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CLabel col md="2" htmlFor="conf-logo">Conference Logo</CLabel>
                                                    <CCol xs="12" md="9">
                                                        <CInputFile name="confLogo"
                                                            onChange={onFileChange}
                                                            accept="image/*"
                                                        />
                                                        <CFormText className="help-block">Recommended Image With 1:1 Aspect Ratio</CFormText>
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2">
                                                        <CLabel htmlFor="conf-web">Conference Website</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput name="conf-web" placeholder="Conference Website" value={settingsState.website} onChange={e => {
                                                            const val = e.target.value
                                                            setSettingsState(prevState => {
                                                                return { ...prevState, website: val }
                                                            })
                                                        }} />
                                                    </CCol>
                                                </CFormGroup>
                                            </CForm>
                                        </CCardBody>
                                        <CCardFooter>
                                            <CRow className="align-items-right">
                                                <CCol lg="2">
                                                    <CButton block color="primary" onClick={event => saveSettings(event)}>Save Changes</CButton>
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
                                            <h5 className="m-0 p-0"><strong>Registration Settings</strong></h5>
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
                                                        <CInput name="confStreet" placeholder="Street" value={settingsState.invoiceStreet} onChange={e => {
                                                            const val = e.target.value
                                                            setSettingsState(prevState => {
                                                                return { ...prevState, invoiceStreet: val }
                                                            })
                                                        }} />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol md="2"></CCol>
                                                    <CCol xs="12" md="3">
                                                        <CInput name="confCity" placeholder="City" value={settingsState.invoiceCity} onChange={e => {
                                                            const val = e.target.value
                                                            setSettingsState(prevState => {
                                                                return { ...prevState, invoiceCity: val }
                                                            })
                                                        }} />
                                                    </CCol>
                                                    <CCol xs="12" md="3">
                                                        <CSelect custom name="confState" value={settingsState.invoiceState} onChange={e => {
                                                            const val = e.target.value
                                                            setSettingsState(prevState => {
                                                                return { ...prevState, invoiceState: val }
                                                            })
                                                        }}>
                                                            {getStateList()}
                                                        </CSelect>
                                                    </CCol>
                                                    <CCol xs="12" md="3">
                                                        <CInput name="confPostal" placeholder="Postal Code" value={settingsState.invoiceZipcode} onChange={e => {
                                                            const val = e.target.value
                                                            setSettingsState(prevState => {
                                                                return { ...prevState, invoiceZipcode: val }
                                                            })
                                                        }} />
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
                                                                <CInput id="appendedPrependedInput" size="16" type="number" min="0" value={settingsState.earlydelfee} onChange={e => {
                                                                    const val = e.target.value
                                                                    setSettingsState(prevState => {
                                                                        return { ...prevState, earlydelfee: val }
                                                                    })
                                                                }} />
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
                                                                <CInput id="appendedPrependedInput" size="16" type="number" min="0" value={settingsState.earlyschoolfee} onChange={e => {
                                                                    const val = e.target.value
                                                                    setSettingsState(prevState => {
                                                                        return { ...prevState, earlyschoolfee: val }
                                                                    })
                                                                }} />
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
                                                                <CInput id="appendedPrependedInput" size="16" type="number" min="0" value={settingsState.regdelfee} onChange={e => {
                                                                    const val = e.target.value
                                                                    setSettingsState(prevState => {
                                                                        return { ...prevState, regdelfee: val }
                                                                    })
                                                                }} />
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
                                                                <CInput id="appendedPrependedInput" size="16" type="number" min="0" value={settingsState.regschoolfee} onChange={e => {
                                                                    const val = e.target.value
                                                                    setSettingsState(prevState => {
                                                                        return { ...prevState, regschoolfee: val }
                                                                    })
                                                                }} />
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
                                                                <CInput id="appendedPrependedInput" size="16" type="number" min="0" value={settingsState.latedelfee} onChange={e => {
                                                                    const val = e.target.value
                                                                    setSettingsState(prevState => {
                                                                        return { ...prevState, latedelfee: val }
                                                                    })
                                                                }} />
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
                                                                <CInput id="appendedPrependedInput" size="16" type="number" min="0" value={settingsState.lateschoolfee} onChange={e => {
                                                                    const val = e.target.value
                                                                    setSettingsState(prevState => {
                                                                        return { ...prevState, lateschoolfee: val }
                                                                    })
                                                                }} />
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
                                                            rows="9"
                                                            placeholder="Terms & Conditions"
                                                            value={settingsState.terms}
                                                            onChange={e => {
                                                                const val = e.target.value
                                                                setSettingsState(prevState => {
                                                                    return { ...prevState, terms: val }
                                                                })
                                                            }}
                                                        />
                                                    </CCol>
                                                </CFormGroup>
                                            </CForm>
                                        </CCardBody>
                                        <CCardFooter>
                                            <CRow className="align-items-right">
                                                <CCol lg="2">
                                                    <CButton block color="primary" onClick={event => saveSettings(event)}>Save Changes</CButton>
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
                                            <h5 className="m-0 p-0"><strong>Award Settings</strong></h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 2}>
                                        <CCardBody>
                                            <CRow className="align-items-left">
                                                <CCol lg="2">
                                                    <CButton block color="primary" onClick={() => openAwardsModal()}>Add New</CButton>
                                                </CCol>
                                            </CRow>
                                            <br></br>
                                            <CDataTable
                                                items={data?.awardTypes || { message: "Waiting for Data..." }}
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
                                                                        <CDropdownItem onClick={() => editAwards(item)}>Edit</CDropdownItem>
                                                                        <CDropdownItem onClick={() => deleteAwards(item)}>Delete</CDropdownItem>
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
                                            <h5 className="m-0 p-0"><strong>MUNWell License</strong></h5>
                                        </CButton>
                                    </CCardHeader>
                                    <CCollapse show={accordion === 3}>
                                        <CCardBody>
                                            <CRow className="align-items-left">
                                                <CCol lg="3">
                                                    <CButton block color="primary" onClick={() => openLicenseModal()}>Upload License</CButton>
                                                </CCol>
                                                <CCol lg="3">
                                                    <CButton block color="primary" onClick={() => resetAccount()}>Reset Account</CButton>
                                                </CCol>
                                            </CRow>
                                            <br></br>
                                            <CDataTable
                                                items={data?.licenses || { message: "Waiting for Data..." }}
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
                                                                        <CDropdownItem onClick={() => deleteLicense(item)}>Delete</CDropdownItem>
                                                                    </CDropdownMenu>
                                                                </CDropdown>
                                                            </td>
                                                        ),
                                                    'validity':
                                                        (item) => (
                                                            <td>
                                                                <CBadge color={getBadge(getValidity(item))}>
                                                                    {getValidity(item)}
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
                    <CModalTitle>{header}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-type">Award Type</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput name="awardType" placeholder="Award Type" value={awardsState.awardType} onChange={e => {
                                    const val = e.target.value
                                    setAwardsState(prevState => {
                                        return { ...prevState, awardType: val }
                                    });
                                }} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="award-value">Point Value</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput type="number" min="0" name="awardValue" placeholder="Point Value" value={awardsState.awardValue} onChange={e => {
                                    const val = e.target.value
                                    setAwardsState(prevState => {
                                        return { ...prevState, awardValue: val }
                                    });
                                }} />
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalAwards(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={event => addAwards(event)}>Submit</CButton>
                </CModalFooter>
            </CModal>

            <CModal show={modalLicense} onClose={setModalLicense} size="lg">
                <CModalHeader>
                    <CModalTitle>Upload MUNWell License</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="license-file">License Product Key</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput type="text" name="productKey" placeholder="MUNWell License Product Key" value={licenseState.productKey} onChange={e => {
                                    const val = e.target.value
                                    setLicenseState(prevState => {
                                        return { ...prevState, productKey: val }
                                    })
                                }} />
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalLicense(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={event => addLicense(event)}>Submit</CButton>
                </CModalFooter>
            </CModal>
        </>
    ) : (<p>Waiting for Data...</p>)
}

export default Settings
