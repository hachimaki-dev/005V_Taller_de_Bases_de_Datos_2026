# LINEAMIENTOS — Plataforma Docente Taller de Bases de Datos

Documento de referencia para que una IA (o un humano) pueda crear nuevas sesiones
siguiendo exactamente el mismo patrón de arquitectura, diseño y contenido.

## Datos del Proyecto

- **Curso:** Taller de Bases de Datos (Oracle PL/SQL)
- **Autor:** https://github.com/hachimaki-dev
- **Stack:** HTML5 + Vue 3 (CDN) + Vanilla CSS
- **Base de datos de referencia:** `clon_punto_ticket.sql` (en la raíz del repositorio)

## Principios de Diseño

### Visual
- **Presentaciones:** Fondo blanco (#FFFFFF), texto negro (#1a1a2e), acentos en colores pastel
- **Tipografía:** Inter (Google Fonts), tamaño base 24px en proyección
- **Iconos:** Phosphor Icons (CDN)
- **Marca:** Emoji 👽 (alien) como sello en slides de título y separadores
- **NO usar texto decorativo innecesario (AI slop)**. Ser directo y profesional.

### Pedagógico (DUA — Diseño Universal de Aprendizaje)
- Cada concepto se presenta con:
  1. **Explicación técnica formal** (caja azul `concept-box`)
  2. **Analogía o explicación cotidiana** (caja amarilla `analogy-box`) accesible para NEE
- Código siempre con comentarios línea a línea
- Colores semánticos consistentes: verde = correcto, rojo = error, azul = sintaxis, morado = funciones
- Los ejercicios usan formatos variados para diferentes estilos de aprendizaje

### Contenido
- Los ejemplos no genéricos DEBEN usar las tablas de Punto Ticket
- Tablas principales: CLIENTE, EVENTO, LOCALIDAD_EVENTO, RESERVA_TEMPORAL, TRANSACCION_PAGO, TICKET, LOG_CAMBIO_PRECIO, LOG_ANULACIONES
- Datos de ejemplo ya cargados en clon_punto_ticket.sql (clientes: Valentina Soto, Diego Morales, etc.)

## Arquitectura de Archivos

```
plataforma-docente/
├── index.html                    # Shell HTML (cargar nuevos scripts aquí)
├── css/
│   ├── app.css                   # Layout, sidebar, dashboard
│   ├── slides.css                # Presentaciones proyectables
│   └── exercises.css             # Ejercicios interactivos
├── js/
│   ├── app.js                    # App Vue + dataMap (registrar nuevos archivos aquí)
│   ├── components/
│   │   ├── SlideViewer.js        # Presentaciones con fullscreen y teclado
│   │   └── ExerciseRunner.js     # Motor de ejercicios (todos los tipos)
│   └── data/
│       ├── course-structure.js   # Estructura del curso (registrar sesiones aquí)
│       ├── s{U}_{S}_{N}_slides.js      # Slides de cada sesión
│       ├── s{U}_{S}_{N}_exercises.js   # Ejercicios de cada sesión
│       └── s{U}_{S}_{N}_solutions.js   # Solucionario de cada sesión
└── LINEAMIENTOS.md               # Este archivo
```

## Cómo Agregar una Nueva Sesión

### Paso 1: Crear los archivos de datos

Crear 3 archivos en `js/data/`:
- `s{U}_{S}_{N}_slides.js` — Array de objetos slide
- `s{U}_{S}_{N}_exercises.js` — Array de objetos exercise
- `s{U}_{S}_{N}_solutions.js` — Array de objetos solution

Donde `{U}` es la unidad, `{S}` la subunidad y `{N}` el número de sesión.
Ejemplo: `s2_1_1_slides.js` para Unidad 2.1, Sesión 1.

### Paso 2: Registrar en course-structure.js

Agregar la sesión al módulo correspondiente (o crear uno nuevo):

```javascript
{
    id: '2-1-1',
    title: 'Sesión 1: Nombre del Tema',
    slidesFile: 's2_1_1_slides',
    exercisesFile: 's2_1_1_exercises',
    solutionsFile: 's2_1_1_solutions'
}
```

### Paso 3: Registrar en app.js (dataMap)

Agregar las 3 entradas al objeto `dataMap`:

```javascript
s2_1_1_slides: () => s2_1_1_slides,
s2_1_1_exercises: () => s2_1_1_exercises,
s2_1_1_solutions: () => s2_1_1_solutions,
```

### Paso 4: Cargar en index.html

Agregar los 3 `<script>` antes del cierre de `</body>`:

```html
<script src="js/data/s2_1_1_slides.js"></script>
<script src="js/data/s2_1_1_exercises.js"></script>
<script src="js/data/s2_1_1_solutions.js"></script>
```

## Formato de Datos

### Slides (Presentaciones)

```javascript
const s{U}_{S}_{N}_slides = [
    {
        class: 'title-slide',   // Opcional: 'title-slide' para la portada
        html: `
            <h1>Título</h1>
            <p>Contenido HTML</p>
            <div class="concept-box">Explicación técnica</div>
            <div class="analogy-box">Explicación accesible</div>
            <div class="warning-box">Advertencia</div>
            <div class="tip-box">Consejo</div>
            <pre>Código con spans de clase: kw, fn, str, cm, err, num</pre>
        `
    }
];
```

### Ejercicios

Tipos disponibles:

| Tipo | Campos requeridos |
|------|-------------------|
| `multiple-choice` | `question`, `options` (array de strings HTML) |
| `multiple-select` | `question`, `options` (array, múltiples correctas) |
| `true-false` | `question` |
| `fill-code` | `question`, `parts` (array de `{type:'text',content}` y `{type:'blank',index,placeholder,width}`) |
| `find-error` | `question`, `lines` (array de strings, cada línea del código) |
| `crossword` | `question`, `acrossClues`, `downClues` (arrays de `{number,clue,length}`) |
| `word-search` | `question`, `gridSize`, `words`, `grid` (array de `{letter}`) |
| `proposed` | `question`, `content` (HTML con el enunciado) |

Todos deben tener `id` único (ej: `e5-mc1`) y `type`.

### Soluciones

```javascript
{
    id: 'e5-mc1',           // Debe coincidir con el id del ejercicio
    answer: 1,               // Índice de la opción correcta (0-based) o true/false
    explanation: 'HTML...',   // Feedback corto mostrado después de verificar
    fullSolution: 'HTML...'   // Solución completa mostrada al hacer clic en "Mostrar solución"
}
```

Para `fill-code`: usar `answers` (array de strings, uno por blank).
Para `find-error`: `answer` es el índice de la línea con el error (0-based).

## Distribución Recomendada de Ejercicios por Sesión

- 3 alternativas (multiple-choice)
- 2 verdadero/falso (true-false)
- 2 completar código (fill-code)
- 2 identificar error (find-error)
- 1 crucigrama O sopa de letras
- 2 ejercicios propuestos (proposed) usando Punto Ticket
