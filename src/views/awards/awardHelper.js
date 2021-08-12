export function getAwardTypes(awardTypes) {
    let types = [<option value="" disabled hidden key="">Select Award Type</option>]

    let i;
    for (i = 0; i < awardTypes.length; i++) {
        let temp = awardTypes[i].type
        types[i + 1] = <option value={temp} key={temp}>{temp}</option>
    }

    return types
}

export function getDelegations(registrationData) {
    let delegations = [<option value="" disabled hidden key="">Select Delegation</option>]

    let i;
    for (i = 0; i < registrationData.length; i++) {
        let temp = registrationData[i].delegation
        delegations[i + 1] = <option value={temp} key={temp}>{temp}</option>
    }

    return delegations
}

export function getCommittees(committeeData) {
    let committees = [<option value="" disabled hidden key="">Select Committee</option>]

    let i;
    for (i = 0; i < committeeData.length; i++) {
        let temp = committeeData[i].committee
        committees[i + 1] = <option value={temp} key={temp}>{temp}</option>
    }

    return committees
}