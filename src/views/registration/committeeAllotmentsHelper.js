export function exportTable(registrationData, committeeData, allotmentData) {
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

            entry[name] = getAssigned(registrationData[i], committeeData[j].committee, allotmentData)
        }

        data.push(entry)
    }

    return data
}

function getAssigned(item, committee, allotmentData) {
    let i;
    for (i = 0; i < allotmentData.length; i++) {
        if (allotmentData[i].delegationId === item._id) {
            let allotments = allotmentData[i].allotments.split(",")

            let j;
            for(j = 0; j < allotments.length; j++) {
                let arr = allotments[j].split(":")

                if(arr[0] === committee) {
                    return arr[1]
                }
            }
        }
    }

    return 0
}
