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

