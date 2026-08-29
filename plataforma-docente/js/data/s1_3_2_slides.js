// s1_3_2_slides.js — Excepciones Definidas por el Usuario

const s1_3_2_slides = [
    {
        class: 'title-slide',
        html: `
            <h1>Excepciones Definidas por el Usuario</h1>
            <p class="subtitle">Unidad 1.3 — Sesión 2</p>
            <p class="subtitle">Taller de Bases de Datos</p>
            <div class="alien-separator">👽</div>
        `
    },
    {
        html: `
            <h2>¿Por qué crear excepciones propias?</h2>
            <div class="concept-box">
                <strong>Definición técnica:</strong> Las excepciones predefinidas cubren errores del motor Oracle (divisiones por cero, duplicados, etc.), pero no cubren las <strong>reglas de negocio</strong> de tu aplicación. Las excepciones definidas por el usuario permiten al programador crear sus propias condiciones de error.
            </div>
            <div class="analogy-box">
                <strong>Para entenderlo mejor:</strong> En Punto Ticket, Oracle no sabe que "no se puede vender un ticket para un evento CANCELADO". Esa es una regla de tu negocio. Tú tienes que crear esa excepción y lanzarla cuando sea necesario.
            </div>
        `
    },
    {
        html: `
            <h2>Paso 1: Declarar la excepción</h2>
            <p>Se declara como una variable especial de tipo <code>EXCEPTION</code> en el bloque <code>DECLARE</code>.</p>
<pre><span class="kw">DECLARE</span>
    <span class="cm">-- Declarar la excepción personalizada</span>
    e_evento_cancelado <span class="kw">EXCEPTION</span>;
<span class="kw">BEGIN</span>
    <span class="cm">-- ...</span>
<span class="kw">END;</span></pre>
            <div class="tip-box">
                <strong>Convención de nombres:</strong> Se recomienda usar el prefijo <code>e_</code> para distinguir las excepciones de las variables regulares.
            </div>
        `
    },
    {
        html: `
            <h2>Paso 2: Lanzar la excepción con RAISE</h2>
            <p>Se usa la instrucción <code>RAISE</code> para disparar la excepción cuando se cumple una condición.</p>
<pre><span class="kw">DECLARE</span>
    e_evento_cancelado <span class="kw">EXCEPTION</span>;
    v_estado EVENTO.estado<span class="kw">%TYPE</span>;
<span class="kw">BEGIN</span>
    <span class="kw">SELECT</span> estado <span class="kw">INTO</span> v_estado
    <span class="kw">FROM</span> EVENTO
    <span class="kw">WHERE</span> nombre = <span class="str">'Bad Bunny - World''s Hottest Tour'</span>;

    <span class="kw">IF</span> v_estado = <span class="str">'CANCELADO'</span> <span class="kw">THEN</span>
        <span class="kw">RAISE</span> e_evento_cancelado;
    <span class="kw">END IF</span>;

    DBMS_OUTPUT.PUT_LINE(<span class="str">'Evento disponible para venta.'</span>);
<span class="kw">EXCEPTION</span>
    <span class="kw">WHEN</span> e_evento_cancelado <span class="kw">THEN</span>
        DBMS_OUTPUT.PUT_LINE(<span class="str">'No se puede vender: el evento está cancelado.'</span>);
<span class="kw">END;</span></pre>
        `
    },
    {
        html: `
            <h2>Flujo de ejecución con RAISE</h2>
            <ol>
                <li>Se ejecuta el <code>SELECT</code> normalmente.</li>
                <li>El <code>IF</code> evalúa la condición de negocio.</li>
                <li>Si la condición se cumple, <code>RAISE</code> interrumpe el flujo inmediatamente.</li>
                <li>El control salta directamente a la sección <code>EXCEPTION</code>.</li>
                <li>Se ejecuta el handler correspondiente.</li>
            </ol>
            <div class="warning-box">
                Cualquier instrucción que esté <strong>después</strong> del <code>RAISE</code> (pero antes de <code>EXCEPTION</code>) <strong>no se ejecuta</strong>.
            </div>
        `
    },
    {
        html: `
            <h2>RAISE_APPLICATION_ERROR</h2>
            <div class="concept-box">
                Es un procedimiento de Oracle que permite lanzar un error con un <strong>código personalizado</strong> (entre -20000 y -20999) y un <strong>mensaje personalizado</strong>. A diferencia de <code>RAISE</code>, este error se propaga al entorno que llamó al bloque.
            </div>
<pre><span class="kw">BEGIN</span>
    <span class="kw">IF</span> condicion <span class="kw">THEN</span>
        <span class="fn">RAISE_APPLICATION_ERROR</span>(
            <span class="num">-20001</span>,
            <span class="str">'Mensaje de error personalizado'</span>
        );
    <span class="kw">END IF</span>;
<span class="kw">END;</span></pre>
            <div class="analogy-box">
                <strong>Diferencia clave:</strong> <code>RAISE</code> lanza una excepción interna (se captura dentro del mismo bloque). <code>RAISE_APPLICATION_ERROR</code> genera un error Oracle real que se ve desde fuera del bloque (SQL Developer, la aplicación, etc.).
            </div>
        `
    },
    {
        html: `
            <h2>Ejemplo con Punto Ticket: Validar stock</h2>
            <p>Antes de vender, validamos que haya stock disponible en la localidad.</p>
<pre><span class="kw">DECLARE</span>
    v_stock LOCALIDAD_EVENTO.stock_disponible<span class="kw">%TYPE</span>;
<span class="kw">BEGIN</span>
    <span class="kw">SELECT</span> stock_disponible <span class="kw">INTO</span> v_stock
    <span class="kw">FROM</span> LOCALIDAD_EVENTO
    <span class="kw">WHERE</span> localidad_evento_id = <span class="num">1</span>;

    <span class="kw">IF</span> v_stock <= <span class="num">0</span> <span class="kw">THEN</span>
        <span class="fn">RAISE_APPLICATION_ERROR</span>(
            <span class="num">-20001</span>,
            <span class="str">'Sin stock: las entradas para esta localidad están agotadas.'</span>
        );
    <span class="kw">END IF</span>;

    DBMS_OUTPUT.PUT_LINE(<span class="str">'Stock disponible: '</span> || v_stock);
<span class="kw">END;</span></pre>
        `
    },
    {
        html: `
            <h2>PRAGMA EXCEPTION_INIT</h2>
            <p>Permite asociar un código de error Oracle a una excepción declarada por el usuario.</p>
<pre><span class="kw">DECLARE</span>
    e_fk_violada <span class="kw">EXCEPTION</span>;
    <span class="kw">PRAGMA EXCEPTION_INIT</span>(e_fk_violada, <span class="num">-2292</span>);
    <span class="cm">-- ORA-02292: integrity constraint violated - child record found</span>
<span class="kw">BEGIN</span>
    <span class="kw">DELETE FROM</span> RECINTO
    <span class="kw">WHERE</span> nombre = <span class="str">'Movistar Arena'</span>;
    <span class="cm">-- Falla porque hay sectores y eventos asociados</span>
<span class="kw">EXCEPTION</span>
    <span class="kw">WHEN</span> e_fk_violada <span class="kw">THEN</span>
        DBMS_OUTPUT.PUT_LINE(<span class="str">'No se puede eliminar: tiene datos asociados.'</span>);
<span class="kw">END;</span></pre>
            <div class="tip-box">
                Útil cuando quieres capturar errores Oracle específicos que <strong>no tienen</strong> una excepción predefinida con nombre.
            </div>
        `
    },
    {
        html: `
            <h2>RAISE vs RAISE_APPLICATION_ERROR</h2>
            <table>
                <tr><th>Característica</th><th>RAISE</th><th>RAISE_APPLICATION_ERROR</th></tr>
                <tr><td>Requiere declarar excepción</td><td>Sí</td><td>No</td></tr>
                <tr><td>Código de error</td><td>+1 (genérico)</td><td>-20000 a -20999</td></tr>
                <tr><td>Mensaje personalizado</td><td>No (solo nombre)</td><td>Sí</td></tr>
                <tr><td>Visible fuera del bloque</td><td>Solo si no se captura</td><td>Siempre</td></tr>
                <tr><td>Uso típico</td><td>Control interno</td><td>Reportar error al usuario/app</td></tr>
            </table>
        `
    },
    {
        html: `
            <h2>Ejemplo integrado: Reserva segura</h2>
<pre><span class="kw">DECLARE</span>
    e_evento_no_en_venta <span class="kw">EXCEPTION</span>;
    v_estado EVENTO.estado<span class="kw">%TYPE</span>;
    v_stock  LOCALIDAD_EVENTO.stock_disponible<span class="kw">%TYPE</span>;
<span class="kw">BEGIN</span>
    <span class="cm">-- 1. Verificar estado del evento</span>
    <span class="kw">SELECT</span> estado <span class="kw">INTO</span> v_estado
    <span class="kw">FROM</span> EVENTO <span class="kw">WHERE</span> evento_id = <span class="num">1</span>;

    <span class="kw">IF</span> v_estado != <span class="str">'VENTA'</span> <span class="kw">THEN</span>
        <span class="kw">RAISE</span> e_evento_no_en_venta;
    <span class="kw">END IF</span>;

    <span class="cm">-- 2. Verificar stock</span>
    <span class="kw">SELECT</span> stock_disponible <span class="kw">INTO</span> v_stock
    <span class="kw">FROM</span> LOCALIDAD_EVENTO <span class="kw">WHERE</span> localidad_evento_id = <span class="num">1</span>;

    <span class="kw">IF</span> v_stock <= <span class="num">0</span> <span class="kw">THEN</span>
        <span class="fn">RAISE_APPLICATION_ERROR</span>(<span class="num">-20001</span>, <span class="str">'Entradas agotadas.'</span>);
    <span class="kw">END IF</span>;

    DBMS_OUTPUT.PUT_LINE(<span class="str">'Reserva posible. Stock: '</span> || v_stock);
<span class="kw">EXCEPTION</span>
    <span class="kw">WHEN</span> e_evento_no_en_venta <span class="kw">THEN</span>
        DBMS_OUTPUT.PUT_LINE(<span class="str">'El evento no está en venta (estado: '</span> || v_estado || <span class="str">').'</span>);
    <span class="kw">WHEN</span> NO_DATA_FOUND <span class="kw">THEN</span>
        DBMS_OUTPUT.PUT_LINE(<span class="str">'Evento o localidad no encontrada.'</span>);
<span class="kw">END;</span></pre>
        `
    },
    {
        html: `
            <h2>Resumen</h2>
            <table>
                <tr><th>Concepto</th><th>Qué recordar</th></tr>
                <tr><td>Excepción de usuario</td><td>Se declara con <code>nombre EXCEPTION;</code> en el DECLARE</td></tr>
                <tr><td>RAISE</td><td>Dispara la excepción (salta a EXCEPTION)</td></tr>
                <tr><td>RAISE_APPLICATION_ERROR</td><td>Genera error Oracle con código -20000 a -20999 y mensaje</td></tr>
                <tr><td>PRAGMA EXCEPTION_INIT</td><td>Asocia un código ORA a una excepción con nombre</td></tr>
            </table>
            <div class="alien-separator">👽</div>
            <p style="text-align:center;color:#94a3b8;font-size:0.85em;">Siguiente: Guía de ejercicios prácticos</p>
        `
    }
];
