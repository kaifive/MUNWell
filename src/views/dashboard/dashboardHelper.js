
export function countDelegations(registrationData) {
    let count = 0;

    let i;
    for (i = 0; i < registrationData.length; i++) {
        if (registrationData[i].type !== 'Independent') {
            count = count + 1
        }
    }
    return count
}

export function countTotalDelegates(registrationData) {
    let count = 0;

    let i;
    for (i = 0; i < registrationData.length; i++) {
        count = count + Number(registrationData[i].delegates)
    }
    return count
}

export function getIncome(registrationData, settings) {
    if (settings !== undefined) {
        let count = 0;

        let i;
        for (i = 0; i < registrationData.length; i++) {
            let multiplier = 0;
            let schoolfee = 0;

            if (registrationData[i].window === "Early") {
                multiplier = Number(settings.earlydelfee)
                schoolfee = Number(settings.earlyschoolfee)
            } else if (registrationData[i].window === "Regular") {
                multiplier = Number(settings.regdelfee)
                schoolfee = Number(settings.regschoolfee)
            } else if (registrationData[i].window === "Late") {
                multiplier = Number(settings.latedelfee)
                schoolfee = Number(settings.lateschoolfee)
            }

            count = count + (Number(registrationData[i].delegates) * multiplier)

            if (registrationData[i].type === 'Delegation') {
                count = count + schoolfee
            }
        }

        count = count.toFixed(2)

        return count
    } else {
        return 0.00
    }
}

export function getCommitteeList(committeeData) {
    let committeeList = []

    let i;
    for (i = 0; i < committeeData.length; i++) {
        if (committeeData[i].abbreviation === '') {
            committeeList[i] = committeeData[i].committee
        } else {
            committeeList[i] = committeeData[i].abbreviation
        }
    }
    return committeeList
}

export function getCommitteeValues(field, committeeData) {
    let ans = []

    let i;
    for (i = 0; i < committeeData.length; i++) {
        let temp;
        if (field === 'total') {
            temp = committeeData[i].positions.split(",")
        } else if (field === 'assigned') {
            temp = committeeData[i].assignments.split(",")
        }

        let count = 0

        let j;
        for (j = 0; j < temp.length; j++) {
            if (temp[j] !== '') {
                count = count + 1
            }
        }

        ans[i] = count;
    }
    return ans
}

export function calculateConferenceCapacity(committeeData) {
    let assigned = getCommitteeValues('assigned', committeeData).reduce(function (a, b) { return a + b; }, 0)
    let total = getCommitteeValues('total', committeeData).reduce(function (a, b) { return a + b; }, 0)

    return isNaN(Math.round((assigned / total) * 100)) ? 0 : Math.round((assigned / total) * 100)
}

export function calculatePaymentCompletion(registrationData) {
    let count = 0;

    let i;
    for (i = 0; i < registrationData.length; i++) {
        if (registrationData[i].status === 'Paid') {
            count = count + 1
        }
    }

    return isNaN(Math.round((count / registrationData.length) * 100)) ? 0 : Math.round((count / registrationData.length) * 100)
}

export function calculateDelegationBalance(registrationData, committeeData, allotmentData) {
    let balanced = 0

    let i;
    for (i = 0; i < registrationData.length; i++) {
        let assignedPositions = 0
        let allottedPositions = 0

        let j;
        for (j = 0; j < committeeData.length; j++) {
            let assignments = committeeData[j].assignments.split(",")

            let k;
            for (k = 0; k < assignments.length; k++) {
                if (assignments[k] === registrationData[i].delegation) {
                    assignedPositions = assignedPositions + 1
                }
            }
        }

        let l;
        for (l = 0; l < allotmentData.length; l++) {
            if (allotmentData[l].delegationId === registrationData[i]._id) {
                let allotments = allotmentData[l].allotments.split(",")

                let m;
                for (m = 0; m < allotments.length; m++) {
                    let arr = allotments[m].split(":")

                    if (arr[1] !== undefined) {
                        allottedPositions = allottedPositions + Number(arr[1])
                    }
                }
            }
        }
        
        if (assignedPositions - allottedPositions === 0) {
            balanced = balanced + 1
        }
    }

    return isNaN(Math.round((balanced / registrationData.length) * 100)) ? 0 : Math.round((balanced / registrationData.length) * 100)
}

export function countCommitteeCategory(category, committeeData) {
    let count = 0;

    let i;
    for (i = 0; i < committeeData.length; i++) {
        if (committeeData[i].category === category) {
            count = count + 1
        }
    }

    return count
}

export function countRegistrationTimeWindow(window, registrationData) {
    let count = 0;

    let i;
    for (i = 0; i < registrationData.length; i++) {
        if (registrationData[i].window === window) {
            count = count + 1
        }
    }

    return count
}

export function countDelegatesByCategory(category, committeeData) {
    let count = 0;

    let i;
    for (i = 0; i < committeeData.length; i++) {
        if (committeeData[i].category === category) {
            let temp = committeeData[i].assignments.split(",")

            let j;
            for (j = 0; j < temp.length; j++) {
                if (temp[j] !== '') {
                    count = count + 1
                }
            }
        }
    }

    return count
}

export function countDelegatesByType(type, committeeData, registrationData) {
    let count = 0;

    let i;
    for (i = 0; i < committeeData.length; i++) {
        let temp = committeeData[i].assignments.split(",")

        let j;
        for (j = 0; j < temp.length; j++) {
            let k;
            for (k = 0; k < registrationData.length; k++) {
                if (registrationData[k].delegation === temp[j]) {
                    if (registrationData[k].type === type) {
                        count = count + 1
                    }
                }
            }
        }
    }

    return count
}
