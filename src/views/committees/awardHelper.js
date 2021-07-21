import awardData from '../../data/MockData/MockAwards'
import committeeData from '../../data/MockData/MockCommittees'

export function getIndex(committee) {
    let i;
    for (i = 0; i < committeeData.length; i++) {
        if (committeeData[i].committee === committee) {
            return committeeData[i]
        }
    }

    return null
}

export function filterAwardData(committee) {
    let awards = []
    let i;

    for (i = 0; i < awardData.length; i++) {
        if (awardData[i].committee === committee) {
            awards.push(awardData[i])
        }
    }

    return awards
}

export function getAwardTypes(awards) {
    let types = [<option selected value="default" disabled>Select Award Type</option>]

    let i;
    for (i = 0; i < awards.length; i++) {
        let temp = awards[i].type
        types[i + 1] = <option value={temp}>{temp}</option>
    }

    return types
}

export function getPositions(committee) {
    let data = [<option selected value="default" disabled>Select Position</option>]

    let positions = committee.positions.split(",")
    let assignments = committee.assignments.split(",")

    let i;
    for (i = 0; i < positions.length; i++) {
        if (assignments[i] !== "") {
            data[i + 1] = <option value={positions[i]}>{positions[i]}</option>
        }
    }

    return data
}

export function getDelegation(position, committee) {
    let delegation;

    let positions = committee.positions.split(",")
    let assignments = committee.assignments.split(",")

    let i;
    for (i = 0; i < positions.length; i++) {
        if (positions[i] === position) {
            delegation = <option value={assignments[i]}>{assignments[i]}</option>
        }
    }

    return delegation
}

export function exportTable(committee) {
    let data = []

    let i;
    for (i = 0; i < awardData.length; i++) {
        if (awardData[i].committee === committee.committee) {
            data.push(awardData[i])
        }
    }

    return data
}
