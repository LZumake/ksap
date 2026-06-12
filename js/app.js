// ============================================
// DATOS DE TAREAS (Nuestro "Estado")
// ============================================
const tareasData = [
    { id: 1, nombre: 'Hacer la cama, ventilar y ordenar dormitorios', responsable: 'Rosa', categoria: 'dormitorios', duracion: '20 min', frecuencia: 'Diaria', fecha: '2026-06-11', estado: 'pendiente' },
    { id: 2, nombre: 'Limpiar cocina', responsable: 'Rosa', categoria: 'cocina', duracion: '30 min', frecuencia: 'Diaria', fecha: '2026-06-11', estado: 'pendiente' },
    { id: 3, nombre: 'Sacar la basura', responsable: 'Pedro', categoria: 'varias', duracion: '5 min', frecuencia: 'Diaria', fecha: '2026-06-10', estado: 'completada' },
    { id: 4, nombre: 'Lavar ropa', responsable: 'Ana', categoria: 'lavanderia', duracion: '45 min', frecuencia: 'Semanal', fecha: '2026-06-12', estado: 'pendiente' },
    { id: 5, nombre: 'Aspirar salón', responsable: 'Miguel', categoria: 'salon', duracion: '25 min', frecuencia: 'Semanal', fecha: '2026-06-11', estado: 'pendiente' },
    { id: 6, nombre: 'Limpiar baño', responsable: 'Rosa', categoria: 'bano', duracion: '40 min', frecuencia: 'Semanal', fecha: '2026-06-09', estado: 'completada' },
    { id: 7, nombre: 'Regar plantas', responsable: 'Ana', categoria: 'terrazas', duracion: '15 min', frecuencia: 'Semanal', fecha: '2026-06-13', estado: 'pendiente' },
    { id: 8, nombre: 'Fregar suelos', responsable: 'Pedro', categoria: 'salon', duracion: '50 min', frecuencia: 'Semanal', fecha: '2026-06-14', estado: 'pendiente' }
];

