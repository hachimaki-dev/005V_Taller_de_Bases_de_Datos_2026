// s1_3_1_slides.js — Excepciones Predefinidas en PL/SQL
// Presentación para proyectar en datashow

const s1_3_1_slides = [
    {
        class: 'title-slide',
        html: `
            <h1>Excepciones Predefinidas en PL/SQL</h1>
            <p class="subtitle">Unidad 1.3 — Sesión 1</p>
            <p class="subtitle">Taller de Bases de Datos</p>
            <div class="alien-separator">👽</div>
        `
    },
    {
        html: `
            <h2>¿Qué es una excepción?</h2>
            <div class="concept-box">
                <strong>Definición técnica:</strong> Una excepción es un evento que ocurre durante la ejecución de un bloque PL/SQL que interrumpe el flujo normal de las instrucciones. Oracle las detecta automáticamente o el programador las puede lanzar manualmente.
            </div>
            <div class="analogy-box">
                <strong>Para entenderlo mejor:</strong> Imagina que estás siguiendo una receta de cocina paso a paso. De pronto, el paso 5 dice "agregar sal", pero no hay sal. Eso es una excepción: algo que no te dejó continuar con el paso siguiente. En PL/SQL, el bloque <code>EXCEPTION</code> es el plan B que preparas por si algo sale mal.
            </div>
        `
    },
    {
        html: `
            <h2>Estructura de un bloque con manejo de excepciones</h2>
<pre><span class="kw">DECLARE</span>
    <span class="cm">-- Variables</span>
<span class="kw">BEGIN</span>
    <span class="cm">-- Instrucciones principales</span>
    <span class="cm">-- Aquí puede ocurrir un error</span>
<span class="kw">EXCEPTION</span>
    <span class="kw">WHEN</span> nombre_excepcion <span class="kw">THEN</span>
        <span class="cm">-- Qué hacer cuando ocurre el error</span>
    <span class="kw">WHEN OTHERS THEN</span>
        <span class="cm">-- Qué hacer con cualquier otro error</span>
<span class="kw">END;</span></pre>
            <div class="tip-box">
                El bloque <code>EXCEPTION</code> va siempre <strong>antes</strong> del <code>END;</code> y <strong>después</strong> de todas las instrucciones del <code>BEGIN</code>.
            </div>
        `
    },
    {
        html: `
            <h2>¿Qué son las excepciones predefinidas?</h2>
            <p>Son excepciones que Oracle ya tiene registradas con un nombre. No necesitas declararlas, solo capturarlas.</p>
            <table>
                <tr><th>Excepción</th><th>Código Oracle</th><th>Cuándo ocurre</th></tr>
                <tr><td><code>NO_DATA_FOUND</code></td><td>ORA-01403</td><td>Un <code>SELECT INTO</code> no retorna filas</td></tr>
                <tr><td><code>TOO_MANY_ROWS</code></td><td>ORA-01422</td><td>Un <code>SELECT INTO</code> retorna más de una fila</td></tr>
                <tr><td><code>ZERO_DIVIDE</code></td><td>ORA-01476</td><td>División por cero</td></tr>
                <tr><td><code>DUP_VAL_ON_INDEX</code></td><td>ORA-00001</td><td>Violación de constraint UNIQUE o PK</td></tr>
                <tr><td><code>VALUE_ERROR</code></td><td>ORA-06502</td><td>Error de conversión o tamaño de variable</td></tr>
                <tr><td><code>INVALID_NUMBER</code></td><td>ORA-01722</td><td>Conversión inválida de texto a número</td></tr>
            </table>
        `
    },
    {
        html: `
            <h2>NO_DATA_FOUND — Ejemplo con Punto Ticket</h2>
            <p>Queremos buscar un cliente por su email, pero el email no existe en la tabla.</p>
<pre><span class="kw">DECLARE</span>
    v_nombre CLIENTE.nombre<span class="kw">%TYPE</span>;
<span class="kw">BEGIN</span>
    <span class="kw">SELECT</span> nombre <span class="kw">INTO</span> v_nombre
    <span class="kw">FROM</span> CLIENTE
    <span class="kw">WHERE</span> email = <span class="str">'noexiste@gmail.com'</span>;

    DBMS_OUTPUT.PUT_LINE(<span class="str">'Cliente: '</span> || v_nombre);
<span class="kw">EXCEPTION</span>
    <span class="kw">WHEN</span> NO_DATA_FOUND <span class="kw">THEN</span>
        DBMS_OUTPUT.PUT_LINE(<span class="str">'No se encontró el cliente.'</span>);
<span class="kw">END;</span></pre>
            <div class="analogy-box">
                <strong>Analogía:</strong> Es como buscar un nombre en una lista de invitados y no encontrarlo. En vez de quedarse en blanco, el programa avisa: "No está en la lista".
            </div>
        `
    },
    {
        html: `
            <h2>TOO_MANY_ROWS — Ejemplo con Punto Ticket</h2>
            <p><code>SELECT INTO</code> solo puede guardar <strong>una fila</strong>. Si la consulta retorna varias, se dispara esta excepción.</p>
<pre><span class="kw">DECLARE</span>
    v_nombre CLIENTE.nombre<span class="kw">%TYPE</span>;
<span class="kw">BEGIN</span>
    <span class="cm">-- Hay 5 clientes en la tabla, esto falla</span>
    <span class="kw">SELECT</span> nombre <span class="kw">INTO</span> v_nombre
    <span class="kw">FROM</span> CLIENTE;

    DBMS_OUTPUT.PUT_LINE(v_nombre);
<span class="kw">EXCEPTION</span>
    <span class="kw">WHEN</span> TOO_MANY_ROWS <span class="kw">THEN</span>
        DBMS_OUTPUT.PUT_LINE(<span class="str">'La consulta retornó más de un cliente.'</span>);
        DBMS_OUTPUT.PUT_LINE(<span class="str">'Use un cursor para recorrer múltiples filas.'</span>);
<span class="kw">END;</span></pre>
            <div class="warning-box">
                <strong>Error frecuente:</strong> Olvidar el <code>WHERE</code> en un <code>SELECT INTO</code>. Si la tabla tiene más de una fila, Oracle lanza <code>TOO_MANY_ROWS</code>.
            </div>
        `
    },
    {
        html: `
            <h2>ZERO_DIVIDE</h2>
            <p>Ocurre al dividir un número por cero.</p>
<pre><span class="kw">DECLARE</span>
    v_resultado <span class="kw">NUMBER</span>;
<span class="kw">BEGIN</span>
    v_resultado := <span class="num">100</span> / <span class="num">0</span>;
    DBMS_OUTPUT.PUT_LINE(v_resultado);
<span class="kw">EXCEPTION</span>
    <span class="kw">WHEN</span> ZERO_DIVIDE <span class="kw">THEN</span>
        DBMS_OUTPUT.PUT_LINE(<span class="str">'Error: no se puede dividir por cero.'</span>);
<span class="kw">END;</span></pre>
            <div class="tip-box">
                Antes de dividir, siempre es buena práctica validar que el divisor no sea cero con un <code>IF</code>.
            </div>
        `
    },
    {
        html: `
            <h2>DUP_VAL_ON_INDEX — Ejemplo con Punto Ticket</h2>
            <p>Ocurre cuando se intenta insertar un valor que viola una restricción <code>UNIQUE</code> o <code>PRIMARY KEY</code>.</p>
<pre><span class="kw">BEGIN</span>
    <span class="kw">INSERT INTO</span> CLIENTE (rut, nombre, apellido, email)
    <span class="kw">VALUES</span> (<span class="str">'19.456.789-1'</span>, <span class="str">'Otro'</span>, <span class="str">'Nombre'</span>, <span class="str">'otro@gmail.com'</span>);
    <span class="cm">-- El RUT '19.456.789-1' ya existe (Valentina Soto)</span>
<span class="kw">EXCEPTION</span>
    <span class="kw">WHEN</span> DUP_VAL_ON_INDEX <span class="kw">THEN</span>
        DBMS_OUTPUT.PUT_LINE(<span class="str">'Error: el RUT ya está registrado.'</span>);
<span class="kw">END;</span></pre>
            <div class="concept-box">
                La tabla CLIENTE tiene un constraint <code>uk_cliente_rut UNIQUE (rut)</code>, por eso Oracle detecta el duplicado automáticamente.
            </div>
        `
    },
    {
        html: `
            <h2>VALUE_ERROR e INVALID_NUMBER</h2>
            <p><code>VALUE_ERROR</code>: la variable no puede contener el valor asignado (tipo o tamaño).</p>
<pre><span class="kw">DECLARE</span>
    v_texto <span class="kw">VARCHAR2</span>(<span class="num">5</span>);
<span class="kw">BEGIN</span>
    v_texto := <span class="str">'Este texto es demasiado largo'</span>;
<span class="kw">EXCEPTION</span>
    <span class="kw">WHEN</span> VALUE_ERROR <span class="kw">THEN</span>
        DBMS_OUTPUT.PUT_LINE(<span class="str">'Error: el valor excede el tamaño de la variable.'</span>);
<span class="kw">END;</span></pre>
            <p style="margin-top:1em;"><code>INVALID_NUMBER</code>: se intenta convertir un texto que no es numérico.</p>
<pre><span class="kw">DECLARE</span>
    v_num <span class="kw">NUMBER</span>;
<span class="kw">BEGIN</span>
    v_num := <span class="kw">TO_NUMBER</span>(<span class="str">'abc'</span>);
<span class="kw">EXCEPTION</span>
    <span class="kw">WHEN</span> INVALID_NUMBER <span class="kw">THEN</span>
        DBMS_OUTPUT.PUT_LINE(<span class="str">'Error: no se pudo convertir a número.'</span>);
<span class="kw">END;</span></pre>
        `
    },
    {
        html: `
            <h2>Capturar múltiples excepciones</h2>
            <p>Un mismo bloque puede manejar distintas excepciones, cada una con su propio <code>WHEN</code>.</p>
<pre><span class="kw">DECLARE</span>
    v_nombre CLIENTE.nombre<span class="kw">%TYPE</span>;
    v_precio LOCALIDAD_EVENTO.precio<span class="kw">%TYPE</span>;
<span class="kw">BEGIN</span>
    <span class="kw">SELECT</span> nombre <span class="kw">INTO</span> v_nombre
    <span class="kw">FROM</span> CLIENTE
    <span class="kw">WHERE</span> email = <span class="str">'valentina.soto@gmail.com'</span>;

    v_precio := v_nombre / <span class="num">0</span>; <span class="cm">-- Esto provocará ZERO_DIVIDE</span>
<span class="kw">EXCEPTION</span>
    <span class="kw">WHEN</span> NO_DATA_FOUND <span class="kw">THEN</span>
        DBMS_OUTPUT.PUT_LINE(<span class="str">'Cliente no encontrado.'</span>);
    <span class="kw">WHEN</span> ZERO_DIVIDE <span class="kw">THEN</span>
        DBMS_OUTPUT.PUT_LINE(<span class="str">'División por cero.'</span>);
    <span class="kw">WHEN OTHERS THEN</span>
        DBMS_OUTPUT.PUT_LINE(<span class="str">'Error inesperado: '</span> || SQLERRM);
<span class="kw">END;</span></pre>
        `
    },
    {
        html: `
            <h2>WHEN OTHERS — El comodín</h2>
            <div class="concept-box">
                <code>WHEN OTHERS</code> captura cualquier excepción que no haya sido capturada por un <code>WHEN</code> específico anterior. Siempre debe ir <strong>al final</strong> de la lista de handlers.
            </div>
            <p>Funciones útiles dentro de <code>WHEN OTHERS</code>:</p>
            <table>
                <tr><th>Función</th><th>Retorna</th><th>Ejemplo</th></tr>
                <tr><td><code>SQLCODE</code></td><td>Código numérico del error</td><td><code>-1403</code></td></tr>
                <tr><td><code>SQLERRM</code></td><td>Mensaje descriptivo del error</td><td><code>ORA-01403: no data found</code></td></tr>
            </table>
<pre><span class="kw">EXCEPTION</span>
    <span class="kw">WHEN OTHERS THEN</span>
        DBMS_OUTPUT.PUT_LINE(<span class="str">'Código: '</span> || SQLCODE);
        DBMS_OUTPUT.PUT_LINE(<span class="str">'Mensaje: '</span> || SQLERRM);
<span class="kw">END;</span></pre>
        `
    },
    {
        html: `
            <h2>¿Qué pasa si no capturo la excepción?</h2>
            <div class="warning-box">
                Si un bloque PL/SQL <strong>no tiene</strong> sección <code>EXCEPTION</code> y ocurre un error, el error se propaga al entorno que lo llamó (SQL*Plus, SQL Developer, la aplicación). El bloque termina abruptamente y ninguna instrucción posterior al error se ejecuta.
            </div>
            <p>Ejemplo: este bloque falla sin aviso controlado.</p>
<pre><span class="kw">DECLARE</span>
    v_nombre CLIENTE.nombre<span class="kw">%TYPE</span>;
<span class="kw">BEGIN</span>
    <span class="kw">SELECT</span> nombre <span class="kw">INTO</span> v_nombre
    <span class="kw">FROM</span> CLIENTE
    <span class="kw">WHERE</span> email = <span class="str">'noexiste@mail.com'</span>;
    <span class="cm">-- Esta línea NUNCA se ejecuta</span>
    DBMS_OUTPUT.PUT_LINE(v_nombre);
<span class="kw">END;</span>
<span class="cm">-- Resultado: ORA-01403: no data found</span></pre>
        `
    },
    {
        html: `
            <h2>Resumen</h2>
            <table>
                <tr><th>Concepto</th><th>Qué recordar</th></tr>
                <tr><td>Excepción</td><td>Error que interrumpe el flujo normal</td></tr>
                <tr><td>Predefinidas</td><td>Oracle ya las tiene nombradas (NO_DATA_FOUND, TOO_MANY_ROWS, etc.)</td></tr>
                <tr><td>Bloque EXCEPTION</td><td>Va antes del END, captura errores con WHEN</td></tr>
                <tr><td>WHEN OTHERS</td><td>Comodín para errores no previstos — siempre al final</td></tr>
                <tr><td>SQLCODE / SQLERRM</td><td>Funciones para obtener código y mensaje del error</td></tr>
            </table>
            <div class="alien-separator">👽</div>
            <p style="text-align:center;color:#94a3b8;font-size:0.85em;">Siguiente: Guía de ejercicios prácticos</p>
        `
    }
];
