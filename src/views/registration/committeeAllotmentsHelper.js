import allotmentData from '../../data/MockData/MockAllotments'
import registrationData from '../../data/MockData/MockRegistration'
import committeeData from '../../data/MockData/MockCommittees'

export function exportTable() {
    let data = []

    let i;
    for (i = 0; i < registrationData.length; i++) {
        let entry = {
            "delegation": registrationData[i]["delegation"]
        }

        let j;
        for (j = 0; j < committeeData.length; j++) {
            let name;
            if (committeeData[j].abbreviation === '') {
                name = committeeData[j].committee
            } else {
                name = committeeData[j].abbreviation
            }

            entry[name] = getAssigned(registrationData[i], committeeData[j].committee)
        }

        data.push(entry)
    }

    return data
}

function getAssigned(item, committee) {
    let i;
    for (i = 0; i < allotmentData.length; i++) {
        if (allotmentData[i].delegation === item.delegation) {
            return allotmentData[i].allotments[committee]
        }
    }

    return 0
}
