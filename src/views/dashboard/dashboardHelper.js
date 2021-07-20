import registrationData from '../../data/MockData/MockRegistration'
import committeeData from '../../data/MockData/MockCommittees'
import allotmentData from '../../data/MockData/MockAllotments'

export function countCommittees() {
    let count = 0;

    let i;
    for (i = 0; i < committeeData.length; i++) {
        if (committeeData[i].committee !== '') {
            count = count + 1
        }
    }
    return count
}

export function countDelegations() {
    let count = 0;

    let i;
    for (i = 0; i < registrationData.length; i++) {
        if (registrationData[i].type !== 'Independent') {
            count = count + 1
        }
    }
    return count
}

export function countTotalDelegates() {
    let count = 0;

    let i;
    for (i = 0; i < registrationData.length; i++) {
        count = count + Number(registrationData[i].delegates)
    }
    return count
}

export function getIncome() {
    let count = 0;

    let i;
    for (i = 0; i < registrationData.length; i++) {
        count = count + (Number(registrationData[i].delegates) * 20)

        if (registrationData[i].type === 'Delegation') {
            count = count + 30
        }
    }

    count = count.toFixed(2)

    return count
}

export function getCommitteeList() {
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

export function getCommitteeValues(field) {
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

export function calculateConferenceCapacity() {
    let assigned = getCommitteeValues('assigned').reduce(function (a, b) { return a + b; }, 0)
    let total = getCommitteeValues('total').reduce(function (a, b) { return a + b; }, 0)

    return Math.round((assigned / total) * 100)
}

export function calculatePaymentCompletion() {
    let count = 0;

    let i;
    for (i = 0; i < registrationData.length; i++) {
        if (registrationData[i].status === 'Paid') {
            count = count + 1
        }
    }

    return Math.round((count / registrationData.length) * 100)
}

export function calculateDelegationBalance() {
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

            let l;
            for (l = 0; l < allotmentData.length; l++) {
                if (allotmentData[l].delegation === registrationData[i].delegation) {
                    allottedPositions = allottedPositions + allotmentData[l].allotments[committeeData[j].committee]
                }
            }
        }

        if (assignedPositions - allottedPositions === 0) {
            balanced = balanced + 1
        }
    }

    return Math.round((balanced / registrationData.length) * 100)
}

export function countCommitteeCategory(category) {
    let count = 0;

    let i;
    for (i = 0; i < committeeData.length; i++) {
        if (committeeData[i].category === category) {
            count = count + 1
        }
    }

    return count
}

export function countRegistrationTimeWindow(window) {
    let count = 0;

    let i;
    for (i = 0; i < registrationData.length; i++) {
        if (registrationData[i].window === window) {
            count = count + 1
        }
    }

    return count
}

export function countDelegatesByCategory(category) {
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

export function countDelegatesByType(type) {
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