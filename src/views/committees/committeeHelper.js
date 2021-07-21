import {
    CAlert,
    CButton,
    CCol,
    CDropdownItem,
    CRow
} from '@coreui/react'

import committeeData from '../../data/MockData/MockCommittees'
import registrationData from '../../data/MockData/MockRegistration'
import allotmentData from '../../data/MockData/MockAllotments'

export function getIndex(committee) {
    let i;
    for (i = 0; i < committeeData.length; i++) {
        if (committeeData[i].committee === committee) {
            return committeeData[i]
        }
    }

    return null
}

export function getActive(item, committee) {
    let positions = getIndex(committee).positions.split(",")
    let assignments = getIndex(committee).assignments.split(",")

    let i;
    for (i = 0; i < positions.length; i++) {
        if (positions[i] === item.position && assignments[i] !== '') {
            return assignments[i];
        }
    }

    return "Select Delegation"
}

export function getDelegations(item, committee) {
    let data = []

    let i;
    for (i = 0; i < registrationData.length; i++) {
        let name = registrationData[i].delegation

        if (name === getActive(item, committee)) {
            data[i] = <CDropdownItem active>{name}</CDropdownItem>
        } else {
            data[i] = <CDropdownItem>{name}</CDropdownItem>
        }
    }

    return data
}

export function getData(committee) {
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

        let alert =
            <CRow>
                <CCol lg="12">
                    <CAlert color="danger">
                        <CRow>
                            <CCol lg="9">
                                {registrationData[i].delegation} requires <strong>{alertNumber}</strong> {position} in the {committee.committee}
                            </CCol>
                            <CCol lg="3">
                                <CButton block color="primary">Auto Assign</CButton>
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