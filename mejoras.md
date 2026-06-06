# 📋 Backlog de Mejoras y Evolución - Ksap

## 🚀 Fase 1: Mejoras de UX/UI y Corrección de Bugs (Prioridad Alta)

### 1. Menú de navegación - Scroll horizontal en móvil
**Problema**: En pantallas pequeñas (375px), los enlaces del menú superior se salen de la pantalla y obligan a hacer scroll lateral.
**Solución**: Ajustar `flex-wrap`, reducir `gap`/`padding` en el `@media (max-width: 480px)` o forzar el menú hamburguesa antes.
**Estado**: ❌ Pendiente

### 2. Cierre del menú al tocar fuera (Overlay)
**Problema**: El menú hamburguesa (drawer lateral) solo se cierra al hacer clic en un enlace o en la "X". 
**Solución**: Añadir un fondo semitransparente (overlay) que cubra el resto de la pantalla. Al hacer clic en ese fondo, el menú se cierra.
**Estado**: ❌ Pendiente

### 3. Botón "Iniciar Sesión" visible con el menú abierto
**Problema**: En móvil, cuando el menú lateral está abierto, el botón de "Iniciar Sesión" sigue visible y puede estorbar.
**Solución**: Añadir `nav.open .btn-login { display: none; }` en el CSS responsive.
**Estado**: ❌ Pendiente

### 4. UI de Tarjetas de Tareas (Mejora visual)
**Problema**: Las tarjetas actuales pueden quedar muy vacías o desordenadas.
**Solución**: Mostrar la descripción completa dentro de la tarjeta minimizada, usando iconos para optimizar el espacio y que se vea todo de un vistazo.
**Estado**: ❌ Pendiente

---

## 🗺️ Fase 2: Rediseño de la Navegación (El Hub de Tareas)

### 5. Lista de Tareas interminable (Falta de filtros)
**Problema**: Todas las tareas se muestran en una sola lista larga. Es muy pesado hacer scroll.
**Solución**: Convertir `tareas.html` en un "Hub de navegación" (Dashboard de filtros) con botones grandes en lugar de la lista directa.
**Estado**: ❌ Pendiente (Planificado para Sesión 7)

### 6. Nuevos botones del Hub de Tareas
En lugar de la lista, la página de Tareas tendrá 4 accesos directos:
1. **Tareas Programadas**: Abrir por filtro de usuario (aparece predeterminado el usuario logueado, pero se pueden consultar las de otros o todas).
2. **Zonas**: Ver todas las tareas programadas en una zona concreta y detectar cuáles faltan por programar.
3. **Presupuesto**: Introducir gastos fijos y variables para calcular presupuestos, control de gastos y cuánto tiene que pagar cada uno cada mes.
4. **Lista de la compra**: Acceso directo a la lista de compras.
**Estado**:  Pendiente

---

## 🏠 Fase 3: Nuevas Funcionalidades (App Integral de Convivencia)

### 7. Onboarding / Configuración inicial de la Casa
**Idea**: Que el usuario tenga que "dar de alta" su casa al registrarse (número de habitaciones, baños, zonas, etc.) para dimensionar y personalizar las tareas automáticamente.
**Estado**: 💡 Idea

### 8. Perfil de Usuario y Dashboard Personal
**Idea**: Crear una página de perfil desde la que el usuario pueda acceder a sus registros personales:
- Calendario imprimible (semanal/mensual) de sus tareas.
- Agenda personal con calendario para programar eventos propios.
- Lista de deseos ("Mis cosas").
- Estadísticas personales.
**Objetivo**: Que el usuario use la app para todo lo que necesite en su día a día, no solo para las tareas compartidas.
**Estado**: 💡 Idea

### 9. Botón de Acción Global (Distribuidor en Inicio)
**Idea**: Añadir un botón destacado (o un FAB - Floating Action Button con un "+") en la página de Inicio.
**Función**: Actuar como un "distribuidor de tráfico" hacia los formularios específicos de cada sección. Según lo que elija el usuario, le llevará a su página correspondiente:
- 📋 **Tarea programada** ➡️ Lleva a `tareas.html` (formulario de zona, responsable, frecuencia).
- 📅 **Evento / Recordatorio** ➡️ Lleva a `agenda.html` (nueva tabla/página para calendario personal).
- 🛒 **Compra** ➡️ Lleva a `compras.html` (formulario de producto, cantidad).
- 💰 **Gasto** ️ Lleva a `gastos.html` (formulario de importe, concepto).
**Por qué así**: No usamos un formulario modal dinámico porque necesitamos que los datos se guarden en sus respectivas tablas estructuradas. Esto es **imprescindible** para poder cruzar la información y calcular los **presupuestos mensuales** reales de la casa.
**Estado**: 💡 Idea

---

##  Fase 4: Nivel Pro (Ideas a futuro)

### 10. Persistencia de datos (LocalStorage)
**Idea**: Hacer que al marcar un checkbox de una tarea o de la lista de la compra, se quede guardado en el navegador. Si recargo la página o vuelvo mañana, seguirá marcado.
**Tecnología**: JavaScript `localStorage`.

### 11. Modo Oscuro (Dark Mode)
**Idea**: Añadir un pequeño interruptor (toggle) en el menú o en el footer para cambiar entre tema claro y oscuro.

### 12. Pantalla de carga (Splash Screen)
**Idea**: Mostrar el logo de Ksap durante 1 segundo al abrir la app en el móvil, mientras cargan los recursos. Da sensación de app nativa.

---
*Última actualización: 06/06/2026 (Sesión 6 - Ideas nocturnas y arquitectura de distribuidor incluidas)*
