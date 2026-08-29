// s1_3_1_solutions.js — Solucionario: Excepciones Predefinidas

const s1_3_1_solutions = [
    {
        id: 'e1-mc1',
        answer: 1, // B: NO_DATA_FOUND
        explanation: '<strong>Correcto: NO_DATA_FOUND.</strong> Se dispara cuando un <code>SELECT INTO</code> no retorna ninguna fila. Es la excepción predefinida más común al buscar registros por un criterio que no existe.',
        fullSolution: '<code>NO_DATA_FOUND</code> tiene el código ORA-01403. Siempre ocurre en un <code>SELECT INTO</code> sin resultados. Si necesitas manejar el caso "0 filas" sin excepción, puedes usar un cursor explícito en vez de <code>SELECT INTO</code>.'
    },
    {
        id: 'e1-mc2',
        answer: 2, // C: TOO_MANY_ROWS
        explanation: '<strong>Correcto: TOO_MANY_ROWS.</strong> El <code>SELECT INTO</code> sin <code>WHERE</code> retorna las 5 filas de la tabla CLIENTE, pero <code>INTO</code> solo acepta una fila. Oracle lanza ORA-01422.',
        fullSolution: 'Para procesar múltiples filas se debe usar un <strong>cursor</strong> (como ya aprendimos en semanas anteriores). <code>SELECT INTO</code> es exclusivo para consultas que retornan exactamente una fila.'
    },
    {
        id: 'e1-mc3',
        answer: 1, // B: El mensaje descriptivo
        explanation: '<strong>Correcto.</strong> <code>SQLERRM</code> retorna el mensaje descriptivo del error (ej: "ORA-01403: no data found"). Para el código numérico se usa <code>SQLCODE</code>.'
    },
    {
        id: 'e1-tf1',
        answer: false,
        explanation: '<strong>Falso.</strong> El bloque <code>EXCEPTION</code> solo puede ir después de las instrucciones del <code>BEGIN</code> y antes del <code>END</code>. Nunca antes del <code>BEGIN</code> ni dentro del <code>DECLARE</code>.'
    },
    {
        id: 'e1-tf2',
        answer: true,
        explanation: '<strong>Verdadero.</strong> <code>WHEN OTHERS</code> es el handler comodín y debe ir siempre como el último. Si se coloca antes de otros handlers, esos handlers nunca se ejecutarán porque <code>OTHERS</code> captura todo primero.'
    },
    {
        id: 'e1-fill1',
        answers: ['EXCEPTION', 'NO_DATA_FOUND'],
        explanation: 'La sección se llama <code>EXCEPTION</code> y la excepción que captura un SELECT INTO sin resultados es <code>NO_DATA_FOUND</code>.',
        fullSolution: '<pre>DECLARE\n    v_nombre EVENTO.nombre%TYPE;\nBEGIN\n    SELECT nombre INTO v_nombre\n    FROM EVENTO\n    WHERE evento_id = 999;\n\n    DBMS_OUTPUT.PUT_LINE(v_nombre);\nEXCEPTION\n    WHEN NO_DATA_FOUND THEN\n        DBMS_OUTPUT.PUT_LINE(\'Evento no encontrado.\');\nEND;</pre>'
    },
    {
        id: 'e1-fill2',
        answers: ['OTHERS', 'SQLERRM'],
        explanation: '<code>WHEN OTHERS</code> captura cualquier excepción no manejada previamente, y <code>SQLERRM</code> retorna el mensaje del error.',
        fullSolution: '<pre>EXCEPTION\n    WHEN NO_DATA_FOUND THEN\n        DBMS_OUTPUT.PUT_LINE(\'Sin datos.\');\n    WHEN OTHERS THEN\n        DBMS_OUTPUT.PUT_LINE(\'Error: \' || SQLERRM);\nEND;</pre>'
    },
    {
        id: 'e1-err1',
        answer: 10, // Línea 11 (índice 10): WHEN NO_DATA_FOUND después de WHEN OTHERS
        explanation: '<strong>Error en la línea 11:</strong> <code>WHEN NO_DATA_FOUND THEN</code> está <em>después</em> de <code>WHEN OTHERS THEN</code>. Esto es inválido porque <code>WHEN OTHERS</code> siempre debe ser el último handler. Oracle lanza un error de compilación PLS-00370.',
        fullSolution: 'La solución es invertir el orden: primero los handlers específicos (<code>WHEN NO_DATA_FOUND</code>) y al final <code>WHEN OTHERS</code>.'
    },
    {
        id: 'e1-err2',
        answer: 7, // Línea 8 (índice 7): falta THEN
        explanation: '<strong>Error en la línea 8:</strong> Falta la palabra clave <code>THEN</code> después de <code>WHEN NO_DATA_FOUND</code>. La sintaxis correcta es <code>WHEN NO_DATA_FOUND THEN</code>.',
        fullSolution: 'La línea correcta debe ser:<pre>    WHEN NO_DATA_FOUND THEN</pre>'
    },
    {
        id: 'e1-ws1',
        explanation: '<strong>¡Sopa de letras completada!</strong> Has encontrado todos los términos clave de excepciones predefinidas.',
        fullSolution: `
            <h4>Términos encontrados en la Sopa de Letras:</h4>
            <table>
                <tr><th>Término</th><th>Orientación</th><th>Definición / Explicación</th></tr>
                <tr><td><strong>EXCEPTION</strong></td><td>Fila 1 (Horizontal)</td><td>Palabra clave para la sección de excepciones y tipo de dato.</td></tr>
                <tr><td><strong>SQLCODE</strong></td><td>Fila 2 (Horizontal)</td><td>Función de Oracle que devuelve el número del error.</td></tr>
                <tr><td><strong>SQLERRM</strong></td><td>Fila 4 (Horizontal)</td><td>Función de Oracle que devuelve el mensaje de error.</td></tr>
                <tr><td><strong>ZERODIVIDE</strong></td><td>Columna 1 (Vertical)</td><td>Excepción ORA-01476 al dividir por cero.</td></tr>
                <tr><td><strong>OTHERS</strong></td><td>Fila 7 (Horizontal)</td><td>Cláusula WHEN OTHERS para capturar cualquier error.</td></tr>
                <tr><td><strong>NODATAFOUND</strong></td><td>Columna 12 (Vertical)</td><td>Excepción ORA-01403 cuando un SELECT INTO no trae datos.</td></tr>
            </table>
        `
    },
    {
        id: 'e1-prop1',
        explanation: 'Este ejercicio se resuelve en Oracle.',
        fullSolution: '<pre>DECLARE\n    v_nombre EVENTO.nombre%TYPE;\n    v_estado EVENTO.estado%TYPE;\nBEGIN\n    SELECT nombre, estado\n    INTO v_nombre, v_estado\n    FROM EVENTO\n    WHERE evento_id = 999;\n\n    DBMS_OUTPUT.PUT_LINE(\'Evento: \' || v_nombre);\n    DBMS_OUTPUT.PUT_LINE(\'Estado: \' || v_estado);\nEXCEPTION\n    WHEN NO_DATA_FOUND THEN\n        DBMS_OUTPUT.PUT_LINE(\'El evento con ID 999 no existe.\');\n    WHEN OTHERS THEN\n        DBMS_OUTPUT.PUT_LINE(\'Código: \' || SQLCODE);\n        DBMS_OUTPUT.PUT_LINE(\'Mensaje: \' || SQLERRM);\nEND;</pre>'
    },
    {
        id: 'e1-prop2',
        explanation: 'Este ejercicio se resuelve en Oracle.',
        fullSolution: '<pre>BEGIN\n    INSERT INTO CLIENTE\n        (rut, nombre, apellido, email)\n    VALUES\n        (\'19.456.789-1\', \'Test\', \'Test\', \'test@test.com\');\n\n    DBMS_OUTPUT.PUT_LINE(\'Cliente insertado.\');\nEXCEPTION\n    WHEN DUP_VAL_ON_INDEX THEN\n        DBMS_OUTPUT.PUT_LINE(\'El RUT ya está registrado en el sistema.\');\n    WHEN OTHERS THEN\n        DBMS_OUTPUT.PUT_LINE(\'Código: \' || SQLCODE);\n        DBMS_OUTPUT.PUT_LINE(\'Mensaje: \' || SQLERRM);\nEND;\n/\nROLLBACK;</pre>'
    }
];
