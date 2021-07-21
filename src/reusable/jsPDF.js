import { jsPDF } from "jspdf";
import 'jspdf-autotable'

import committeeData from "src/data/MockData/MockCommittees";
import awardData from "src/data/MockData/MockAwards";

import logo from '../assets/branding/Banner.png'
import border from '../assets/awards/AwardsBorder.png'

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

    let image = new Image();
    image.src = logo;

    let extension = image.src.split(".").pop().toUpperCase()
    doc.addImage(image, extension, 6, .75, 1.5, 1.5);

    doc.setFont(font, "bold")
    doc.setFontSize(24)
    doc.text("PAYMENT INVOICE", 1, 1);

    doc.setFontSize(14)
    doc.text("Conference Name", 1, 1.3);

    doc.setFont(font, "normal")
    doc.setFontSize(12)
    doc.text("Organization", 1, 1.55);

    doc.setFont(font, "italic")
    doc.text("12660 Marcum Ct.,", 1, 1.75);
    doc.text("Fairfax, VA 22033", 1, 1.95);

    doc.setFont(font, "bold")
    doc.text("BILL TO:", 1, 2.45)
    doc.text("INVOICE SUMMARY:", 5.25, 2.45)

    doc.setFont(font, "normal")
    doc.text(item.contact, 1, 2.75)
    doc.text(item.delegation, 1, 2.95)

    doc.setFont(font, "italic")
    doc.text(item.street + ",", 1, 3.15)
    doc.text(item.city + ", " + item.state + " " + item.zipcode, 1, 3.35)

    doc.setFont(font, "normal")
    doc.text("Invoice Number:", 5.25, 2.75)
    doc.text("Invoice Date:", 5.25, 2.95)

    let today = new Date()
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    let invoiceNumber = item.id

    while (invoiceNumber.length < 5) {
        invoiceNumber = "0" + invoiceNumber;
    }

    doc.text("#" + invoiceNumber, 7.5, 2.75, { align: "right" })

    doc.text(today, 7.5, 2.95, { align: "right" })

    doc.setLineWidth(.01);
    doc.line(1, 3.65, 7.5, 3.65)

    doc.setFont(font, "bold")
    doc.setFontSize(24)
    doc.text("INVOICE TOTAL", 1, 4);

    let delFee = item.delegates * 20
    let schoolFee = 0

    let body = [[item.delegates, 'Delegate Fee - ' + item.window + ' Registration Rate', '$20.00', '$' + delFee.toFixed(2)]]

    if (item.type === "Delegation") {
        schoolFee = 30
        body[1] = ['1', 'School Fee - ' + item.window + ' Registration Rate', '$30.00', '$30.00']
    }

    body[body.length] = ['', '', '', '']
    body[body.length] = ['', '', 'Total:', "$" + (delFee + schoolFee).toFixed(2)]

    doc.text("$" + (delFee + schoolFee).toFixed(2), 7.5, 4, { align: "right" });

    doc.line(1, 4.12, 7.5, 4.12)

    doc.autoTable({
        theme: "plain",
        startY: 4.25,
        margin: { left: 1 },
        tableWidth: 6.5,
        styles: {
            font: "times",
            fontSize: 12
        },
        columnStyles: {
            0: {
                halign: 'center',
            },
            1: {
                halign: 'left',
            },
            2: {
                halign: 'right',
            },
            3: {
                halign: 'right',
            }
        },
        head: [['QTY', 'Description', 'Unit Price', 'Amount']],
        body: body,
        didParseCell: function (data) {
            if (data.row.index === 0 && data.cell.section === 'head') {
                if (data.column.index === 0) {
                    data.cell.styles.halign = "center"
                } else if (data.column.index === 1) {
                    data.cell.styles.halign = "left"
                } else {
                    data.cell.styles.halign = "right"
                }
            }

            if (data.row.index === body.length - 1 && data.column.index === 2) {
                data.cell.styles.fontStyle = 'bold';
            }
        },
    })

    let termsAndConditions = [[]]

    if (termsAndConditions[0].length > 0) {
        doc.setFont(font, "bold")
        doc.setFontSize(12)
        doc.text("TERMS AND CONDITIONS:", 1, 6.25)

        doc.autoTable({
            theme: "plain",
            startY: 6.35,
            margin: { left: 1 },
            tableWidth: 6.5,
            styles: {
                font: "times",
                fontSize: 12,
                cellPadding: 0,
            },
            body: termsAndConditions
        })

    }

    image.onload = function () {
        doc.save(item.delegation + " Payment Invoice.pdf");
    }
}

