import { jsPDF } from "jspdf";
import 'jspdf-autotable'

import committeeData from "src/data/MockData/MockCommittees";
import awardData from "src/data/MockData/MockAwards";

import logo from '../assets/branding/Logo.png'

import { participationLayout1, committeeLayout1 } from "./awardLayouts";
import { receiptLayout } from "./receiptLayout";
import { invoiceLayout } from "./invoiceLayout";

const font = "times"

export function placardSetPDF(committee) {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [8.5, 11]
    });

    let pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    let pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    let positions = committeeData[0].positions.split(",")

    let i;
    for (i = 0; i < positions.length; i++) {
        doc.setFont(font, "bold")
        let fontSize = 80;

        let j;
        for (j = positions[i].length; j > 20; j--) {
            fontSize = fontSize - 10
        }

        if (fontSize < 0) {
            fontSize = 24
        }

        doc.setFontSize(fontSize)
        doc.text(positions[i].toUpperCase(), pageWidth / 2, pageHeight / 2 + 2.5, { align: "center" })

        doc.setFontSize(fontSize * -1)
        doc.text(positions[i].toUpperCase(), pageWidth / 2, pageHeight / 2 - 2.5, { align: "center" })

        doc.setFontSize(14)
        doc.text(committee, pageWidth / 2, pageHeight / 2 + 2.8, { align: "center" })

        doc.setFontSize(-14)
        doc.text(committee, pageWidth / 2, pageHeight / 2 - 2.8, { align: "center" })


        doc.setFont(font, "normal")
        doc.setFontSize(10)
        doc.text("Conference Name", pageWidth / 2, pageHeight / 2 + 3.9, { align: "center" })

        doc.setFontSize(-10)
        doc.text("Conference Name", pageWidth / 2, pageHeight / 2 - 3.9, { align: "center" })


        if (i !== positions.length - 1) {
            doc.addPage();
        }
    }

    doc.save(committee + " Placard Set.pdf");
}

export function attendanceSheetPDF(committee) {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: [11, 8.5]
    });

    doc.setFont(font, "bold")
    doc.setFontSize(12)
    doc.text(committee + " Attendance Sheet", 1, 1);

    let positions = committeeData[0].positions.split(",")
    let assignments = committeeData[0].assignments.split(",")

    let body = []

    let i;
    for (i = 0; i < positions.length; i++) {
        let temp = ["", ""]

        temp[0] = positions[i]
        temp[1] = assignments[i]

        body[i] = temp
    }

    doc.autoTable({
        theme: "grid",
        startY: 1.25,
        margin: { left: 1 },
        tableWidth: 6.5,
        styles: {
            font: "times",
            fontSize: 12,
            lineColor: [0, 0, 0],
            lineWidth: .01,
        },
        head: [['Position', 'Assignment', 'Attendance Status']],
        body: body,
        didParseCell: function (data) {
            if (data.cell.section === 'head') {
                data.cell.styles.fillColor = '#ffffff'
                data.cell.styles.textColor = '#000000'
            }
        },
    })

    doc.save(committee + " Attendance Sheet.pdf");
}

export function invoicePDF(item) {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: [11, 8.5]
    });

    invoiceLayout(doc, item)

    doc.save(item.delegation + " Payment Invoice.pdf");
}

export function receiptPDF(item) {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: [11, 8.5]
    });

    receiptLayout(doc, item)
    doc.save(item.delegation + " Payment Receipt.pdf");
}

