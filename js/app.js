// ============================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================
document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // MODO OSCURO - Cargar preferencia al iniciar
    // ============================================
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeEnabled = localStorage.getItem('ksap_dark_mode') === 'true';

    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }

    // ============================================
    // AUTENTICACIÓN - Verificar sesión
    // ============================================
    const userData = checkAuth();
    if (userData) {
        updateUIForUser(userData);
    }

    // ============================================
    // BOTÓN DE INVITADO (login.html)
    // ============================================
    const guestBtn = document.getElementById('guest-login');
    if (guestBtn) {
        guestBtn.addEventListener('click', function() {
            login('Invitado', true);
        });
    }

    // ============================================
    // FORMULARIO DE LOGIN (login.html)
    // ============================================
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username && password) {
                login(username, false);
            } else {
                alert('Por favor, introduce usuario y contraseña');
            }
            cargarPerfil(); 
        });
    }

    // ============================================
    // MODO OSCURO - Toggle
    // ============================================
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function(e) {
            if (e.target.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('ksap_dark_mode', 'true');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('ksap_dark_mode', 'false');
            }
        });
    }

    // ============================================
    // GPS - Toggle
    // ============================================
    const gpsToggle = document.getElementById('gps-toggle');
    const gpsEnabled = localStorage.getItem('ksap_gps_enabled') === 'true';

    if (gpsEnabled && gpsToggle) {
        gpsToggle.checked = true;
    }

    if (gpsToggle) {
        gpsToggle.addEventListener('change', function(e) {
            if (e.target.checked) {
                localStorage.setItem('ksap_gps_enabled', 'true');
                console.log('📍 GPS activado');
            } else {
                localStorage.setItem('ksap_gps_enabled', 'false');
                console.log('📍 GPS desactivado');
            }
        });
    }

    // ============================================
    // DROPDOWN DEL AVATAR
    // ============================================
    const avatarBtn = document.getElementById('user-avatar-btn');
    const userDropdown = document.getElementById('user-dropdown');

    if (avatarBtn && userDropdown) {
        avatarBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!userDropdown.contains(e.target) && !avatarBtn.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });

        const dropdownLinks = userDropdown.querySelectorAll('a.dropdown-item');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function() {
                userDropdown.classList.remove('active');
            });
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

    // ============================================
    // TAREAS - Checkboxes
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
            updateTaskProgress();
        });
    });

    updateTaskProgress();

    // ============================================
    // COMPRAS - Checkboxes
    // ============================================
    const checkboxesCompras = document.querySelectorAll('.item-checkbox');
    checkboxesCompras.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            const tarjeta = this.closest('.shopping-item');
            if (this.checked) {
                tarjeta.classList.add('comprado');
            } else {
                tarjeta.classList.remove('comprado');
            }
        });
    });

    // ============================================
    // VALIDACIÓN EN TIEMPO REAL (register.html)
    // ============================================

    const inputNombre = document.getElementById('nombre');
    if (inputNombre) {
        inputNombre.addEventListener('input', function() {
            const valor = this.value.trim();
            const errorSpan = document.getElementById('error-nombre');

            if (valor.length > 0) {
                if (valor.split(' ').length < 2) {
                    mostrarError('nombre', 'Introduce nombre y apellido');
                } else {
                    marcarValido('nombre');
                }
            } else {
                if (errorSpan) errorSpan.textContent = '';
                this.classList.remove('error', 'valid');
            }
        });
    }

    const inputEmail = document.getElementById('email');
    if (inputEmail) {
        inputEmail.addEventListener('input', function() {
            const valor = this.value.trim();
            const errorSpan = document.getElementById('error-email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (valor.length > 0) {
                if (!emailRegex.test(valor)) {
                    mostrarError('email', 'Introduce un email válido');
                } else {
                    marcarValido('email');
                }
            } else {
                if (errorSpan) errorSpan.textContent = '';
                this.classList.remove('error', 'valid');
            }
        });
    }

    const inputPassword = document.getElementById('password');
    if (inputPassword) {
        inputPassword.addEventListener('input', function() {
            const valor = this.value;
            const errorSpan = document.getElementById('error-password');
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

            if (valor.length > 0) {
                if (valor.length < 8) {
                    mostrarError('password', 'Mínimo 8 caracteres');
                } else if (!passwordRegex.test(valor)) {
                    mostrarError('password', 'Incluye mayúsculas y números');
                } else {
                    marcarValido('password');
                }
            } else {
                if (errorSpan) errorSpan.textContent = '';
                this.classList.remove('error', 'valid');
            }
        });
    }

    const inputPassword2 = document.getElementById('password2');
    if (inputPassword2) {
        inputPassword2.addEventListener('input', function() {
            const valor = this.value;
            const password = document.getElementById('password').value;
            const errorSpan = document.getElementById('error-password2');

            if (valor.length > 0) {
                if (valor !== password) {
                    mostrarError('password2', 'Las contraseñas no coinciden');
                } else {
                    marcarValido('password2');
                }
            } else {
                if (errorSpan) errorSpan.textContent = '';
                this.classList.remove('error', 'valid');
            }
        });
    }
});

