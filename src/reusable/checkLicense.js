import axios from 'axios'

export async function checkLicense(user) {
    let response;
    let data = []

    try {
        response = await axios.get('/api/get/license');

        let i;
        for (i = 0; i < response.data.length; i++) {
            if (response.data[i].user === user) {
                data.push(response.data[i])
            }
        }

        for (i = 0; i < data.length; i++) {
            if (getValidity(data[i])) {
                if (data[i].license.includes("Platinum")) {
                    return { maxCommittees: Infinity, maxDelegations: Infinity, maxIndependents: Infinity }
                } else if (data[i].license.includes("Gold")) {
                    return { maxCommittees: 10, maxDelegations: 15, maxIndependents: 50 }
                } else if (data[i].license.includes("Silver")) {
                    return { maxCommittees: 5, maxDelegations: 5, maxIndependents: 30 }
                }
            }
        }
    } catch (e) {
        throw new Error(e.message)
    }

    return 0
}

function getValidity(item) {
    var dateFrom = item.start;
    var dateTo = item.end;

    var dateCheck = new Date();

    var d1 = dateFrom.split("/");
    var d2 = dateTo.split("/");

    var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
    var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);

    if (dateCheck > from && dateCheck < to) {
        return true
    }

    return false
}