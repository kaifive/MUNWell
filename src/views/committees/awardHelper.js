import registrationData from 'src/data/MockData/MockRegistration'
import awardData from '../../data/MockData/MockAwards'
import committeeData from '../../data/MockData/MockCommittees'

export function setField(committee) {
    let fields = [
        'type',
        'position',
        'delegation',
        {
            key: 'delegate1',
            label: 'Delegate I'
        },
        'actions'
    ]

    if(committee.type === "Double Delegation") {
        let field =     
        {
            key: 'delegate2',
            label: 'Delegate II'
        }

        fields.splice(fields.length - 1, 0, field)
    }

    return fields
}

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
    let types = [<option value="" disabled>Select Award Type</option>]

    let i;
    for (i = 0; i < awards.length; i++) {
        let temp = awards[i].type
        types[i + 1] = <option value={temp}>{temp}</option>
    }

    return types
}

export function getPositions(committee) {
    let data = [<option value="" disabled>Select Position</option>]

    let positions = committee.positions.split(",")

    let i;
    for (i = 0; i < positions.length; i++) {
            data[i + 1] = <option value={positions[i]}>{positions[i]}</option>
        
    }

    return data
}

export function getDelegation(position, committee) {
    let delegation = getAllDelegations()

    let positions = committee.positions.split(",")
    let assignments = committee.assignments.split(",")

    if(position === "") {
        return <option value="">Select Position First</option>
    }

    let i;
    for (i = 0; i < positions.length; i++) {
        if (positions[i] === position && assignments[i] !== "") {
            delegation = <option value={assignments[i]}>{assignments[i]}</option>
            return delegation
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

function getAllDelegations() {
    let delegations = [<option value="">Select Delegation</option>]

    let i;
    for(i = 0; i < registrationData.length; i++) {
        let temp = registrationData[i].delegation
        delegations.push(<option value={temp}>{temp}</option>)
    }

    return delegations
}
