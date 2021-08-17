import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
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
    CInputCheckbox,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CSelect,
    CTextarea,
    CFormText
} from '@coreui/react'
import { Export } from 'src/reusable'

import fetchData from '../../data/LiveData/FetchData'

import { exportTable, count } from './committeeRosterHelper'
import { checkLicense } from 'src/reusable/checkLicense';

const fields = [
    'division',
    'category',
    'type',
    'committee',
    'abbreviation',
    'chair',
    {
        key: 'delegates',
        label: 'Assigned Positions',
    },
    {
        key: 'positionCount',
        label: 'Total Positions',
    },
    'actions'
]

let header = ""
let status = true;
let editItem;

const CommitteeRoster = () => {
    const { user } = useAuth0()
    const { isAuthenticated } = useAuth0()

    const [modalAdd, setModalAdd] = useState(false)

    const [committeeState, setCommitteeState] = useState({
        division: '',
        category: '',
        type: '',
        committee: '',
        abbreviation: '',
        chair: '',
        positions: '',
        assignments: ''
    })

    const [data, setData] = useState({
        committeeData: ["", ""]
    });

    const [isLoading, setIsLoading] = useState(true)

    function openModal() {
        setCommitteeState({
            division: '',
            category: '',
            type: '',
            committee: '',
            abbreviation: '',
            chair: '',
            positions: '',
            assignments: ''
        })

        header = "Add Committee"
        status = true

        setModalAdd(!modalAdd)
    }

    function addCommittee(event) {
        event.preventDefault();

        checkLicense(user.sub)
            .then(result => {
                if (result === 0) {
                    alert("No valid Manuel License found! \nUpload a valid Manuel License to be able to configure data.")
                } else {
                    let assignments = ''

                    let i;
                    for (i = 0; i < committeeState.positions.split(",").length - 1; i++) {
                        assignments = assignments + ","
                    }

                    const payload = {
                        user: user.sub,
                        division: committeeState.division,
                        category: committeeState.category,
                        type: committeeState.type,
                        committee: committeeState.committee,
                        abbreviation: committeeState.abbreviation,
                        chair: committeeState.chair,
                        positions: committeeState.positions,
                        assignments: assignments
                    }

                    if (status) {
                        axios({
                            url: '/api/save/committee',
                            method: 'POST',
                            data: payload
                        })
                            .then(() => {
                                console.log('Data has been sent to the server')
                            })
                            .catch(() => {
                                console.log('Internal server error')
                            })
                    } else {
                        axios.put('/api/update/committee', {
                            data: {
                                id: editItem._id,
                                update: payload
                            },
                        });
                    }
                }
            })

        fetchData("/api/get/committee", user.sub, 'division').then((res) => {
            setData(prevState => {
                return { ...prevState, committeeData: JSON.stringify(res) }
            })
        })

        setModalAdd(false)
    }

    function editCommittee(item) {
        setCommitteeState({
            division: item.division,
            category: item.category,
            type: item.type,
            committee: item.committee,
            abbreviation: item.abbreviation,
            chair: item.chair,
            positions: item.positions,
            assignments: item.assignments
        })

        header = "Edit " + item.committee
        status = false
        editItem = item

        setModalAdd(!modalAdd)
    }

    function deleteCommittee(item) {
        axios.delete('/api/delete/committee', {
            data: {
                id: item._id,
            },
        });

        fetchData("/api/get/committee", user.sub, 'division').then((res) => {
            setData(prevState => {
                return { ...prevState, committeeData: JSON.stringify(res) }
            })
        })
    }

    async function getData() {
        await fetchData("/api/get/committee", user.sub, 'division').then((res) => {
            if (JSON.stringify(res) !== JSON.stringify(data.committeeData)) {
                setData(prevState => {
                    return { ...prevState, committeeData: JSON.stringify(res) }
                })
            }
        })
    }

    if (isAuthenticated) {
        getData().then(() => {
            if (isLoading) {
                setIsLoading(false)
            }
        })
    }

    return !isLoading ? (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Committee Roster
                            <Export data={exportTable(JSON.parse(data.committeeData))} filename="CommitteeRoster.csv" />
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-left">
                                <CCol lg="3">
                                    <CButton block color="primary" onClick={() => openModal()}>Add New</CButton>
                                </CCol>
                            </CRow>
                            <br></br>
                            <CDataTable
                                items={JSON.parse(data.committeeData)}
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
                                                        <CDropdownItem onClick={() => editCommittee(item)}>Edit</CDropdownItem>
                                                        <CDropdownItem onClick={() => deleteCommittee(item)}>Delete</CDropdownItem>
                                                    </CDropdownMenu>
                                                </CDropdown>
                                            </td>
                                        ),
                                    'delegates':
                                        (item) => (
                                            <td>
                                                {count(item.assignments)}
                                            </td>
                                        ),
                                    'positionCount':
                                        (item) => (
                                            <td>
                                                {count(item.positions)}
                                            </td>
                                        ),

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
                    <CForm>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-category">Committee Category</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect custom name="committeeCategory" value={committeeState.category} onChange={e => {
                                    const val = e.target.value
                                    setCommitteeState(prevState => {
                                        return { ...prevState, category: val }
                                    });
                                }}>
                                    <option value="" disabled hidden>Select Committee Category</option>
                                    <option value="General Assembly">General Assembly</option>
                                    <option value="Specialized Agency">Specialized Agency</option>
                                    <option value="Crisis Committee">Crisis Committee</option>
                                    <option value="Other">Other</option>
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-type">Committee Type</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CSelect custom name="committeeType" value={committeeState.type} onChange={e => {
                                    const val = e.target.value
                                    setCommitteeState(prevState => {
                                        return { ...prevState, type: val }
                                    });
                                }}>
                                    <option value="" disabled hidden>Select Committee Type</option>
                                    <option value="Single Delegation">Single Delegation</option>
                                    <option value="Double Delegation">Double Delegation</option>
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-division">Committee Division</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CFormGroup variant="custom-checkbox" inline>
                                    <CInputCheckbox custom id="inline-checkbox1" name="middleSchool" checked={(committeeState.division.includes("Middle School"))} onChange={e => {
                                        const middleSchool = e.target.checked
                                        const highSchool = (committeeState.division.includes("High School"))
                                        const university = (committeeState.division.includes("University"))

                                        let val = ''

                                        if (middleSchool) {
                                            val = val + "Middle School, "
                                        }

                                        if (highSchool) {
                                            val = val + "High School, "
                                        }

                                        if (university) {
                                            val = val + "University, "
                                        }

                                        val = val.substring(0, val.length - 2)

                                        setCommitteeState(prevState => {
                                            return { ...prevState, division: val }
                                        })
                                    }} />
                                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">Middle School</CLabel>
                                </CFormGroup>
                                <CFormGroup variant="custom-checkbox" inline>
                                    <CInputCheckbox custom id="inline-checkbox2" name="highSchool" checked={(committeeState.division.includes("High School"))} onChange={e => {
                                        const middleSchool = (committeeState.division.includes("Middle School"))
                                        const highSchool = e.target.checked
                                        const university = (committeeState.division.includes("University"))

                                        let val = ''

                                        if (middleSchool) {
                                            val = val + "Middle School, "
                                        }

                                        if (highSchool) {
                                            val = val + "High School, "
                                        }

                                        if (university) {
                                            val = val + "University, "
                                        }

                                        val = val.substring(0, val.length - 2)

                                        setCommitteeState(prevState => {
                                            return { ...prevState, division: val }
                                        })
                                    }} />
                                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">High School</CLabel>
                                </CFormGroup>
                                <CFormGroup variant="custom-checkbox" inline>
                                    <CInputCheckbox custom id="inline-checkbox3" name="middleSchool" checked={(committeeState.division.includes("University"))} onChange={e => {
                                        const middleSchool = (committeeState.division.includes("Middle School"))
                                        const highSchool = (committeeState.division.includes("High School"))
                                        const university = e.target.checked

                                        let val = ''

                                        if (middleSchool) {
                                            val = val + "Middle School, "
                                        }

                                        if (highSchool) {
                                            val = val + "High School, "
                                        }

                                        if (university) {
                                            val = val + "University, "
                                        }

                                        val = val.substring(0, val.length - 2)

                                        setCommitteeState(prevState => {
                                            return { ...prevState, division: val }
                                        })
                                    }} />
                                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">University</CLabel>
                                </CFormGroup>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-name">Committee Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput name="committeeName" placeholder="Committee Name" value={committeeState.committee} onChange={e => {
                                    const val = e.target.value
                                    setCommitteeState(prevState => {
                                        return { ...prevState, committee: val }
                                    });
                                }} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-abbr">Committee Abbreviation</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput name="committeeAbbr" placeholder="Committee Abbreviation" value={committeeState.abbreviation} onChange={e => {
                                    const val = e.target.value
                                    setCommitteeState(prevState => {
                                        return { ...prevState, abbreviation: val }
                                    });
                                }} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-chair">Committee Chair</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput name="committeeChair" placeholder="Committee Chair" value={committeeState.chair} onChange={e => {
                                    const val = e.target.value
                                    setCommitteeState(prevState => {
                                        return { ...prevState, chair: val }
                                    });
                                }} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="committee-positions">Committee Positions</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CTextarea name="committeePositions" rows="9" placeholder='Committee Positions - Separate multiple positions with a comma (",")' value={committeeState.positions} onChange={e => {
                                    const val = e.target.value
                                    setCommitteeState(prevState => {
                                        return { ...prevState, positions: val }
                                    });
                                }} />
                                <CFormText>
                                    <p>Import Default Positions: &emsp; &ensp;
                                        <span id="defaultPosition" style={{ "border": "none", "backgroundColor": "inherit", "color": "#636f83" }} onClick={() => setCommitteeState(prevState => {
                                            return { ...prevState, positions: "China,Estonia,France,India,Ireland,Kenya,Mexico,Niger,Norway,Russian Federation,Saint Vincent and the Grenadines,Tunisia,United Kingdom of Great Britain and Northern Ireland,United States of America,Viet Nam" }
                                        })}>15</span> &emsp; &ensp;
                                        <span id="defaultPosition" style={{ "border": "none", "backgroundColor": "inherit", "color": "#636f83" }} onClick={() => setCommitteeState(prevState => {
                                            return { ...prevState, positions: "Afghanistan,Argentina,Brazil,Cambodia,Canada,China,France,Germany,India,Iraq,Islamic Republic of Iran,Israel,Japan,Mexico,Nigeria,Pakistan,Portugal,Republic of Korea,Russian Federation,Saudi Arabia,Singapore,South Africa,Spain,Switzerland,Syrian Arab Republic,Ukraine,United Arab Emirates,United Kingdom of Great Britain and Northern Ireland,United States of America,Viet Nam" }
                                        })}>30</span> &emsp; &ensp;
                                        <span id="defaultPosition" style={{ "border": "none", "backgroundColor": "inherit", "color": "#636f83" }} onClick={() => setCommitteeState(prevState => {
                                            return { ...prevState, positions: "Afghanistan,Argentina,Belgium,Brazil,Cambodia,Canada,Central African Republic,Chile,China,Colombia,Cuba,Democratic People's Republic of Korea,Democratic Republic of the Congo,Dominican Republic,Ecuador,Finland,France,Germany,Honduras,Hungary,India,Indonesia,Iraq,Islamic Republic of Iran,Israel,Japan,Mexico,Mongolia,Morocco,Nepal,Netherlands,New Zealand,Nigeria,Pakistan,Philippines,Portugal,Republic of Korea,Russian Federation,Saudi Arabia,Singapore,South Africa,Spain,Switzerland,Syrian Arab Republic,Uganda,Ukraine,United Arab Emirates,United Kingdom of Great Britain and Northern Ireland,United States of America,Viet Nam" }
                                        })}>50</span> &emsp; &ensp;
                                        <span id="defaultPosition" style={{ "border": "none", "backgroundColor": "inherit", "color": "#636f83" }} onClick={() => setCommitteeState(prevState => {
                                            return { ...prevState, positions: "Afghanistan,Argentina,Australia,Belgium,Bolivarian Republic of Venezuela,Brazil,Cambodia,Canada,Central African Republic,Chile,China,Colombia,Costa Rica,Côte d'Ivoire,Cuba,Czech Republic,Democratic People's Republic of Korea,Democratic Republic of the Congo,Dominican Republic,Ecuador,El Salvador,Finland,France,Germany,Honduras,Hungary,Iceland,India,Indonesia,Iraq,Islamic Republic of Iran,Israel,Italy,Jamaica,Japan,Kazakhstan,Lebanon,Libya,Luxembourg,Malaysia,Mexico,Mongolia,Morocco,Nepal,Netherlands,New Zealand,Nicaragua,Nigeria,Norway,Pakistan,Panama,Papua New Guinea,Paraguay,Peru,Philippines,Plurinational State of Bolivia,Portugal,Republic of Korea,Russian Federation,Saudi Arabia,Singapore,South Africa,Spain,Sweden,Switzerland,Syrian Arab Republic,Thailand,Uganda,Ukraine,United Arab Emirates,United Kingdom of Great Britain and Northern Ireland,United States of America,Uruguay,Viet Nam,Zimbabwe" }
                                        })}>75</span> &emsp; &ensp;
                                        <span id="defaultPosition" style={{ "border": "none", "backgroundColor": "inherit", "color": "#636f83" }} onClick={() => setCommitteeState(prevState => {
                                            return { ...prevState, positions: "Afghanistan,Albania,Algeria,Andorra,Angola,Antigua and Barbuda,Argentina,Armenia,Australia,Austria,Azerbaijan,Bahamas,Bahrain,Bangladesh,Barbados,Belarus,Belgium,Belize,Benin,Bhutan,Bolivarian Republic of Venezuela,Bosnia and Herzegovina,Botswana,Brazil,Brunei Darussalam,Bulgaria,Burkina Faso,Burundi,Cabo Verde,Cambodia,Cameroon,Canada,Central African Republic,Chad,Chile,China,Colombia,Comoros,Congo,Costa Rica,Côte d'Ivoire,Croatia,Cuba,Cyprus,Czech Republic,Democratic People's Republic of Korea,Democratic Republic of the Congo,Denmark,Djibouti,Dominica,Dominican Republic,Ecuador,Egypt,El Salvador,Equatorial Guinea,Eritrea,Estonia,Eswatini,Ethiopia,Federated States of Micronesia,Fiji,Finland,France,Gabon,Gambia,Georgia,Germany,Ghana,Greece,Grenada,Guatemala,Guinea,Guinea-Bissau,Guyana,Haiti,Honduras,Hungary,Iceland,India,Indonesia,Iraq,Ireland,Islamic Republic of Iran,Israel,Italy,Jamaica,Japan,Jordan,Kazakhstan,Kenya,Kiribati,Kuwait,Kyrgyzstan,Lao People's Democratic Republic,Latvia,Lebanon,Lesotho,Liberia,Libya,Liechtenstein,Lithuania,Luxembourg,Madagascar,Malawi,Malaysia,Maldives,Mali,Malta,Marshall Islands,Mauritania,Mauritius,Mexico,Monaco,Mongolia,Montenegro,Morocco,Mozambique,Myanmar,Namibia,Nauru,Nepal,Netherlands,New Zealand,Nicaragua,Niger,Nigeria,North Macedonia,Norway,Oman,Pakistan,Palau,Panama,Papua New Guinea,Paraguay,Peru,Philippines,Plurinational State of Bolivia,Poland,Portugal,Qatar,Republic of Korea,Republic of Moldova,Romania,Russian Federation,Rwanda,Saint Kitts and Nevis,Saint Lucia,Saint Vincent and the Grenadines,Samoa,San Marino,São Tomé and Príncipe,Saudi Arabia,Senegal,Serbia,Seychelles,Sierra Leone,Singapore,Slovakia,Slovenia,Solomon Islands,Somalia,South Africa,South Sudan,Spain,Sri Lanka,Sudan,Suriname,Sweden,Switzerland,Syrian Arab Republic,Tajikistan,Thailand,Timor-Leste,Togo,Tonga,Trinidad and Tobago,Tunisia,Turkey,Turkmenistan,Tuvalu,Uganda,Ukraine,United Arab Emirates,United Kingdom of Great Britain and Northern Ireland,United Republic of Tanzania,United States of America,Uruguay,Uzbekistan,Vanuatu,Viet Nam,Yemen,Zambia,Zimbabwe" }
                                        })}>All</span>
                                    </p>
                                </CFormText>
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalAdd(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={event => addCommittee(event)}>Submit</CButton>
                </CModalFooter>
            </CModal>

        </>
    ) : (<p>Waiting for Data...</p>)
}

export default CommitteeRoster