export function receiptPDF(item) {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: [11, 8.5]
    });

    let image = new Image();
    image.src = logo;

    let extension = image.src.split(".").pop().toUpperCase()
    doc.addImage(image, extension, 6, .75, 1.5, 1.5);

    doc.setFont(font, "bold")
    doc.setFontSize(24)
    doc.text("PAYMENT RECEIPT", 1, 1);

    doc.setFontSize(14)
    doc.text("Conference Name", 1, 1.3);

    doc.setFont(font, "normal")
    doc.setFontSize(12)
    doc.text("Organization", 1, 1.55);

    doc.setFont(font, "italic")
    doc.text("12660 Marcum Ct.,", 1, 1.75);
    doc.text("Fairfax, VA 22033", 1, 1.95);

    doc.setFont(font, "bold")
    doc.text("RECEIPT FOR:", 1, 2.45)
    doc.text("INVOICE SUMMARY:", 5.25, 2.45)

    doc.setFont(font, "normal")
    doc.text(item.contact, 1, 2.75)
    doc.text(item.delegation, 1, 2.95)

    doc.setFont(font, "italic")
    doc.text(item.street + ",", 1, 3.15)
    doc.text(item.city + ", " + item.state + " " + item.zipcode, 1, 3.35)

    doc.setFont(font, "normal")
    doc.text("Invoice Number:", 5.25, 2.75)
    doc.text("Invoice Total:", 5.25, 2.95)

    let invoiceNumber = item.id

    while (invoiceNumber.length < 5) {
        invoiceNumber = "0" + invoiceNumber;
    }

    let delFee = item.delegates * 20
    let schoolFee = 0
    let paymentOf = "Conference Abbreviation - \n\t" + item.delegates + " Delegates"

    if (item.type === "Delegation") {
        schoolFee = 30
        paymentOf = paymentOf + " & School Fee"
    }

    paymentOf = paymentOf + " on " + item.window + " Registration Rate"

    doc.text("#" + invoiceNumber, 7.5, 2.75, { align: "right" })
    doc.text("$" + (delFee + schoolFee).toFixed(2), 7.5, 2.95, { align: "right" })

    let paymentInfo = [["Delegation", item.delegation], [], ["Received From", item.contact], [], ["For Payment of", paymentOf], [], ["Received By", "Khai Nguyen | Conference Abbreviation Secretary-General"]]

    doc.setFont(font, "bold")
    doc.setFontSize(12)
    doc.text("TERMS AND CONDITIONS:", 1, 3.85)

    doc.autoTable({
        theme: "plain",
        startY: 3.95,
        margin: { left: 1 },
        tableWidth: 6.5,
        styles: {
            font: "times",
            fontSize: 12,
            cellPadding: 0,
            cellWidth: 'auto',
        },
        body: paymentInfo,
        didParseCell: function (data) {
            if (data.column.index === 0) {
                data.cell.styles.fontStyle = 'bold';
            }
        },
    })

    doc.setFont(font, "bold")
    doc.setFontSize(12)
    doc.text("Thank you for your payment.", 4.25, 6.15, { align: "center" })
    doc.text("We look forward to seeing you at Conference Abbreviation!", 4.25, 6.35, { align: "center" })

    doc.setFont(font, "italic")
    doc.text("Conference Address", 4.25, 6.55, { align: "center" })

    image.onload = function () {
        doc.save(item.delegation + " Payment Receipt.pdf");
    }
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
    for(i = 0; i < committeeData.length; i++) {
        let entry = []

        let positions = committeeData[i].positions.split(",")
        let assignments = committeeData[i].assignments.split(",")

        let j;
        for(j = 0; j < positions.length; j++) {
            if(assignments[j] === item.delegation) {
                entry[0] = committeeData[i].division + " - " + committeeData[i].category + " | " + committeeData[i].type
                entry[1] = committeeData[i].committee

                if(committeeData[i].abbreviation !== "") {
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
                doc.setFont(font, "bold")
                doc.setFontSize(33)
                doc.text("Chantilly High School Model United Nations", 5.5, 1.25, { align: "center" })

                doc.setFont(font, "italic")
                doc.setFontSize(14)
                doc.text("presents the award of", 5.5, 1.65, { align: "center" })

                doc.setFont(font, "bold")
                doc.setFontSize(30)
                doc.text(awardData[i].type, 5.5, 2.2, { align: "center" })

                doc.setFont(font, "italic")
                doc.setFontSize(14)
                doc.text("to", 5.5, 2.6, { align: "center" })

                doc.setFont(font, "bold")
                doc.setFontSize(24)
                doc.text(names[j], 5.5, 3.05, { align: "center" })

                doc.setFont(font, "italic")
                doc.setFontSize(14)
                doc.text("representing", 5.5, 3.45, { align: "center" })

                doc.setFont(font, "bold")
                doc.setFontSize(20)
                doc.text(awardData[i].position, 5.5, 3.9, { align: "center" })

                doc.setFont(font, "italic")
                doc.setFontSize(14)
                doc.text("from", 5.5, 4.3, { align: "center" })

                doc.setFont(font, "bold")
                doc.setFontSize(20)
                doc.text(awardData[i].delegation, 5.5, 4.8, { align: "center" })

                doc.setFont(font, "italic")
                doc.setFontSize(14)
                doc.text("in", 5.5, 5.2, { align: "center" })

                doc.setFont(font, "bold")
                doc.setFontSize(20)
                doc.text(awardData[i].committee, 5.5, 5.6, { align: "center" })

                doc.setLineWidth(.01);
                doc.line(1.5, 6.75, 4.5, 6.75)
                doc.line(6.5, 6.75, 9.5, 6.75)

                doc.setFont(font, "normal")
                doc.setFontSize(14)
                doc.text("Khai Nguyen", 3, 7, { align: "center" })
                doc.text("Khai Nguyen", 8, 7, { align: "center" })

                doc.setFont(font, "italic")
                doc.setFontSize(12)
                doc.text("Conference Abbreviation Secretary-General", 3, 7.25, { align: "center" })
                doc.text("Committee Chair", 8, 7.25, { align: "center" })

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

    let image = new Image();
    image.src = border;

    let extension = image.src.split(".").pop().toUpperCase()

    if (type === "Committee") {
        let positions = item.positions.split(",")
        let assignments = item.assignments.split(",")

        let i;
        for (i = 0; i < positions.length; i++) {
            doc.addImage(image, extension, .15, .15, 10.7, 8.2);

            doc.setFont(font, "bold")
            doc.setFontSize(36)
            doc.text("CERTIFICATE OF PARTICIPATION", 5.5, 1.75, { align: "center" })

            doc.setFont(font, "normal")
            doc.setFontSize(14)
            doc.text("Conference Name recognizes the delegation of", 5.5, 2.25, { align: "center" })

            doc.setFont(font, "bold")
            doc.setFontSize(30)
            doc.text(positions[i], 5.5, 2.85, { align: "center" })

            doc.setFont(font, "normal")
            doc.setFontSize(14)
            doc.text("a delegate of", 5.5, 3.35, { align: "center" })

            doc.setFont(font, "bold")
            doc.setFontSize(24)
            doc.text(assignments[i], 5.5, 3.95, { align: "center" })

            doc.setFont(font, "normal")
            doc.setFontSize(14)
            doc.text("for successfully participating at Conference Abbreviation in the", 5.5, 4.55, { align: "center" })

            doc.setFont(font, "bold")
            doc.setFontSize(20)
            doc.text(item.committee, 5.5, 5.15, { align: "center" })

            doc.setFont(font, "italic")
            doc.setFontSize(12)
            doc.text("01/01/2012 - 01/03/2012", 5.5, 5.75, { align: "center" })

            doc.setLineWidth(.01);
            doc.line(1.5, 6.75, 4.5, 6.75)
            doc.line(6.5, 6.75, 9.5, 6.75)

            doc.setFont(font, "normal")
            doc.setFontSize(14)
            doc.text("Khai Nguyen", 3, 7, { align: "center" })
            doc.text("Khai Nguyen", 8, 7, { align: "center" })

            doc.setFont(font, "italic")
            doc.setFontSize(12)
            doc.text("Conference Abbreviation Secretary-General", 3, 7.25, { align: "center" })
            doc.text("Committee Chair", 8, 7.25, { align: "center" })

            if (i !== positions.length - 1) {
                doc.addPage();
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
                    doc.addImage(image, extension, .15, .15, 10.7, 8.2);

                    doc.setFont(font, "bold")
                    doc.setFontSize(36)
                    doc.text("CERTIFICATE OF PARTICIPATION", 5.5, 1.75, { align: "center" })

                    doc.setFont(font, "normal")
                    doc.setFontSize(14)
                    doc.text("Conference Name recognizes the delegation of", 5.5, 2.25, { align: "center" })

                    doc.setFont(font, "bold")
                    doc.setFontSize(30)
                    doc.text(positions[j], 5.5, 2.85, { align: "center" })

                    doc.setFont(font, "normal")
                    doc.setFontSize(14)
                    doc.text("a delegate of", 5.5, 3.35, { align: "center" })

                    doc.setFont(font, "bold")
                    doc.setFontSize(24)
                    doc.text(assignments[j], 5.5, 3.95, { align: "center" })

                    doc.setFont(font, "normal")
                    doc.setFontSize(14)
                    doc.text("for successfully participating at Conference Abbreviation in the", 5.5, 4.55, { align: "center" })

                    doc.setFont(font, "bold")
                    doc.setFontSize(20)
                    doc.text(committeeData[i].committee, 5.5, 5.15, { align: "center" })

                    doc.setFont(font, "italic")
                    doc.setFontSize(12)
                    doc.text("01/01/2012 - 01/03/2012", 5.5, 5.75, { align: "center" })

                    doc.setLineWidth(.01);
                    doc.line(1.5, 6.75, 4.5, 6.75)
                    doc.line(6.5, 6.75, 9.5, 6.75)

                    doc.setFont(font, "normal")
                    doc.setFontSize(14)
                    doc.text("Khai Nguyen", 3, 7, { align: "center" })
                    doc.text("Khai Nguyen", 8, 7, { align: "center" })

                    doc.setFont(font, "italic")
                    doc.setFontSize(12)
                    doc.text("Conference Abbreviation Secretary-General", 3, 7.25, { align: "center" })
                    doc.text("Committee Chair", 8, 7.25, { align: "center" })

                    doc.addPage()
                }
            }
        }

        let pageCount = doc.internal.getNumberOfPages();
        doc.deletePage(pageCount)

        doc.save(item.delegation + " Awards.pdf");
    }
}