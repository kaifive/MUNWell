import border from '../assets/awards/AwardsBorder.png'

const font = "times"

export function participationLayout1(doc, item, settings) {
    let image = new Image();
    image.src = border;

    let extension = image.src.split(".").pop().toUpperCase()
    doc.addImage(image, extension, .15, .15, 10.7, 8.2);

    doc.setFont(font, "bold")
    doc.setFontSize(36)
    doc.text("CERTIFICATE OF PARTICIPATION", 5.5, 1.75, { align: "center" })

    doc.setFont(font, "normal")
    doc.setFontSize(14)
    doc.text(settings.name + " recognizes the delegation of", 5.5, 2.25, { align: "center" })

    doc.setFont(font, "bold")
    doc.setFontSize(30)
    doc.text(item.position, 5.5, 2.85, { align: "center" })

    doc.setFont(font, "normal")
    doc.setFontSize(14)
    doc.text("a delegate of", 5.5, 3.35, { align: "center" })

    doc.setFont(font, "bold")
    doc.setFontSize(24)
    doc.text(item.delegation, 5.5, 3.95, { align: "center" })

    doc.setFont(font, "normal")
    doc.setFontSize(14)
    doc.text("for successfully participating at " + settings.abbreviation + " in the", 5.5, 4.55, { align: "center" })

    doc.setFont(font, "bold")
    doc.setFontSize(20)
    doc.text(item.committee, 5.5, 5.15, { align: "center" })

    doc.setFont(font, "italic")
    doc.setFontSize(12)

    let startDate = settings.start
    let endDate = settings.end

    let temp = startDate.split("-")
    startDate = temp[1] + "/" + temp[2] + "/" + temp[0]

    temp = endDate.split("-")
    endDate = temp[1] + "/" + temp[2] + "/" + temp[0]

    doc.text(startDate + " - " + endDate, 5.5, 5.75, { align: "center" })

    doc.setLineWidth(.01);
    doc.line(1.5, 6.75, 4.5, 6.75)
    doc.line(6.5, 6.75, 9.5, 6.75)

    doc.setFont(font, "normal")
    doc.setFontSize(14)
    doc.text(settings.secgen, 3, 7, { align: "center" })
    doc.text(item.chair, 8, 7, { align: "center" })

    doc.setFont(font, "italic")
    doc.setFontSize(12)
    doc.text(settings.abbreviation + " Secretary-General", 3, 7.25, { align: "center" })
    doc.text("Committee Chair", 8, 7.25, { align: "center" })
}

export function committeeLayout1(doc, committee, item, settings) {
    doc.setFont(font, "bold")

    let fontSize = 33;

    while ((doc.getStringUnitWidth(settings.name) * fontSize / 72) >= 9) {
        fontSize--;
    }

    doc.setFontSize(fontSize)
    doc.text(settings.name, 5.5, 1.25, { align: "center" })

    doc.setFont(font, "italic")
    doc.setFontSize(14)
    doc.text("presents the award of", 5.5, 1.65, { align: "center" })

    doc.setFont(font, "bold")
    doc.setFontSize(30)
    doc.text(item.type, 5.5, 2.2, { align: "center" })

    doc.setFont(font, "italic")
    doc.setFontSize(14)
    doc.text("to", 5.5, 2.6, { align: "center" })

    doc.setFont(font, "bold")
    doc.setFontSize(24)
    doc.text(item.delegate, 5.5, 3.05, { align: "center" })

    doc.setFont(font, "italic")
    doc.setFontSize(14)
    doc.text("representing", 5.5, 3.45, { align: "center" })

    doc.setFont(font, "bold")
    doc.setFontSize(20)
    doc.text(item.position, 5.5, 3.9, { align: "center" })

    doc.setFont(font, "italic")
    doc.setFontSize(14)
    doc.text("from", 5.5, 4.3, { align: "center" })

    doc.setFont(font, "bold")
    doc.setFontSize(20)
    doc.text(item.delegation, 5.5, 4.8, { align: "center" })

    doc.setFont(font, "italic")
    doc.setFontSize(14)
    doc.text("in", 5.5, 5.2, { align: "center" })

    doc.setFont(font, "bold")
    doc.setFontSize(20)
    doc.text(item.committee, 5.5, 5.6, { align: "center" })

    doc.setLineWidth(.01);
    doc.line(1.5, 6.75, 4.5, 6.75)
    doc.line(6.5, 6.75, 9.5, 6.75)

    doc.setFont(font, "normal")
    doc.setFontSize(14)
    doc.text(settings.secgen, 3, 7, { align: "center" })
    doc.text(committee.chair, 8, 7, { align: "center" })

    doc.setFont(font, "italic")
    doc.setFontSize(12)
    doc.text(settings.abbreviation + " Secretary-General", 3, 7.25, { align: "center" })
    doc.text("Committee Chair", 8, 7.25, { align: "center" })
}