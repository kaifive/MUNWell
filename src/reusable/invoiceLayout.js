import defaultLogo from '../assets/branding/Logo.png'

const font = "times"

function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

export function invoiceLayout(doc, item, settings) {
    let image = new Image();

    try {
        var convertedPath = settings.logo

        toDataUrl(settings.logo, function (myBase64) {
            convertedPath = myBase64
        });

        image.src = convertedPath;

        let extension = image.src.split(".").pop().toUpperCase()
        doc.addImage(image, extension, 6, .75, 1.5, 1.5);
    } catch (error) {
        image.src = defaultLogo;

        let extension = image.src.split(".").pop().toUpperCase()
        doc.addImage(image, extension, 6, .75, 1.5, 1.5);
    }

    doc.setFont(font, "bold")
    doc.setFontSize(24)
    doc.text("PAYMENT INVOICE", 1, 1);

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
    doc.text("BILL TO:", 1, 2.45)
    doc.text("INVOICE SUMMARY:", 5.25, 2.45)

    doc.setFont(font, "normal")
    doc.text(item.contact, 1, 2.75)
    doc.text(item.delegation, 1, 2.95)

    doc.setFont(font, "italic")
    doc.text(item.street + ",", 1, 3.15)
    doc.text(item.city + ", " + item.state + " " + item.zipcode, 1, 3.35)

    doc.setFont(font, "normal")
    doc.text("Invoice Date:", 5.25, 2.75)

    let today = new Date()
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    doc.text(today, 7.5, 2.75, { align: "right" })

    doc.setLineWidth(.01);
    doc.line(1, 3.65, 7.5, 3.65)

    doc.setFont(font, "bold")
    doc.setFontSize(24)
    doc.text("INVOICE TOTAL", 1, 4);

    let multiplier = 0;
    let schoolFee = 0;

    if (settings !== undefined) {
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
    }

    let delFee = item.delegates * multiplier

    let total = !!item.total ? + item.total : + delFee + schoolFee

    doc.text("$" + total.toFixed(2), 7.5, 4, { align: "right" });

    doc.line(1, 4.12, 7.5, 4.12)

    let body = []
    if (item.line1 === undefined) {
        body = [[item.delegates, 'Delegate Fee - ' + item.window + ' Registration Rate', '$' + multiplier.toFixed(2), '$' + delFee.toFixed(2)]]

        if (item.type === "Delegation") {
            body[1] = ['1', 'School Fee - ' + item.window + ' Registration Rate', '$' + schoolFee.toFixed(2), '$' + schoolFee.toFixed(2)]
        }
    } else {
        let lines = [item.line1, item.line2, item.line3, item.line4, item.line5]

        let i;
        for (i = 0; i < lines.length; i++) {
            if (lines[i].qty !== "") {
                body[body.length] = [lines[i].qty, lines[i].description, "$" + (+ lines[i].price).toFixed(2), "$" + (+ lines[i].qty * lines[i].price).toFixed(2)]
            }
        }
    }

    let termsAndConditions = settings.terms

    body[body.length] = ['', '', '', '']
    body[body.length] = ['', '', 'Total:', "$" + total.toFixed(2)]
    body[body.length] = ['', '', '', '']
    body[body.length] = [(termsAndConditions.length > 0) ? "TERMS & CONDITIONS:" : '', '', '', '']
    body[body.length] = [(termsAndConditions.length > 0) ? termsAndConditions : '', '', '', '']
    body[body.length] = ['', '', '', '']
    body[body.length] = [!!item.note ? "SPECIAL NOTES:" : "", ""]
    body[body.length] = [!!item.note ? item.note : "", ""]

    doc.autoTable({
        theme: "plain",
        startY: 4.25,
        margin: { left: 1 },
        tableWidth: 6.5,
        styles: {
            font: "times",
            fontSize: 12,
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

            if ((data.row.index === body.length - 7 && data.column.index === 2) || (data.row.index === body.length - 5) || (data.row.index === body.length - 2)) {
                data.cell.styles.fontStyle = 'bold';
            }

            if (data.row.index > body.length - 6) {
                data.cell.colSpan = 4
                data.cell.styles.halign = "left"
                data.cell.styles.cellPadding = 0
            }
        },
    })
}