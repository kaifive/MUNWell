export function exportTable(committeeData) {
    let data = committeeData

    let i;
    for (i = 0; i < data.length; i++) {
        delete data[i]._id
        delete data[i].id
        delete data[i].user
        delete data[i].__v
    }

    return data
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
