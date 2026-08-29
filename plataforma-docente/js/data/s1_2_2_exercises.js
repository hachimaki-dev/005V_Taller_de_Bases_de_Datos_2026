// s1_2_2_exercises.js — Ejercicios: Ciclos Anidados con Cursores en PL/SQL

const s1_2_2_exercises = [
    {
        id: 'e122-mc1',
        type: 'multiple-choice',
        question: 'En un esquema maestro-detalle con ciclos anidados, ¿dónde se debe reiniciar a 0 el acumulador de subtotales del maestro?',
        options: [
            'En el bloque DECLARE únicamente',
            'Dentro del bucle exterior (maestro), justo antes de iniciar el bucle interior (detalle)',
            'Dentro del bucle interior, después de cada iteración de detalle',
            'Al final del bloque PL/SQL antes de la sentencia END'
        ]
    },
    {
        id: 'e122-mc2',
        type: 'multiple-choice',
        question: '¿Qué ocurre si se ejecuta una sentencia <code>EXIT;</code> dentro del bucle interior de una estructura anidada sin etiquetar?',
        options: [
            'Finaliza inmediatamente todo el bloque PL/SQL y hace ROLLBACK',
            'Termina únicamente el bucle interior y el flujo continúa en la siguiente iteración del bucle exterior',
            'Termina el bucle exterior directamente',
            'Genera un error de sintaxis en tiempo de ejecución'
        ]
    },
    {
        id: 'e122-mc3',
        type: 'multiple-choice',
        question: '¿Cuál es la forma recomendada de comunicar el registro maestro actual con el cursor detalle?',
        options: [
            'Usando variables globales públicas en un paquete',
            'Pasando la clave primaria del maestro como argumento al cursor detalle parametrizado: <code>c_detalle(reg_maestro.id)</code>',
            'Ejecutando un COMMIT dentro del ciclo interior',
            'Cerrando y volviendo a declarar el cursor maestro'
        ]
    },
    {
        id: 'e122-tf1',
        type: 'true-false',
        question: 'Un bucle interior puede ejecutar a su vez otro bucle anidado dentro de él (tercer nivel de anidamiento).'
    },
    {
        id: 'e122-tf2',
        type: 'true-false',
        question: 'En un cursor FOR LOOP anidado, la variable de registro del bucle exterior (ej: <code>reg_padre</code>) es accesible y utilizable dentro del cuerpo del bucle interior.'
    },
    {
        id: 'e122-fill1',
        type: 'fill-code',
        question: 'Completa la estructura anidada para listar los sectores de cada recinto de Punto Ticket:',
        parts: [
            { type: 'text', content: 'DECLARE\n    CURSOR c_recintos IS SELECT recinto_id, nombre FROM RECINTO;\n    CURSOR c_sectores(p_recinto_id NUMBER) IS\n        SELECT nombre_sector, capacidad FROM SECTOR_RECINTO WHERE recinto_id = p_recinto_id;\nBEGIN\n    FOR rec IN c_recintos ' },
            { type: 'blank', index: 0, placeholder: 'palabra clave', width: 80 },
            { type: 'text', content: '\n        DBMS_OUTPUT.PUT_LINE(\'Recinto: \' || rec.nombre);\n        FOR sec IN ' },
            { type: 'blank', index: 1, placeholder: 'cursor(param)', width: 220 },
            { type: 'text', content: ' LOOP\n            DBMS_OUTPUT.PUT_LINE(\'  - Sector: \' || sec.nombre_sector);\n        END LOOP;\n    END LOOP;\nEND;' }
        ]
    },
    {
        id: 'e122-fill2',
        type: 'fill-code',
        question: 'Completa el cálculo del total recaudado por evento con reinicio de acumulador:',
        parts: [
            { type: 'text', content: 'BEGIN\n    FOR ev IN c_eventos LOOP\n        ' },
            { type: 'blank', index: 0, placeholder: 'reinicio variable', width: 160 },
            { type: 'text', content: ';\n        FOR loc IN c_localidades(ev.evento_id) LOOP\n            v_subtotal := v_subtotal + (' },
            { type: 'blank', index: 1, placeholder: 'cálculo', width: 170 },
            { type: 'text', content: ');\n        END LOOP;\n        DBMS_OUTPUT.PUT_LINE(ev.nombre || \' Total: $\' || v_subtotal);\n    END LOOP;\nEND;' }
        ]
    },
    {
        id: 'e122-err1',
        type: 'find-error',
        question: 'Identifica la línea con el error lógico en el acumulador de este bloque:',
        lines: [
            'DECLARE',
            '    CURSOR c_prod IS SELECT productora_id, nombre_fantasia FROM PRODUCTORA;',
            '    CURSOR c_ev(p_prod NUMBER) IS SELECT evento_id, nombre FROM EVENTO WHERE productora_id = p_prod;',
            '    v_total_eventos NUMBER := 0;',
            'BEGIN',
            '    FOR p IN c_prod LOOP',
            '        FOR e IN c_ev(p.productora_id) LOOP',
            '            v_total_eventos := v_total_eventos + 1;',
            '        END LOOP;',
            '        DBMS_OUTPUT.PUT_LINE(p.nombre_fantasia || \' tiene \' || v_total_eventos || \' eventos.\');',
            '    END LOOP;',
            'END;'
        ]
    },
    {
        id: 'e122-err2',
        type: 'find-error',
        question: 'Identifica la línea con el error al invocar el cursor detalle parametrizado:',
        lines: [
            'DECLARE',
            '    CURSOR c_recintos IS SELECT recinto_id, nombre FROM RECINTO;',
            '    CURSOR c_sectores(p_recinto_id NUMBER) IS',
            '        SELECT nombre_sector FROM SECTOR_RECINTO WHERE recinto_id = p_recinto_id;',
            'BEGIN',
            '    FOR r IN c_recintos LOOP',
            '        FOR s IN c_sectores() LOOP',
            '            DBMS_OUTPUT.PUT_LINE(s.nombre_sector);',
            '        END LOOP;',
            '    END LOOP;',
            'END;'
        ]
    },
    {
        id: 'e122-cw1',
        type: 'crossword',
        question: 'Completa el crucigrama interactivo con términos clave de Ciclos Anidados:',
        gridRows: 8,
        gridCols: 9,
        words: [
            { number: 1, direction: 'down', word: 'MAESTRO', row: 0, col: 1, clue: 'Nivel padre o entidad principal en un ciclo anidado' },
            { number: 2, direction: 'across', word: 'ANIDADO', row: 1, col: 1, clue: 'Bucle que se encuentra dentro del cuerpo de otro bucle' },
            { number: 3, direction: 'down', word: 'DETALLE', row: 1, col: 4, clue: 'Nivel hijo que contiene los registros asociados al maestro' },
            { number: 4, direction: 'across', word: 'LOOP', row: 5, col: 4, clue: 'Palabra clave que abre y cierra la sección repetitiva en PL/SQL' },
            { number: 5, direction: 'across', word: 'EXIT', row: 0, col: 4, clue: 'Instrucción para salir inmediatamente de un ciclo' }
        ],
        acrossClues: [
            { number: 5, clue: 'Instrucción para salir inmediatamente de un ciclo', length: 4 },
            { number: 2, clue: 'Bucle que se encuentra dentro del cuerpo de otro bucle', length: 7 },
            { number: 4, clue: 'Palabra clave que abre y cierra la sección repetitiva en PL/SQL', length: 4 }
        ],
        downClues: [
            { number: 1, clue: 'Nivel padre o entidad principal en un ciclo anidado', length: 7 },
            { number: 3, clue: 'Nivel hijo que contiene los registros asociados al maestro', length: 7 }
        ]
    },
    {
        id: 'e122-prop1',
        type: 'proposed',
        question: '<strong>Ejercicio propuesto 1 — Jerarquía Recinto -> Sectores -> Capacidad (Punto Ticket)</strong>',
        content: `<p>Desarrolla un bloque anónimo con <strong>ciclos anidados</strong> que recorra todos los recintos de la tabla <code>RECINTO</code> y para cada uno:</p>
        <ol>
            <li>Imprima el nombre de la ciudad y el nombre del recinto.</li>
            <li>Con un cursor interior, recorra todos los sectores asociados en <code>SECTOR_RECINTO</code>.</li>
            <li>Calcule la capacidad total acumulada del recinto sumando las capacidades de cada sector.</li>
            <li>Al finalizar el bucle interior, imprima: <code>'Capacidad Total del Recinto: X asientos'</code>.</li>
        </ol>`
    },
    {
        id: 'e122-prop2',
        type: 'proposed',
        question: '<strong>Ejercicio propuesto 2 — Liquidación de Pagos por Banco y Tarjetas (Punto Ticket)</strong>',
        content: `<p>Crea un bloque PL/SQL con ciclos anidados para auditar las transacciones aprobadas por convenio bancario:</p>
        <ul>
            <li><strong>Cursor Maestro:</strong> Recorre cada convenio en <code>CONVENIO_BANCO</code>.</li>
            <li><strong>Cursor Detalle:</strong> Recorre todas las transacciones en <code>TRANSACCION_PAGO</code> cuyo <code>convenio_banco_id</code> coincida y tengan estado <code>'APROBADO'</code>.</li>
            <li>Calcula la cantidad total de pagos y el monto total recaudado por cada banco.</li>
            <li>Muestra en consola el desglose por banco y al final del bloque el gran total general acumulado de todos los bancos.</li>
        </ul>`
    }
];
