// s1_4_1_solutions.js — Solucionario: Evaluación Proc, Func, Pack

const s1_4_1_solutions = [
    {
        id: 'e3-mc1',
        answer: 1,
        explanation: '<strong>Correcto.</strong> La función siempre retorna un valor con <code>RETURN</code>. El procedimiento ejecuta acciones pero no retorna valor directamente (puede usar parámetros <code>OUT</code>).'
    },
    {
        id: 'e3-mc2',
        answer: 1,
        explanation: '<strong>Correcto: OUT.</strong> El modo <code>OUT</code> permite que el procedimiento escriba un valor en la variable que le pasa el llamador. El modo <code>IN</code> es solo de lectura.'
    },
    {
        id: 'e3-mc3',
        answer: 1,
        explanation: '<strong>Correcto.</strong> Se usa la notación de punto: <code>paquete.funcion(params)</code>. Como es una función, se puede usar en un <code>SELECT ... FROM DUAL</code>.'
    },
    {
        id: 'e3-tf1',
        answer: false,
        explanation: '<strong>Falso.</strong> Una función que contiene DML (INSERT, UPDATE, DELETE) no puede usarse dentro de un <code>SELECT</code>. Oracle lanza el error ORA-14551. Las funciones usadas en SQL deben ser "puras" (solo lectura).'
    },
    {
        id: 'e3-tf2',
        answer: true,
        explanation: '<strong>Verdadero.</strong> La especificación declara la interfaz pública (qué procedimientos y funciones expone). El cuerpo contiene la implementación. Ambos son necesarios para que el paquete funcione.'
    },
    {
        id: 'e3-fill1',
        answers: ['FUNCTION', 'RETURN VARCHAR2', 'RETURN v_nombre'],
        explanation: 'Se usa <code>FUNCTION</code>, la cláusula <code>RETURN VARCHAR2</code> declara el tipo de retorno, y <code>RETURN v_nombre</code> devuelve el valor.',
        fullSolution: '<pre>CREATE OR REPLACE FUNCTION obtener_nombre_evento(\n    p_evento_id IN NUMBER\n) RETURN VARCHAR2\nAS\n    v_nombre EVENTO.nombre%TYPE;\nBEGIN\n    SELECT nombre INTO v_nombre\n    FROM EVENTO WHERE evento_id = p_evento_id;\n    RETURN v_nombre;\nEND;</pre>'
    },
    {
        id: 'e3-fill2',
        answers: ['PACKAGE', 'END pkg_clientes'],
        explanation: 'La especificación se crea con <code>PACKAGE</code> y se cierra con <code>END nombre_paquete</code>.',
        fullSolution: '<pre>CREATE OR REPLACE PACKAGE pkg_clientes AS\n    PROCEDURE registrar(p_rut VARCHAR2, p_nombre VARCHAR2);\n    FUNCTION  contar_clientes RETURN NUMBER;\nEND pkg_clientes;</pre>'
    },
    {
        id: 'e3-err1',
        answer: 7,
        explanation: '<strong>Error en la línea 8:</strong> Falta la palabra clave <code>RETURN</code>. La línea debería ser <code>RETURN p_monto * (p_porcentaje / 100);</code>. Sin <code>RETURN</code>, la función no devuelve nada y Oracle lanza un error.',
        fullSolution: 'La línea correcta:<pre>    RETURN p_monto * (p_porcentaje / 100);</pre>'
    },
    {
        id: 'e3-ws1',
        explanation: '<strong>¡Sopa de letras completada!</strong> Has encontrado todos los conceptos de Procedimientos, Funciones y Paquetes.',
        fullSolution: `
            <h4>Términos encontrados en la Sopa de Letras:</h4>
            <table>
                <tr><th>Término</th><th>Orientación</th><th>Definición / Explicación</th></tr>
                <tr><td><strong>PROCEDURE</strong></td><td>Fila 1 (Horizontal)</td><td>Subprograma que ejecuta acciones en la base de datos sin retorno directo.</td></tr>
                <tr><td><strong>FUNCTION</strong></td><td>Fila 2 (Horizontal)</td><td>Subprograma que calcula y retorna un valor mediante RETURN.</td></tr>
                <tr><td><strong>RETURN</strong></td><td>Fila 4 (Horizontal)</td><td>Instrucción que devuelve el valor calculado en una función.</td></tr>
                <tr><td><strong>PACKAGE</strong></td><td>Fila 6 (Horizontal)</td><td>Contenedor modular que agrupa especificación y cuerpo (BODY).</td></tr>
                <tr><td><strong>REPLACE</strong></td><td>Fila 8 (Horizontal)</td><td>Cláusula CREATE OR REPLACE para actualizar objetos sin perder permisos.</td></tr>
            </table>
        `
    },
    {
        id: 'e3-prop1',
        explanation: 'Este ejercicio se resuelve en Oracle.',
        fullSolution: '<pre>CREATE OR REPLACE PROCEDURE anular_ticket(\n    p_ticket_id IN  NUMBER,\n    p_codigo    OUT VARCHAR2\n) AS\n    v_estado TICKET.estado%TYPE;\nBEGIN\n    SELECT estado, codigo_ticket\n    INTO v_estado, p_codigo\n    FROM TICKET\n    WHERE ticket_id = p_ticket_id;\n\n    IF v_estado != \'EMITIDO\' THEN\n        RAISE_APPLICATION_ERROR(-20001,\n            \'Solo se pueden anular tickets con estado EMITIDO.\');\n    END IF;\n\n    UPDATE TICKET\n    SET estado = \'ANULADO\'\n    WHERE ticket_id = p_ticket_id;\n\n    COMMIT;\nEXCEPTION\n    WHEN NO_DATA_FOUND THEN\n        p_codigo := NULL;\n        DBMS_OUTPUT.PUT_LINE(\'Ticket no encontrado.\');\nEND;\n/\n\n-- Prueba:\nDECLARE\n    v_codigo VARCHAR2(50);\nBEGIN\n    anular_ticket(1, v_codigo);\n    DBMS_OUTPUT.PUT_LINE(\'Anulado: \' || v_codigo);\nEND;\n/\nROLLBACK;</pre>'
    },
    {
        id: 'e3-prop2',
        explanation: 'Este ejercicio se resuelve en Oracle.',
        fullSolution: '<pre>CREATE OR REPLACE FUNCTION calcular_monto_con_descuento(\n    p_localidad_id IN NUMBER,\n    p_convenio_id  IN NUMBER\n) RETURN NUMBER\nAS\n    v_precio    LOCALIDAD_EVENTO.precio%TYPE;\n    v_descuento CONVENIO_BANCO.descuento_porcentaje%TYPE;\n    v_monto     NUMBER;\nBEGIN\n    SELECT precio INTO v_precio\n    FROM LOCALIDAD_EVENTO\n    WHERE localidad_evento_id = p_localidad_id;\n\n    SELECT descuento_porcentaje INTO v_descuento\n    FROM CONVENIO_BANCO\n    WHERE convenio_banco_id = p_convenio_id;\n\n    v_monto := v_precio - (v_precio * v_descuento / 100);\n    RETURN v_monto;\nEXCEPTION\n    WHEN NO_DATA_FOUND THEN\n        RETURN -1;\nEND;\n/\n\n-- Prueba:\nSELECT calcular_monto_con_descuento(1, 1) FROM DUAL;</pre>'
    }
];
