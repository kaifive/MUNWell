import {
    CAlert,
    CButton,
    CCol,
    CRow
} from '@coreui/react'

import registrationData from '../../data/MockData/MockRegistration'
import allotmentData from '../../data/MockData/MockAllotments'

export function getAllDelegations(item, json, registrationData) {
    let delegations = [<option value="" key={item.position}>Select Delegation</option>]

    let i;
    for (i = 0; i < registrationData.length; i++) {
        if (json.division.includes(registrationData[i].division) || registrationData[i].division.includes(json.division)) {

            let temp = registrationData[i].delegation

            delegations.push(<option value={temp} key={item.position + temp}>{temp}</option>)
        }
    }

    return delegations
}

export function getCommitteeData(committee) {
    let data = []
    let positions = committee.positions.split(",")

    let i;

    for (i = 0; i < positions.length; i++) {
        let temp = {}

        temp['position'] = positions[i]

        data[i] = temp
    }

    return data;
}

export function exportTable(committee) {
    let positions = committee.positions.split(",")
    let assignments = committee.assignments.split(",")

    let data = []

    let i;
    for (i = 0; i < positions.length; i++) {
        let entry = {
            "position": positions[i],
            "assignment": assignments[i]
        }

        data.push(entry)
    }

    return data
}

export function getAlerts(committee) {
    let alerts = []

    let i;
    for (i = 0; i < registrationData.length; i++) {
        let assignedPositions = 0;
        let j;
        for (j = 0; j < allotmentData.length; j++) {
            if (registrationData[i].delegation === allotmentData[j].delegation) {
                assignedPositions = allotmentData[j].allotments[committee.committee]
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

    return alerts
}

function autoAssign(committee, delegation, alertNumber) {
    let positions = committee.positions.split(",")
    let assignments = committee.assignments.split(",")
    let indexes = []
    let openPositions = 0

    let i;
    for (i = 0; i < assignments.length; i++) {
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
        console.log(positions[index])

        indexes.splice(indexes.indexOf(index), 1)
    }
}