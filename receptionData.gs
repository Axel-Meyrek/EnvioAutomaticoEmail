function receptionData(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.nombreCompleto, 
    data.cursoInteresado, 
    data.correoElectronico, 
    data.numeroCelular, 
    data.estadoLocalidad
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ "message": "Datos recibidos correctamente" }))
    .setMimeType(ContentService.MimeType.JSON);
}
