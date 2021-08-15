export function exportTable(registrationData) {
    let data = registrationData

    let i;
    for (i = 0; i < data.length; i++) {
        data[i]["delegate fee"] = "$" + (data[i]["delegates"] * 20).toFixed(2)

        let temp = 0
        if (data[i]["type"] === "Delegation") {
            temp = 30
        }

        data[i]["invoice total"] = "$" + ((data[i]["delegates"] * 20) + temp).toFixed(2)

        delete data[i]._id
        delete data[i].id
        delete data[i].user
        delete data[i].__v
    }

    return data
}

export function getDelegations(registrationData) {
    let delegations = [<option value="" disabled hidden key="">Select Delegation</option>]

    let i;
    for (i = 0; i < registrationData.length; i++) {
        let temp = registrationData[i].delegation
        delegations[i + 1] = <option value={temp} key={temp + Math.random()}>{temp}</option>
    }

    return delegations
}

