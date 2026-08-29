// s1_4_1_slides.js — Evaluación: Procedimientos, Funciones y Paquetes

const s1_4_1_slides = [
    {
        class: 'title-slide',
        html: `
            <h1>Procedimientos, Funciones y Paquetes</h1>
            <p class="subtitle">Unidad 1.4 — Sesión 1: Repaso y Preparación de Evaluación</p>
            <div class="alien-separator">👽</div>
        `
    },
    {
        html: `
            <h2>Procedimiento (PROCEDURE)</h2>
            <div class="concept-box">
                <strong>Definición:</strong> Un bloque PL/SQL almacenado con nombre que ejecuta una acción. <strong>No retorna valor</strong> directamente (pero puede usar parámetros <code>OUT</code>).
            </div>
<pre><span class="kw">CREATE OR REPLACE PROCEDURE</span> registrar_cliente(
    p_rut     <span class="kw">IN</span> VARCHAR2,
    p_nombre  <span class="kw">IN</span> VARCHAR2,
    p_apellido <span class="kw">IN</span> VARCHAR2,
    p_email   <span class="kw">IN</span> VARCHAR2
) <span class="kw">AS</span>
<span class="kw">BEGIN</span>
    <span class="kw">INSERT INTO</span> CLIENTE (rut, nombre, apellido, email)
    <span class="kw">VALUES</span> (p_rut, p_nombre, p_apellido, p_email);
    <span class="kw">COMMIT</span>;
<span class="kw">END;</span></pre>
            <div class="analogy-box">
                <strong>Analogía:</strong> Un procedimiento es como darle una orden a alguien: "Registra este cliente". Lo hace, pero no te devuelve nada. Si necesitas un dato de vuelta, le das una hoja en blanco (parámetro OUT) para que la complete.
            </div>
        `
    },
    {
        html: `
            <h2>Función (FUNCTION)</h2>
            <div class="concept-box">
                <strong>Definición:</strong> Similar a un procedimiento, pero <strong>siempre retorna un valor</strong> con la cláusula <code>RETURN</code>. Puede usarse dentro de consultas SQL.
            </div>
<pre><span class="kw">CREATE OR REPLACE FUNCTION</span> obtener_precio_ticket(
    p_localidad_id <span class="kw">IN</span> NUMBER
) <span class="kw">RETURN</span> NUMBER
<span class="kw">AS</span>
    v_precio LOCALIDAD_EVENTO.precio<span class="kw">%TYPE</span>;
<span class="kw">BEGIN</span>
    <span class="kw">SELECT</span> precio <span class="kw">INTO</span> v_precio
    <span class="kw">FROM</span> LOCALIDAD_EVENTO
    <span class="kw">WHERE</span> localidad_evento_id = p_localidad_id;
    <span class="kw">RETURN</span> v_precio;
<span class="kw">EXCEPTION</span>
    <span class="kw">WHEN</span> NO_DATA_FOUND <span class="kw">THEN</span>
        <span class="kw">RETURN</span> <span class="num">0</span>;
<span class="kw">END;</span></pre>
        `
    },
    {
        html: `
            <h2>Parámetros: IN, OUT, IN OUT</h2>
            <table>
                <tr><th>Modo</th><th>Dirección</th><th>Uso</th></tr>
                <tr><td><code>IN</code></td><td>Entrada (por defecto)</td><td>Valor que recibe el subprograma, no se modifica</td></tr>
                <tr><td><code>OUT</code></td><td>Salida</td><td>Variable que el subprograma llena con un resultado</td></tr>
                <tr><td><code>IN OUT</code></td><td>Entrada y salida</td><td>Entra con un valor y sale modificado</td></tr>
            </table>
<pre><span class="kw">CREATE OR REPLACE PROCEDURE</span> consultar_evento(
    p_evento_id <span class="kw">IN</span>  NUMBER,
    p_nombre    <span class="kw">OUT</span> VARCHAR2,
    p_estado    <span class="kw">OUT</span> VARCHAR2
) <span class="kw">AS</span>
<span class="kw">BEGIN</span>
    <span class="kw">SELECT</span> nombre, estado
    <span class="kw">INTO</span> p_nombre, p_estado
    <span class="kw">FROM</span> EVENTO
    <span class="kw">WHERE</span> evento_id = p_evento_id;
<span class="kw">END;</span></pre>
        `
    },
    {
        html: `
            <h2>Procedimiento vs Función</h2>
            <table>
                <tr><th>Aspecto</th><th>Procedimiento</th><th>Función</th></tr>
                <tr><td>Retorna valor</td><td>No (usa OUT si necesita)</td><td>Sí, siempre con RETURN</td></tr>
                <tr><td>Uso en SQL</td><td>No</td><td>Sí (SELECT, WHERE, etc.)</td></tr>
                <tr><td>Propósito típico</td><td>Ejecutar acciones (INSERT, UPDATE, DELETE)</td><td>Calcular y devolver un valor</td></tr>
                <tr><td>Cómo se invoca</td><td><code>EXEC nombre(...);</code> o en un bloque</td><td>Como parte de una expresión</td></tr>
            </table>
            <div class="tip-box">
                <strong>Regla práctica:</strong> Si necesitas un dato de vuelta → Función. Si solo necesitas que haga algo → Procedimiento.
            </div>
        `
    },
    {
        html: `
            <h2>Paquete (PACKAGE)</h2>
            <div class="concept-box">
                <strong>Definición:</strong> Un contenedor que agrupa procedimientos, funciones, tipos y variables relacionados bajo un mismo nombre. Tiene dos partes: la <strong>especificación</strong> (interfaz pública) y el <strong>cuerpo</strong> (implementación).
            </div>
<pre><span class="cm">-- ESPECIFICACIÓN (lo que se ve desde fuera)</span>
<span class="kw">CREATE OR REPLACE PACKAGE</span> pkg_punto_ticket <span class="kw">AS</span>
    <span class="kw">PROCEDURE</span> registrar_cliente(p_rut VARCHAR2, p_nombre VARCHAR2,
                               p_apellido VARCHAR2, p_email VARCHAR2);
    <span class="kw">FUNCTION</span>  obtener_precio(p_localidad_id NUMBER) <span class="kw">RETURN</span> NUMBER;
<span class="kw">END</span> pkg_punto_ticket;</pre>
<pre><span class="cm">-- CUERPO (la implementación)</span>
<span class="kw">CREATE OR REPLACE PACKAGE BODY</span> pkg_punto_ticket <span class="kw">AS</span>
    <span class="kw">PROCEDURE</span> registrar_cliente(...) <span class="kw">AS</span>
    <span class="kw">BEGIN</span> ... <span class="kw">END</span>;

    <span class="kw">FUNCTION</span>  obtener_precio(...) <span class="kw">RETURN</span> NUMBER <span class="kw">AS</span>
    <span class="kw">BEGIN</span> ... <span class="kw">END</span>;
<span class="kw">END</span> pkg_punto_ticket;</pre>
        `
    },
    {
        html: `
            <h2>Invocar elementos de un paquete</h2>
            <p>Se usa la notación de punto: <code>nombre_paquete.nombre_elemento</code>.</p>
<pre><span class="cm">-- Llamar al procedimiento</span>
<span class="kw">EXEC</span> pkg_punto_ticket.registrar_cliente(
    <span class="str">'99.999.999-9'</span>, <span class="str">'Test'</span>, <span class="str">'Test'</span>, <span class="str">'test@test.cl'</span>
);

<span class="cm">-- Usar la función en un SELECT</span>
<span class="kw">SELECT</span> pkg_punto_ticket.obtener_precio(<span class="num">1</span>)
<span class="kw">FROM DUAL</span>;</pre>
            <div class="tip-box">
                Los paquetes son la forma profesional de organizar código PL/SQL en proyectos reales. Agrupan lógica relacionada y mejoran la mantenibilidad.
            </div>
        `
    },
    {
        html: `
            <h2>Errores frecuentes</h2>
            <ul>
                <li><strong>Olvidar el RETURN en una función:</strong> Cada camino de ejecución debe tener un <code>RETURN</code>.</li>
                <li><strong>Usar DML en una función llamada desde SQL:</strong> Si una función hace INSERT/UPDATE/DELETE, no se puede usar dentro de un <code>SELECT</code>.</li>
                <li><strong>No compilar el BODY del paquete:</strong> Si solo creas la especificación, las llamadas fallan con "package body does not exist".</li>
                <li><strong>Confundir IN y OUT:</strong> Un parámetro <code>OUT</code> no tiene valor al entrar al subprograma.</li>
            </ul>
            <div class="warning-box">
                Si modificas la especificación del paquete, <strong>debes recompilar el cuerpo</strong> también.
            </div>
        `
    },
    {
        html: `
            <h2>Resumen</h2>
            <table>
                <tr><th>Elemento</th><th>Retorna valor</th><th>Se usa en SQL</th><th>Almacenado</th></tr>
                <tr><td>Bloque anónimo</td><td>No</td><td>No</td><td>No</td></tr>
                <tr><td>Procedimiento</td><td>No (usa OUT)</td><td>No</td><td>Sí</td></tr>
                <tr><td>Función</td><td>Sí (RETURN)</td><td>Sí</td><td>Sí</td></tr>
                <tr><td>Paquete</td><td>Agrupa procs y funcs</td><td>Sí (funcs)</td><td>Sí</td></tr>
            </table>
            <div class="alien-separator">👽</div>
        `
    }
];
