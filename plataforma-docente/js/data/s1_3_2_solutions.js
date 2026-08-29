// s1_3_2_solutions.js — Solucionario: Excepciones Definidas por el Usuario

const s1_3_2_solutions = [
    {
        id: 'e2-mc1',
        answer: 1,
        explanation: '<strong>Correcto: -20000 a -20999.</strong> Oracle reserva este rango exclusivamente para errores definidos por el usuario con <code>RAISE_APPLICATION_ERROR</code>. Cualquier código fuera de este rango genera un error.'
    },
    {
        id: 'e2-mc2',
        answer: 2,
        explanation: '<strong>Correcto: PRAGMA EXCEPTION_INIT.</strong> Esta directiva del compilador asocia un código de error Oracle (como ORA-02292) a una excepción declarada por el usuario, permitiendo capturarla con un <code>WHEN nombre_excepcion</code>.'
    },
    {
        id: 'e2-mc3',
        answer: 1,
        explanation: '<strong>Correcto.</strong> Se declara una excepción personalizada (ej: <code>e_evento_cancelado</code>), se consulta el estado del evento, y si es CANCELADO se usa <code>RAISE</code> para lanzarla. Luego se captura en la sección EXCEPTION.'
    },
    {
        id: 'e2-tf1',
        answer: false,
        explanation: '<strong>Falso.</strong> <code>RAISE_APPLICATION_ERROR</code> no requiere declarar una excepción previa. Se usa directamente con un código (-20000 a -20999) y un mensaje. Es <code>RAISE</code> el que necesita una excepción declarada.'
    },
    {
        id: 'e2-tf2',
        answer: false,
        explanation: '<strong>Falso.</strong> Después de <code>RAISE</code>, el flujo salta inmediatamente a la sección <code>EXCEPTION</code>. Ninguna instrucción posterior a <code>RAISE</code> dentro del <code>BEGIN</code> se ejecuta.'
    },
    {
        id: 'e2-fill1',
        answers: ['EXCEPTION', ['RAISE e_precio_invalido', 'RAISE  e_precio_invalido']],
        explanation: 'Se declara con tipo <code>EXCEPTION</code> y se lanza con <code>RAISE e_precio_invalido</code>.',
        fullSolution: '<pre>DECLARE\n    e_precio_invalido EXCEPTION;\n    v_precio NUMBER := -5000;\nBEGIN\n    IF v_precio < 0 THEN\n        RAISE e_precio_invalido;\n    END IF;\nEXCEPTION\n    WHEN e_precio_invalido THEN\n        DBMS_OUTPUT.PUT_LINE(\'Precio no válido.\');\nEND;</pre>'
    },
    {
        id: 'e2-fill2',
        answers: ['RAISE_APPLICATION_ERROR', '-20001'],
        explanation: 'El procedimiento es <code>RAISE_APPLICATION_ERROR</code> y el código debe estar en el rango -20000 a -20999.',
        fullSolution: '<pre>BEGIN\n    IF v_stock = 0 THEN\n        RAISE_APPLICATION_ERROR(\n            -20001,\n            \'Entradas agotadas para esta localidad.\'\n        );\n    END IF;\nEND;</pre>'
    },
    {
        id: 'e2-err1',
        answer: 10,
        explanation: '<strong>Error en la línea 11:</strong> El código <code>-25000</code> está fuera del rango válido para <code>RAISE_APPLICATION_ERROR</code>. El rango permitido es <strong>-20000 a -20999</strong>. Debería ser, por ejemplo, <code>-20001</code>.',
        fullSolution: 'La línea correcta sería:<pre>        RAISE_APPLICATION_ERROR(-20001, \'Sin stock\');</pre>'
    },
    {
        id: 'e2-err2',
        answer: 3,
        explanation: '<strong>Error en la línea 4:</strong> <code>PRAGMA EXCEPTION_INIT</code> debe ir en la sección <code>DECLARE</code>, no dentro del <code>BEGIN</code>. Es una directiva del compilador, no una instrucción ejecutable.',
        fullSolution: 'La estructura correcta es:<pre>DECLARE\n    e_fk_violada EXCEPTION;\n    PRAGMA EXCEPTION_INIT(e_fk_violada, -2292);\nBEGIN\n    DELETE FROM RECINTO WHERE recinto_id = 1;\nEXCEPTION\n    WHEN e_fk_violada THEN\n        DBMS_OUTPUT.PUT_LINE(\'No se puede eliminar.\');\nEND;</pre>'
    },
    {
        id: 'e2-cw1',
        explanation: '<strong>¡Crucigrama completado correctamente!</strong> Todas las palabras clave de la sesión de excepciones de usuario están bien ubicadas.',
        fullSolution: `
            <h4>Solución del Crucigrama:</h4>
            <table>
                <tr><th>N°</th><th>Dirección</th><th>Palabra</th><th>Pista / Concepto</th></tr>
                <tr><td>1</td><td>Horizontal</td><td><strong>RAISE</strong></td><td>Instrucción para disparar una excepción personalizada.</td></tr>
                <tr><td>2</td><td>Vertical</td><td><strong>999</strong></td><td>Rango reservado por Oracle: -20000 a -20999 para RAISE_APPLICATION_ERROR.</td></tr>
                <tr><td>3</td><td>Horizontal</td><td><strong>PRAGMA</strong></td><td>Directiva del compilador que asocia un código ORA a una excepción (PRAGMA EXCEPTION_INIT).</td></tr>
                <tr><td>4</td><td>Vertical</td><td><strong>DECLARE</strong></td><td>Sección del bloque donde se declaran las excepciones personalizadas.</td></tr>
                <tr><td>5</td><td>Horizontal</td><td><strong>EXCEPTION</strong></td><td>Tipo de dato para declarar una excepción personalizada.</td></tr>
            </table>
        `
    },
    {
        id: 'e2-prop1',
        explanation: 'Este ejercicio se resuelve en Oracle.',
        fullSolution: '<pre>DECLARE\n    e_no_en_venta EXCEPTION;\n    v_estado EVENTO.estado%TYPE;\n    v_stock  LOCALIDAD_EVENTO.stock_disponible%TYPE;\nBEGIN\n    -- 1. Verificar estado\n    SELECT estado INTO v_estado\n    FROM EVENTO WHERE evento_id = 1;\n\n    IF v_estado != \'VENTA\' THEN\n        RAISE e_no_en_venta;\n    END IF;\n\n    -- 2. Verificar stock\n    SELECT stock_disponible INTO v_stock\n    FROM LOCALIDAD_EVENTO WHERE localidad_evento_id = 1;\n\n    IF v_stock <= 0 THEN\n        RAISE_APPLICATION_ERROR(-20001, \'Entradas agotadas.\');\n    END IF;\n\n    DBMS_OUTPUT.PUT_LINE(\'Reserva aprobada.\');\nEXCEPTION\n    WHEN e_no_en_venta THEN\n        DBMS_OUTPUT.PUT_LINE(\'El evento no está en venta.\');\n    WHEN NO_DATA_FOUND THEN\n        DBMS_OUTPUT.PUT_LINE(\'Evento o localidad no encontrada.\');\n    WHEN OTHERS THEN\n        DBMS_OUTPUT.PUT_LINE(SQLERRM);\nEND;</pre>'
    },
    {
        id: 'e2-prop2',
        explanation: 'Este ejercicio se resuelve en Oracle.',
        fullSolution: '<pre>DECLARE\n    e_fk_violada EXCEPTION;\n    PRAGMA EXCEPTION_INIT(e_fk_violada, -2292);\nBEGIN\n    DELETE FROM RECINTO\n    WHERE nombre = \'Movistar Arena\';\n\n    DBMS_OUTPUT.PUT_LINE(\'Recinto eliminado.\');\nEXCEPTION\n    WHEN e_fk_violada THEN\n        DBMS_OUTPUT.PUT_LINE(\n            \'No se puede eliminar el recinto \' ||\n            \'porque tiene datos asociados.\'\n        );\nEND;</pre>'
    }
];