// ============================================
// MENÚ HAMBURGUESA (fuera del DOMContentLoaded)
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

    if (overlay) {
        overlay.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    const navLinks = document.querySelectorAll('nav .nav-left a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
        });
    });

    if (nav) {
        nav.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
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
        } else {
            marcarValido('nombre');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarError('email', 'Introduce un email válido');
            hayErrores = true;
        } else {
            marcarValido('email');
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (password.length < 8) {
            mostrarError('password', 'Mínimo 8 caracteres');
            hayErrores = true;
        } else if (!passwordRegex.test(password)) {
            mostrarError('password', 'Incluye mayúsculas y números');
            hayErrores = true;
        } else {
            marcarValido('password');
        }

        if (password !== password2) {
            mostrarError('password2', 'Las contraseñas no coinciden');
            hayErrores = true;
        } else if (password2 && password2.length > 0) {
            marcarValido('password2');
        }

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
// FUNCIONES AUXILIARES
// ============================================
function mostrarError(campoId, mensaje) {
    const input = document.getElementById(campoId);
    const errorSpan = document.getElementById('error-' + campoId);
    if (input) input.classList.add('error');
    if (input) input.classList.remove('valid');
    if (errorSpan) errorSpan.textContent = mensaje;
}

function marcarValido(campoId) {
    const input = document.getElementById(campoId);
    const errorSpan = document.getElementById('error-' + campoId);
    if (input) input.classList.remove('error');
    if (input) input.classList.add('valid');
    if (errorSpan) errorSpan.textContent = '';
}

function limpiarErrores() {
    const inputs = document.querySelectorAll('.form-control');
    const errores = document.querySelectorAll('.error-message');
    inputs.forEach(input => input.classList.remove('error', 'valid'));
    errores.forEach(error => error.textContent = '');
}

// ============================================
// CONTADOR DE TAREAS
// ============================================
function updateTaskProgress() {
    const checkboxes = document.querySelectorAll('.task-table input[type="checkbox"]');
    const totalTasks = checkboxes.length;
    let completedTasks = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) completedTasks++;
    });

    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const completedText = document.getElementById('tasks-completed');
    const percentageText = document.getElementById('tasks-percentage');
    const progressFill = document.getElementById('progress-fill');

    if (completedText) completedText.textContent = `${completedTasks} de ${totalTasks} tareas completadas`;
    if (percentageText) percentageText.textContent = `${percentage}%`;
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
        if (percentage === 100) {
            progressFill.classList.add('complete');
        } else {
            progressFill.classList.remove('complete');
        }
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
        const addButtons = document.querySelectorAll('.btn-primary, .btn-add');
        addButtons.forEach(btn => btn.style.display = 'none');

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
    if (originalLoginBtn) {
        originalLoginBtn.style.display = 'none';
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
}

// ============================================
// ACTUALIZAR UI DEL AVATAR
// ============================================
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
// ============================================
// CARGAR PERFIL REAL (perfil.html)
// ============================================
function cargarPerfil() {
    const userStr = localStorage.getItem('ksap_user');
    if (!userStr) return;

    const user = JSON.parse(userStr);

    // Elementos del DOM
    const perfilNombre = document.getElementById('perfil-nombre');
    const perfilEmail = document.getElementById('perfil-email');
    const perfilFecha = document.getElementById('perfil-fecha');
    const perfilRol = document.getElementById('perfil-rol');

    // Rellenar con datos reales
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

    // Actualizar avatar de la cabecera del perfil (si existe)
    const profileAvatar = document.getElementById('profile-avatar');
    if (profileAvatar) {
        const initials = (user.username || 'U').substring(0, 2).toUpperCase();
        profileAvatar.textContent = initials;
    }
}