// ============================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================
document.addEventListener('DOMContentLoaded', function() {

    // MODO OSCURO - Cargar preferencia al iniciar
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeEnabled = localStorage.getItem('ksap_dark_mode') === 'true';
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }

    // AUTENTICACIÓN - Verificar sesión
    const userData = checkAuth();
    if (userData) updateUIForUser(userData);

    // BOTÓN DE INVITADO
    const guestBtn = document.getElementById('guest-login');
    if (guestBtn) guestBtn.addEventListener('click', () => login('Invitado', true));

    // FORMULARIO DE LOGIN
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username && password) login(username, false);
            else alert('Por favor, introduce usuario y contraseña');
        });
    }

    // MODO OSCURO - Toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function(e) {
            document.body.classList.toggle('dark-mode', e.target.checked);
            localStorage.setItem('ksap_dark_mode', e.target.checked);
        });
    }

    // GPS - Toggle
    const gpsToggle = document.getElementById('gps-toggle');
    if (localStorage.getItem('ksap_gps_enabled') === 'true' && gpsToggle) gpsToggle.checked = true;
    if (gpsToggle) {
        gpsToggle.addEventListener('change', function(e) {
            localStorage.setItem('ksap_gps_enabled', e.target.checked);
        });
    }

    // DROPDOWN DEL AVATAR
    const avatarBtn = document.getElementById('user-avatar-btn');
    const userDropdown = document.getElementById('user-dropdown');
    if (avatarBtn && userDropdown) {
        avatarBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (userDropdown.classList.contains('active')) {
                userDropdown.classList.remove('active');
            } else {
                cerrarTodosLosMenus();
                userDropdown.classList.add('active');
            }
        });
        document.addEventListener('click', function(e) {
            if (!userDropdown.contains(e.target) && !avatarBtn.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
        const toggles = userDropdown.querySelectorAll('.toggle-switch');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.stopPropagation();
                const checkbox = toggle.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            });
        });
        updateAvatarUI();
    }

    // TAREAS - Renderizado dinámico
    renderizarTareas();

    // COMPRAS - Checkboxes
    const checkboxesCompras = document.querySelectorAll('.item-checkbox');
    checkboxesCompras.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            const tarjeta = this.closest('.shopping-item');
            tarjeta.classList.toggle('comprado', this.checked);
        });
    });

    // VALIDACIÓN EN TIEMPO REAL (register.html)
    const inputNombre = document.getElementById('nombre');
    if (inputNombre) {
        inputNombre.addEventListener('input', function() {
            const valor = this.value.trim();
            if (valor.length > 0) {
                valor.split(' ').length < 2 ? mostrarError('nombre', 'Introduce nombre y apellido') : marcarValido('nombre');
            } else {
                this.classList.remove('error', 'valid');
                document.getElementById('error-nombre').textContent = '';
            }
        });
    }

    const inputEmail = document.getElementById('email');
    if (inputEmail) {
        inputEmail.addEventListener('input', function() {
            const valor = this.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (valor.length > 0) {
                !emailRegex.test(valor) ? mostrarError('email', 'Introduce un email válido') : marcarValido('email');
            } else {
                this.classList.remove('error', 'valid');
                document.getElementById('error-email').textContent = '';
            }
        });
    }

    const inputPassword = document.getElementById('password');
    if (inputPassword) {
        inputPassword.addEventListener('input', function() {
            const valor = this.value;
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (valor.length > 0) {
                if (valor.length < 8) mostrarError('password', 'Mínimo 8 caracteres');
                else if (!passwordRegex.test(valor)) mostrarError('password', 'Incluye mayúsculas y números');
                else marcarValido('password');
            } else {
                this.classList.remove('error', 'valid');
                document.getElementById('error-password').textContent = '';
            }
        });
    }

    const inputPassword2 = document.getElementById('password2');
    if (inputPassword2) {
        inputPassword2.addEventListener('input', function() {
            const valor = this.value;
            const password = document.getElementById('password').value;
            if (valor.length > 0) {
                valor !== password ? mostrarError('password2', 'Las contraseñas no coinciden') : marcarValido('password2');
            } else {
                this.classList.remove('error', 'valid');
                document.getElementById('error-password2').textContent = '';
            }
        });
    }

    // CARGAR PERFIL REAL Y ESTADÍSTICAS
    cargarPerfil();
    calcularEstadisticas();

    // FABs - Menús desplegables
    const fabAgregar = document.getElementById('fab-agregar');
    const fabFiltros = document.getElementById('fab-filtros');
    const menuAgregar = document.getElementById('fab-menu-agregar');
    const menuFiltros = document.getElementById('fab-menu-filtros');

    if (fabAgregar && menuAgregar) {
        fabAgregar.addEventListener('click', function(e) {
            e.stopPropagation();
            if (menuAgregar.classList.contains('active')) {
                menuAgregar.classList.remove('active');
            } else {
                cerrarTodosLosMenus();
                menuAgregar.classList.add('active');
            }
        });
    }

    if (fabFiltros && menuFiltros) {
        fabFiltros.addEventListener('click', function(e) {
            e.stopPropagation();
            if (menuFiltros.classList.contains('active')) {
                menuFiltros.classList.remove('active');
            } else {
                cerrarTodosLosMenus();
                menuFiltros.classList.add('active');
            }
        });
    }

    // Cerrar menús FAB al hacer clic fuera
    document.addEventListener('click', function() {
        if (menuAgregar) menuAgregar.classList.remove('active');
        if (menuFiltros) menuFiltros.classList.remove('active');
    });

    // Acciones del menú Agregar
    if (menuAgregar) {
        menuAgregar.querySelectorAll('.fab-menu-item').forEach(item => {
            item.addEventListener('click', function() {
                const accion = this.getAttribute('data-accion');
                console.log(`➕ Agregar: ${accion}`);
                menuAgregar.classList.remove('active');
            });
        });
    }

    // Filtros del menú Filtros
    if (menuFiltros) {
        menuFiltros.querySelectorAll('.fab-menu-item').forEach(item => {
            item.addEventListener('click', function() {
                const filtro = this.getAttribute('data-filtro');
                console.log(`🔍 Filtrar por: ${filtro}`);
                
                if (filtro === 'zona') mostrarFiltroZona();
                else if (filtro === 'responsable') mostrarFiltroResponsable();
                else if (filtro === 'frecuencia') mostrarFiltroFrecuencia();
                else if (filtro === 'estado') mostrarFiltroEstado();
                
                menuFiltros.classList.remove('active');
            });
        });
    }

}); // ← Cierre correcto del DOMContentLoaded

