// ============================================
// BUSCADOR CON AUTOCOMPLETADO - OPEN FOOD FACTS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('product-search');
    const suggestionsBox = document.getElementById('search-suggestions');
    let debounceTimer;

        // ============================================
    // LÓGICA DEL MODAL
    // ============================================
    const modalOverlay = document.getElementById('modal-add-product');
    const modalClose = document.getElementById('modal-close');
    const modalCancel = document.getElementById('modal-cancel');
    const modalConfirm = document.getElementById('modal-confirm');
    const modalProductName = document.getElementById('modal-product-name');
    const modalQuantity = document.getElementById('modal-quantity');
    const modalUnit = document.getElementById('modal-unit');
    const modalBuyer = document.getElementById('modal-buyer');

    let productoTemporal = null; // Para guardar qué producto estamos añadiendo

    function abrirModal(nombre, categoria) {
        productoTemporal = { nombre, categoria };
        modalProductName.textContent = nombre;
        modalQuantity.value = 1; // Resetear cantidad
        modalUnit.value = 'ud';  // Resetear unidad
        modalBuyer.value = 'Tú'; // Resetear comprador
        modalOverlay.classList.add('active');
    }

    function cerrarModal() {
        modalOverlay.classList.remove('active');
        productoTemporal = null;
    }

    // Eventos para cerrar el modal
    if (modalClose) modalClose.addEventListener('click', cerrarModal);
    if (modalCancel) modalCancel.addEventListener('click', cerrarModal);
    
    // Cerrar al hacer clic fuera del contenido
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) cerrarModal();
        });
    }

    // Evento para confirmar y añadir
    if (modalConfirm) {
        modalConfirm.addEventListener('click', function() {
            if (productoTemporal) {
                const cantidad = modalQuantity.value;
                const unidad = modalUnit.value;
                const comprador = modalBuyer.value;
                
                añadirProductoAlaLista(
                    productoTemporal.nombre, 
                    productoTemporal.categoria,
                    cantidad,
                    unidad,
                    comprador
                );
                cerrarModal();
            }
        });
    }
    // ============================================
    // DATOS MOCK (simulados) - Para pruebas
    // ============================================
    const productosMock = [
        {
            product_name: 'Leche entera',
            brands: 'Hacendado',
            categories_tags: ['en:dairies']
        },
        {
            product_name: 'Leche semidesnatada',
            brands: 'Pascual',
            categories_tags: ['en:dairies']
        },
        {
            product_name: 'Leche desnatada',
            brands: 'Central Lechera Asturiana',
            categories_tags: ['en:dairies']
        },
        {
            product_name: 'Manzanas',
            brands: '',
            categories_tags: ['en:fruits']
        },
        {
            product_name: 'Plátanos',
            brands: '',
            categories_tags: ['en:fruits']
        },
        {
            product_name: 'Tomates',
            brands: '',
            categories_tags: ['en:vegetables']
        },
        {
            product_name: 'Yogures naturales',
            brands: 'Danone',
            categories_tags: ['en:dairies']
        },
        {
            product_name: 'Queso manchego',
            brands: 'El Pastor',
            categories_tags: ['en:dairies']
        },
        {
            product_name: 'Detergente ropa',
            brands: 'Bosque Verde',
            categories_tags: ['en:cleaning-products']
        },
        {
            product_name: 'Papel higiénico',
            brands: 'Lotus',
            categories_tags: ['en:hygiene']
        },
        {
            product_name: 'Pechugas de pollo',
            brands: '',
            categories_tags: ['en:meats']
        },
        {
            product_name: 'Carne picada',
            brands: '',
            categories_tags: ['en:meats']
        },
        {
            product_name: 'Pan de molde',
            brands: 'Bimbo',
            categories_tags: ['en:breads']
        },
        {
            product_name: 'Arroz',
            brands: 'Bomba',
            categories_tags: ['en:grains']
        },
        {
            product_name: 'Pasta',
            brands: 'Gallo',
            categories_tags: ['en:grains']
        }
    ];

    if (searchInput && suggestionsBox) {
        // Escuchar cuando el usuario escribe
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.trim();
            
            // Limpiar timer anterior
            clearTimeout(debounceTimer);
            
            // Si está vacío, ocultar sugerencias
            if (query.length < 2) {
                suggestionsBox.classList.remove('active');
                return;
            }
            
            // Esperar 300ms después de dejar de escribir (debounce)
            debounceTimer = setTimeout(() => {
                buscarProductos(query);
            }, 300);
        });

        // Cerrar sugerencias al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
                suggestionsBox.classList.remove('active');
            }
        });
    }

    // ============================================
    // Función para buscar productos
    // ============================================
    async function buscarProductos(query) {
        try {
            // Mostrar loading
            suggestionsBox.innerHTML = '<div class="search-loading">Buscando...</div>';
            suggestionsBox.classList.add('active');

            // ============================================
            // MODO MOCK (activado)
            // ============================================
            // Filtrar productos mock que coincidan con la búsqueda
            const resultados = productosMock.filter(producto => 
                producto.product_name.toLowerCase().includes(query.toLowerCase()) ||
                (producto.brands && producto.brands.toLowerCase().includes(query.toLowerCase()))
            );

            // Simular delay de red (300ms)
            await new Promise(resolve => setTimeout(resolve, 300));

            // Mostrar resultados
            mostrarSugerencias(resultados);

            // ============================================
            // MODO API REAL (desactivado - descomentar cuando funcione)
            // ============================================
            /*
            const response = await fetch(
                `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=10&lc=es&tags_lc=es`
            );
            
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }

            const data = await response.json();
            
            // Mostrar resultados
            mostrarSugerencias(data.products);
            */

        } catch (error) {
            console.error('Error al buscar productos:', error);
            suggestionsBox.innerHTML = '<div class="search-no-results">Error al buscar. Intenta de nuevo.</div>';
        }
    }

    // ============================================
    // Función para mostrar las sugerencias
    // ============================================
    function mostrarSugerencias(productos) {
        if (!productos || productos.length === 0) {
            suggestionsBox.innerHTML = '<div class="search-no-results">No se encontraron productos</div>';
            return;
        }

        // Limpiar el contenedor
        suggestionsBox.innerHTML = '';

        // Crear un elemento por cada producto
        productos.forEach(producto => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            
            const nombre = producto.product_name || 'Producto sin nombre';
            const marca = producto.brands || '';
            const categoria = producto.categories_tags?.[0]?.split(',').pop()?.replace('-', ' ') || 'General';

            item.innerHTML = `
                <span class="product-name">${highlightText(nombre, searchInput.value)}</span>
                ${marca ? `<span class="product-brand">${marca}</span>` : ''}
                <span class="product-category">${categoria}</span>
            `;

            // Al hacer clic en una sugerencia -> ABRIR MODAL
            item.addEventListener('click', function() {
                console.log('Producto seleccionado:', nombre, 'Categoría:', categoria);
                abrirModal(nombre, categoria); // <--- CAMBIO AQUÍ
            });

            suggestionsBox.appendChild(item);
        });
    }

    // ============================================
    // Función para resaltar el texto buscado
    // ============================================
    function highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }

        // ============================================
    // Función para añadir producto a la lista
    // ============================================
    function añadirProductoAlaLista(nombre, categoria, cantidad = 1, unidad = 'ud', comprador = 'Tú') {
        // Mapear categoría de la API a nuestras secciones
        const seccion = mapearCategoria(categoria);
        
        // Buscar el contenedor de la sección
        const seccionElement = document.querySelector(`.shopping-category .category-header.${seccion}`);
        
        if (!seccionElement) {
            console.error('No se encontró la sección:', seccion);
            return;
        }

        const contenedorSeccion = seccionElement.parentElement;

        // Crear el nuevo item
        const nuevoItem = document.createElement('div');
        nuevoItem.className = 'shopping-item';
        nuevoItem.innerHTML = `
            <div class="item-left">
                <input type="checkbox" class="item-checkbox">
                <span class="item-name">${nombre}</span>
            </div>
            <div class="item-right">
                <span class="item-quantity">${cantidad} ${unidad}</span>
                <span class="item-buyer">${comprador}</span>
            </div>
        `;
        
        contenedorSeccion.appendChild(nuevoItem);
        
        // Activar el checkbox del nuevo item
        const checkbox = nuevoItem.querySelector('.item-checkbox');
        checkbox.addEventListener('change', function() {
            const tarjeta = this.closest('.shopping-item');
            if (this.checked) {
                tarjeta.classList.add('comprado');
            } else {
                tarjeta.classList.remove('comprado');
            }
        });
        
        console.log(`✅ Producto "${nombre}" (${cantidad} ${unidad}) añadido a ${seccion} para ${comprador}`);
    }
        });
        
    // ============================================
    // Función para mapear categorías de la API
    // ============================================
    function mapearCategoria(categoriaApi) {
        if (!categoriaApi) return 'fruteria'; // Por defecto
        
        const categoria = categoriaApi.toLowerCase();
        
        if (categoria.includes('dairies') || categoria.includes('milk')) {
            return 'lacteos';
        } else if (categoria.includes('fruits') || categoria.includes('vegetables')) {
            return 'fruteria';
        } else if (categoria.includes('meats') || categoria.includes('fish')) {
            return 'carniceria';
        } else if (categoria.includes('cleaning') || categoria.includes('hygiene')) {
            return 'limpieza';
        }
        
        return 'fruteria'; // Por defecto
    }
