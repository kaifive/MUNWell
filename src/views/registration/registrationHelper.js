import registrationData from '../../data/MockData/MockRegistration'

export function exportTable() {
    let data = registrationData

    return data
}

export function getEmailList(registrationData) {
    let emailList = ""
    let i;
    for (i = 0; i < registrationData.length; i++) {
        emailList = emailList + registrationData[i].email + ",\n"
    }

    emailList = emailList.substring(0, emailList.length - 2)

    return emailList
}
