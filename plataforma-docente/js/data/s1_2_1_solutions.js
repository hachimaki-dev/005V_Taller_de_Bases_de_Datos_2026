// s1_2_1_solutions.js — Solucionario: Cursores Complejos en PL/SQL

const s1_2_1_solutions = [
    {
        id: 'e121-mc1',
        answer: 1, // Opción B
        explanation: '<strong>Correcto.</strong> En la declaración de parámetros de un cursor en PL/SQL solo se especifica el tipo base (ej: <code>VARCHAR2</code>, <code>NUMBER</code>, <code>DATE</code>) sin indicar tamaño ni precisión. Indicar <code>VARCHAR2(50)</code> genera un error de compilación.',
        fullSolution: 'La sintaxis oficial de Oracle para parámetros en cursores es:<pre>CURSOR c_nombre (p_param1 TIPO_DATO, p_param2 TIPO_DATO) IS ...</pre>Nunca se especifica longitud ni restricciones en la firma del parámetro.'
    },
    {
        id: 'e121-mc2',
        answer: 1, // Opción B
        explanation: '<strong>Correcto.</strong> <code>WHERE CURRENT OF</code> referencia internamente el ROWID de la fila actual que el cursor tiene posicionada en ese ciclo, permitiendo un UPDATE o DELETE inmediato y eficiente.',
        fullSolution: 'Para que <code>WHERE CURRENT OF c_nombre</code> funcione, el cursor debe haber sido declarado con la cláusula <code>FOR UPDATE</code> al final de la consulta SQL.'
    },
    {
        id: 'e121-mc3',
        answer: 2, // Opción C: %ROWCOUNT
        explanation: '<strong>Correcto.</strong> <code>%ROWCOUNT</code> devuelve el número acumulado de filas recuperadas mediante instrucciones FETCH ejecutadas sobre ese cursor.',
        fullSolution: 'Antes de abrir el cursor o antes del primer FETCH, <code>%ROWCOUNT</code> vale 0. Tras cada FETCH exitoso, se incrementa en 1.'
    },
    {
        id: 'e121-tf1',
        answer: true,
        explanation: '<strong>Verdadero.</strong> Oracle exige que el cursor bloquee explícitamente los registros con <code>FOR UPDATE</code> para garantizar la coherencia de la fila al usar <code>WHERE CURRENT OF</code>.'
    },
    {
        id: 'e121-tf2',
        answer: false,
        explanation: '<strong>Falso.</strong> El bucle <code>FOR ... IN cursor LOOP</code> es un cursor FOR LOOP que se encarga automáticamente de hacer <code>OPEN</code>, iterar con <code>FETCH</code>, evaluar <code>%NOTFOUND</code> y ejecutar <code>CLOSE</code> al terminar.'
    },
    {
        id: 'e121-fill1',
        answers: ['NUMBER', 'p_evento_id', 'p_precio_min'],
        explanation: 'El parámetro <code>p_precio_min</code> es de tipo <code>NUMBER</code>, y en el WHERE se comparan <code>evento_id = p_evento_id</code> y <code>precio >= p_precio_min</code>.',
        fullSolution: '<pre>DECLARE\n    CURSOR c_loc(\n        p_evento_id NUMBER,\n        p_precio_min NUMBER\n    ) IS\n        SELECT nombre_localidad, precio\n        FROM LOCALIDAD_EVENTO\n        WHERE evento_id = p_evento_id\n          AND precio >= p_precio_min;\nBEGIN\n    FOR r IN c_loc(1, 45000) LOOP\n        DBMS_OUTPUT.PUT_LINE(r.nombre_localidad);\n    END LOOP;\nEND;</pre>'
    },
    {
        id: 'e121-fill2',
        answers: ['FOR UPDATE', ['WHERE CURRENT OF c_descuento', 'WHERE CURRENT OF  c_descuento']],
        explanation: 'Se declara con <code>FOR UPDATE</code> para bloquear las filas y en el UPDATE se utiliza <code>WHERE CURRENT OF c_descuento</code>.',
        fullSolution: '<pre>DECLARE\n    CURSOR c_descuento IS\n        SELECT localidad_evento_id, precio\n        FROM LOCALIDAD_EVENTO\n        WHERE stock_disponible > 1000\n        FOR UPDATE;\nBEGIN\n    FOR reg IN c_descuento LOOP\n        UPDATE LOCALIDAD_EVENTO\n        SET precio = precio * 0.85\n        WHERE CURRENT OF c_descuento;\n    END LOOP;\n    COMMIT;\nEND;</pre>'
    },
    {
        id: 'e121-err1',
        answer: 2, // Línea 3 (índice 2): p_email VARCHAR2(100)
        explanation: '<strong>Error en la línea 3:</strong> No se permite especificar la longitud en los parámetros de un cursor. Debe ser <code>p_email VARCHAR2</code>.',
        fullSolution: 'La definición correcta del parámetro es:<pre>    CURSOR c_tickets_cliente(\n        p_email VARCHAR2\n    ) IS</pre>'
    },
    {
        id: 'e121-err2',
        answer: 7, // Línea 8 (índice 7): EXIT WHEN c_eventos%EMPTY;
        explanation: '<strong>Error en la línea 8:</strong> El atributo <code>%EMPTY</code> no existe en cursores de Oracle. La condición correcta para verificar el fin de datos es <code>EXIT WHEN c_eventos%NOTFOUND;</code>.',
        fullSolution: 'La línea corregida debe ser:<pre>        EXIT WHEN c_eventos%NOTFOUND;</pre>'
    },
    {
        id: 'e121-ws1',
        explanation: '<strong>¡Sopa de letras completada!</strong> Has identificado todos los conceptos esenciales de cursores complejos.',
        fullSolution: `
            <h4>Términos de la Sopa de Letras:</h4>
            <table>
                <tr><th>Término</th><th>Orientación</th><th>Definición en Oracle PL/SQL</th></tr>
                <tr><td><strong>CURSOR</strong></td><td>Fila 1</td><td>Puntero al área de memoria privada que almacena el resultado de una consulta.</td></tr>
                <tr><td><strong>PARAMETRO</strong></td><td>Fila 2</td><td>Entrada dinámica para reutilizar el cursor con distintos filtros.</td></tr>
                <tr><td><strong>FORUPDATE</strong></td><td>Fila 4</td><td>Cláusula SQL que bloquea filas para evitar modificaciones simultáneas.</td></tr>
                <tr><td><strong>ROWCOUNT</strong></td><td>Fila 6</td><td>Atributo que almacena el total acumulado de filas leídas.</td></tr>
                <tr><td><strong>FETCH</strong></td><td>Fila 8</td><td>Operación que traslada la siguiente fila del cursor a variables PL/SQL.</td></tr>
                <tr><td><strong>ISOPEN</strong></td><td>Fila 10</td><td>Atributo booleano que comprueba el estado de apertura del cursor.</td></tr>
            </table>
        `
    },
    {
        id: 'e121-prop1',
        explanation: 'Este ejercicio se resuelve en Oracle SQL Developer.',
        fullSolution: '<pre>DECLARE\n    CURSOR c_eventos_prod(p_prod_id NUMBER) IS\n        SELECT e.evento_id,\n               e.nombre AS evento,\n               e.estado,\n               r.nombre AS recinto,\n               COUNT(le.localidad_evento_id) AS total_localidades\n        FROM EVENTO e\n        JOIN RECINTO r ON r.recinto_id = e.recinto_id\n        LEFT JOIN LOCALIDAD_EVENTO le ON le.evento_id = e.evento_id\n        WHERE e.productora_id = p_prod_id\n        GROUP BY e.evento_id, e.nombre, e.estado, r.nombre;\n\n    v_contador NUMBER := 0;\nBEGIN\n    DBMS_OUTPUT.PUT_LINE(\'=== REPORTE DE EVENTOS POR PRODUCTORA ===\');\n    FOR reg IN c_eventos_prod(1) LOOP\n        v_contador := v_contador + 1;\n        DBMS_OUTPUT.PUT_LINE(\n            v_contador || \'. \' || reg.evento ||\n            \' [\' || reg.estado || \']\' ||\n            \' | Recinto: \' || reg.recinto ||\n            \' | Localidades: \' || reg.total_localidades\n        );\n    END LOOP;\n    DBMS_OUTPUT.PUT_LINE(\'Total de eventos procesados: \' || v_contador);\nEND;\n/</pre>'
    },
    {
        id: 'e121-prop2',
        explanation: 'Este ejercicio se resuelve en Oracle SQL Developer.',
        fullSolution: '<pre>DECLARE\n    CURSOR c_ajuste_precios(p_evento_id NUMBER) IS\n        SELECT localidad_evento_id,\n               nombre_localidad,\n               stock_disponible,\n               precio\n        FROM LOCALIDAD_EVENTO\n        WHERE evento_id = p_evento_id\n        FOR UPDATE OF precio;\n\n    v_nuevo_precio NUMBER;\nBEGIN\n    FOR loc IN c_ajuste_precios(1) LOOP\n        IF loc.stock_disponible > 10000 THEN\n            v_nuevo_precio := ROUND(loc.precio * 0.90);\n            UPDATE LOCALIDAD_EVENTO\n            SET precio = v_nuevo_precio\n            WHERE CURRENT OF c_ajuste_precios;\n            \n            DBMS_OUTPUT.PUT_LINE(\n                \'Descuento 10% en \' || loc.nombre_localidad ||\n                \': Antiguo=$\' || loc.precio || \' -> Nuevo=$\' || v_nuevo_precio\n            );\n        ELSIF loc.stock_disponible < 2000 THEN\n            v_nuevo_precio := ROUND(loc.precio * 1.15);\n            UPDATE LOCALIDAD_EVENTO\n            SET precio = v_nuevo_precio\n            WHERE CURRENT OF c_ajuste_precios;\n            \n            DBMS_OUTPUT.PUT_LINE(\n                \'Incremento 15% en \' || loc.nombre_localidad ||\n                \': Antiguo=$\' || loc.precio || \' -> Nuevo=$\' || v_nuevo_precio\n            );\n        END IF;\n    END LOOP;\n    \n    -- Revertir cambios de prueba\n    ROLLBACK;\n    DBMS_OUTPUT.PUT_LINE(\'Ajuste simulado correctamente (ROLLBACK ejecutado).\');\nEND;\n/</pre>'
    }
];
