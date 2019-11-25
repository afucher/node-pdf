'use strict';
const PDFDocument = require('pdfkit');
const fs = require('fs');
const columnStartPosition = [20,150, 250, 350]
const columnSize = [250, 100, 100, 100]

const printHeader = doc => {
    printRow(doc, ["Name","Start date","End date","Attendance"])
}

const printCourse = (doc, course) => {
    printRow(doc, [course.name, course.start_date, course.end_date, course.attendance])
}

const printRow = (doc, infos) => {
    const {y} = doc;
    const opt = {height: doc.currentLineHeight()};
    let position = columnStartPosition[0];
    infos.forEach((info, index) => {
        const width = columnSize[index];
        position = index == 0 ? position : position + columnSize[index-1]
        doc.text(info, position, y,  {...opt, width})
    })
}


const courses = [
    {
        name: "Name1",
        start_date: "01/02/1990",
        end_date: "01/03/1990",
        attendance: "30%"
    },
    {
        name: "Name2 jkasdas hadksja sdk kajsdh",
        start_date: "01/02/1990",
        end_date: "01/03/1990",
        attendance: "100%"
    },
    {
        name: "Name3 jkasdas hadksja sdk kajsdh",
        start_date: "01/02/1990",
        end_date: "01/03/1990",
        attendance: "100%"
    }
];
const doc = new PDFDocument;

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));
const {x} = doc;
printHeader(doc);
doc.x = x;
courses.forEach(course => {
    printCourse(doc, course);
    doc.x = x;
})
doc.end();

    