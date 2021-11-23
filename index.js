const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const directory = './pdf-files/' //path to the directory

function extractData(text){
    if (text.includes("%")){
        carEstadualTemp = text.slice(text.indexOf("Data da Situação"));
        carEstadual = carEstadualTemp.slice(carEstadualTemp.indexOf("Data da Situação") + 17,                        
                                            carEstadualTemp.indexOf("/") + 5);
        
        carFederalSema = text.slice(text.indexOf("Nº Recibo Federal") + 18,
                                    text.indexOf("Dados da Propriedade") - 1);
        
        if (text.includes("100%")){
            carFedSob = text.slice(text.indexOf("código(s):") + 12,
                                   text.indexOf("código(s):") + 64);
        }else{
            carFedSob = text.slice(text.indexOf("código(s):") + 12,
                                   text.indexOf("código(s):") + 63);
        }

        data = carEstadual+' - '+carFederalSema+' - '+carFedSob;
        console.log(data);
    }else{
        //theres no info required info in this PDF
    }
}

//function to extract the content from the PDF file to a string value
function pdfToText(currentFile){
    const currentPDF = fs.readFileSync(directory + currentFile);
    pdf(currentPDF).then(function(data){
        let pdfText = data.text;
        extractData(pdfText);
    });
}

//function to select every file on the directory
fs.readdirSync(directory).forEach(file => {
    pdfToText(file);
})
