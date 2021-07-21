import committeeData from '../../data/MockData/MockCommittees'

export function exportTable() {
    return committeeData
}

export function count(string) {
    let count = 0
    let temp = string.split(",")

    let i
    for (i = 0; i < temp.length; i++) {
        if (temp[i] !== '') {
            count = count + 1
        }
    }

    return count
}
