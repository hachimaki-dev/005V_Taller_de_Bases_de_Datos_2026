// s1_2_1_slides.js — Cursores Complejos en PL/SQL
// Presentación para proyectar en datashow

const s1_2_1_slides = [
    {
        class: 'title-slide',
        html: `
            <h1>Cursores Complejos en PL/SQL</h1>
            <p class="subtitle">Unidad 1.2 — Sesión 1</p>
            <p class="subtitle">Taller de Bases de Datos</p>
            <div class="alien-separator">👽</div>
        `
    },
    {
        html: `
            <h2>¿Qué es un Cursor Complejo?</h2>
            <div class="concept-box">
                <strong>Definición técnica:</strong> Un cursor complejo es un cursor explícito cuya consulta SQL integra múltiples tablas mediante <code>JOIN</code>, subconsultas, agrupaciones (<code>GROUP BY</code>, <code>HAVING</code>), funciones de agregación, o bien recibe <strong>parámetros</strong> para filtrar dinámicamente el conjunto de datos.
            </div>
            <div class="analogy-box">
                <strong>Para entenderlo mejor:</strong> Un cursor simple es como pedir "dame la lista de alumnos". Un cursor complejo con parámetros es como decir "dame el reporte detallado con notas finales y asistencia, pero solo de los alumnos de la carrera de Informática que tú me indiques en cada momento".
            </div>
        `
    },
    {
        html: `
            <h2>Cursores con Parámetros</h2>
            <div class="concept-box">
                Permiten definir variables de entrada en la declaración del cursor. Cada vez que el cursor se abre (o se itera con <code>FOR</code>), se le envía un valor específico como argumento.
            </div>
<pre><span class="kw">DECLARE</span>
    <span class="cm">-- Declaración con parámetro de entrada</span>
    <span class="kw">CURSOR</span> c_localidades(p_evento_id <span class="kw">NUMBER</span>) <span class="kw">IS</span>
        <span class="kw">SELECT</span> nombre_localidad, precio, stock_disponible
        <span class="kw">FROM</span> LOCALIDAD_EVENTO
        <span class="kw">WHERE</span> evento_id = p_evento_id;
<span class="kw">BEGIN</span>
    <span class="cm">-- Se pasa el argumento al recorrer el cursor</span>
    <span class="kw">FOR</span> loc <span class="kw">IN</span> c_localidades(<span class="num">1</span>) <span class="kw">LOOP</span>
        DBMS_OUTPUT.PUT_LINE(loc.nombre_localidad || <span class="str">' - $'</span> || loc.precio);
    <span class="kw">END LOOP</span>;
<span class="kw">END;</span></pre>
            <div class="tip-box">
                <strong>Ventaja:</strong> Reutilizas la misma lógica de consulta para múltiples eventos o condiciones sin tener que reescribir código.
            </div>
        `
    },
    {
        html: `
            <h2>Cursores con Múltiples Parámetros</h2>
            <p>Puedes pasar varios parámetros con tipos de datos definidos (sin especificar longitud como VARCHAR2 o NUMBER):</p>
<pre><span class="kw">DECLARE</span>
    <span class="kw">CURSOR</span> c_pagos(p_estado <span class="kw">VARCHAR2</span>, p_monto_min <span class="kw">NUMBER</span>) <span class="kw">IS</span>
        <span class="kw">SELECT</span> transaccion_id, monto_final, metodo_pago
        <span class="kw">FROM</span> TRANSACCION_PAGO
        <span class="kw">WHERE</span> estado = p_estado
          <span class="kw">AND</span> monto_final >= p_monto_min;
<span class="kw">BEGIN</span>
    <span class="kw">FOR</span> r <span class="kw">IN</span> c_pagos(<span class="str">'APROBADO'</span>, <span class="num">100000</span>) <span class="kw">LOOP</span>
        DBMS_OUTPUT.PUT_LINE(<span class="str">'Pago #'</span> || r.transaccion_id || <span class="str">': $'</span> || r.monto_final);
    <span class="kw">END LOOP</span>;
<span class="kw">END;</span></pre>
            <div class="warning-box">
                En la definición del cursor, los parámetros <strong>no llevan longitud</strong>. Escribe <code>VARCHAR2</code>, nunca <code>VARCHAR2(50)</code>.
            </div>
        `
    },
    {
        html: `
            <h2>Cursor con JOIN y Funciones Agregadas</h2>
            <p>Ejemplo Punto Ticket: Reporte de recaudación y entradas emitidas por evento.</p>
<pre><span class="kw">DECLARE</span>
    <span class="kw">CURSOR</span> c_resumen_eventos <span class="kw">IS</span>
        <span class="kw">SELECT</span> e.nombre <span class="kw">AS</span> evento,
               p.nombre_fantasia <span class="kw">AS</span> productora,
               <span class="fn">COUNT</span>(t.ticket_id) <span class="kw">AS</span> total_tickets,
               <span class="fn">NVL</span>(<span class="fn">SUM</span>(t.precio_pagado), <span class="num">0</span>) <span class="kw">AS</span> recaudacion
        <span class="kw">FROM</span> EVENTO e
        <span class="kw">JOIN</span> PRODUCTORA p <span class="kw">ON</span> p.productora_id = e.productora_id
        <span class="kw">LEFT JOIN</span> LOCALIDAD_EVENTO le <span class="kw">ON</span> le.evento_id = e.evento_id
        <span class="kw">LEFT JOIN</span> RESERVA_TEMPORAL rt <span class="kw">ON</span> rt.localidad_evento_id = le.localidad_evento_id
        <span class="kw">LEFT JOIN</span> TICKET t <span class="kw">ON</span> t.reserva_id = rt.reserva_id
        <span class="kw">GROUP BY</span> e.nombre, p.nombre_fantasia;
<span class="kw">BEGIN</span>
    <span class="kw">FOR</span> ev <span class="kw">IN</span> c_resumen_eventos <span class="kw">LOOP</span>
        DBMS_OUTPUT.PUT_LINE(ev.evento || <span class="str">' | Tickets: '</span> || ev.total_tickets || <span class="str">' | Total: $'</span> || ev.recaudacion);
    <span class="kw">END LOOP</span>;
<span class="kw">END;</span></pre>
        `
    },
    {
        html: `
            <h2>Bloqueo de Registros: FOR UPDATE</h2>
            <div class="concept-box">
                La cláusula <code>FOR UPDATE</code> al final de la consulta del cursor bloquea las filas seleccionadas en la base de datos para que ninguna otra transacción las modifique mientras dure nuestro proceso.
            </div>
<pre><span class="kw">DECLARE</span>
    <span class="kw">CURSOR</span> c_localidades_stock <span class="kw">IS</span>
        <span class="kw">SELECT</span> localidad_evento_id, stock_disponible, precio
        <span class="kw">FROM</span> LOCALIDAD_EVENTO
        <span class="kw">WHERE</span> evento_id = <span class="num">1</span>
        <span class="kw">FOR UPDATE OF</span> stock_disponible, precio;
<span class="kw">BEGIN</span>
    <span class="cm">-- Las filas quedan bloqueadas hasta que hagamos COMMIT o ROLLBACK</span>
    <span class="kw">NULL</span>;
<span class="kw">END;</span></pre>
            <div class="analogy-box">
                <strong>Analogía:</strong> Es como poner un cartel de "En mantenimiento" en un asiento del estadio mientras confirmas si el cliente terminó de pagar su entrada.
            </div>
        `
    },
    {
        html: `
            <h2>WHERE CURRENT OF</h2>
            <div class="concept-box">
                Permite realizar un <code>UPDATE</code> o <code>DELETE</code> que afecta <strong>exactamente a la fila en la que se encuentra posicionado el cursor</strong> en esa iteración, sin necesidad de buscar por ID con otra consulta.
            </div>
<pre><span class="kw">DECLARE</span>
    <span class="kw">CURSOR</span> c_loc <span class="kw">IS</span>
        <span class="kw">SELECT</span> localidad_evento_id, precio
        <span class="kw">FROM</span> LOCALIDAD_EVENTO
        <span class="kw">WHERE</span> stock_disponible < <span class="num">5000</span>
        <span class="kw">FOR UPDATE</span>;
<span class="kw">BEGIN</span>
    <span class="kw">FOR</span> reg <span class="kw">IN</span> c_loc <span class="kw">LOOP</span>
        <span class="cm">-- Sube 10% el precio de la fila actual</span>
        <span class="kw">UPDATE</span> LOCALIDAD_EVENTO
        <span class="kw">SET</span> precio = precio * <span class="num">1.10</span>
        <span class="kw">WHERE CURRENT OF</span> c_loc;
    <span class="kw">END LOOP</span>;
    <span class="kw">COMMIT</span>;
<span class="kw">END;</span></pre>
        `
    },
    {
        html: `
            <h2>Atributos Explícitos del Cursor</h2>
            <table>
                <tr><th>Atributo</th><th>Tipo</th><th>Descripción</th></tr>
                <tr><td><code>%FOUND</code></td><td>BOOLEAN</td><td><code>TRUE</code> si el último FETCH trajo una fila</td></tr>
                <tr><td><code>%NOTFOUND</code></td><td>BOOLEAN</td><td><code>TRUE</code> si el último FETCH no encontró más filas</td></tr>
                <tr><td><code>%ISOPEN</code></td><td>BOOLEAN</td><td><code>TRUE</code> si el cursor ya fue abierto con OPEN</td></tr>
                <tr><td><code>%ROWCOUNT</code></td><td>NUMBER</td><td>Cantidad total de filas procesadas hasta el momento</td></tr>
            </table>
<pre><span class="kw">IF</span> c_loc<span class="kw">%ISOPEN</span> <span class="kw">THEN</span>
    <span class="kw">CLOSE</span> c_loc;
<span class="kw">END IF</span>;</pre>
        `
    },
    {
        html: `
            <h2>Control Manual: OPEN, FETCH, CLOSE</h2>
            <p>Aunque el bucle <code>FOR ... IN cursor</code> abre y cierra el cursor automáticamente, el control manual es necesario cuando queremos limitar las filas o controlar la salida exacta:</p>
<pre><span class="kw">DECLARE</span>
    <span class="kw">CURSOR</span> c_cli <span class="kw">IS</span> <span class="kw">SELECT</span> nombre, email <span class="kw">FROM</span> CLIENTE;
    v_nombre CLIENTE.nombre<span class="kw">%TYPE</span>;
    v_email  CLIENTE.email<span class="kw">%TYPE</span>;
<span class="kw">BEGIN</span>
    <span class="kw">OPEN</span> c_cli;
    <span class="kw">LOOP</span>
        <span class="kw">FETCH</span> c_cli <span class="kw">INTO</span> v_nombre, v_email;
        <span class="kw">EXIT WHEN</span> c_cli<span class="kw">%NOTFOUND</span>;

        DBMS_OUTPUT.PUT_LINE(c_cli<span class="kw">%ROWCOUNT</span> || <span class="str">'. '</span> || v_nombre);
    <span class="kw">END LOOP</span>;
    <span class="kw">CLOSE</span> c_cli;
<span class="kw">END;</span></pre>
        `
    },
    {
        html: `
            <h2>Resumen</h2>
            <table>
                <tr><th>Característica</th><th>Qué recordar</th></tr>
                <tr><td>Parámetros</td><td>Permiten filtrar dinámicamente; no llevan longitud de tipo</td></tr>
                <tr><td>FOR UPDATE</td><td>Bloquea filas para evitar modificaciones concurrentes</td></tr>
                <tr><td>WHERE CURRENT OF</td><td>Actualiza/elimina la fila actual del cursor de forma óptima</td></tr>
                <tr><td>%ROWCOUNT</td><td>Cuenta las filas recuperadas acumuladas</td></tr>
                <tr><td>%NOTFOUND</td><td>Condición clave para terminar un bucle manual con FETCH</td></tr>
            </table>
            <div class="alien-separator">👽</div>
            <p style="text-align:center;color:#94a3b8;font-size:0.85em;">Siguiente: Guía práctica con ejercicios y desafíos</p>
        `
    }
];