// ============================================
// MENÚ HAMBURGUESA (fuera del DOMContentLoaded)
// ============================================
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');
const overlay = document.getElementById('overlay');

if (hamburger) {
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        if (nav.classList.contains('open')) {
            this.classList.remove('active');
            nav.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
        } else {
            cerrarTodosLosMenus();
            this.classList.add('active');
            nav.classList.add('open');
            if (overlay) overlay.classList.add('active');
        }
    });

    if (overlay) {
        overlay.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    document.querySelectorAll('nav .nav-left a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
        });
    });
}

// ============================================
// VALIDACIÓN DE FORMULARIO DE REGISTRO
// ============================================
const formularioRegistro = document.getElementById('register-form');
if (formularioRegistro) {
    formularioRegistro.addEventListener('submit', function(e) {
        e.preventDefault();
        limpiarErrores();

        const nombre = document.getElementById('nombre')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const password = document.getElementById('password')?.value;
        const password2 = document.getElementById('password2')?.value;

        if (!nombre || !email || !password) return;

        let hayErrores = false;

        if (nombre.split(' ').length < 2) {
            mostrarError('nombre', 'Introduce tu nombre y apellido');
            hayErrores = true;
        } else marcarValido('nombre');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarError('email', 'Introduce un email válido');
            hayErrores = true;
        } else marcarValido('email');

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (password.length < 8) {
            mostrarError('password', 'Mínimo 8 caracteres');
            hayErrores = true;
        } else if (!passwordRegex.test(password)) {
            mostrarError('password', 'Incluye mayúsculas y números');
            hayErrores = true;
        } else marcarValido('password');

        if (password !== password2) {
            mostrarError('password2', 'Las contraseñas no coinciden');
            hayErrores = true;
        } else if (password2 && password2.length > 0) marcarValido('password2');

        if (!hayErrores) {
            const userData = {
                username: nombre,
                email: email,
                isGuest: false,
                fechaRegistro: new Date().toLocaleDateString('es-ES'),
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('ksap_user', JSON.stringify(userData));
            alert('¡Registro exitoso! Bienvenido/a ' + nombre.split(' ')[0]);
            window.location.href = 'index.html';
        }
    });
}

