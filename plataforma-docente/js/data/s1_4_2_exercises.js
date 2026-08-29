// s1_4_2_exercises.js — Ejercicios: Evaluación Triggers

const s1_4_2_exercises = [
    {
        id: 'e4-mc1',
        type: 'multiple-choice',
        question: '¿Qué tipo de trigger se usa para <strong>registrar en un log</strong> los cambios hechos sobre una tabla?',
        options: [
            '<code>BEFORE INSERT</code>',
            '<code>AFTER UPDATE</code>',
            '<code>INSTEAD OF</code>',
            '<code>BEFORE DELETE</code>'
        ]
    },
    {
        id: 'e4-mc2',
        type: 'multiple-choice',
        question: 'En un trigger <code>BEFORE UPDATE FOR EACH ROW</code> sobre la tabla <code>LOCALIDAD_EVENTO</code>, ¿qué contiene <code>:OLD.precio</code>?',
        options: [
            'El nuevo precio que se va a guardar',
            'El precio antes de la modificación',
            'NULL porque es un UPDATE',
            'El precio promedio de todas las localidades'
        ]
    },
    {
        id: 'e4-mc3',
        type: 'multiple-choice',
        question: '¿Qué error ocurre cuando un trigger <code>FOR EACH ROW</code> intenta hacer un <code>SELECT</code> sobre la misma tabla que lo disparó?',
        options: [
            '<code>NO_DATA_FOUND</code>',
            '<code>TOO_MANY_ROWS</code>',
            'Mutating table error (ORA-04091)',
            '<code>DUP_VAL_ON_INDEX</code>'
        ]
    },
    {
        id: 'e4-tf1',
        type: 'true-false',
        question: 'Un trigger se invoca explícitamente con <code>EXEC nombre_trigger;</code>.'
    },
    {
        id: 'e4-tf2',
        type: 'true-false',
        question: 'En un <code>DELETE</code>, el pseudo-registro <code>:NEW</code> tiene valores NULL porque la fila ya no existirá.'
    },
    {
        id: 'e4-fill1',
        type: 'fill-code',
        question: 'Completa el trigger de auditoría que registra en <code>LOG_ANULACIONES</code> cuando se anula un ticket:',
        parts: [
            { type: 'text', content: 'CREATE OR REPLACE TRIGGER trg_log_anulacion\n' },
            { type: 'blank', index: 0, placeholder: 'momento', width: 60 },
            { type: 'text', content: ' UPDATE OF estado ON TICKET\nFOR EACH ROW\nWHEN (' },
            { type: 'blank', index: 1, placeholder: 'condición', width: 220 },
            { type: 'text', content: ')\nBEGIN\n    INSERT INTO LOG_ANULACIONES (\n        ticket_id, motivo\n    ) VALUES (\n        :OLD.ticket_id,\n        \'Ticket anulado desde estado: \' || :OLD.estado\n    );\nEND;' }
        ]
    },
    {
        id: 'e4-fill2',
        type: 'fill-code',
        question: 'Completa el trigger que impide eliminar un recinto:',
        parts: [
            { type: 'text', content: 'CREATE OR REPLACE TRIGGER trg_proteger_recinto\n' },
            { type: 'blank', index: 0, placeholder: 'momento', width: 70 },
            { type: 'text', content: ' ' },
            { type: 'blank', index: 1, placeholder: 'operación', width: 80 },
            { type: 'text', content: ' ON RECINTO\nFOR EACH ROW\nBEGIN\n    RAISE_APPLICATION_ERROR(\n        -20050,\n        \'No se permite eliminar recintos.\'\n    );\nEND;' }
        ]
    },
    {
        id: 'e4-err1',
        type: 'find-error',
        question: 'Identifica la línea con el error en este trigger:',
        lines: [
            'CREATE OR REPLACE TRIGGER trg_audit_precio',
            'AFTER UPDATE OF precio ON LOCALIDAD_EVENTO',
            'FOR EACH ROW',
            'BEGIN',
            '    INSERT INTO LOG_CAMBIO_PRECIO (',
            '        localidad_evento_id,',
            '        precio_anterior,',
            '        precio_nuevo',
            '    ) VALUES (',
            '        :NEW.localidad_evento_id,',
            '        :OLD.precio,',
            '        :OLD.precio',
            '    );',
            'END;'
        ]
    },
    {
        id: 'e4-cw1',
        type: 'crossword',
        question: 'Completa el crucigrama interactivo con términos clave de Triggers (haz clic en las casillas o en las pistas para escribir):',
        gridRows: 7,
        gridCols: 10,
        words: [
            { number: 1, direction: 'across', word: 'OLD', row: 3, col: 1, clue: 'Pseudo-registro con valores anteriores a la operación DML' },
            { number: 2, direction: 'down', word: 'NEW', row: 0, col: 6, clue: 'Pseudo-registro con los valores nuevos a insertar o modificar' },
            { number: 3, direction: 'across', word: 'FOREACHROW', row: 6, col: 0, clue: 'Cláusula (sin espacios) que hace que el trigger se ejecute por cada fila' },
            { number: 4, direction: 'down', word: 'BEFORE', row: 0, col: 1, clue: 'Tipo de trigger que se ejecuta antes de la operación' },
            { number: 5, direction: 'across', word: 'AFTER', row: 2, col: 0, clue: 'Tipo de trigger que se ejecuta después de la operación' }
        ],
        acrossClues: [
            { number: 5, clue: 'Tipo de trigger que se ejecuta después de la operación', length: 5 },
            { number: 1, clue: 'Pseudo-registro con valores anteriores a la operación DML', length: 3 },
            { number: 3, clue: 'Cláusula (sin espacios) que hace que el trigger se ejecute por cada fila', length: 10 }
        ],
        downClues: [
            { number: 4, clue: 'Tipo de trigger que se ejecuta antes de la operación', length: 6 },
            { number: 2, clue: 'Pseudo-registro con los valores nuevos a insertar o modificar', length: 3 }
        ]
    },
    {
        id: 'e4-prop1',
        type: 'proposed',
        question: '<strong>Ejercicio propuesto 1 — Punto Ticket</strong>',
        content: `<p>Crea un trigger <code>AFTER UPDATE OF estado ON EVENTO</code> que:</p>
        <ol>
            <li>Se dispare cuando el estado de un evento cambie a <code>'CANCELADO'</code>.</li>
            <li>Registre en <code>DBMS_OUTPUT</code> el nombre del evento y la fecha de cancelación.</li>
            <li>Use la cláusula <code>WHEN</code> para filtrar solo cuando <code>NEW.estado = 'CANCELADO'</code>.</li>
        </ol>
        <p>Pruébalo con: <code>UPDATE EVENTO SET estado = 'CANCELADO' WHERE evento_id = 2;</code> y luego <code>ROLLBACK;</code></p>`
    },
    {
        id: 'e4-prop2',
        type: 'proposed',
        question: '<strong>Ejercicio propuesto 2 — Punto Ticket</strong>',
        content: `<p>Crea un trigger <code>BEFORE INSERT ON RESERVA_TEMPORAL</code> que:</p>
        <ol>
            <li>Verifique que la <code>fecha_expiracion</code> sea mayor que la <code>fecha_reserva</code>.</li>
            <li>Si no lo es, lance <code>RAISE_APPLICATION_ERROR(-20020, 'La fecha de expiración debe ser posterior a la fecha de reserva.')</code>.</li>
            <li>Además, si la diferencia es menor a 5 minutos, lance <code>RAISE_APPLICATION_ERROR(-20021, 'La reserva debe tener al menos 5 minutos de vigencia.')</code>.</li>
        </ol>`
    }
];
