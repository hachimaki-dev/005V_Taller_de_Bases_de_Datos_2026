// s1_4_2_solutions.js — Solucionario: Evaluación Triggers

const s1_4_2_solutions = [
    {
        id: 'e4-mc1',
        answer: 1,
        explanation: '<strong>Correcto: AFTER UPDATE.</strong> Para registrar en un log se usa <code>AFTER</code> porque queremos registrar el cambio <em>después</em> de que ocurrió. <code>BEFORE</code> se usa para validar o prevenir.'
    },
    {
        id: 'e4-mc2',
        answer: 1,
        explanation: '<strong>Correcto.</strong> <code>:OLD.precio</code> contiene el valor del precio <em>antes</em> de la modificación. <code>:NEW.precio</code> contiene el valor nuevo que se va a guardar.'
    },
    {
        id: 'e4-mc3',
        answer: 2,
        explanation: '<strong>Correcto: Mutating table error (ORA-04091).</strong> Oracle no permite que un trigger <code>FOR EACH ROW</code> consulte (SELECT) la misma tabla que disparó el trigger, porque la tabla está "en proceso de cambio".'
    },
    {
        id: 'e4-tf1',
        answer: false,
        explanation: '<strong>Falso.</strong> Los triggers se ejecutan <em>automáticamente</em> cuando ocurre el evento DML asociado. No se pueden invocar manualmente con EXEC.'
    },
    {
        id: 'e4-tf2',
        answer: true,
        explanation: '<strong>Verdadero.</strong> En un <code>DELETE</code>, <code>:NEW</code> es NULL porque la fila está siendo eliminada. <code>:OLD</code> contiene los valores de la fila que se está borrando.'
    },
    {
        id: 'e4-fill1',
        answers: ['AFTER', ['NEW.estado = \'ANULADO\'', 'NEW.estado=\'ANULADO\'']],
        explanation: 'Usamos <code>AFTER</code> porque queremos registrar después de que el cambio ocurrió. La condición <code>WHEN</code> filtra para que solo se ejecute cuando el nuevo estado sea ANULADO.',
        fullSolution: '<pre>CREATE OR REPLACE TRIGGER trg_log_anulacion\nAFTER UPDATE OF estado ON TICKET\nFOR EACH ROW\nWHEN (NEW.estado = \'ANULADO\')\nBEGIN\n    INSERT INTO LOG_ANULACIONES (\n        ticket_id, motivo\n    ) VALUES (\n        :OLD.ticket_id,\n        \'Ticket anulado desde estado: \' || :OLD.estado\n    );\nEND;</pre>'
    },
    {
        id: 'e4-fill2',
        answers: ['BEFORE', 'DELETE'],
        explanation: 'Usamos <code>BEFORE DELETE</code> porque queremos <em>impedir</em> la eliminación antes de que ocurra. <code>RAISE_APPLICATION_ERROR</code> cancela la operación.',
        fullSolution: '<pre>CREATE OR REPLACE TRIGGER trg_proteger_recinto\nBEFORE DELETE ON RECINTO\nFOR EACH ROW\nBEGIN\n    RAISE_APPLICATION_ERROR(\n        -20050,\n        \'No se permite eliminar recintos.\'\n    );\nEND;</pre>'
    },
    {
        id: 'e4-err1',
        answer: 11,
        explanation: '<strong>Error en la línea 12:</strong> El campo <code>precio_nuevo</code> debería usar <code>:NEW.precio</code>, no <code>:OLD.precio</code>. Ambos campos están usando el precio anterior, lo cual es incorrecto para una auditoría de cambio de precio.',
        fullSolution: 'La línea correcta:<pre>        :NEW.precio</pre>Es decir, <code>precio_anterior</code> usa <code>:OLD.precio</code> y <code>precio_nuevo</code> usa <code>:NEW.precio</code>.'
    },
    {
        id: 'e4-cw1',
        explanation: '<strong>¡Crucigrama completado correctamente!</strong> Todos los conceptos clave de Triggers fueron ubicados.',
        fullSolution: `
            <h4>Solución del Crucigrama:</h4>
            <table>
                <tr><th>N°</th><th>Dirección</th><th>Palabra</th><th>Pista / Concepto</th></tr>
                <tr><td>1</td><td>Horizontal</td><td><strong>OLD</strong></td><td>Pseudo-registro que contiene los valores de la fila antes del UPDATE o DELETE.</td></tr>
                <tr><td>2</td><td>Vertical</td><td><strong>NEW</strong></td><td>Pseudo-registro que contiene los valores a insertar o modificar (NULL en DELETE).</td></tr>
                <tr><td>3</td><td>Horizontal</td><td><strong>FOREACHROW</strong></td><td>Cláusula (FOR EACH ROW) para triggers a nivel de fila que habilita :NEW y :OLD.</td></tr>
                <tr><td>4</td><td>Vertical</td><td><strong>BEFORE</strong></td><td>Momento de disparo previo a la ejecución del DML (ideal para validaciones).</td></tr>
                <tr><td>5</td><td>Horizontal</td><td><strong>AFTER</strong></td><td>Momento de disparo posterior a la ejecución del DML (ideal para auditoría/logs).</td></tr>
            </table>
        `
    },
    {
        id: 'e4-prop1',
        explanation: 'Este ejercicio se resuelve en Oracle.',
        fullSolution: '<pre>CREATE OR REPLACE TRIGGER trg_evento_cancelado\nAFTER UPDATE OF estado ON EVENTO\nFOR EACH ROW\nWHEN (NEW.estado = \'CANCELADO\')\nBEGIN\n    DBMS_OUTPUT.PUT_LINE(\n        \'EVENTO CANCELADO: \' || :NEW.nombre ||\n        \' | Fecha: \' || TO_CHAR(SYSDATE, \'DD/MM/YYYY HH24:MI\')\n    );\nEND;\n/\n\n-- Prueba:\nSET SERVEROUTPUT ON;\nUPDATE EVENTO SET estado = \'CANCELADO\' WHERE evento_id = 2;\n-- Debería imprimir: EVENTO CANCELADO: Lollapalooza Chile | Fecha: ...\nROLLBACK;</pre>'
    },
    {
        id: 'e4-prop2',
        explanation: 'Este ejercicio se resuelve en Oracle.',
        fullSolution: '<pre>CREATE OR REPLACE TRIGGER trg_validar_reserva\nBEFORE INSERT ON RESERVA_TEMPORAL\nFOR EACH ROW\nBEGIN\n    IF :NEW.fecha_expiracion <= :NEW.fecha_reserva THEN\n        RAISE_APPLICATION_ERROR(-20020,\n            \'La fecha de expiración debe ser posterior \' ||\n            \'a la fecha de reserva.\'\n        );\n    END IF;\n\n    IF (:NEW.fecha_expiracion - :NEW.fecha_reserva) * 24 * 60 < 5 THEN\n        RAISE_APPLICATION_ERROR(-20021,\n            \'La reserva debe tener al menos 5 minutos \' ||\n            \'de vigencia.\'\n        );\n    END IF;\nEND;</pre>'
    }
];