// ============================================
// GESTIÓN DE MENÚS - Evitar múltiples abiertos
// ============================================
function cerrarTodosLosMenus() {
    const userDropdown = document.getElementById('user-dropdown');
    if (userDropdown) userDropdown.classList.remove('active');
    
    const nav = document.querySelector('nav');
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('overlay');
    if (nav) nav.classList.remove('open');
    if (hamburger) hamburger.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    
    const menuAgregar = document.getElementById('fab-menu-agregar');
    const menuFiltros = document.getElementById('fab-menu-filtros');
    if (menuAgregar) menuAgregar.classList.remove('active');
    if (menuFiltros) menuFiltros.classList.remove('active');
    
    // Cerrar submenús de filtros si están abiertos
    const submenus = document.querySelectorAll('.fab-submenu');
    submenus.forEach(submenu => submenu.remove());
    
    console.log('🔒 Todos los menús cerrados');
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================
function mostrarError(campoId, mensaje) {
    const input = document.getElementById(campoId);
    const errorSpan = document.getElementById('error-' + campoId);
    if (input) { input.classList.add('error'); input.classList.remove('valid'); }
    if (errorSpan) errorSpan.textContent = mensaje;
}

function marcarValido(campoId) {
    const input = document.getElementById(campoId);
    const errorSpan = document.getElementById('error-' + campoId);
    if (input) { input.classList.remove('error'); input.classList.add('valid'); }
    if (errorSpan) errorSpan.textContent = '';
}

function limpiarErrores() {
    document.querySelectorAll('.form-control').forEach(input => input.classList.remove('error', 'valid'));
    document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
}

function updateTaskProgress() {
    const totalTasks = tareasData ? tareasData.length : 0;
    const completedTasks = tareasData ? tareasData.filter(t => t.estado === 'completada').length : 0;
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const completedText = document.getElementById('tasks-completed');
    const percentageText = document.getElementById('tasks-percentage');
    const progressFill = document.getElementById('progress-fill');

    if (completedText) completedText.textContent = `${completedTasks} de ${totalTasks} tareas completadas`;
    if (percentageText) percentageText.textContent = `${percentage}%`;
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
        progressFill.classList.toggle('complete', percentage === 100);
    }
}

// ============================================
// SISTEMA DE LOGIN Y SESIÓN
// ============================================
function login(username, isGuest = false) {
    const userData = {
        username: username,
        isGuest: isGuest,
        email: isGuest ? 'invitado@ksap.app' : `${username.toLowerCase()}@ksap.app`,
        fechaRegistro: new Date().toLocaleDateString('es-ES'),
        loginTime: new Date().toISOString()
    };
    localStorage.setItem('ksap_user', JSON.stringify(userData));
    window.location.href = 'index.html';
}

function logout() {
    localStorage.removeItem('ksap_user');
    window.location.href = 'login.html';
}

function checkAuth() {
    const user = localStorage.getItem('ksap_user');
    if (window.location.pathname.includes('login.html') && user) {
        window.location.href = 'index.html';
        return null;
    }
    if (!window.location.pathname.includes('login.html') &&
        !window.location.pathname.includes('register.html') &&
        !user) {
        window.location.href = 'login.html';
        return null;
    }
    return user ? JSON.parse(user) : null;
}

function updateUIForUser(userData) {
    if (!userData) return;
    if (userData.isGuest) {
        document.querySelectorAll('.btn-primary, .btn-add').forEach(btn => btn.style.display = 'none');
        const mainContent = document.querySelector('main');
        if (mainContent && !document.querySelector('.guest-notice')) {
            const notice = document.createElement('div');
            notice.className = 'guest-notice';
            notice.innerHTML = '👤 Modo invitado - Inicia sesión para editar';
            mainContent.insertBefore(notice, mainContent.firstChild);
        }
    }
    updateNavMenu(userData);
}

function updateNavMenu(userData) {
    const nav = document.querySelector('nav');
    if (!nav) return;
    const originalLoginBtn = nav.querySelector('.btn-login');
    if (originalLoginBtn) originalLoginBtn.style.display = 'none';
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', function(e) { e.preventDefault(); logout(); });
}

function updateAvatarUI() {
    const userStr = localStorage.getItem('ksap_user');
    if (!userStr) return;
    const user = JSON.parse(userStr);
    const name = user.username || 'Usuario';
    const initials = name.substring(0, 2).toUpperCase();
    const dropdownName = document.getElementById('dropdown-name');
    const dropdownEmail = document.getElementById('dropdown-email');
    const avatarInitials = document.getElementById('avatar-initials');
    const dropdownAvatar = document.getElementById('dropdown-avatar');
    if (dropdownName) dropdownName.textContent = name;
    if (dropdownEmail) dropdownEmail.textContent = user.isGuest ? 'Modo invitado' : (user.email || `${name.toLowerCase()}@ksap.app`);
    if (avatarInitials) avatarInitials.textContent = initials;
    if (dropdownAvatar) dropdownAvatar.textContent = initials;
}

