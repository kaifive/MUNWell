import logo from '../assets/branding/Logo.png'

const font = "times"

export function receiptLayout(doc, item, settings) {
    let image = new Image();
    image.src = logo;

    let extension = image.src.split(".").pop().toUpperCase()
    doc.addImage(image, extension, 6, .75, 1.5, 1.5);

    doc.setFont(font, "bold")
    doc.setFontSize(24)
    doc.text("PAYMENT RECEIPT", 1, 1);

    let fontSize = 14;

    while ((doc.getStringUnitWidth(settings.name) * fontSize / 72) >= 4.75) {
        fontSize--;
    }

    doc.setFontSize(fontSize)
    doc.text(settings.name, 1, 1.3);

    doc.setFont(font, "normal")
    doc.setFontSize(12)
    doc.text(settings.organization, 1, 1.55);

    doc.setFont(font, "italic")
    doc.text(settings.invoiceStreet + ",", 1, 1.75);
    doc.text(settings.invoiceCity + ", " + settings.invoiceState + " " + settings.invoiceZipcode, 1, 1.95);

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
    doc.text("Invoice Total:", 5.25, 2.75)

    let multiplier = 0;
    let schoolFee = 0;

    if (item.window === "Early") {
        multiplier = Number(settings.earlydelfee)
        schoolFee = Number(settings.earlyschoolfee)
    } else if (item.window === "Regular") {
        multiplier = Number(settings.regdelfee)
        schoolFee = Number(settings.regschoolfee)
    } else if (item.window === "Late") {
        multiplier = Number(settings.latedelfee)
        schoolFee = Number(settings.lateschoolfee)
    }

    let delFee = item.delegates * multiplier

    let paymentOf = "Conference Abbreviation - \n\t" + item.delegates + " Delegates"

    if (item.type === "Delegation") {
        paymentOf = paymentOf + " & School Fee"
    } else {
        schoolFee = 0
    }

    paymentOf = paymentOf + " on " + item.window + " Registration Rate"
    paymentOf = !!item.description ? item.description : paymentOf

    let total = !!item.total ? + item.total : + delFee + schoolFee

    doc.text("$" + total.toFixed(2), 7.5, 2.75, { align: "right" })

    let paymentInfo = [["Delegation", item.delegation], [], ["Received From", item.contact], [], ["For Payment of", paymentOf], [], ["Received By", settings.secgen + " | " + settings.abbreviation + " Secretary-General"]]
    paymentInfo[paymentInfo.length] = ["", ""]
    paymentInfo[paymentInfo.length] = ["Thank you for your payment.", ""]
    paymentInfo[paymentInfo.length] = ["We look forward to seeing you at " + settings.abbreviation + "!", ""]
    paymentInfo[paymentInfo.length] = [settings.street + ", " + settings.city + ", " + settings.state + " " + settings.zipcode, ""]
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