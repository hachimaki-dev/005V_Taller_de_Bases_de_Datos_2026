// s1_2_2_slides.js — Ciclos Anidados con Cursores en PL/SQL
// Presentación para proyectar en datashow

const s1_2_2_slides = [
    {
        class: 'title-slide',
        html: `
            <h1>Ciclos Anidados en PL/SQL</h1>
            <p class="subtitle">Unidad 1.2 — Sesión 2</p>
            <p class="subtitle">Taller de Bases de Datos</p>
            <div class="alien-separator">👽</div>
        `
    },
    {
        html: `
            <h2>¿Qué es un Ciclo Anidado?</h2>
            <div class="concept-box">
                <strong>Definición técnica:</strong> Un ciclo anidado es una estructura de control donde un bucle (bucle interior o hijo) se ejecuta completamente dentro de cada iteración de otro bucle (bucle exterior o padre).
            </div>
            <div class="analogy-box">
                <strong>Para entenderlo mejor:</strong> Imagina una caja con varios álbumes de fotos. El bucle exterior toma un álbum a la vez. El bucle interior revisa cada una de las fotos de ese álbum antes de pasar al siguiente álbum.
            </div>
        `
    },
    {
        html: `
            <h2>Patrón Maestro - Detalle</h2>
            <div class="concept-box">
                Es la aplicación más común de ciclos anidados en bases de datos:
                <ul>
                    <li><strong>Nivel Maestro (Padre):</strong> Entidad principal (ej: Eventos, Facturas, Productores).</li>
                    <li><strong>Nivel Detalle (Hijo):</strong> Registros asociados al maestro (ej: Localidades del evento, Líneas de factura, Eventos de la productora).</li>
                </ul>
            </div>
            <p>Por cada registro maestro que lee el cursor exterior, el cursor interior se abre para procesar exclusivamente sus detalles correspondientes.</p>
        `
    },
    {
        html: `
            <h2>Estructura con Cursor Parametrizado Anidado</h2>
<pre><span class="kw">DECLARE</span>
    <span class="cm">-- Cursor Maestro</span>
    <span class="kw">CURSOR</span> c_eventos <span class="kw">IS</span>
        <span class="kw">SELECT</span> evento_id, nombre <span class="kw">FROM</span> EVENTO;

    <span class="cm">-- Cursor Detalle parametrizado por el ID del maestro</span>
    <span class="kw">CURSOR</span> c_localidades(p_evento_id <span class="kw">NUMBER</span>) <span class="kw">IS</span>
        <span class="kw">SELECT</span> nombre_localidad, precio, stock_disponible
        <span class="kw">FROM</span> LOCALIDAD_EVENTO
        <span class="kw">WHERE</span> evento_id = p_evento_id;
<span class="kw">BEGIN</span>
    <span class="kw">FOR</span> ev <span class="kw">IN</span> c_eventos <span class="kw">LOOP</span>
        DBMS_OUTPUT.PUT_LINE(<span class="str">'=== EVENTO: '</span> || ev.nombre || <span class="str">' ==='</span>);

        <span class="kw">FOR</span> loc <span class="kw">IN</span> c_localidades(ev.evento_id) <span class="kw">LOOP</span>
            DBMS_OUTPUT.PUT_LINE(<span class="str">'   -> '</span> || loc.nombre_localidad || <span class="str">': $'</span> || loc.precio);
        <span class="kw">END LOOP</span>;
    <span class="kw">END LOOP</span>;
<span class="kw">END;</span></pre>
        `
    },
    {
        html: `
            <h2>Acumuladores y Contadores por Nivel</h2>
            <div class="warning-box">
                <strong>Regla de oro:</strong> Las variables que totalizan información de un registro maestro (ej: subtotal por evento) <strong>deben reiniciarse a cero dentro del bucle exterior</strong>, justo antes de comenzar el bucle interior.
            </div>
<pre><span class="kw">DECLARE</span>
    v_total_evento <span class="kw">NUMBER</span>;
<span class="kw">BEGIN</span>
    <span class="kw">FOR</span> ev <span class="kw">IN</span> c_eventos <span class="kw">LOOP</span>
        v_total_evento := <span class="num">0</span>; <span class="cm">-- ¡REINICIO OBLIGATORIO AQUÍ!</span>

        <span class="kw">FOR</span> loc <span class="kw">IN</span> c_localidades(ev.evento_id) <span class="kw">LOOP</span>
            v_total_evento := v_total_evento + loc.stock_disponible;
        <span class="kw">END LOOP</span>;

        DBMS_OUTPUT.PUT_LINE(ev.nombre || <span class="str">' - Capacidad Total: '</span> || v_total_evento);
    <span class="kw">END LOOP</span>;
<span class="kw">END;</span></pre>
        `
    },
    {
        html: `
            <h2>Ciclos Anidados en Punto Ticket: Clientes y sus Compras</h2>
            <p>Listar cada cliente y el detalle de todos sus tickets emitidos:</p>
<pre><span class="kw">DECLARE</span>
    <span class="kw">CURSOR</span> c_clientes <span class="kw">IS</span>
        <span class="kw">SELECT</span> cliente_id, nombre, apellido <span class="kw">FROM</span> CLIENTE;

    <span class="kw">CURSOR</span> c_tickets(p_cli_id <span class="kw">NUMBER</span>) <span class="kw">IS</span>
        <span class="kw">SELECT</span> codigo_ticket, precio_pagado, estado
        <span class="kw">FROM</span> TICKET
        <span class="kw">WHERE</span> cliente_id = p_cli_id;

    v_gastado <span class="kw">NUMBER</span>;
<span class="kw">BEGIN</span>
    <span class="kw">FOR</span> cli <span class="kw">IN</span> c_clientes <span class="kw">LOOP</span>
        v_gastado := <span class="num">0</span>;
        DBMS_OUTPUT.PUT_LINE(<span class="str">'Cliente: '</span> || cli.nombre || <span class="str">' '</span> || cli.apellido);

        <span class="kw">FOR</span> tk <span class="kw">IN</span> c_tickets(cli.cliente_id) <span class="kw">LOOP</span>
            v_gastado := v_gastado + tk.precio_pagado;
            DBMS_OUTPUT.PUT_LINE(<span class="str">'  - Ticket: '</span> || tk.codigo_ticket || <span class="str">' ($'</span> || tk.precio_pagado || <span class="str">')'</span>);
        <span class="kw">END LOOP</span>;

        DBMS_OUTPUT.PUT_LINE(<span class="str">'Total invertido por cliente: $'</span> || v_gastado);
    <span class="kw">END LOOP</span>;
<span class="kw">END;</span></pre>
        `
    },
    {
        html: `
            <h2>Control de Flujo: EXIT y CONTINUE en Anidados</h2>
            <table>
                <tr><th>Instrucción</th><th>Comportamiento</th></tr>
                <tr><td><code>EXIT</code></td><td>Termina inmediatamente el bucle donde se encuentra (si está en el interior, vuelve al exterior)</td></tr>
                <tr><td><code>CONTINUE</code></td><td>Salta a la siguiente iteración del bucle actual</td></tr>
            </table>
            <div class="tip-box">
                Puedes etiquetar los bucles con <code>&lt;&lt;bucle_padre&gt;&gt;</code> para hacer <code>EXIT bucle_padre WHEN condicion;</code> desde el bucle interior.
            </div>
        `
    },
    {
        html: `
            <h2>¿Cuándo usar Ciclos Anidados vs un solo JOIN?</h2>
            <table>
                <tr><th>Ciclos Anidados</th><th>Un solo JOIN masivo</th></tr>
                <tr><td>Lógica de negocio procedural compleja por cada entidad</td><td>Reportes planos y consultas puramente declarativas</td></tr>
                <tr><td>Transacciones por lotes (COMMIT parcial por maestro)</td><td>Alto rendimiento en conjuntos grandes de datos sin lógica intermedia</td></tr>
                <tr><td>Estructura jerárquica con cabecera y pie de página</td><td>Agrupaciones sencillas en SQL</td></tr>
            </table>
        `
    },
    {
        html: `
            <h2>Resumen</h2>
            <table>
                <tr><th>Aspecto</th><th>Qué recordar</th></tr>
                <tr><td>Bucle Exterior</td><td>Recorre entidades maestras (1 vez por entidad)</td></tr>
                <tr><td>Bucle Interior</td><td>Recorre registros detalle correspondientes al registro maestro actual</td></tr>
                <tr><td>Cursores Parametrizados</td><td>Pasan la clave primaria del maestro al cursor hijo</td></tr>
                <tr><td>Acumuladores</td><td>Deben inicializarse dentro del bucle exterior para cada maestro</td></tr>
            </table>
            <div class="alien-separator">👽</div>
            <p style="text-align:center;color:#94a3b8;font-size:0.85em;">Siguiente: Guía de ejercicios y solucionarios</p>
        `
    }
];
