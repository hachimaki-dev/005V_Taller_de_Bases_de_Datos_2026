// s1_3_2_exercises.js — Ejercicios: Excepciones Definidas por el Usuario

const s1_3_2_exercises = [
    {
        id: 'e2-mc1',
        type: 'multiple-choice',
        question: '¿Cuál es el rango válido de códigos de error para <code>RAISE_APPLICATION_ERROR</code>?',
        options: [
            '-10000 a -10999',
            '-20000 a -20999',
            '-30000 a -30999',
            '20000 a 20999'
        ]
    },
    {
        id: 'e2-mc2',
        type: 'multiple-choice',
        question: '¿Qué instrucción se usa para asociar un código de error Oracle (ORA-XXXXX) a una excepción declarada por el usuario?',
        options: [
            '<code>RAISE_APPLICATION_ERROR</code>',
            '<code>EXCEPTION_INIT</code>',
            '<code>PRAGMA EXCEPTION_INIT</code>',
            '<code>ASSOCIATE_ERROR</code>'
        ]
    },
    {
        id: 'e2-mc3',
        type: 'multiple-choice',
        question: 'En el sistema Punto Ticket, ¿cuál es la forma correcta de impedir que se venda una entrada para un evento con estado <code>CANCELADO</code>?',
        options: [
            'Usar <code>NO_DATA_FOUND</code> para detectar el estado cancelado',
            'Declarar una excepción personalizada, verificar el estado con <code>IF</code> y usar <code>RAISE</code>',
            'Usar <code>TOO_MANY_ROWS</code> para verificar el estado',
            'No se puede hacer con excepciones'
        ]
    },
    {
        id: 'e2-tf1',
        type: 'true-false',
        question: '<code>RAISE_APPLICATION_ERROR</code> requiere declarar previamente una excepción con <code>nombre EXCEPTION;</code> en el <code>DECLARE</code>.'
    },
    {
        id: 'e2-tf2',
        type: 'true-false',
        question: 'Después de ejecutar <code>RAISE</code>, las instrucciones que siguen dentro del <code>BEGIN</code> continúan ejecutándose normalmente.'
    },
    {
        id: 'e2-fill1',
        type: 'fill-code',
        question: 'Completa el código para declarar y lanzar una excepción personalizada cuando el precio sea negativo:',
        parts: [
            { type: 'text', content: 'DECLARE\n    e_precio_invalido ' },
            { type: 'blank', index: 0, placeholder: 'tipo', width: 110 },
            { type: 'text', content: ';\n    v_precio NUMBER := -5000;\nBEGIN\n    IF v_precio < 0 THEN\n        ' },
            { type: 'blank', index: 1, placeholder: 'instrucción', width: 200 },
            { type: 'text', content: ';\n    END IF;\nEXCEPTION\n    WHEN e_precio_invalido THEN\n        DBMS_OUTPUT.PUT_LINE(\'Precio no válido.\');\nEND;' }
        ]
    },
    {
        id: 'e2-fill2',
        type: 'fill-code',
        question: 'Completa el código para lanzar un error de aplicación cuando el stock es 0:',
        parts: [
            { type: 'text', content: 'BEGIN\n    IF v_stock = 0 THEN\n        ' },
            { type: 'blank', index: 0, placeholder: 'procedimiento', width: 220 },
            { type: 'text', content: '(\n            ' },
            { type: 'blank', index: 1, placeholder: 'código', width: 80 },
            { type: 'text', content: ',\n            \'Entradas agotadas para esta localidad.\'\n        );\n    END IF;\nEND;' }
        ]
    },
    {
        id: 'e2-err1',
        type: 'find-error',
        question: 'Identifica la línea con el error en este bloque PL/SQL:',
        lines: [
            'DECLARE',
            '    e_sin_stock EXCEPTION;',
            '    v_stock NUMBER := 0;',
            'BEGIN',
            '    IF v_stock = 0 THEN',
            '        RAISE e_sin_stock;',
            '    END IF;',
            '    DBMS_OUTPUT.PUT_LINE(\'OK\');',
            'EXCEPTION',
            '    WHEN e_sin_stock THEN',
            '        RAISE_APPLICATION_ERROR(-25000, \'Sin stock\');',
            'END;'
        ]
    },
    {
        id: 'e2-err2',
        type: 'find-error',
        question: 'Este bloque intenta usar PRAGMA EXCEPTION_INIT. ¿Dónde está el error?',
        lines: [
            'DECLARE',
            '    e_fk_violada EXCEPTION;',
            'BEGIN',
            '    PRAGMA EXCEPTION_INIT(e_fk_violada, -2292);',
            '    DELETE FROM RECINTO WHERE recinto_id = 1;',
            'EXCEPTION',
            '    WHEN e_fk_violada THEN',
            '        DBMS_OUTPUT.PUT_LINE(\'No se puede eliminar.\');',
            'END;'
        ]
    },
    {
        id: 'e2-cw1',
        type: 'crossword',
        question: 'Completa el crucigrama interactivo con términos de esta sesión (haz clic en las casillas o en las pistas para escribir):',
        gridRows: 9,
        gridCols: 11,
        words: [
            { number: 1, direction: 'across', word: 'RAISE', row: 0, col: 0, clue: 'Instrucción para disparar una excepción personalizada' },
            { number: 2, direction: 'down', word: '999', row: 0, col: 8, clue: 'Rango de códigos disponibles para errores de usuario: -20000 a -20___' },
            { number: 3, direction: 'across', word: 'PRAGMA', row: 6, col: 0, clue: 'Palabra clave que asocia un código ORA a una excepción' },
            { number: 4, direction: 'down', word: 'DECLARE', row: 2, col: 2, clue: 'Sección del bloque donde se declaran las excepciones personalizadas' },
            { number: 5, direction: 'across', word: 'EXCEPTION', row: 3, col: 2, clue: 'Tipo de dato para declarar una excepción personalizada' }
        ],
        acrossClues: [
            { number: 1, clue: 'Instrucción para disparar una excepción personalizada', length: 5 },
            { number: 5, clue: 'Tipo de dato para declarar una excepción personalizada', length: 9 },
            { number: 3, clue: 'Palabra clave que asocia un código ORA a una excepción', length: 6 }
        ],
        downClues: [
            { number: 2, clue: 'Rango de códigos disponibles para errores de usuario: -20000 a -20___', length: 3 },
            { number: 4, clue: 'Sección del bloque donde se declaran las excepciones personalizadas', length: 7 }
        ]
    },
    {
        id: 'e2-prop1',
        type: 'proposed',
        question: '<strong>Ejercicio propuesto 1 — Punto Ticket</strong>',
        content: `<p>Crea un bloque PL/SQL que simule el proceso de reserva de una entrada. El bloque debe:</p>
        <ol>
            <li>Recibir un <code>evento_id</code> y un <code>localidad_evento_id</code> (usa valores reales de tu BD).</li>
            <li>Verificar que el estado del evento sea <code>'VENTA'</code>. Si no lo es, lanzar una excepción personalizada <code>e_no_en_venta</code>.</li>
            <li>Verificar que el <code>stock_disponible</code> sea mayor a 0. Si es 0, usar <code>RAISE_APPLICATION_ERROR(-20001, ...)</code>.</li>
            <li>Si ambas validaciones pasan, imprimir "Reserva aprobada".</li>
            <li>Capturar <code>NO_DATA_FOUND</code> para datos inexistentes.</li>
        </ol>`
    },
    {
        id: 'e2-prop2',
        type: 'proposed',
        question: '<strong>Ejercicio propuesto 2 — Punto Ticket</strong>',
        content: `<p>Usa <code>PRAGMA EXCEPTION_INIT</code> para manejar el error ORA-02292 (violación de FK con registros hijos).</p>
        <p>Escribe un bloque que intente eliminar un recinto de la tabla <code>RECINTO</code> (por ejemplo, 'Movistar Arena'). Como hay sectores, eventos y localidades asociadas, Oracle lanzará ORA-02292.</p>
        <p>Captura este error con una excepción personalizada y muestra un mensaje: <code>'No se puede eliminar el recinto porque tiene datos asociados.'</code></p>`
    }
];
