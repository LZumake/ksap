// Esperar a que la página cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // LÓGICA PARA LA TABLA DE TAREAS (tareas.html)
    // ============================================
    const checkboxesTareas = document.querySelectorAll('.task-table input[type="checkbox"]');
    
    checkboxesTareas.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            const fila = this.closest('tr');
            const estadoTexto = fila.querySelector('.status');
            
            if (this.checked) {
                fila.classList.add('hecha');
                if (estadoTexto) estadoTexto.textContent = 'Hecha';
            } else {
                fila.classList.remove('hecha');
                if (estadoTexto) estadoTexto.textContent = 'Pendiente';
            }
        });
    });
    
    // ============================================
    // LÓGICA PARA LAS TARJETAS DE COMPRAS (compras.html)
    // ============================================
    const checkboxesCompras = document.querySelectorAll('.item-checkbox');
    
    checkboxesCompras.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            // Encontrar la tarjeta completa (shopping-item) que contiene este checkbox
            const tarjeta = this.closest('.shopping-item');
            // Encontrar el nombre del producto dentro de esa tarjeta
            const nombreProducto = tarjeta.querySelector('.item-name');
            
            if (this.checked) {
                tarjeta.classList.add('comprado');
            } else {
                tarjeta.classList.remove('comprado');
            }
        });
    });
});
// ============================================
// MENÚ HAMBURGUESA CON OVERLAY
// ============================================
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');
const overlay = document.getElementById('overlay');

if (hamburger) {
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        nav.classList.toggle('open');
        if (overlay) overlay.classList.toggle('active');
    });
    
    // Cerrar al hacer clic en el overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    // Cerrar al hacer clic en un enlace del menú
    const navLinks = document.querySelectorAll('nav .nav-left a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
        });
    });
    
    // Evitar que el clic en el nav cierre el menú
    if (nav) {
        nav.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}
// ============================================
// VALIDACIÓN DE FORMULARIO DE REGISTRO
// ============================================

const formularioRegistro = document.querySelector('form');

if (formularioRegistro) {
    formularioRegistro.addEventListener('submit', function(e) {
        // Prevenimos que el formulario se envíe (recargue la página)
        e.preventDefault();
        
        // Limpiamos errores anteriores
        limpiarErrores();
        
        // Obtenemos los valores de los inputs
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const password2 = document.getElementById('password2').value;
        
        // Variable para trackear si hay errores
        let hayErrores = false;
        
        // VALIDACIÓN 1: El nombre debe tener al menos 2 palabras (nombre + apellido)
        if (nombre.split(' ').length < 2) {
            mostrarError('nombre', 'Por favor, introduce tu nombre y apellido');
            hayErrores = true;
        } else {
            marcarValido('nombre');
        }
        
        // VALIDACIÓN 2: El email debe tener formato válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarError('email', 'Introduce un email válido (ej: usuario@correo.com)');
            hayErrores = true;
        } else {
            marcarValido('email');
        }
        
        // VALIDACIÓN 3: La contraseña debe tener al menos 8 caracteres
        if (password.length < 8) {
            mostrarError('password', 'La contraseña debe tener al menos 8 caracteres');
            hayErrores = true;
        } else {
            marcarValido('password');
        }
        
        // VALIDACIÓN 4: Las contraseñas deben coincidir
        if (password !== password2) {
            mostrarError('password2', 'Las contraseñas no coinciden');
            hayErrores = true;
        } else if (password2.length > 0) {
            marcarValido('password2');
        }
        
        // Si no hay errores, simulamos el registro exitoso
        if (!hayErrores) {
            // Aquí iría la llamada al backend (por ahora solo mostramos mensaje)
            alert('¡Registro exitoso! Bienvenido/a ' + nombre.split(' ')[0]);
            formularioRegistro.reset(); // Limpiamos el formulario
        }
    });
}

// Función para mostrar un error en un campo específico
function mostrarError(campoId, mensaje) {
    const input = document.getElementById(campoId);
    const errorSpan = document.getElementById('error-' + campoId);
    
    input.classList.add('error');
    input.classList.remove('valid');
    errorSpan.textContent = mensaje;
}

// Función para marcar un campo como válido
function marcarValido(campoId) {
    const input = document.getElementById(campoId);
    const errorSpan = document.getElementById('error-' + campoId);
    
    input.classList.remove('error');
    input.classList.add('valid');
    errorSpan.textContent = '';
}

// Función para limpiar todos los errores
function limpiarErrores() {
    const inputs = document.querySelectorAll('.form-control');
    const errores = document.querySelectorAll('.error-message');
    
    inputs.forEach(input => {
        input.classList.remove('error', 'valid');
    });
    
    errores.forEach(error => {
        error.textContent = '';
    });
}
// ============================================
// CONTADOR DE TAREAS COMPLETADAS
// ============================================

function updateTaskProgress() {
    // Obtener todos los checkboxes de la tabla de tareas
    const checkboxes = document.querySelectorAll('.task-table input[type="checkbox"]');
    const totalTasks = checkboxes.length;
    
    // Contar cuántas están marcadas
    let completedTasks = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            completedTasks++;
        }
    });
    
    // Calcular porcentaje
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    // Actualizar el texto
    const completedText = document.getElementById('tasks-completed');
    const percentageText = document.getElementById('tasks-percentage');
    const progressFill = document.getElementById('progress-fill');
    
    if (completedText) {
        completedText.textContent = `${completedTasks} de ${totalTasks} tareas completadas`;
    }
    
    if (percentageText) {
        percentageText.textContent = `${percentage}%`;
    }
    
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
        
        // Si están todas completadas, la barra se pone verde
        if (percentage === 100) {
            progressFill.classList.add('complete');
        } else {
            progressFill.classList.remove('complete');
        }
    }
}