function cargarPerfil() {
    const userStr = localStorage.getItem('ksap_user');
    if (!userStr) return;
    const user = JSON.parse(userStr);
    const perfilNombre = document.getElementById('perfil-nombre');
    const perfilEmail = document.getElementById('perfil-email');
    const perfilFecha = document.getElementById('perfil-fecha');
    const perfilRol = document.getElementById('perfil-rol');
    if (perfilNombre) perfilNombre.textContent = user.username || 'Usuario';
    if (perfilEmail) perfilEmail.textContent = user.email || 'usuario@ksap.app';
    if (perfilFecha) perfilFecha.textContent = user.fechaRegistro || 'Hoy';
    if (perfilRol) {
        if (user.isGuest) {
            perfilRol.textContent = '👤 Invitado';
            perfilRol.style.color = 'var(--text-secondary)';
        } else {
            perfilRol.textContent = '⭐ Premium';
            perfilRol.style.color = 'var(--success)';
        }
    }
    const profileAvatar = document.getElementById('profile-avatar');
    if (profileAvatar) {
        const initials = (user.username || 'U').substring(0, 2).toUpperCase();
        profileAvatar.textContent = initials;
    }
}

function calcularEstadisticas() {
    const statCompletadas = document.getElementById('stat-tareas-completadas');
    const statPendientes = document.getElementById('stat-tareas-pendientes');
    const statProductividad = document.getElementById('stat-productividad');
    if (!statCompletadas && !statPendientes && !statProductividad) return;
    
    const totalTareas = tareasData.reduce((acc) => acc + 1, 0);
    const tareasCompletadas = tareasData.reduce((acc, t) => t.estado === 'completada' ? acc + 1 : acc, 0);
    const tareasPendientes = tareasData.reduce((acc, t) => t.estado === 'pendiente' ? acc + 1 : acc, 0);
    const productividad = totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0;
    
    if (statCompletadas) statCompletadas.textContent = tareasCompletadas;
    if (statPendientes) statPendientes.textContent = tareasPendientes;
    if (statProductividad) statProductividad.textContent = `${productividad}%`;
    
    console.log(`📊 Estadísticas: ${tareasCompletadas} completadas, ${tareasPendientes} pendientes, ${productividad}%`);
}

// ============================================
// FILTROS DINÁMICOS - Función genérica
// ============================================
function crearSubmenuFiltro(titulo, campo, valores, icono) {
    // Extraer valores únicos del array
    const valoresUnicos = [...new Set(tareasData.map(t => t[campo]))];
    
    const subMenuHTML = `
        <div class="fab-submenu" id="fab-submenu-${campo}">
            <div class="fab-submenu-header">
                <span>${icono} Filtrar por ${titulo}</span>
                <button class="fab-submenu-close" id="btn-cerrar-submenu">✕</button>
            </div>
            <div class="fab-submenu-items">
                <button class="fab-submenu-item" data-valor="todos">Todos/as</button>
                ${valoresUnicos.map(valor => `
                    <button class="fab-submenu-item" data-valor="${valor}">${valor}</button>
                `).join('')}
            </div>
        </div>
    `;
    
    const footer = document.querySelector('.footer-fijo');
    if (footer) footer.insertAdjacentHTML('beforebegin', subMenuHTML);
    
    // Event listeners
    document.querySelectorAll(`#fab-submenu-${campo} .fab-submenu-item`).forEach(boton => {
        boton.addEventListener('click', function() {
            const valor = this.getAttribute('data-valor');
            filtrarTareas(campo, valor);
            cerrarSubmenuFiltros();
        });
    });
    
    document.getElementById('btn-cerrar-submenu').addEventListener('click', cerrarSubmenuFiltros);
    
    // Cerrar al hacer clic fuera
    setTimeout(() => {
        document.addEventListener('click', function cerrarFuera(e) {
            const submenu = document.getElementById(`fab-submenu-${campo}`);
            const fabFiltros = document.getElementById('fab-filtros');
            const menuFiltros = document.getElementById('fab-menu-filtros');
            if (submenu && !submenu.contains(e.target) && 
                !fabFiltros.contains(e.target) && 
                (!menuFiltros || !menuFiltros.contains(e.target))) {
                cerrarSubmenuFiltros();
                document.removeEventListener('click', cerrarFuera);
            }
        });
    }, 100);
}

