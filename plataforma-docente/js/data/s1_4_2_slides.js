// s1_4_2_slides.js — Evaluación: Triggers

const s1_4_2_slides = [
    {
        class: 'title-slide',
        html: `
            <h1>Triggers (Disparadores)</h1>
            <p class="subtitle">Unidad 1.4 — Sesión 2: Repaso y Preparación de Evaluación</p>
            <div class="alien-separator">👽</div>
        `
    },
    {
        html: `
            <h2>¿Qué es un Trigger?</h2>
            <div class="concept-box">
                <strong>Definición:</strong> Un trigger es un bloque PL/SQL almacenado que se ejecuta <strong>automáticamente</strong> cuando ocurre un evento DML (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>) sobre una tabla.
            </div>
            <div class="analogy-box">
                <strong>Para entenderlo mejor:</strong> Un trigger es como una alarma de seguridad. Tú no la activas manualmente: se dispara sola cuando alguien abre la puerta (el evento). En BD, cuando alguien hace un INSERT en una tabla, el trigger se ejecuta automáticamente.
            </div>
        `
    },
    {
        html: `
            <h2>BEFORE vs AFTER</h2>
            <table>
                <tr><th>Tipo</th><th>Cuándo se ejecuta</th><th>Uso típico</th></tr>
                <tr><td><code>BEFORE</code></td><td>Antes de que la operación DML se ejecute</td><td>Validar datos, modificar valores antes de insertar</td></tr>
                <tr><td><code>AFTER</code></td><td>Después de que la operación DML se ejecute</td><td>Auditoría, registro de logs, acciones posteriores</td></tr>
            </table>
            <div class="tip-box">
                <strong>Regla práctica:</strong><br>
                ¿Quieres <em>prevenir o modificar</em> algo? → <code>BEFORE</code><br>
                ¿Quieres <em>registrar o reaccionar</em> a algo que ya pasó? → <code>AFTER</code>
            </div>
        `
    },
    {
        html: `
            <h2>FOR EACH ROW</h2>
            <div class="concept-box">
                <p>Determina si el trigger se ejecuta <strong>una vez por fila afectada</strong> (row-level) o <strong>una vez por instrucción</strong> (statement-level).</p>
            </div>
            <table>
                <tr><th>Con FOR EACH ROW</th><th>Sin FOR EACH ROW</th></tr>
                <tr><td>Se ejecuta por cada fila afectada</td><td>Se ejecuta una sola vez sin importar cuántas filas</td></tr>
                <tr><td>Tiene acceso a <code>:NEW</code> y <code>:OLD</code></td><td>No tiene acceso a :NEW ni :OLD</td></tr>
                <tr><td>Uso: validar o auditar cada fila</td><td>Uso: acciones globales post-operación</td></tr>
            </table>
        `
    },
    {
        html: `
            <h2>:NEW y :OLD</h2>
            <p>Son pseudo-registros que contienen los valores de la fila en operaciones DML:</p>
            <table>
                <tr><th>Operación</th><th>:OLD</th><th>:NEW</th></tr>
                <tr><td><code>INSERT</code></td><td>NULL (no existía antes)</td><td>Valores que se van a insertar</td></tr>
                <tr><td><code>UPDATE</code></td><td>Valores antes del cambio</td><td>Valores después del cambio</td></tr>
                <tr><td><code>DELETE</code></td><td>Valores que se van a borrar</td><td>NULL (ya no existirá)</td></tr>
            </table>
<pre><span class="cm">-- Ejemplo: acceder al precio antiguo y nuevo</span>
:OLD.precio  <span class="cm">-- valor anterior</span>
:NEW.precio  <span class="cm">-- valor nuevo</span></pre>
        `
    },
    {
        html: `
            <h2>Ejemplo con Punto Ticket: Auditoría de precios</h2>
            <p>Trigger que registra en <code>LOG_CAMBIO_PRECIO</code> cada vez que se modifica un precio de localidad.</p>
<pre><span class="kw">CREATE OR REPLACE TRIGGER</span> trg_log_cambio_precio
<span class="kw">AFTER UPDATE OF</span> precio <span class="kw">ON</span> LOCALIDAD_EVENTO
<span class="kw">FOR EACH ROW</span>
<span class="kw">BEGIN</span>
    <span class="kw">INSERT INTO</span> LOG_CAMBIO_PRECIO (
        localidad_evento_id,
        precio_anterior,
        precio_nuevo
    ) <span class="kw">VALUES</span> (
        :OLD.localidad_evento_id,
        :OLD.precio,
        :NEW.precio
    );
<span class="kw">END;</span></pre>
            <div class="concept-box">
                Este trigger se dispara automáticamente cada vez que alguien ejecuta un <code>UPDATE</code> sobre la columna <code>precio</code> de <code>LOCALIDAD_EVENTO</code>. No hay que llamarlo manualmente.
            </div>
        `
    },
    {
        html: `
            <h2>Ejemplo: Validar antes de insertar</h2>
            <p>Un trigger <code>BEFORE INSERT</code> que valida que el email del cliente contenga "@".</p>
<pre><span class="kw">CREATE OR REPLACE TRIGGER</span> trg_validar_email_cliente
<span class="kw">BEFORE INSERT ON</span> CLIENTE
<span class="kw">FOR EACH ROW</span>
<span class="kw">BEGIN</span>
    <span class="kw">IF</span> INSTR(:NEW.email, <span class="str">'@'</span>) = <span class="num">0</span> <span class="kw">THEN</span>
        <span class="fn">RAISE_APPLICATION_ERROR</span>(
            <span class="num">-20010</span>,
            <span class="str">'El email debe contener @: '</span> || :NEW.email
        );
    <span class="kw">END IF</span>;
<span class="kw">END;</span></pre>
            <div class="tip-box">
                Al usar <code>RAISE_APPLICATION_ERROR</code> dentro de un trigger <code>BEFORE</code>, la operación se <strong>cancela</strong>. El INSERT no se ejecuta.
            </div>
        `
    },
    {
        html: `
            <h2>Mutating Table Error (ORA-04091)</h2>
            <div class="warning-box">
                <strong>Error frecuente:</strong> Un trigger <code>FOR EACH ROW</code> no puede hacer <code>SELECT</code> sobre la misma tabla que lo disparó. Esto se llama "mutating table" y Oracle lo prohíbe.
            </div>
<pre><span class="cm">-- ESTO FALLA con ORA-04091:</span>
<span class="kw">CREATE OR REPLACE TRIGGER</span> trg_malo
<span class="kw">AFTER INSERT ON</span> CLIENTE
<span class="kw">FOR EACH ROW</span>
<span class="kw">DECLARE</span>
    v_total NUMBER;
<span class="kw">BEGIN</span>
    <span class="cm">-- No se puede consultar CLIENTE dentro de un trigger sobre CLIENTE</span>
    <span class="kw">SELECT COUNT</span>(*) <span class="kw">INTO</span> v_total <span class="kw">FROM</span> <span class="err">CLIENTE</span>;
    DBMS_OUTPUT.PUT_LINE(<span class="str">'Total: '</span> || v_total);
<span class="kw">END;</span></pre>
            <p><strong>Solución:</strong> Usar un trigger <code>AFTER ... (sin FOR EACH ROW)</code> o mover la lógica a un procedimiento separado.</p>
        `
    },
    {
        html: `
            <h2>Sintaxis completa</h2>
<pre><span class="kw">CREATE</span> [<span class="kw">OR REPLACE</span>] <span class="kw">TRIGGER</span> nombre_trigger
{<span class="kw">BEFORE</span> | <span class="kw">AFTER</span>}
{<span class="kw">INSERT</span> | <span class="kw">UPDATE</span> [<span class="kw">OF</span> columna] | <span class="kw">DELETE</span>}
[<span class="kw">OR</span> {<span class="kw">INSERT</span> | <span class="kw">UPDATE</span> | <span class="kw">DELETE</span>}]
<span class="kw">ON</span> nombre_tabla
[<span class="kw">FOR EACH ROW</span>]
[<span class="kw">WHEN</span> (condición)]
<span class="kw">DECLARE</span>
    <span class="cm">-- variables locales</span>
<span class="kw">BEGIN</span>
    <span class="cm">-- lógica del trigger</span>
<span class="kw">END;</span></pre>
            <div class="tip-box">
                Se puede combinar múltiples eventos con <code>OR</code>: <code>BEFORE INSERT OR UPDATE ON tabla</code>. Dentro del trigger, se usa <code>INSERTING</code>, <code>UPDATING</code>, <code>DELETING</code> para saber qué operación lo disparó.
            </div>
        `
    },
    {
        html: `
            <h2>Resumen</h2>
            <table>
                <tr><th>Concepto</th><th>Qué recordar</th></tr>
                <tr><td>Trigger</td><td>Bloque PL/SQL que se ejecuta automáticamente ante eventos DML</td></tr>
                <tr><td>BEFORE</td><td>Antes de la operación (validar, modificar)</td></tr>
                <tr><td>AFTER</td><td>Después de la operación (auditar, registrar)</td></tr>
                <tr><td>FOR EACH ROW</td><td>Se ejecuta por cada fila afectada, da acceso a :NEW y :OLD</td></tr>
                <tr><td>:NEW / :OLD</td><td>Valores nuevos y antiguos de la fila</td></tr>
                <tr><td>Mutating table</td><td>No se puede consultar la misma tabla dentro de un trigger FOR EACH ROW</td></tr>
            </table>
            <div class="alien-separator">👽</div>
        `
    }
];
