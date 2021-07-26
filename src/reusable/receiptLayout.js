import logo from '../assets/branding/Banner.png'

const font = "times"

export function receiptLayout(doc, item) {
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

    let invoiceNumber = !!item.id ? item.id : item.number

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
    paymentOf = !!item.description ? item.description : paymentOf

    let total = !!item.total ? + item.total : + delFee + schoolFee

    doc.text("#" + invoiceNumber, 7.5, 2.75, { align: "right" })
    doc.text("$" + total.toFixed(2), 7.5, 2.95, { align: "right" })

    let paymentInfo = [["Delegation", item.delegation], [], ["Received From", item.contact], [], ["For Payment of", paymentOf], [], ["Received By", "Khai Nguyen | Conference Abbreviation Secretary-General"]]
    paymentInfo[paymentInfo.length] = ["", ""]
    paymentInfo[paymentInfo.length] = ["Thank you for your payment.", ""]
    paymentInfo[paymentInfo.length] = ["We look forward to seeing you at Conference Abbreviation!", ""]
    paymentInfo[paymentInfo.length] = ["Conference Address", ""]
    paymentInfo[paymentInfo.length] = ["", ""]
    paymentInfo[paymentInfo.length] = [!!item.note ? "SPECIAL NOTES:" : "", ""]
    paymentInfo[paymentInfo.length] = [!!item.note ? item.note : "", ""]

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

            if (data.row.index > 7 && data.row.index < 12) {
                data.cell.colSpan = 2;
                data.cell.styles.halign = "center"
                data.cell.styles.fontStyle = 'bold';
            }

            if (data.row.index === paymentInfo.length - 4) {
                data.cell.styles.fontStyle = 'italic';
            }

            if (data.row.index === paymentInfo.length - 1) {
                data.cell.styles.fontStyle = 'normal';
            }
        },
    })
}