import border from '../assets/awards/AwardsBorder.png'

const font = "times"

export function participationLayout1(doc, committee, position, delegation) {
    let image = new Image();
    image.src = border;

    let extension = image.src.split(".").pop().toUpperCase()
    doc.addImage(image, extension, .15, .15, 10.7, 8.2);

    doc.setFont(font, "bold")
    doc.setFontSize(36)
    doc.text("CERTIFICATE OF PARTICIPATION", 5.5, 1.75, { align: "center" })

    doc.setFont(font, "normal")
    doc.setFontSize(14)
    doc.text("Conference Name recognizes the delegation of", 5.5, 2.25, { align: "center" })

    doc.setFont(font, "bold")
    doc.setFontSize(30)
    doc.text(position, 5.5, 2.85, { align: "center" })

    doc.setFont(font, "normal")
    doc.setFontSize(14)
    doc.text("a delegate of", 5.5, 3.35, { align: "center" })

    doc.setFont(font, "bold")
    doc.setFontSize(24)
    doc.text(delegation, 5.5, 3.95, { align: "center" })

    doc.setFont(font, "normal")
    doc.setFontSize(14)
    doc.text("for successfully participating at Conference Abbreviation in the", 5.5, 4.55, { align: "center" })

    doc.setFont(font, "bold")
    doc.setFontSize(20)
    doc.text(committee, 5.5, 5.15, { align: "center" })

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
}

export function committeeLayout1(doc, type, committee, position, delegate, delegation) {
    doc.setFont(font, "bold")
    doc.setFontSize(33)
    doc.text("Chantilly High School Model United Nations", 5.5, 1.25, { align: "center" })

    doc.setFont(font, "italic")
    doc.setFontSize(14)
    doc.text("presents the award of", 5.5, 1.65, { align: "center" })

    doc.setFont(font, "bold")
    doc.setFontSize(30)
    doc.text(type, 5.5, 2.2, { align: "center" })

    doc.setFont(font, "italic")
    doc.setFontSize(14)
    doc.text("to", 5.5, 2.6, { align: "center" })

    doc.setFont(font, "bold")
    doc.setFontSize(24)
    doc.text(delegate, 5.5, 3.05, { align: "center" })

    doc.setFont(font, "italic")
    doc.setFontSize(14)
    doc.text("representing", 5.5, 3.45, { align: "center" })

    doc.setFont(font, "bold")
    doc.setFontSize(20)
    doc.text(position, 5.5, 3.9, { align: "center" })

    doc.setFont(font, "italic")
    doc.setFontSize(14)
    doc.text("from", 5.5, 4.3, { align: "center" })

    doc.setFont(font, "bold")
    doc.setFontSize(20)
    doc.text(delegation, 5.5, 4.8, { align: "center" })

    doc.setFont(font, "italic")
    doc.setFontSize(14)
    doc.text("in", 5.5, 5.2, { align: "center" })

    doc.setFont(font, "bold")
    doc.setFontSize(20)
    doc.text(committee, 5.5, 5.6, { align: "center" })

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
}