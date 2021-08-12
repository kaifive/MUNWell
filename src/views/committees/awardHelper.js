export function getIndex(committee, committeeData) {
    let i;
    for (i = 0; i < committeeData.length; i++) {
        if (JSON.stringify(committeeData[i].committee) === JSON.stringify(committee)) {
            return committeeData[i]
        }
    }

    return null
}

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

export function getPositions(committee) {
    let data = [<option value="" disabled hidden>Select Position</option>]

    let positions = committee.positions.split(",")

    let i;
    for (i = 0; i < positions.length; i++) {
            data[i + 1] = <option value={positions[i]}>{positions[i]}</option>
        
    }

    return data
}

export function exportTable(committee, awardData) {
    let data = []

    let i;
    for (i = 0; i < awardData.length; i++) {
        if (awardData[i].committee === committee.committee) {
            data.push(awardData[i])
        }
    }

    return data
}

export function getAllDelegations(json, registrationData) {
    let delegations = [<option value="" hidden>Select Delegation</option>]

    let i;
    for(i = 0; i < registrationData.length; i++) {
        if (json.division.includes(registrationData[i].division) || registrationData[i].division.includes(json.division)) {

        let temp = registrationData[i].delegation
        delegations.push(<option value={temp}>{temp}</option>)
        }
    }

    return delegations
}
