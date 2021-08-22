export function exportTable(registrationData) {
    let data = registrationData

    let i;
    for (i = 0; i < data.length; i++) {
        delete data[i]._id
        delete data[i].id
        delete data[i].user
        delete data[i].__v
    }

    return data
}

export function getEmailList(registrationData) {
    let emailList = ""
    let i;
    for (i = 0; i < registrationData.length; i++) {
        if(registrationData[i].email !== "") {
            emailList = emailList + registrationData[i].email + ",\n"
        }
    }

    emailList = emailList.substring(0, emailList.length - 2)

    return emailList
}