function mostrarFiltroZona() {
    crearSubmenuFiltro('Zona', 'categoria', null, '🏠');
}

function mostrarFiltroResponsable() {
    crearSubmenuFiltro('Responsable', 'responsable', null, '👤');
}

function mostrarFiltroFrecuencia() {
    crearSubmenuFiltro('Frecuencia', 'frecuencia', null, '📅');
}

function mostrarFiltroEstado() {
    crearSubmenuFiltro('Estado', 'estado', null, '✅');
}

function cerrarSubmenuFiltros() {
    document.querySelectorAll('.fab-submenu').forEach(submenu => submenu.remove());
    console.log('✕ Submenú de filtros cerrado');
}

function filtrarTareas(campo, valor) {
    const tareasFiltradas = valor === 'todos' 
        ? tareasData 
        : tareasData.filter(tarea => tarea[campo] === valor);
    
    const filasHTML = tareasFiltradas.map(tarea => {
        const claseFila = tarea.estado === 'completada' ? 'hecha' : '';
        const textoEstado = tarea.estado === 'completada' ? 'Hecha' : 'Pendiente';
        const checked = tarea.estado === 'completada' ? 'checked' : '';
        return `
            <tr class="${claseFila}" data-id="${tarea.id}">
                <td>
                    <input type="checkbox" ${checked} class="task-checkbox">
                    <span>${tarea.nombre}</span>
                </td>
                <td><span class="badge badge-${tarea.categoria}">${tarea.categoria}</span></td>
                <td>${tarea.responsable}</td>
                <td>${tarea.duracion}</td>
                <td>${tarea.frecuencia}</td>
                <td class="fecha-proxima">${tarea.fecha}</td>
                <td class="status">${textoEstado}</td>
            </tr>
        `;
    });
    
    const contenedorTabla = document.getElementById('contenedor-tareas');
    if (contenedorTabla) contenedorTabla.innerHTML = filasHTML.join('');
    
    updateTaskProgress();
    console.log(`✅ Filtradas ${tareasFiltradas.length} tareas por ${campo}: ${valor}`);
}

function renderizarTareas(filtroResponsable = 'todos') {
    const tareasFiltradas = filtroResponsable === 'todos' 
        ? tareasData 
        : tareasData.filter(tarea => tarea.responsable === filtroResponsable);

    const filasHTML = tareasFiltradas.map(tarea => {
        const claseFila = tarea.estado === 'completada' ? 'hecha' : '';
        const textoEstado = tarea.estado === 'completada' ? 'Hecha' : 'Pendiente';
        const checked = tarea.estado === 'completada' ? 'checked' : '';
        return `
            <tr class="${claseFila}" data-id="${tarea.id}">
                <td>
                    <input type="checkbox" ${checked} class="task-checkbox">
                    <span>${tarea.nombre}</span>
                </td>
                <td><span class="badge badge-${tarea.categoria}">${tarea.categoria}</span></td>
                <td>${tarea.responsable}</td>
                <td>${tarea.duracion}</td>
                <td>${tarea.frecuencia}</td>
                <td class="fecha-proxima">${tarea.fecha}</td>
                <td class="status">${textoEstado}</td>
            </tr>
        `;
    });

    const contenedorTabla = document.getElementById('contenedor-tareas');
    if (contenedorTabla) contenedorTabla.innerHTML = filasHTML.join('');

    updateTaskProgress();
    console.log(`✅ Renderizadas ${tareasFiltradas.length} tareas (Filtro: ${filtroResponsable})`);
}