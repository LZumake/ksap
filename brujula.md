# 🧭 BRÚJULA DE KSAP - Plan de Desarrollo Completo

## 📌 Estado Actual (Junio 2026 - Sesión 7)
- ✅ App funcional en GitHub Pages: https://lzumake.github.io/ksap/
- ✅ Login implementado con modo invitado
- ✅ Menú hamburguesa drawer lateral
- ✅ Diseño unificado en todas las páginas
- ✅ Contador de progreso de tareas

---

##  FASE 1: Fundamentos (Sesión 7-8) - EN PROGRESO

### 1.1 Sistema de Login Completo
- [x] Página de login con fondo degradado
- [x] Modo invitado (sin permisos de edición)
- [ ] Avatar de usuario en esquina superior derecha
- [ ] Menú desplegable del avatar con:
  - 👤 Mi Perfil
  - ️ Configuración
  -  GPS: Activado/Desactivado
  - 🌙 Modo Oscuro
  - 🚪 Cerrar Sesión
- [ ] Ocultar botones "+ Añadir" para invitados
- [ ] Aviso "Modo invitado" en páginas principales

### 1.2 Corrección de Bugs UX
- [ ] Scroll horizontal del menú en móvil (375px)
- [ ] Overlay para cerrar menú al tocar fuera
- [ ] Ocultar botón "Iniciar Sesión" cuando menú está abierto

### 1.3 Perfil de Usuario Básico
- [ ] Página `perfil.html` accesible desde avatar
- [ ] Mostrar: nombre, email, fecha de registro
- [ ] Editar: foto de perfil, nombre, preferencias

---

## 🗺️ FASE 2: Hub de Navegación (Sesión 9-10)

### 2.1 Rediseño de tareas.html
**Problema**: Lista de tareas interminable, difícil de navegar.

**Solución**: Convertir en Hub con 4 botones grandes:
1. 📋 **Tareas Programadas** (filtro por usuario por defecto)
2. 🏠 **Por Zonas** (Cocina, Baño, Dormitorios, etc.)
3. 👥 **Por Responsable** (Rosa, Pedro, Ana, Miguel)
4. ✅ **Por Estado** (Pendientes, Completadas, Todas)

### 2.2 Vistas Filtradas
- [ ] Crear vistas específicas para cada filtro
- [ ] JavaScript para filtrado dinámico
- [ ] Mantener tabla responsive actual

---

##  FASE 3: Lista de Compra Inteligente (Sesión 11-12)

### 3.1 Integración Open Food Facts
**Objetivo**: Base de datos de productos reales con fotos, códigos de barras, categorías.

**Implementación**:
- [ ] Al escribir producto en lista de compra → autocompletado con Open Food Facts API
- [ ] Mostrar foto del producto, categoría, valores nutricionales
- [ ] Guardar código de barras para futuras compras

**API**: https://world.openfoodfacts.org/api/v2/product/{barcode}.json

### 3.2 Escaneo de Código de Barras
- [ ] Botón "Escanear" en cada producto
- [ ] Usar cámara del móvil (getUserMedia API)
- [ ] Buscar producto en Open Food Facts por código

---

##  FASE 4: OCR de Tickets - Monetización Compras (Sesión 13-15)

### 4.1 Escaneo de Tickets
**Objetivo**: Usuario escanea ticket → app extrae productos y precios reales.

