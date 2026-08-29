// s1_3_1_exercises.js — Ejercicios: Excepciones Predefinidas

const s1_3_1_exercises = [
    {
        id: 'e1-mc1',
        type: 'multiple-choice',
        question: '¿Qué excepción predefinida se dispara cuando un <code>SELECT INTO</code> no retorna ninguna fila?',
        options: [
            '<code>TOO_MANY_ROWS</code>',
            '<code>NO_DATA_FOUND</code>',
            '<code>ZERO_DIVIDE</code>',
            '<code>VALUE_ERROR</code>'
        ]
    },
    {
        id: 'e1-mc2',
        type: 'multiple-choice',
        question: 'En el sistema Punto Ticket, un programador ejecuta el siguiente código. ¿Qué excepción se dispara?<pre>DECLARE\n    v_nombre CLIENTE.nombre%TYPE;\nBEGIN\n    SELECT nombre INTO v_nombre FROM CLIENTE;\n    -- La tabla tiene 5 clientes\nEND;</pre>',
        options: [
            '<code>NO_DATA_FOUND</code>',
            '<code>DUP_VAL_ON_INDEX</code>',
            '<code>TOO_MANY_ROWS</code>',
            'No se dispara ninguna excepción'
        ]
    },
    {
        id: 'e1-mc3',
        type: 'multiple-choice',
        question: '¿Qué retorna la función <code>SQLERRM</code>?',
        options: [
            'El código numérico del error (ej: -1403)',
            'El mensaje descriptivo del error (ej: ORA-01403: no data found)',
            'El nombre de la excepción (ej: NO_DATA_FOUND)',
            'La línea donde ocurrió el error'
        ]
    },
    {
        id: 'e1-tf1',
        type: 'true-false',
        question: 'El bloque <code>EXCEPTION</code> puede ir en cualquier posición dentro del bloque PL/SQL (antes o después del <code>BEGIN</code>).'
    },
    {
        id: 'e1-tf2',
        type: 'true-false',
        question: '<code>WHEN OTHERS</code> debe ir siempre como el último handler en la sección <code>EXCEPTION</code>.'
    },
    {
        id: 'e1-fill1',
        type: 'fill-code',
        question: 'Completa el bloque PL/SQL para que capture la excepción cuando no se encuentra un evento en la tabla EVENTO:',
        parts: [
            { type: 'text', content: 'DECLARE\n    v_nombre EVENTO.nombre%TYPE;\nBEGIN\n    SELECT nombre INTO v_nombre\n    FROM EVENTO\n    WHERE evento_id = 999;\n\n    DBMS_OUTPUT.PUT_LINE(v_nombre);\n' },
            { type: 'blank', index: 0, placeholder: 'sección', width: 100 },
            { type: 'text', content: '\n    WHEN ' },
            { type: 'blank', index: 1, placeholder: 'excepción', width: 160 },
            { type: 'text', content: ' THEN\n        DBMS_OUTPUT.PUT_LINE(\'Evento no encontrado.\');\nEND;' }
        ]
    },
    {
        id: 'e1-fill2',
        type: 'fill-code',
        question: 'Completa el handler para capturar cualquier error no previsto e imprimir su mensaje:',
        parts: [
            { type: 'text', content: 'EXCEPTION\n    WHEN NO_DATA_FOUND THEN\n        DBMS_OUTPUT.PUT_LINE(\'Sin datos.\');\n    WHEN ' },
            { type: 'blank', index: 0, placeholder: 'handler', width: 100 },
            { type: 'text', content: ' THEN\n        DBMS_OUTPUT.PUT_LINE(\'Error: \' || ' },
            { type: 'blank', index: 1, placeholder: 'función', width: 100 },
            { type: 'text', content: ');\nEND;' }
        ]
    },
    {
        id: 'e1-err1',
        type: 'find-error',
        question: 'Este bloque PL/SQL tiene un error. Haz clic en la línea que lo contiene:',
        lines: [
            'DECLARE',
            '    v_email CLIENTE.email%TYPE;',
            'BEGIN',
            '    SELECT email INTO v_email',
            '    FROM CLIENTE',
            '    WHERE rut = \'19.456.789-1\';',
            '    DBMS_OUTPUT.PUT_LINE(v_email);',
            'EXCEPTION',
            '    WHEN OTHERS THEN',
            '        DBMS_OUTPUT.PUT_LINE(\'Error.\');',
            '    WHEN NO_DATA_FOUND THEN',
            '        DBMS_OUTPUT.PUT_LINE(\'No encontrado.\');',
            'END;'
        ]
    },
    {
        id: 'e1-err2',
        type: 'find-error',
        question: 'Identifica la línea con el error de sintaxis en este bloque:',
        lines: [
            'DECLARE',
            '    v_nombre CLIENTE.nombre%TYPE;',
            'BEGIN',
            '    SELECT nombre INTO v_nombre',
            '    FROM CLIENTE',
            '    WHERE email = \'valentina.soto@gmail.com\';',
            'EXCEPTION',
            '    WHEN NO_DATA_FOUND',
            '        DBMS_OUTPUT.PUT_LINE(\'No encontrado.\');',
            'END;'
        ]
    },
    {
        id: 'e1-ws1',
        type: 'word-search',
        question: 'Encuentra los siguientes <strong>6 términos</strong> sobre excepciones en la sopa de letras (haz clic en las letras para seleccionar y encontrar cada palabra):',
        gridSize: 12,
        words: ['EXCEPTION', 'SQLCODE', 'SQLERRM', 'NODATAFOUND', 'ZERODIVIDE', 'OTHERS'],
        wordPlacements: [
            { word: 'EXCEPTION', cells: [0, 1, 2, 3, 4, 5, 6, 7, 8], clue: 'Cláusula y tipo de dato para el manejo de errores en PL/SQL' },
            { word: 'SQLCODE', cells: [12, 13, 14, 15, 16, 17, 18], clue: 'Función que retorna el código numérico del error en Oracle' },
            { word: 'SQLERRM', cells: [37, 38, 39, 40, 41, 42, 43], clue: 'Función que retorna el mensaje descriptivo del error en Oracle' },
            { word: 'ZERODIVIDE', cells: [24, 36, 48, 60, 72, 84, 96, 108, 120, 132], clue: 'Excepción predefinida lanzada al intentar dividir por cero (ORA-01476)' },
            { word: 'OTHERS', cells: [75, 76, 77, 78, 79, 80], clue: 'Handler comodín (WHEN OTHERS) que captura cualquier excepción no prevista' },
            { word: 'NODATAFOUND', cells: [23, 35, 47, 59, 71, 83, 95, 107, 119, 131, 143], clue: 'Excepción predefinida cuando un SELECT INTO no retorna filas (ORA-01403)' }
        ],
        grid: [
            // Row 1
            {letter:'E'},{letter:'X'},{letter:'C'},{letter:'E'},{letter:'P'},{letter:'T'},{letter:'I'},{letter:'O'},{letter:'N'},{letter:'K'},{letter:'R'},{letter:'M'},
            // Row 2
            {letter:'S'},{letter:'Q'},{letter:'L'},{letter:'C'},{letter:'O'},{letter:'D'},{letter:'E'},{letter:'J'},{letter:'P'},{letter:'W'},{letter:'A'},{letter:'N'},
            // Row 3
            {letter:'Z'},{letter:'H'},{letter:'T'},{letter:'G'},{letter:'U'},{letter:'L'},{letter:'B'},{letter:'F'},{letter:'Q'},{letter:'X'},{letter:'D'},{letter:'O'},
            // Row 4
            {letter:'E'},{letter:'S'},{letter:'Q'},{letter:'L'},{letter:'E'},{letter:'R'},{letter:'R'},{letter:'M'},{letter:'V'},{letter:'Y'},{letter:'I'},{letter:'D'},
            // Row 5
            {letter:'R'},{letter:'K'},{letter:'W'},{letter:'D'},{letter:'R'},{letter:'P'},{letter:'C'},{letter:'N'},{letter:'J'},{letter:'Z'},{letter:'V'},{letter:'A'},
            // Row 6
            {letter:'O'},{letter:'F'},{letter:'A'},{letter:'M'},{letter:'I'},{letter:'T'},{letter:'H'},{letter:'G'},{letter:'L'},{letter:'S'},{letter:'I'},{letter:'T'},
            // Row 7
            {letter:'D'},{letter:'B'},{letter:'N'},{letter:'O'},{letter:'T'},{letter:'H'},{letter:'E'},{letter:'R'},{letter:'S'},{letter:'U'},{letter:'D'},{letter:'A'},
            // Row 8
            {letter:'I'},{letter:'R'},{letter:'E'},{letter:'P'},{letter:'Q'},{letter:'S'},{letter:'A'},{letter:'W'},{letter:'C'},{letter:'V'},{letter:'E'},{letter:'F'},
            // Row 9
            {letter:'V'},{letter:'C'},{letter:'F'},{letter:'G'},{letter:'H'},{letter:'J'},{letter:'K'},{letter:'L'},{letter:'M'},{letter:'N'},{letter:'P'},{letter:'O'},
            // Row 10
            {letter:'I'},{letter:'T'},{letter:'U'},{letter:'V'},{letter:'W'},{letter:'X'},{letter:'Y'},{letter:'Z'},{letter:'A'},{letter:'B'},{letter:'C'},{letter:'U'},
            // Row 11
            {letter:'D'},{letter:'E'},{letter:'F'},{letter:'G'},{letter:'H'},{letter:'I'},{letter:'J'},{letter:'K'},{letter:'L'},{letter:'M'},{letter:'N'},{letter:'N'},
            // Row 12
            {letter:'E'},{letter:'O'},{letter:'P'},{letter:'Q'},{letter:'R'},{letter:'S'},{letter:'T'},{letter:'U'},{letter:'V'},{letter:'W'},{letter:'X'},{letter:'D'}
        ]
    },
    {
        id: 'e1-prop1',
        type: 'proposed',
        question: '<strong>Ejercicio propuesto 1 — Punto Ticket</strong>',
        content: `<p>Escribe un bloque PL/SQL que reciba un <code>evento_id</code> (usa el valor <strong>999</strong>) e intente obtener el nombre del evento y su estado desde la tabla <code>EVENTO</code>.</p>
        <p>El bloque debe:</p>
        <ul>
            <li>Capturar <code>NO_DATA_FOUND</code> si el evento no existe e imprimir un mensaje.</li>
            <li>Capturar <code>OTHERS</code> para cualquier error inesperado, imprimiendo <code>SQLCODE</code> y <code>SQLERRM</code>.</li>
        </ul>
        <p>Pruébalo en Oracle con un <code>evento_id</code> que exista y uno que no exista.</p>`
    },
    {
        id: 'e1-prop2',
        type: 'proposed',
        question: '<strong>Ejercicio propuesto 2 — Punto Ticket</strong>',
        content: `<p>Escribe un bloque PL/SQL que intente insertar un nuevo cliente con un RUT que <strong>ya existe</strong> en la tabla <code>CLIENTE</code> (por ejemplo, <code>'19.456.789-1'</code>).</p>
        <p>El bloque debe:</p>
        <ul>
            <li>Capturar <code>DUP_VAL_ON_INDEX</code> e imprimir: <code>'El RUT ya está registrado en el sistema.'</code></li>
            <li>Capturar <code>OTHERS</code> e imprimir el código y mensaje del error.</li>
        </ul>
        <p>Luego modifica el bloque para usar un RUT nuevo y verifica que la inserción funcione (no olvides hacer <code>ROLLBACK</code> al final).</p>`
    }
];
