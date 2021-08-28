import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import {
    CAlert,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardFooter,
    CCol,
    CDataTable,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
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
import { Redirect } from 'react-router-dom'
import { Export } from 'src/reusable'
import { attendanceSheetPDF, placardSetPDF } from 'src/reusable/jsPDF'

import fetchData from '../../data/LiveData/FetchData'
import { checkLicense } from 'src/reusable/checkLicense';


import { getAllDelegations, getCommitteeData, exportTable } from './committeeHelper'

const buttons = [{ void: 'void' }]

const fieldsAssignments = [
    'position',
    'assignment',
    'actions'
]

const fieldsButtons = [
    'placardSet',
    'attendanceSheet'
]

let header;
let status;
let editItem;

const Committee = ({ match: { params: { committee } } }) => {
    const { user } = useAuth0()
    const { isAuthenticated } = useAuth0()

    const [modalAdd, setModalAdd] = useState(false)

    const [positionState, setPositionState] = useState({
        position: ''
    })

    const [data, setData] = useState({
        registrationData: [],
        settings: [],
        committee: [],
        allotmentData: [],
        redirect: false
    })

    const [assignments, setAssignments] = useState({
        positions: [],
        assignments: [],
    })

    const [alerts, setAlerts] = useState([])

    async function getData() {
        await fetchData('/api/get/registrationData', user.sub).then((res) => {
            if (JSON.stringify(res) !== JSON.stringify(data.registrationData)) {
                setData(prevState => {
                    return { ...prevState, registrationData: res }
                })
            }
        })

        await fetchData("/api/get/settings", user.sub).then((res) => {
            if (JSON.stringify(res[res.length - 1]) !== JSON.stringify(data.settings)) {
                setData(prevState => {
                    return { ...prevState, settings: res[res.length - 1] }
                })
            }
        })

        await fetchData('/api/get/committee', user.sub).then((res) => {
            let i;
            for (i = 0; i < res.length; i++) {
                if (res[i]._id === committee) {
                    let committeeData = res[i]

                    if (JSON.stringify(committeeData) !== JSON.stringify(data.committee)) {
                        setData(prevState => {
                            return { ...prevState, committee: committeeData }
                        })
                    }
                }
            }

            if (data.committee.length === 0) {
                setData(prevState => {
                    return { ...prevState, redirect: true }
                })
            }
        })

        await fetchData("/api/get/allotments", user.sub, 'delegation').then((res) => {
            if (JSON.stringify(res) !== JSON.stringify(data.allotmentData)) {
                setData(prevState => {
                    return { ...prevState, allotmentData: res }
                })
            }
        })
    }

    function openModal() {
        setPositionState({
            position: ''
        })

        header = "Add"
        status = true

        setModalAdd(!modalAdd)
    }

    function addPosition(event) {
        event.preventDefault();

        checkLicense(user.sub)
            .then(result => {
                if (result === 0) {
                    alert("No valid MUNWell License found! \nUpload a valid MUNWell License to be able to configure data.")
                } else {
                    let newPositions;
                    let newAssignments = data.committee.assignments

                    if (status) {
                        newPositions = data.committee.positions + "," + positionState.position
                        newAssignments = data.committee.assignments

                        let i;
                        for (i = 0; i < positionState.position.split(",").length; i++) {
                            newAssignments = newAssignments + ","
                        }
                    } else {
                        let positions = data.committee.positions.split(",")
                        let index = positions.indexOf(editItem.position)

                        positions[index] = positionState.position

                        newPositions = positions.join()
                    }

                    axios.put('/api/update/committee', {
                        data: {
                            id: data.committee._id,
                            update: { positions: newPositions, assignments: newAssignments }
                        },
                    })
                        .then(() => {
                            alert(positionState.position + " added to " + data.committee.committee + " successfully!")
                        })
                        .catch(() => {
                            console.log('Internal server error')
                        })
                }
            })

        fetchData('/api/get/committee', user.sub).then((res) => {
            let i;
            for (i = 0; i < res.length; i++) {
                if (res[i]._id === committee) {
                    let committeeData = res[i]

                    if (JSON.stringify(committeeData) !== JSON.stringify(data.committee)) {
                        setData(prevState => {
                            return { ...prevState, committee: committeeData }
                        })
                    }
                }
            }
        })

        setModalAdd(false)
    }

    function editPosition(item) {
        setPositionState({
            position: item.position
        })

        header = "Edit"
        status = false
        editItem = item

        setModalAdd(!modalAdd)
    }

    function deletePosition(item) {
        checkLicense(user.sub)
            .then(result => {
                if (result === 0) {
                    alert("No valid MUNWell License found! \nUpload a valid MUNWell License to be able to configure data.")
                } else {
                    let index = data.committee.positions.split(",").indexOf(item.position)

                    let newPositions = data.committee.positions.split(",")
                    newPositions.splice(index, 1)
                    newPositions = newPositions.join()

                    let newAssignments = data.committee.assignments.split(",")
                    newAssignments.splice(index, 1)
                    newAssignments = newAssignments.join()

                    axios.put('/api/update/committee', {
                        data: {
                            id: data.committee._id,
                            update: { positions: newPositions, assignments: newAssignments }
                        },
                    })
                        .then(() => {
                            alert(item.position + " deleted successfully!")

                            fetchData('/api/get/committee', user.sub).then((res) => {
                                let i;
                                for (i = 0; i < res.length; i++) {
                                    if (res[i]._id === committee) {
                                        let committeeData = res[i]

                                        if (JSON.stringify(committeeData) !== JSON.stringify(data.committee)) {
                                            setData(prevState => {
                                                return { ...prevState, committee: committeeData }
                                            })
                                        }
                                    }
                                }
                            })
                        })
                        .catch(() => {
                            console.log('Internal server error')
                        })
                }
            })
    }

    function getValue(item) {
        let index = assignments.positions.indexOf(item.position)

        return assignments.assignments[index]
    }

    function saveChanges() {
        checkLicense(user.sub)
            .then(result => {
                if (result === 0) {
                    alert("No valid MUNWell License found! \nUpload a valid MUNWell License to be able to configure data.")
                } else {
                    let newAssignments = assignments.assignments.join()
                    axios.put('/api/update/committee', {
                        data: {
                            id: data.committee._id,
                            update: { assignments: newAssignments }
                        },
                    })
                        .then(() => {
                            fetchData('/api/get/committee', user.sub).then((res) => {
                                let i;
                                for (i = 0; i < res.length; i++) {
                                    if (res[i]._id === committee) {
                                        let committeeData = res[i]

                                        if (JSON.stringify(committeeData) !== JSON.stringify(data.committee)) {
                                            setData(prevState => {
                                                return { ...prevState, committee: committeeData }
                                            })

                                            setAlerts(getAlerts(committeeData, data.registrationData, data.allotmentData))
                                        }
                                    }
                                }
                            })

                            alert(data.committee.committee + " position assignments saved successfully!")
                        })
                        .catch(() => {
                            console.log('Internal server error')
                        })
                }
            })


    }

    function getAlerts(committee, registrationData, allotmentData) {
        let alerts = [<p>{committee.committee} - Fired Alerts</p>]

        let i;
        for (i = 0; i < registrationData.length; i++) {
            let assignedPositions = 0;

            let j;
            for (j = 0; j < allotmentData.length; j++) {
                if (registrationData[i]._id === allotmentData[j].delegationId) {
                    let allotments = allotmentData[j].allotments.split(",")

                    let k;
                    for (k = 0; k < allotments.length; k++) {
                        let arr = allotments[k].split(":")

                        if (arr[0] === committee.committee) {
                            assignedPositions = arr[1]
                        }
                    }
                }
            }

            let assignments = committee.assignments.split(",")
            let actualPositions = 0;
            let k;
            for (k = 0; k < assignments.length; k++) {
                if (assignments[k] === registrationData[i].delegation) {
                    actualPositions = actualPositions + 1
                }
            }

            let alertNumber = assignedPositions - actualPositions

            let position = "position"
            if (alertNumber !== 1) {
                position = "positions"
            }

            let delegation = registrationData[i].delegation

            let alert =
                <CRow>
                    <CCol lg="12">
                        <CAlert color="danger">
                            <CRow>
                                <CCol lg="9">
                                    {delegation} requires <strong>{alertNumber}</strong> {position} in the {committee.committee}
                                </CCol>
                                <CCol lg="3">
                                    <CButton block color="primary" onClick={() => autoAssign(committee, delegation, alertNumber)}>Auto Assign</CButton>
                                </CCol>
                            </CRow>
                        </CAlert>
                    </CCol>
                </CRow>

            if (alertNumber !== 0) {
                alerts.push(alert)
            }
        }

        if (alerts.length === 1) {
            alerts = []
        }

        return alerts
    }

    function autoAssign(committee, delegation, alertNumber) {
        let positions = committee.positions.split(",")
        let assignments = committee.assignments.split(",")
        let indexes = []
        let openPositions = 0

        let i;
        for (i = 0; i < positions.length; i++) {
            if (alertNumber > 0) {
                if (assignments[i] === "") {
                    indexes.push(i)
                }
            } else {
                if (assignments[i] === delegation) {
                    indexes.push(i)
                }
            }

            if (assignments[i] === "") {
                openPositions = openPositions + 1
            }
        }

        if (openPositions < alertNumber) {
            alert("Not enough positions to assign to " + delegation)
            return
        }

        let j;
        for (j = 0; j < Math.abs(alertNumber); j++) {
            let index = indexes[parseInt(Math.random() * (indexes.length))];

            if (assignments[index] === "") {
                assignments[index] = delegation
            } else {
                assignments[index] = ""
            }

            indexes.splice(indexes.indexOf(index), 1)
        }

        alert(delegation + " has been randomly auto assigned")

        setAssignments(prevState => {
            return { ...prevState, assignments: assignments }
        })
    }

    if (isAuthenticated) {
        getData().then(() => {
            if (data.committee.length !== 0) {
                if (assignments.assignments.length === 0) {
                    setAssignments(prevState => {
                        return { ...prevState, positions: data.committee.positions.split(',') }
                    })

                    setAssignments(prevState => {
                        return { ...prevState, assignments: data.committee.assignments.split(',') }
                    })

                    setAlerts(getAlerts(data.committee, data.registrationData, data.allotmentData))
                }
            }
        })
    }


    return data.committee.length !== 0 ? (
        <>
            {alerts}

            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            {data.committee.committee} - Position Assigments
                            <Export data={exportTable(data.committee)} filename={data.committee.committee + " Position Assignments.csv"} />
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-left">
                                <CCol lg="3">
                                    <CButton block color="primary" onClick={() => openModal()}>Add New</CButton>
                                </CCol>
                            </CRow>
                            <br></br>
                            <CDataTable
                                items={getCommitteeData(data.committee)}
                                fields={fieldsAssignments}
                                hover
                                striped
                                sorter
                                scopedSlots={{
                                    'assignment':
                                        (item) => (
                                            <td>
                                                <CSelect custom name="select" id="award-delegation"
                                                    value={getValue(item)}
                                                    onChange={e => {
                                                        const val = e.target.value
                                                        let newAssignments = assignments.assignments

                                                        newAssignments[assignments.positions.indexOf(item.position)] = val

                                                        setAssignments(prevState => {
                                                            return { ...prevState, assignments: newAssignments }
                                                        });
                                                    }}
                                                >
                                                    {getAllDelegations(item, data.committee, data.registrationData)}
                                                </CSelect>
                                            </td>
                                        ),
                                    'actions':
                                        (item) => (
                                            <td>
                                                <CDropdown className="m-1">
                                                    <CDropdownToggle color="secondary">
                                                        Select Action
                                                    </CDropdownToggle>
                                                    <CDropdownMenu>
                                                        <CDropdownItem onClick={() => editPosition(item)} key="Edit">Edit</CDropdownItem>
                                                        <CDropdownItem onClick={() => deletePosition(item)} key="Delete">Delete</CDropdownItem>
                                                    </CDropdownMenu>
                                                </CDropdown>
                                            </td>
                                        ),

                                }}
                            />
                        </CCardBody>
                        <CCardFooter>
                            <CRow className="align-items-right">
                                <CCol lg="2">
                                    <CButton block color="primary" onClick={() => saveChanges()}>Save Changes</CButton>
                                </CCol>
                            </CRow>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            {data.committee.committee} - Generated Documents
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={buttons}
                                fields={fieldsButtons}
                                hover
                                striped
                                sorter
                                itemsPerPage={10}
                                pagination
                                scopedSlots={{
                                    'placardSet':
                                        (item) => (
                                            <td>
                                                <CButton block color="primary" onClick={() => placardSetPDF(data.committee, data.settings)}>Placard Set</CButton>
                                            </td>
                                        ),
                                    'attendanceSheet':
                                        (item) => (
                                            <td>
                                                <CButton block color="primary" onClick={() => attendanceSheetPDF(data.committee)}>Attendance Sheet</CButton>
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
                    <CModalTitle>{header} Position</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="new-position">New Position</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput name="newPosition" placeholder='New Position - Separate multiple positions with a comma (",")' value={positionState.position} onChange={e => {
                                    const val = e.target.value
                                    setPositionState(prevState => {
                                        return { ...prevState, position: val }
                                    });
                                }} />
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalAdd(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={event => addPosition(event)}>Submit</CButton>
                </CModalFooter>
            </CModal>
        </>
    ) : ((data.redirect) ? <Redirect to={{ pathname: "/404" }} /> : <p>Waiting for Data...</p>)
}

export default Committee