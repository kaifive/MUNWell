import registrationData from '../../data/MockData/MockRegistration'
import awardData from '../../data/MockData/MockAwards'
import awardTypes from '../../data/MockData/MockAwardTypes'

export function exportTable() {
    let data = []

    let i;
    for (i = 0; i < registrationData.length; i++) {
        let entry = {
            "division": registrationData[i]["division"], "delegation": registrationData[i]["delegation"]
        }

        let j;
        for (j = 0; j < awardTypes.length; j++) {
            let type = awardTypes[j].type

            entry[type] = getAwards(registrationData[i], type)
        }

        entry["raw"] = getRawScore(registrationData[i])
        entry["score"] = getPerCapitaScore(registrationData[i])

        data.push(entry)
    }

    return data
}

export function getFields() {
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

export function getAwards(item, award) {
    let count = 0;

    let i;
    for (i = 0; i < awardData.length; i++) {
        if (awardData[i].type === award && awardData[i].delegation === item.delegation) {
            count = count + 1
        }
    }

    return count
}

export function getRawScore(item) {
    let score = 0;

    let i;
    for (i = 0; i < awardTypes.length; i++) {
        score = score + (getAwards(item, awardTypes[i].type) * awardTypes[i].value);
    }

    return score
}

export function getPerCapitaScore(item) {
    return (getRawScore(item) / item.delegates).toFixed(5)
}

export function getScopedSlots(committeeData) {
    let scopedSlots = {}

    let i;
    for (i = 0; i < awardTypes.length; i++) {
        let type = awardTypes[i].type

        scopedSlots[type] =
            (item) => (
                <td>
                    {getAwards(item, type)}
                </td>
            )
    }

    scopedSlots['raw'] =
        (item) => (
            <td>
                {getRawScore(item)}
            </td>
        )

    scopedSlots['score'] =
        (item) => (
            <td>
                {getPerCapitaScore(item)}
            </td>
        )

    return scopedSlots
}
