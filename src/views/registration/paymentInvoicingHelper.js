import registrationData from '../../data/MockData/MockRegistration'

export function exportTable() {
    let data = registrationData

    let i;
    for (i = 0; i < data.length; i++) {
        data[i]["delegate fee"] = "$" + (data[i]["delegates"] * 20).toFixed(2)

        let temp = 0
        if (data[i]["type"] === "Delegation") {
            temp = 30
        }

        data[i]["invoice total"] = "$" + ((data[i]["delegates"] * 20) + temp).toFixed(2)
    }

    return data
}

export function getDelegateFee(item) {
    let amount = 0
    amount = item.delegates * 20
    amount = amount.toFixed(2)
    return amount
}

export function getInvoiceTotal(item) {
    let amount = 0;
    amount = + getDelegateFee(item)

    if (item.type === 'Delegation') {
        amount = amount + 30
    }

    amount = amount.toFixed(2)
    return amount
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