// Añadir event listeners a todos los checkboxes de tareas
const taskCheckboxes = document.querySelectorAll('.task-table input[type="checkbox"]');
taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateTaskProgress);
});

// Llamar a la función al cargar la página para inicializar
updateTaskProgress();
// ============================================
// SISTEMA DE LOGIN Y SESIÓN
// ============================================

// Función para iniciar sesión
function login(username, isGuest = false) {
    const userData = {
        username: username,
        isGuest: isGuest,
        loginTime: new Date().toISOString()
    };
    
    // Guardar en localStorage
    localStorage.setItem('ksap_user', JSON.stringify(userData));
    
    // Redirigir al index
    window.location.href = 'index.html';
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('ksap_user');
    window.location.href = 'login.html';
}

// Función para verificar si hay sesión activa
function checkAuth() {
    const user = localStorage.getItem('ksap_user');
    
    // Si estamos en login.html y hay sesión, redirigir al index
    if (window.location.pathname.includes('login.html') && user) {
        window.location.href = 'index.html';
        return;
    }
    
    // Si NO estamos en login.html y NO hay sesión, redirigir al login
    if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html') && !user) {
        window.location.href = 'login.html';
        return false;
    }
    
    return user ? JSON.parse(user) : null;
}

// Función para actualizar UI según el tipo de usuario
function updateUIForUser(userData) {
    if (!userData) return;
    
    // Si es invitado, ocultar botones de añadir
    if (userData.isGuest) {
        const addButtons = document.querySelectorAll('.btn-primary, .btn-add');
        addButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Añadir aviso de modo invitado
        const mainContent = document.querySelector('main');
        if (mainContent && !document.querySelector('.guest-notice')) {
            const notice = document.createElement('div');
            notice.className = 'guest-notice';
            notice.innerHTML = '👤 Modo invitado - Inicia sesión para editar';
            mainContent.insertBefore(notice, mainContent.firstChild);
        }
    }
    
    // Actualizar el menú con el botón de cerrar sesión
    updateNavMenu(userData);
}

// Actualizar el menú de navegación
function updateNavMenu(userData) {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    // Buscar o crear el botón de logout en el menú
    let logoutBtn = nav.querySelector('.logout-btn');
    
    if (!logoutBtn) {
        // Crear el botón de logout
        logoutBtn = document.createElement('a');
        logoutBtn.href = '#';
        logoutBtn.className = 'logout-btn';
        logoutBtn.innerHTML = '🚪 Cerrar Sesión';
        logoutBtn.style.cssText = 'margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 1rem;';
        
        // Añadir al menú (dentro de nav-left si existe)
        const navLeft = nav.querySelector('.nav-left');
        if (navLeft) {
            navLeft.appendChild(logoutBtn);
        } else {
            nav.appendChild(logoutBtn);
        }
        
        // Añadir event listener
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
    
    // Mostrar/ocultar botón de login original
    const originalLoginBtn = nav.querySelector('.btn-login');
    if (originalLoginBtn) {
        originalLoginBtn.style.display = 'none';
    }
}

// Event listener para el formulario de login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Validación básica (aquí podrías añadir más validaciones)
        if (username && password) {
            login(username, false);
        } else {
            alert('Por favor, introduce usuario y contraseña');
        }
    });
}

// Event listener para el botón de invitado
const guestBtn = document.getElementById('guest-login');
if (guestBtn) {
    guestBtn.addEventListener('click', function() {
        login('Invitado', true);
    });
}

// Inicializar la autenticación al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const userData = checkAuth();
    if (userData) {
        updateUIForUser(userData);
    }
});
// ============================================
// DROPDOWN DEL AVATAR DE USUARIO
// ============================================
const avatarBtn = document.getElementById('user-avatar-btn');
const userDropdown = document.getElementById('user-dropdown');

// Función para actualizar las iniciales y nombre según el usuario logueado
function updateAvatarUI() {
    const userStr = localStorage.getItem('ksap_user');
    if (userStr) {
        const user = JSON.parse(userStr);
        const name = user.username || 'Usuario';
        const initials = name.substring(0, 2).toUpperCase();
        
        // Actualizar textos
        const dropdownName = document.getElementById('dropdown-name');
        const dropdownEmail = document.getElementById('dropdown-email');
        const avatarInitials = document.getElementById('avatar-initials');
        const dropdownAvatar = document.getElementById('dropdown-avatar');
        
        if (dropdownName) dropdownName.textContent = name;
        if (dropdownEmail) dropdownEmail.textContent = user.isGuest ? 'Modo invitado' : `${name.toLowerCase()}@ksap.app`;
        if (avatarInitials) avatarInitials.textContent = initials;
        if (dropdownAvatar) dropdownAvatar.textContent = initials;
    }
}

if (avatarBtn && userDropdown) {
    // Abrir/cerrar dropdown al hacer clic en el avatar
    avatarBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
    });

    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!userDropdown.contains(e.target) && !avatarBtn.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });

    // Cerrar dropdown al hacer clic en un enlace
    const dropdownLinks = userDropdown.querySelectorAll('a.dropdown-item');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            userDropdown.classList.remove('active');
        });
    });
    
    // Actualizar UI al cargar
    updateAvatarUI();
}