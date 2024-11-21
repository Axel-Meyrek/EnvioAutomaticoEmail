# Check New Registrations

Este repositorio contiene un script desarrollado en Google Apps Script que permite automatizar el envío de correos electrónicos a nuevas personas registradas en una hoja de cálculo de Google Sheets. El script incluye características para identificar nuevas filas, enviar correos personalizados con imágenes incrustadas y mantener un seguimiento del progreso.

---

## 🚀 Funcionalidades

1. **Detección automática de nuevos registros**: El script verifica las filas nuevas desde la última ejecución y procesa solo estas.
2. **Envío de correos electrónicos personalizados**: Cada correo incluye un mensaje específico basado en el curso de interés del usuario y una imagen relacionada.
3. **Registro del estado del envío**: Actualiza el estado en la hoja de cálculo para indicar si el correo fue enviado exitosamente.
4. **Capacidad de reinicio**: Puedes reiniciar el contador para procesar todas las filas nuevamente si es necesario.

---

## 📂 Archivos principales

### **1. `checkNewRegistrations()`**

- **Función principal** que:
  - Lee los registros de una hoja de cálculo activa.
  - Detecta filas nuevas desde la última ejecución.
  - Envía correos a los destinatarios según su interés de curso.
  - Actualiza la columna de estado para evitar procesar filas duplicadas.

#### Parámetros importantes:
- **Columna de correos (`emailCol`)**: Columna 3.
- **Columna del curso de interés (`courseCol`)**: Columna 2.
- **Columna de estado (`statusCol`)**: Columna 6.

#### Estado esperado:
- `"Correo Enviado"`: Indica que el correo fue enviado exitosamente para esa fila.

---

### **2. `sendEmailWithImageInline(recipient, courseInterest)`**

- **Función secundaria** que:
  - Envía un correo con un mensaje personalizado y una imagen incrustada.
  - La imagen cambia según el curso de interés del usuario.
  - Maneja errores en caso de fallos en el envío.

#### Ejemplo de imágenes según interés:
- **Guitarra**: URL de una imagen de guitarra.
- **Bajo**: URL de una imagen de bajo.
- **Batería**: URL de una imagen de batería.
- **Otros**: Imagen por defecto.

#### Opciones de correo:
- `htmlBody`: Contenido en formato HTML.
- `inlineImages`: Imagen asociada al correo.
- `name`: Nombre del remitente.

---

### **3. `resetLastCheckedRow()`**

- Restaura el seguimiento de la última fila procesada al inicio de la hoja. 
- Ideal para depuración o procesar filas previamente revisadas.

---

## 🛠️ Configuración

### Requisitos:
1. **Google Apps Script**:
   - Abre una hoja de cálculo en Google Sheets.
   - Ve al menú `Extensiones > Apps Script` y pega el código.
2. **Configuración de las columnas**:
   - Asegúrate de que:
     - La columna 3 contenga los correos electrónicos.
     - La columna 2 contenga el curso de interés.
     - La columna 6 esté disponible para registrar el estado del envío.
3. **Permisos de Google Apps Script**:
   - El script requiere acceso a:
     - **Gmail** para enviar correos.
     - **Google Sheets** para leer y escribir datos.
     - **URL Fetch** para descargar imágenes.

---

## 📝 Cómo usar

1. **Carga el script en Google Apps Script**.
2. **Ejecuta la función `checkNewRegistrations()`**:
   - Procesará las filas nuevas y enviará correos.
   - Actualizará la columna de estado.
3. **Reinicia el seguimiento (opcional)**:
   - Ejecuta `resetLastCheckedRow()` para comenzar desde el inicio.

---

## 📌 Notas adicionales

- **URLs de imágenes**:
  - Asegúrate de reemplazar las URLs de las imágenes en el código por las correctas.
  - Ejemplo: `"https://example.com/path-to-guitarra-image.jpg"`.
- **Errores de envío**:
  - Los errores se registrarán en el `Logger`.

---

## 🌟 Contribuciones

¡Sugerencias y mejoras son bienvenidas! Si encuentras errores o quieres agregar nuevas funcionalidades, no dudes en abrir un pull request o reportar un issue.

---

## 🧑‍💻 Autor

**Meyrek**  
Desarrollador y entusiasta de la automatización.  
[¡Sígueme para más contenido de desarrollo y programación!](https://www.instagram.com/axel_meyrek)