**Herramientas**:
- **Opción A**: Mindee API (https://www.mindee.com/receipt-ocr-api) - 500 tickets/mes gratis
- **Opción B**: Google Cloud Document AI - Más potente, requiere tarjeta
- **Opción C**: Tesseract.js (local, sin API) - Menos preciso pero gratis

**Flujo**:
1. Usuario pulsa "Escanear Ticket" en página de Gastos
2. Sube foto del ticket
3. API extrae: tienda, fecha, productos, precios, total
4. Guarda en perfil del usuario
5. Actualiza estadísticas de gastos

### 4.2 Historial de Gastos Personalizado
- [ ] Dashboard con gráfico de gastos mensuales
- [ ] Categorización automática (Supermercado, Farmacia, etc.)
- [ ] Comparativa mes a mes
- [ ] Exportar a PDF/Excel

### 4.3 Crowdsourcing de Precios (Fase 4.2)
- [ ] Botón "¿Viste más barato?" en cada producto
- [ ] Sistema de validación (3 usuarios confirman = verificado)
- [ ] Mapa de precios por zona geográfica

**Monetización**:
- Datos anonimizados para estudios de mercado (GDPR compliant)
- Afiliación con supermercados online (Awin, Tradedoubler)
- Ofertas patrocinadas destacadas

---

## 🎭 FASE 5: Eventos Culturales Geolocalizados (Sesión 16-18)

### 5.1 Fuentes de Datos
**APIs Públicas** (prioridad):
- Eventbrite API: https://www.eventbrite.com/platform/api
- Ticketmaster Discovery API: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/
- Meetup API: https://www.meetup.com/meetup_api/

**Open Data España**:
- datos.gob.es (buscar "agenda cultural")
- Open Data Barcelona: https://opendata-ajuntament.barcelona.cat/
- Datos Abiertos Madrid: https://datos.madrid.es/

**Scraping Ético** (fase posterior):
- Cultura Inquieta, Mondosonoro, webs municipales
- Herramientas: Python + Scrapy o servicios gestionados (ScrapingBee)

### 5.2 Implementación Técnica
**Base de Datos**: PostgreSQL + PostGIS para consultas geoespaciales
**Backend**: Node.js o Python (FastAPI)
**Frontend**: Integración en Ksap con mapa interactivo

**Flujo**:
1. Usuario activa GPS (consentimiento GDPR)
2. App calcula eventos en radio de 50km
3. Muestra lista con: título, fecha, distancia, categoría, enlace compra entradas
4. Filtros: tipo (concierto, exposición, teatro), fecha, precio

### 5.3 Monetización
- **Afiliación**: 5-10% comisión por entradas vendidas (Eventbrite, Atrápalo, Ticketmaster)
- **Eventos destacados**: Salas/teatros pagan por aparecer primero
- **Notificaciones push**: "Concierto de Jazz a 500m de ti - 20% dto"
- **Premium**: Alertas personalizadas por género musical, artista favorito

---

## 🌍 FASE 6: Escalado y Comunidad (Sesión 19+)

### 6.1 Multi-ciudad
- [ ] Expandir de Madrid/Barcelona a toda España
- [ ] Adaptar APIs por región
- [ ] Partnerships con ayuntamientos locales

### 6.2 Comunidad de Usuarios
- [ ] Sistema de reputación (usuarios que más reportan precios)
- [ ] Foros por zona/ciudad
- [ ] Recomendaciones entre vecinos

### 6.3 Open Banking (Futuro lejano)
- [ ] Integración con bancos (PSD2)
- [ ] Importación automática de gastos
- [ ] Categorización inteligente con IA

---

## 🎨 MEJORAS DE UI/UX (Transversal - Todas las fases)

### Bugs Pendientes
- [ ] Scroll horizontal menú móvil
- [ ] Overlay menú hamburguesa
- [ ] Botón login visible con menú abierto

### Mejoras Visuales
- [ ] Modo oscuro (toggle en avatar)
- [ ] Animaciones de transición entre páginas
- [ ] Splash screen al abrir app
- [ ] Iconos personalizados (reemplazar emojis por SVG)

### Accesibilidad
- [ ] Contraste WCAG AA en todos los textos
- [ ] Navegación por teclado
- [ ] Labels ARIA en formularios
- [ ] Soporte para lectores de pantalla

---

## 💡 IDEAS FUTURAS (Backlog de Innovación)

### Corto Plazo
- [ ] Recordatorios push para tareas ("Hoy te toca limpiar el baño")
- [ ] Calendario compartido de la casa (eventos, visitas, mudanzas)
- [ ] Sistema de votación para decisiones (¿Pedimos pizza o cocinamos?)

### Medio Plazo
- [ ] Integración con asistentes de voz (Alexa, Google Home)
- [ ] Gamificación (puntos por tareas completadas, rankings)
- [ ] Marketplace de servicios entre vecinos (canguro, clases, reparaciones)

### Largo Plazo
- [ ] IA predictiva ("Suelen faltar 2L de leche los viernes, ¿añadir?")
- [ ] Integración con servicios de delivery (Glovo, Uber Eats)
- [ ] Blockchain para contratos de alquiler compartidos

---

## 📊 MÉTRICAS DE ÉXITO

### Fase 1-2 (MVP)
- 100 usuarios registrados
- 50 usuarios activos semanales
- 0 bugs críticos en móvil

### Fase 3-4 (Monetización Compras)
- 500 tickets escaneados
- 1000 precios reportados por usuarios
- Primer ingreso por afiliación

### Fase 5-6 (Eventos + Escalado)
- 1000 eventos en base de datos
- 50 entradas vendidas/mes vía afiliación
- Expansión a 3 ciudades

---

## 🛠️ STACK TECNOLÓGICO

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive Design (Mobile First)
- GitHub Pages (hosting gratuito)

### Backend (Fase 3+)
- Node.js + Express o Python + FastAPI
- PostgreSQL + PostGIS (geolocalización)
- Firebase (autenticación, tiempo real)

### APIs Externas
- Open Food Facts (productos)
- Mindee/Google Document AI (OCR)
- Eventbrite/Ticketmaster (eventos)
- Nominatim/OpenStreetMap (geocodificación)

### Herramientas
- VS Code (editor)
- Git + GitHub (control de versiones)
- Figma (diseño UI, futuro)
- Postman (testing APIs)

---

##  ROADMAP RESUMIDO

| Sesión | Objetivo | Entregable |
|--------|----------|------------|
| 7-8 | Login + Avatar + Bugs | App con autenticación completa |
| 9-10 | Hub de Tareas | Navegación por filtros |
| 11-12 | Open Food Facts | Lista de compra enriquecida |
| 13-15 | OCR de Tickets | Escaneo y estadísticas |
| 16-18 | Eventos Culturales | Mapa geolocalizado |
| 19+ | Escalado | Multi-ciudad + comunidad |

---

## ⚠️ CONSIDERACIONES LEGALES

### GDPR / LOPD
- [ ] Consentimiento explícito para GPS
- [ ] Anonimizar datos de tickets (nombre, dirección)
- [ ] Política de privacidad clara
- [ ] Derecho al olvido (eliminar cuenta y datos)

### Propiedad Intelectual
- [ ] No copiar descripciones literales de otras webs
- [ ] Enlazar a fuentes originales
- [ ] Atribuir Open Food Facts (licencia ODbL)

### Términos de Servicio
- [ ] Respetar límites de APIs (rate limiting)
- [ ] No saturar servidores con scraping
- [ ] Revisar condiciones de uso de cada API

---

## 🎯 VISIÓN FINAL

**Ksap** será la app integral de gestión del hogar que:
1. **Organiza** la convivencia (tareas, gastos, compras)
2. **Ahorra** dinero (precios reales, ofertas, comparativas)
3. **Conecta** con el entorno (eventos culturales, ocio local)
4. **Monetiza** de forma ética (afiliación, datos anonimizados, premium)

**Diferenciador**: No es solo una app de tareas. Es un ecosistema que hace la vida en comunidad más fácil, económica y divertida.

---

*Última actualización: Junio 2026*
*Versión: 1.0*
