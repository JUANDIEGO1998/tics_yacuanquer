# Reto Digital Yacuanquer 2026

Primera versión web del reto.

## Conexión con Google Sheets

1. Crea una hoja de cálculo nueva en Google Sheets.
2. Ve a **Extensiones > Apps Script**.
3. Copia el contenido de `GoogleAppsScript.gs`.
4. Guarda y ejecuta `setup` una vez.
5. En Apps Script: **Implementar > Nueva implementación > Aplicación web**.
6. Selecciona **Ejecutar como: tú** y **Quién tiene acceso: cualquier persona**.
7. Copia la URL que termina en `/exec`.
8. Abre `script.js` y reemplaza `PEGA_AQUI_TU_URL_DE_GOOGLE_APPS_SCRIPT` por esa URL.
9. Publica nuevamente la página web.

La hoja de resultados debe permanecer privada. La aplicación solo envía los resultados al endpoint de Apps Script.
