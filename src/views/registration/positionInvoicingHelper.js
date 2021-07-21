import registrationData from '../../data/MockData/MockRegistration'
import committeeData from '../../data/MockData/MockCommittees'
import allotmentData from '../../data/MockData/MockAllotments'

export function getStatus(item) {
  let assignedPositions = 0
  let allottedPositions = 0

  let i;
  for (i = 0; i < registrationData.length; i++) {
    if (registrationData[i].delegation === item.delegation) {
      let j;
      for (j = 0; j < committeeData.length; j++) {
        let assignments = committeeData[j].assignments.split(",")

        let k;
        for (k = 0; k < assignments.length; k++) {
          if (assignments[k] === item.delegation) {
            assignedPositions = assignedPositions + 1
          }
        }

        let l;
        for (l = 0; l < allotmentData.length; l++) {
          if (allotmentData[l].delegation === item.delegation) {
            allottedPositions = allottedPositions + allotmentData[l].allotments[committeeData[j].committee]
          }
        }
      }
    }

  }

  let status = ""

  if (assignedPositions - allottedPositions === 0) {
    status = "Balanced"
  } else {
    status = "Unbalanced"
  }

  return status
}

