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

export function getDelegations(preKey, registrationData) {
    let delegations = [<option value="" disabled hidden key={preKey}>Select Delegation</option>]

    let i;
    for (i = 0; i < registrationData.length; i++) {
        let temp = registrationData[i].delegation

        if (temp !== undefined) {
            delegations[i + 1] = <option value={temp} key={preKey + "_" + temp}>{temp}</option>
        }
    }

    return delegations
}

export function getDelegateFee(item, settings) {
    if (settings !== undefined) {
        let multiplier = 0;

        if (item.window === "Early") {
            multiplier = Number(settings.earlydelfee)
        } else if (item.window === "Regular") {
            multiplier = Number(settings.regdelfee)
        } else if (item.window === "Late") {
            multiplier = Number(settings.latedelfee)
        }

        let amount = 0
        amount = item.delegates * multiplier
        amount = amount.toFixed(2)
        return amount
    } else {
        return 0.00
    }
}

export function getInvoiceTotal(item, settings) {
    if (settings !== undefined) {
        let amount = 0;
        amount = + getDelegateFee(item, settings)

        let schoolfee = 0;

        if (item.window === "Early") {
            schoolfee = Number(settings.earlyschoolfee)
        } else if (item.window === "Regular") {
            schoolfee = Number(settings.regschoolfee)
        } else if (item.window === "Late") {
            schoolfee = Number(settings.lateschoolfee)
        }

        if (item.type === 'Delegation') {
            amount = amount + schoolfee
        }

        amount = amount.toFixed(2)
        return amount
    } else {
        return 0.00
    }
}