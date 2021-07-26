import registrationData from 'src/data/MockData/MockRegistration'
import awardTypes from '../../data/MockData/MockAwardTypes'
import committeeData from '../../data/MockData/MockCommittees'

export function getAwardTypes() {
    let types = [<option value="" disabled>Select Award Type</option>]

    let i;
    for (i = 0; i < awardTypes.length; i++) {
        let temp = awardTypes[i].type
        types[i + 1] = <option value={temp}>{temp}</option>
    }

    return types
}

export function getDelegations() {
    let delegations = [<option value="" disabled>Select Delegation</option>]

    let i;
    for (i = 0; i < registrationData.length; i++) {
        let temp = registrationData[i].delegation
        delegations[i + 1] = <option value={temp}>{temp}</option>
    }

    return delegations
}

export function getCommittees() {
    let committees = [<option value="" disabled>Select Committee</option>]

    let i;
    for (i = 0; i < committeeData.length; i++) {
        let temp = committeeData[i].committee
        committees[i + 1] = <option value={temp}>{temp}</option>
    }

    return committees
}