export function positionPDF(item) {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [11, 8.5]
    });

    let image = new Image();
    image.src = logo;

    let extension = image.src.split(".").pop().toUpperCase()
    doc.addImage(image, extension, .75, .75, 1.5, 1.5);

    doc.setFont(font, "bold")
    doc.setFontSize(24)
    doc.text("POSITION INVOICE", 2.4, 1);

    doc.setFontSize(14)
    doc.text(item.delegation, 2.4, 1.3);

    doc.setFont(font, "normal")
    doc.setFontSize(12)
    doc.text(item.contact, 2.4, 1.55);

    doc.setFont(font, "italic")
    doc.text(item.street + ",", 2.4, 1.75);
    doc.text(item.city + ", " + item.state + " " + item.zipcode, 2.4, 1.95);

    let body = []

    let i;
    for (i = 0; i < committeeData.length; i++) {
        let entry = []

        let positions = committeeData[i].positions.split(",")
        let assignments = committeeData[i].assignments.split(",")

        let j;
        for (j = 0; j < positions.length; j++) {
            if (assignments[j] === item.delegation) {
                entry[0] = committeeData[i].division + " - " + committeeData[i].category + " | " + committeeData[i].type
                entry[1] = committeeData[i].committee

                if (committeeData[i].abbreviation !== "") {
                    entry[1] = committeeData[i].committee + " (" + committeeData[i].abbreviation + ")"
                }

                entry[2] = positions[j]

                body.push(entry)
            }
        }
    }

    doc.autoTable({
        theme: "grid",
        startY: 2.4,
        margin: { left: .75 },
        tableWidth: 9.5,
        styles: {
            font: "times",
            fontSize: 12,
            lineColor: [0, 0, 0],
            lineWidth: .01,
        },
        head: [['Committee Information', 'Committee Name', 'Position Assignment']],
        body: body,
        didParseCell: function (data) {
            if (data.cell.section === 'head') {
                data.cell.styles.fillColor = '#ffffff'
                data.cell.styles.textColor = '#000000'
            }
        },
    })

    image.onload = function () {
        doc.save(item.delegation + " Position Invoice.pdf");
    }

}

export function committeeAwardsPDFLayout1(item) {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [11, 8.5]
    });

    let award = false;

    let i;
    for (i = 0; i < awardData.length; i++) {
        if (awardData[i].committee === item.committee) {
            let names = [awardData[i].delegate1, awardData[i].delegate2]
            let nameCount = 2;

            if (awardData[i].delegate2 === "") {
                nameCount = nameCount - 1
            }

            let j;
            for (j = 0; j < nameCount; j++) {
                award = true;

                committeeLayout1(doc, awardData[i].type, awardData[i].committee, awardData[i].position, names[j], awardData[i].delegation)

                doc.addPage()
            }
        }
    }

    let pageCount = doc.internal.getNumberOfPages();
    doc.deletePage(pageCount)

    if (award) {
        doc.save(item.committee + " Awards.pdf");
    } else {
        alert("No awards submitted for " + item.committee)
    }
}

export function participationAwardsPDFLayout1(item, type) {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [11, 8.5]
    });

    if (type === "Committee") {
        let positions = item.positions.split(",")
        let assignments = item.assignments.split(",")

        let i;
        for (i = 0; i < positions.length; i++) {
            if (assignments[i] !== "") {
                participationLayout1(doc, item.committee, positions[i], assignments[i])

                if (i !== positions.length - 1) {
                    doc.addPage();
                }
            }
        }

        doc.save(item.committee + " Awards.pdf");
    } else if (type === "Delegation") {
        let i;
        for (i = 0; i < committeeData.length; i++) {
            let positions = committeeData[i].positions.split(",")
            let assignments = committeeData[i].assignments.split(",")

            let j;
            for (j = 0; j < assignments.length; j++) {
                if (assignments[j] === item.delegation) {
                    participationLayout1(doc, committeeData[i].committee, positions[j], assignments[j])

                    doc.addPage();
                }
            }
        }

        let pageCount = doc.internal.getNumberOfPages();
        doc.deletePage(pageCount)

        doc.save(item.delegation + " Awards.pdf");
    }
}

export function customCommitteeAwardLayout1(item) {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [11, 8.5]
    });

    committeeLayout1(doc, item.type, item.committee, item.position, item.delegate, item.delegation)

    doc.save(item.delegate + " Custom Award.pdf");
}

export function customParticipationAwardLayout1(item) {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [11, 8.5]
    });

    participationLayout1(doc, item.committee, item.position, item.delegation)

    doc.save(item.delegate + " Custom Award.pdf");
}

export function customPaymentReceipt(item) {




}