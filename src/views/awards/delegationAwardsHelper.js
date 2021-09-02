
export function exportTable(registrationData, awardData, awardTypes, committeeData) {
    let data = []

    let i;
    for (i = 0; i < registrationData.length; i++) {
        let entry = {
            "division": registrationData[i]["division"], "delegation": registrationData[i]["delegation"]
        }

        let j;
        for (j = 0; j < awardTypes.length; j++) {
            let type = awardTypes[j].type

            entry[type] = getAwards(registrationData[i], type, awardData)
        }

        entry["raw"] = getRawScore(registrationData[i], awardTypes, awardData)
        entry["score"] = getPerCapitaScore(registrationData[i], committeeData, awardTypes, awardData)

        data.push(entry)
    }

    return data
}

function getAwards(item, award, awardData) {
    let count = 0;

    let i;
    for (i = 0; i < awardData.length; i++) {
        if (awardData[i].type === award && awardData[i].delegation === item.delegation) {
            count = count + 1
        }
    }

    return count
}

export function getRawScore(item, awardTypes, awardData) {
    let score = 0;

    let i;
    for (i = 0; i < awardTypes.length; i++) {
        score = score + (getAwards(item, awardTypes[i].type, awardData) * awardTypes[i].value);
    }

    return score
}

export function getPerCapitaScore(item, allotmentData, awardTypes, awardData) {
    let delegations = 0

    if (allotmentData !== undefined || allotmentData[0].allotments !== undefined) {
        let i;
        for (i = 0; i < allotmentData.length; i++) {
            if(allotmentData[i].delegationId === item._id) {
                let allotments = allotmentData[i].allotments.split(",")

                let j;
                for(j = 0; j < allotments.length; j++) {
                    let arr = allotments[j].split(":")

                    delegations = delegations + Number(arr[1])
                }
            }
        }

        let calculated = (getRawScore(item, awardTypes, awardData) / delegations).toFixed(5)

        if(isNaN(delegations)) {
            calculated = "0.00000"
        }

        return calculated
    }

    return "0.00000"

}

export function getScopedSlots(awardTypes, awardData, committeeData) {
    let scopedSlots = {}

    let i;
    for (i = 0; i < awardTypes.length; i++) {
        let type = awardTypes[i].type

        scopedSlots[type] =
            (item) => (
                <td>
                    {getAwards(item, type, awardData)}
                </td>
            )
    }


    return scopedSlots
}

export function getFields(awardTypes) {
    let fields = []

    fields[0] = 'division'
    fields[1] = 'delegation'

    let i;
    for (i = 0; i < awardTypes.length; i++) {
        let type = awardTypes[i].type
        let value = awardTypes[i].value

        let item = {
            key: type,
            label: type + " - " + value
        }

        fields[i + 2] = item
    }

    fields[i + 2] = { key: 'raw', label: 'Raw Score' }
    fields[i + 3] = { key: 'score', label: 'Per Capita Score' }

    return fields
}
