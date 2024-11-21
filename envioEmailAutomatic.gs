function checkNewRegistrations() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (!sheet) {
    Logger.log("La hoja especificada no existe.");
    return;
  }

  const lastRow = sheet.getLastRow();
  const emailCol = 3; // Columna de correos
  const courseCol = 2; // Columna de curso de interés
  const statusCol = 6; // Columna de estado
  
  const properties = PropertiesService.getScriptProperties();
  const lastCheckedRow = Number(properties.getProperty("lastCheckedRow") || 1);

  if (lastCheckedRow >= lastRow) {
    Logger.log("No hay nuevas filas para procesar.");
    return;
  }

  const rangeValues = sheet.getRange(lastCheckedRow + 1, 1, lastRow - lastCheckedRow, sheet.getLastColumn()).getValues();

  for (let i = 0; i < rangeValues.length; i++) {
    const email = rangeValues[i][emailCol - 1];
    const courseInterest = rangeValues[i][courseCol - 1]; // Curso de interés
    const status = rangeValues[i][statusCol - 1];
    
    if (status !== 'Correo Enviado') {
      try {
        sendEmailWithImageInline(email, courseInterest); // Enviar correo con el curso de interés
        sheet.getRange(lastCheckedRow + 1 + i, statusCol).setValue("Correo Enviado");
      } catch (error) {
        Logger.log(`Error al enviar correo a ${email}: ${error.message}`);
      }
    }
  }

  properties.setProperty("lastCheckedRow", lastRow);
}

function sendEmailWithImageInline(recipient, courseInterest) {
    const subject = "Bienvenido a nuestro curso de " + courseInterest;
    const message = `¡Hola! Gracias por registrarte en nuestro curso de ${courseInterest}. Estamos emocionados de que te unas a nosotros.\n\n`;

    let imageBlob;
    switch(courseInterest.toLowerCase()) {
      case 'guitarra':
        imageBlob = UrlFetchApp.fetch("https://example.com/path-to-guitarra-image.jpg").getBlob();
        break;
      case 'bajo':
        imageBlob = UrlFetchApp.fetch("https://example.com/path-to-bajo-image.jpg").getBlob();
        break;
      case 'bateria':
        imageBlob = UrlFetchApp.fetch("https://example.com/path-to-bateria-image.jpg").getBlob();
        break;
      default:
        imageBlob = UrlFetchApp.fetch("https://example.com/path-to-default-image.jpg").getBlob();
    }
    imageBlob.setName("cursoImagen.jpg");

    const htmlMessage = `
      <p>¡Hola! Gracias por registrarte en nuestro curso de ${courseInterest}. Estamos emocionados de que te unas a nosotros.</p>
      <p><img src="cid:cursoImagen.jpg" alt="Imagen de ${courseInterest}" width="400"></p>
      <p>¡Nos vemos en clase!</p>
    `;

    const options = {
      htmlBody: htmlMessage,
      inlineImages: {
        "cursoImagen.jpg": imageBlob
      },
      name: "Tu Empresa"
    };

    MailApp.sendEmail(recipient, subject, message, options);
    Logger.log("Correo enviado a " + recipient + " con imagen inline para " + courseInterest);
}


function resetLastCheckedRow() {
    const properties = PropertiesService.getScriptProperties();
    properties.setProperty("lastCheckedRow", "1");
    Logger.log("lastCheckedRow ha sido reiniciado a 1.");
}
