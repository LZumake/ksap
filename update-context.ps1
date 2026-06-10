# Script para generar automáticamente CODIGO_ACTUAL_KSAP.txt
# Autor: Leire (KSAP Project)
# Fecha: 10/06/2026

$archivoSalida = "CODIGO_ACTUAL_KSAP.txt"
$fecha = Get-Date -Format "dd/MM/yyyy HH:mm"

# 1. Cabecera
@"
============================================================
CÓDIGO ACTUAL KSAP - Generado automáticamente
Última actualización: $fecha
============================================================

=== 1. ESTRUCTURA HTML (index.html) ===
"@ | Set-Content $archivoSalida -Encoding UTF8

# 2. Añadir HTML (ajusta la ruta si tu index está en otra carpeta)
if (Test-Path "index.html") { Get-Content "index.html" -Encoding UTF8 | Add-Content $archivoSalida }

@"

=== 2. ESTILOS GENERALES (css/styles.css) ===
"@ | Add-Content $archivoSalida

# 3. Añadir CSS
if (Test-Path "css/styles.css") { Get-Content "css/styles.css" -Encoding UTF8 | Add-Content $archivoSalida }

@"

=== 3. ESTILOS RESPONSIVE (css/responsive.css) ===
"@ | Add-Content $archivoSalida

# 4. Añadir Responsive
if (Test-Path "css/responsive.css") { Get-Content "css/responsive.css" -Encoding UTF8 | Add-Content $archivoSalida }

@"

=== 4. LÓGICA JAVASCRIPT (js/app.js) ===
"@ | Add-Content $archivoSalida

# 5. Añadir JS
if (Test-Path "js/app.js") { Get-Content "js/app.js" -Encoding UTF8 | Add-Content $archivoSalida }

Write-Host "✅ CODIGO_ACTUAL_KSAP.txt actualizado correctamente." -ForegroundColor Green