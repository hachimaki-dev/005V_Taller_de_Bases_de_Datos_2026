// s1_4_1_exercises.js — Ejercicios: Evaluación Proc, Func, Pack

const s1_4_1_exercises = [
    {
        id: 'e3-mc1',
        type: 'multiple-choice',
        question: '¿Cuál es la diferencia principal entre un procedimiento y una función en PL/SQL?',
        options: [
            'El procedimiento puede recibir parámetros y la función no',
            'La función siempre retorna un valor con <code>RETURN</code>, el procedimiento no',
            'El procedimiento se almacena en la BD y la función no',
            'No hay diferencia, son sinónimos'
        ]
    },
    {
        id: 'e3-mc2',
        type: 'multiple-choice',
        question: '¿Cuál modo de parámetro permite que un procedimiento <strong>devuelva</strong> un resultado al llamador?',
        options: [
            '<code>IN</code>',
            '<code>OUT</code>',
            '<code>RETURN</code>',
            '<code>INBOUND</code>'
        ]
    },
    {
        id: 'e3-mc3',
        type: 'multiple-choice',
        question: '¿Cómo se invoca la función <code>obtener_precio</code> del paquete <code>pkg_punto_ticket</code>?',
        options: [
            '<code>CALL pkg_punto_ticket->obtener_precio(1)</code>',
            '<code>SELECT pkg_punto_ticket.obtener_precio(1) FROM DUAL</code>',
            '<code>EXEC obtener_precio(1) FROM pkg_punto_ticket</code>',
            '<code>RUN pkg_punto_ticket::obtener_precio(1)</code>'
        ]
    },
    {
        id: 'e3-tf1',
        type: 'true-false',
        question: 'Una función PL/SQL que contiene instrucciones <code>INSERT</code> puede ser usada dentro de un <code>SELECT</code> de SQL.'
    },
    {
        id: 'e3-tf2',
        type: 'true-false',
        question: 'Un paquete PL/SQL tiene dos partes obligatorias: la especificación (<code>PACKAGE</code>) y el cuerpo (<code>PACKAGE BODY</code>).'
    },
    {
        id: 'e3-fill1',
        type: 'fill-code',
        question: 'Completa la función que retorna el nombre de un evento dado su ID:',
        parts: [
            { type: 'text', content: 'CREATE OR REPLACE ' },
            { type: 'blank', index: 0, placeholder: 'tipo', width: 100 },
            { type: 'text', content: ' obtener_nombre_evento(\n    p_evento_id IN NUMBER\n) ' },
            { type: 'blank', index: 1, placeholder: 'cláusula', width: 160 },
            { type: 'text', content: '\nAS\n    v_nombre EVENTO.nombre%TYPE;\nBEGIN\n    SELECT nombre INTO v_nombre\n    FROM EVENTO WHERE evento_id = p_evento_id;\n    ' },
            { type: 'blank', index: 2, placeholder: 'retorno', width: 160 },
            { type: 'text', content: ';\nEND;' }
        ]
    },
    {
        id: 'e3-fill2',
        type: 'fill-code',
        question: 'Completa la especificación del paquete:',
        parts: [
            { type: 'text', content: 'CREATE OR REPLACE ' },
            { type: 'blank', index: 0, placeholder: 'palabra clave', width: 100 },
            { type: 'text', content: ' pkg_clientes AS\n    PROCEDURE registrar(p_rut VARCHAR2, p_nombre VARCHAR2);\n    FUNCTION  contar_clientes RETURN NUMBER;\n' },
            { type: 'blank', index: 1, placeholder: 'cierre', width: 140 },
            { type: 'text', content: ';' }
        ]
    },
    {
        id: 'e3-err1',
        type: 'find-error',
        question: 'Identifica la línea con el error en esta función:',
        lines: [
            'CREATE OR REPLACE FUNCTION calcular_descuento(',
            '    p_monto IN NUMBER,',
            '    p_porcentaje IN NUMBER',
            ') RETURN NUMBER',
            'AS',
            'BEGIN',
            '    DBMS_OUTPUT.PUT_LINE(\'Calculando...\');',
            '    p_monto * (p_porcentaje / 100);',
            'END;'
        ]
    },
    {
        id: 'e3-ws1',
        type: 'word-search',
        question: 'Encuentra los siguientes <strong>5 términos</strong> clave en la sopa de letras (haz clic en las letras para seleccionar y encontrar cada palabra):',
        gridSize: 10,
        words: ['PROCEDURE', 'FUNCTION', 'PACKAGE', 'RETURN', 'REPLACE'],
        wordPlacements: [
            { word: 'PROCEDURE', cells: [0, 1, 2, 3, 4, 5, 6, 7, 8], clue: 'Bloque almacenado que realiza acciones y no retorna valor directo' },
            { word: 'FUNCTION', cells: [10, 11, 12, 13, 14, 15, 16, 17], clue: 'Subprograma que siempre retorna un valor y puede usarse en SQL' },
            { word: 'RETURN', cells: [30, 31, 32, 33, 34, 35], clue: 'Palabra clave que define y devuelve el valor en una función' },
            { word: 'PACKAGE', cells: [50, 51, 52, 53, 54, 55, 56], clue: 'Contenedor que agrupa procedimientos, funciones y tipos relacionados' },
            { word: 'REPLACE', cells: [70, 71, 72, 73, 74, 75, 76], clue: 'Cláusula (OR REPLACE) para sobrescribir subprogramas sin borrarlos' }
        ],
        grid: [
            {letter:'P'},{letter:'R'},{letter:'O'},{letter:'C'},{letter:'E'},{letter:'D'},{letter:'U'},{letter:'R'},{letter:'E'},{letter:'A'},
            {letter:'F'},{letter:'U'},{letter:'N'},{letter:'C'},{letter:'T'},{letter:'I'},{letter:'O'},{letter:'N'},{letter:'B'},{letter:'C'},
            {letter:'G'},{letter:'H'},{letter:'J'},{letter:'K'},{letter:'L'},{letter:'M'},{letter:'N'},{letter:'P'},{letter:'Q'},{letter:'R'},
            {letter:'R'},{letter:'E'},{letter:'T'},{letter:'U'},{letter:'R'},{letter:'N'},{letter:'S'},{letter:'T'},{letter:'V'},{letter:'W'},
            {letter:'X'},{letter:'Y'},{letter:'Z'},{letter:'A'},{letter:'B'},{letter:'C'},{letter:'D'},{letter:'E'},{letter:'F'},{letter:'G'},
            {letter:'P'},{letter:'A'},{letter:'C'},{letter:'K'},{letter:'A'},{letter:'G'},{letter:'E'},{letter:'H'},{letter:'I'},{letter:'J'},
            {letter:'K'},{letter:'L'},{letter:'M'},{letter:'N'},{letter:'O'},{letter:'P'},{letter:'Q'},{letter:'R'},{letter:'S'},{letter:'T'},
            {letter:'R'},{letter:'E'},{letter:'P'},{letter:'L'},{letter:'A'},{letter:'C'},{letter:'E'},{letter:'U'},{letter:'V'},{letter:'W'},
            {letter:'X'},{letter:'Y'},{letter:'Z'},{letter:'A'},{letter:'B'},{letter:'C'},{letter:'D'},{letter:'E'},{letter:'F'},{letter:'G'},
            {letter:'H'},{letter:'I'},{letter:'J'},{letter:'K'},{letter:'L'},{letter:'M'},{letter:'N'},{letter:'O'},{letter:'P'},{letter:'Q'}
        ]
    },
    {
        id: 'e3-prop1',
        type: 'proposed',
        question: '<strong>Ejercicio propuesto 1 — Punto Ticket</strong>',
        content: `<p>Crea un <strong>procedimiento</strong> llamado <code>anular_ticket</code> que:</p>
        <ol>
            <li>Reciba como parámetro <code>IN</code> un <code>p_ticket_id</code>.</li>
            <li>Verifique que el ticket exista y que su estado sea <code>'EMITIDO'</code>.</li>
            <li>Si es válido, actualice el estado del ticket a <code>'ANULADO'</code>.</li>
            <li>Devuelva por parámetro <code>OUT</code> el código del ticket anulado.</li>
            <li>Maneje la excepción <code>NO_DATA_FOUND</code>.</li>
        </ol>`
    },
    {
        id: 'e3-prop2',
        type: 'proposed',
        question: '<strong>Ejercicio propuesto 2 — Punto Ticket</strong>',
        content: `<p>Crea una <strong>función</strong> llamada <code>calcular_monto_con_descuento</code> que:</p>
        <ol>
            <li>Reciba <code>p_localidad_id</code> y <code>p_convenio_id</code>.</li>
            <li>Obtenga el precio de la localidad y el porcentaje de descuento del convenio.</li>
            <li>Retorne el monto final (precio - descuento).</li>
            <li>Si la localidad o el convenio no existen, retorne <code>-1</code>.</li>
        </ol>
        <p>Pruébala con: <code>SELECT calcular_monto_con_descuento(1, 1) FROM DUAL;</code></p>`
    }
];
