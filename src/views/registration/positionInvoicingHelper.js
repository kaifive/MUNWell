import { positionPDF } from 'src/reusable/jsPDF'

export function getStatus(item, committeeData, allotmentData) {
  let assignedPositions = 0
  let allottedPositions = 0

  if (committeeData === undefined || allotmentData === undefined) {
    return "Unbalanced"
  }

  let i;
  for (i = 0; i < committeeData.length; i++) {
    let assignments = committeeData[i].assignments.split(",")

    let j;
    for (j = 0; j < assignments.length; j++) {
      if (assignments[j] === item.delegation) {
        assignedPositions = assignedPositions + 1
      }
    }
  }

  let l;
  for (l = 0; l < allotmentData.length; l++) {
    if (allotmentData[l].delegationId === item._id) {
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

  let status = ""

  if (assignedPositions - allottedPositions === 0) {
    status = 'Balanced'
  } else {
    status = 'Unbalanced'
  }

  return status
}


export function downloadPositionInvoice(item, committeeData, allotmentData, settings) {
  if (getStatus(item, committeeData, allotmentData) === "Unbalanced") {
    alert(item.delegation + " is unbalanced. Balance the delegation before downloading position invoices.")
    return
  }

  positionPDF(item, committeeData, settings)
}