# Check New Registrations

Este repositorio contiene un script desarrollado en Google Apps Script que permite automatizar el envío de correos electrónicos y gestionar datos recibidos mediante solicitudes HTTP. Incluye funcionalidades para detectar nuevos registros, enviar correos personalizados, y registrar información de nuevos usuarios en una hoja de cálculo.

---

## 🚀 Funcionalidades

1. **Detección automática de nuevos registros**: Identifica filas nuevas desde la última ejecución y las procesa.
2. **Envío de correos electrónicos personalizados**: Los correos incluyen un mensaje basado en el curso de interés del usuario y una imagen relacionada.
3. **Registro de datos recibidos vía solicitudes HTTP**: Almacena información de usuarios recibida mediante un endpoint en la hoja de cálculo.
4. **Registro del estado del envío**: Marca filas como procesadas después de enviar el correo.
5. **Capacidad de reinicio**: Puedes reiniciar el contador de filas procesadas para reprocesarlas todas.

---

## 📂 Archivos principales

### **1. `checkNewRegistrations()`**

- **Función principal** que:
  - Verifica la hoja activa para detectar filas nuevas.
  - Envía correos según el interés del curso especificado.
  - Actualiza el estado en la hoja de cálculo.

#### Parámetros importantes:
- **Columna de correos (`emailCol`)**: Columna 3.
- **Columna del curso de interés (`courseCol`)**: Columna 2.
- **Columna de estado (`statusCol`)**: Columna 6.

#### Estado esperado:
- `"Correo Enviado"`: Indica que el correo fue enviado exitosamente.

---

### **2. `sendEmailWithImageInline(recipient, courseInterest)`**

- **Función secundaria** que:
  - Envía correos con un mensaje personalizado y una imagen incrustada según el curso de interés del usuario.
  - Incluye manejo de errores en caso de fallos en el envío.

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

### **3. `receptionData(e)`**

- **Función que recibe datos mediante solicitudes HTTP POST**:
  - Los datos se envían en formato JSON.
  - Se procesan y almacenan como una nueva fila en la hoja de cálculo activa.

#### Campos requeridos en el JSON:
- `nombreCompleto`: Nombre del usuario.
- `cursoInteresado`: Curso de interés.
- `correoElectronico`: Dirección de correo electrónico.
- `numeroCelular`: Número de teléfono del usuario.
- `estadoLocalidad`: Localidad del usuario.

#### Respuesta:
- Un mensaje JSON confirmando que los datos fueron recibidos correctamente.

#### Ejemplo de solicitud:
```json
POST /webhook HTTP/1.1
Content-Type: application/json

{
  "nombreCompleto": "Juan Pérez",
  "cursoInteresado": "Guitarra",
  "correoElectronico": "juan.perez@example.com",
  "numeroCelular": "5551234567",
  "estadoLocalidad": "CDMX"
}

### **4. `resetLastCheckedRow()`**

```

- **Descripción**:  
  Restaura el seguimiento de la última fila procesada al inicio de la hoja.  
  Útil para reprocesar todas las filas desde el principio.

---

## 🛠️ Configuración

### Requisitos:

1. **Google Apps Script**:
   - Abre una hoja de cálculo en Google Sheets.
   - Ve al menú `Extensiones > Apps Script` y pega el código.

2. **Configuración de las columnas**:
   Asegúrate de que las columnas sigan este orden:
   - **Columna 1**: Nombre completo.
   - **Columna 2**: Curso de interés.
   - **Columna 3**: Correo electrónico.
   - **Columna 4**: Número de celular.
   - **Columna 5**: Localidad.
   - **Columna 6**: Estado del envío.

3. **Permisos de Google Apps Script**:
   El script requiere acceso a:
   - **Gmail**: Para enviar correos.
   - **Google Sheets**: Para leer y escribir datos.
   - **URL Fetch**: Para descargar imágenes.

---

## 📝 Cómo usar

1. **Carga el script en Google Apps Script**.
2. **Configura un endpoint web**:
   - Publica el proyecto como una aplicación web para recibir datos mediante `receptionData`.
3. **Ejecuta la función `checkNewRegistrations()`**:
   - Procesará las filas nuevas y enviará correos.
   - Actualizará la columna de estado.
4. **Reinicia el seguimiento (opcional)**:
   - Ejecuta `resetLastCheckedRow()` para comenzar desde el inicio.

---

## 📌 Notas adicionales

### URLs de imágenes:
- Reemplaza las URLs en `sendEmailWithImageInline` con imágenes relevantes.
- **Ejemplo**: `"https://example.com/path-to-guitarra-image.jpg"`.

### Errores de envío:
- Los errores se registrarán en el `Logger`.

---

## 🌟 Contribuciones

¡Sugerencias y mejoras son bienvenidas!  
Si encuentras errores o quieres agregar nuevas funcionalidades, no dudes en abrir un pull request o reportar un issue.

---

## 🧑‍💻 Autor

**Axel Meyrek**  
Desarrollador y entusiasta de la automatización.  
[¡Sígueme para más contenido de desarrollo y programación!](https://www.instagram.com/meyrek)

