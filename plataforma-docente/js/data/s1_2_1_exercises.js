// s1_2_1_exercises.js — Ejercicios: Cursores Complejos en PL/SQL

const s1_2_1_exercises = [
    {
        id: 'e121-mc1',
        type: 'multiple-choice',
        question: '¿Cómo se debe definir el tipo de dato de un parámetro en la declaración de un cursor?',
        options: [
            'Indicando tipo y longitud máxima: <code>CURSOR c(p_nom VARCHAR2(50))</code>',
            'Indicando únicamente el tipo de dato sin longitud: <code>CURSOR c(p_nom VARCHAR2)</code>',
            'Obligatoriamente con <code>%TYPE</code>: <code>CURSOR c(p_nom CLIENTE.nombre%TYPE)</code>',
            'Los cursores no admiten parámetros en el bloque DECLARE'
        ]
    },
    {
        id: 'e121-mc2',
        type: 'multiple-choice',
        question: '¿Para qué sirve la cláusula <code>WHERE CURRENT OF nombre_cursor</code> en una sentencia UPDATE o DELETE?',
        options: [
            'Para modificar todas las filas de la tabla asociadas al cursor simultáneamente',
            'Para modificar o eliminar con precisión la fila que está siendo procesada en esa iteración',
            'Para abrir un cursor que se encontraba cerrado',
            'Para verificar si el cursor tiene más datos disponibles con %FOUND'
        ]
    },
    {
        id: 'e121-mc3',
        type: 'multiple-choice',
        question: 'En un bucle manual con <code>FETCH</code>, ¿qué atributo del cursor nos indica cuántas filas se han recuperado hasta el momento?',
        options: [
            '<code>%COUNT</code>',
            '<code>%FOUND</code>',
            '<code>%ROWCOUNT</code>',
            '<code>%TOTALROWS</code>'
        ]
    },
    {
        id: 'e121-tf1',
        type: 'true-false',
        question: 'Para poder utilizar <code>WHERE CURRENT OF</code> en un UPDATE, la consulta del cursor debe haberse declarado obligatoriamente con la cláusula <code>FOR UPDATE</code>.'
    },
    {
        id: 'e121-tf2',
        type: 'true-false',
        question: 'Cuando se utiliza un bucle <code>FOR reg IN c_cursor(param) LOOP</code>, el programador debe ejecutar manualmente <code>OPEN</code> y <code>CLOSE</code> del cursor.'
    },
    {
        id: 'e121-fill1',
        type: 'fill-code',
        question: 'Completa la declaración de un cursor con parámetro para buscar las localidades de un evento específico según su precio mínimo:',
        parts: [
            { type: 'text', content: 'DECLARE\n    CURSOR c_loc(\n        p_evento_id NUMBER,\n        p_precio_min ' },
            { type: 'blank', index: 0, placeholder: 'tipo dato', width: 100 },
            { type: 'text', content: '\n    ) IS\n        SELECT nombre_localidad, precio\n        FROM LOCALIDAD_EVENTO\n        WHERE evento_id = ' },
            { type: 'blank', index: 1, placeholder: 'parámetro 1', width: 120 },
            { type: 'text', content: '\n          AND precio >= ' },
            { type: 'blank', index: 2, placeholder: 'parámetro 2', width: 120 },
            { type: 'text', content: ';\nBEGIN\n    FOR r IN c_loc(1, 45000) LOOP\n        DBMS_OUTPUT.PUT_LINE(r.nombre_localidad);\n    END LOOP;\nEND;' }
        ]
    },
    {
        id: 'e121-fill2',
        type: 'fill-code',
        question: 'Completa el código para bloquear las filas de una localidad y aplicar un descuento del 15% sobre la fila actual:',
        parts: [
            { type: 'text', content: 'DECLARE\n    CURSOR c_descuento IS\n        SELECT localidad_evento_id, precio\n        FROM LOCALIDAD_EVENTO\n        WHERE stock_disponible > 1000\n        ' },
            { type: 'blank', index: 0, placeholder: 'cláusula bloqueo', width: 140 },
            { type: 'text', content: ';\nBEGIN\n    FOR reg IN c_descuento LOOP\n        UPDATE LOCALIDAD_EVENTO\n        SET precio = precio * 0.85\n        ' },
            { type: 'blank', index: 1, placeholder: 'cláusula posición', width: 230 },
            { type: 'text', content: ';\n    END LOOP;\n    COMMIT;\nEND;' }
        ]
    },
    {
        id: 'e121-err1',
        type: 'find-error',
        question: 'Identifica la línea con el error de sintaxis en la declaración del cursor parametrizado:',
        lines: [
            'DECLARE',
            '    CURSOR c_tickets_cliente(',
            '        p_email VARCHAR2(100)',
            '    ) IS',
            '        SELECT t.codigo_ticket, t.precio_pagado',
            '        FROM TICKET t',
            '        JOIN CLIENTE c ON c.cliente_id = t.cliente_id',
            '        WHERE c.email = p_email;',
            'BEGIN',
            '    NULL;',
            'END;'
        ]
    },
    {
        id: 'e121-err2',
        type: 'find-error',
        question: 'Identifica la línea con el error en este bucle manual de cursor:',
        lines: [
            'DECLARE',
            '    CURSOR c_eventos IS SELECT evento_id, nombre FROM EVENTO;',
            '    v_id EVENTO.evento_id%TYPE;',
            '    v_nombre EVENTO.nombre%TYPE;',
            'BEGIN',
            '    OPEN c_eventos;',
            '    LOOP',
            '        FETCH c_eventos INTO v_id, v_nombre;',
            '        EXIT WHEN c_eventos%EMPTY;',
            '        DBMS_OUTPUT.PUT_LINE(v_nombre);',
            '    END LOOP;',
            '    CLOSE c_eventos;',
            'END;'
        ]
    },
    {
        id: 'e121-ws1',
        type: 'word-search',
        question: 'Encuentra los <strong>6 términos clave</strong> sobre cursores complejos en la sopa de letras:',
        gridSize: 10,
        words: ['CURSOR', 'PARAMETRO', 'FORUPDATE', 'ROWCOUNT', 'FETCH', 'ISOPEN'],
        wordPlacements: [
            { word: 'CURSOR', cells: [0, 1, 2, 3, 4, 5], clue: 'Estructura en memoria para procesar consultas fila por fila' },
            { word: 'PARAMETRO', cells: [10, 11, 12, 13, 14, 15, 16, 17, 18], clue: 'Variable de entrada enviada al cursor para filtrar su consulta' },
            { word: 'FORUPDATE', cells: [30, 31, 32, 33, 34, 35, 36, 37, 38], clue: 'Cláusula para bloquear registros en la base de datos' },
            { word: 'ROWCOUNT', cells: [50, 51, 52, 53, 54, 55, 56, 57], clue: 'Atributo que contiene el número de filas recuperadas hasta el momento' },
            { word: 'FETCH', cells: [70, 71, 72, 73, 74], clue: 'Instrucción que recupera la siguiente fila del cursor' },
            { word: 'ISOPEN', cells: [90, 91, 92, 93, 94, 95], clue: 'Atributo booleano que indica si el cursor ya está abierto' }
        ],
        grid: [
            {letter:'C'},{letter:'U'},{letter:'R'},{letter:'S'},{letter:'O'},{letter:'R'},{letter:'A'},{letter:'B'},{letter:'C'},{letter:'D'},
            {letter:'P'},{letter:'A'},{letter:'R'},{letter:'A'},{letter:'M'},{letter:'E'},{letter:'T'},{letter:'R'},{letter:'O'},{letter:'E'},
            {letter:'F'},{letter:'G'},{letter:'H'},{letter:'I'},{letter:'J'},{letter:'K'},{letter:'L'},{letter:'M'},{letter:'N'},{letter:'O'},
            {letter:'F'},{letter:'O'},{letter:'R'},{letter:'U'},{letter:'P'},{letter:'D'},{letter:'A'},{letter:'T'},{letter:'E'},{letter:'P'},
            {letter:'Q'},{letter:'R'},{letter:'S'},{letter:'T'},{letter:'U'},{letter:'V'},{letter:'W'},{letter:'X'},{letter:'Y'},{letter:'Z'},
            {letter:'R'},{letter:'O'},{letter:'W'},{letter:'C'},{letter:'O'},{letter:'U'},{letter:'N'},{letter:'T'},{letter:'A'},{letter:'B'},
            {letter:'C'},{letter:'D'},{letter:'E'},{letter:'F'},{letter:'G'},{letter:'H'},{letter:'I'},{letter:'J'},{letter:'K'},{letter:'L'},
            {letter:'F'},{letter:'E'},{letter:'T'},{letter:'C'},{letter:'H'},{letter:'M'},{letter:'N'},{letter:'O'},{letter:'P'},{letter:'Q'},
            {letter:'R'},{letter:'S'},{letter:'T'},{letter:'U'},{letter:'V'},{letter:'W'},{letter:'X'},{letter:'Y'},{letter:'Z'},{letter:'A'},
            {letter:'I'},{letter:'S'},{letter:'O'},{letter:'P'},{letter:'E'},{letter:'N'},{letter:'B'},{letter:'C'},{letter:'D'},{letter:'E'}
        ]
    },
    {
        id: 'e121-prop1',
        type: 'proposed',
        question: '<strong>Ejercicio propuesto 1 — Reporte de Recaudación Parametrizado (Punto Ticket)</strong>',
        content: `<p>Crea un bloque anónimo con un <strong>cursor explícito parametrizado</strong> por <code>p_productora_id</code> que liste todos los eventos organizados por dicha productora.</p>
        <p>Para cada evento, el cursor debe obtener:</p>
        <ul>
            <li>Nombre del evento y estado.</li>
            <li>Recinto donde se realiza (usando un <code>JOIN</code> con <code>RECINTO</code>).</li>
            <li>Cantidad de localidades configuradas.</li>
        </ul>
        <p>El bloque debe ejecutar el cursor para la productora con ID <code>1</code> e imprimir el resumen formateado con <code>DBMS_OUTPUT.PUT_LINE</code>. Al final del bucle, debe mostrar el total de eventos leídos usando <code>%ROWCOUNT</code> o un contador local.</p>`
    },
    {
        id: 'e121-prop2',
        type: 'proposed',
        question: '<strong>Ejercicio propuesto 2 — Ajuste Masivo de Precios con FOR UPDATE (Punto Ticket)</strong>',
        content: `<p>Escribe un bloque PL/SQL que declare un cursor con <code>FOR UPDATE</code> sobre la tabla <code>LOCALIDAD_EVENTO</code> para un evento dado (ej: <code>evento_id = 1</code>).</p>
        <p>El cursor debe:</p>
        <ol>
            <li>Recorrer cada localidad del evento.</li>
            <li>Si el <code>stock_disponible</code> es mayor a 10.000 entradas, aplicar un 10% de descuento usando <code>WHERE CURRENT OF</code>.</li>
            <li>Si el <code>stock_disponible</code> es menor a 2.000 entradas, aumentar el precio en un 15% usando <code>WHERE CURRENT OF</code>.</li>
            <li>Imprimir en consola el precio anterior y el precio nuevo por cada localidad modificada.</li>
            <li>Hacer <code>ROLLBACK;</code> al final para mantener la base de datos intacta para pruebas posteriores.</li>
        </ol>`
    }
];
