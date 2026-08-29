// s1_2_2_solutions.js — Solucionario: Ciclos Anidados con Cursores en PL/SQL

const s1_2_2_solutions = [
    {
        id: 'e122-mc1',
        answer: 1, // Opción B
        explanation: '<strong>Correcto.</strong> El acumulador o contador por entidad debe resetearse a 0 al comenzar el bucle maestro para evitar que los valores de entidades anteriores se sigan sumando incorrectamente.',
        fullSolution: 'La estructura correcta es:<pre>FOR reg_padre IN c_maestro LOOP\n    v_acumulador := 0; -- Reset aquí\n    FOR reg_hijo IN c_detalle(reg_padre.id) LOOP\n        v_acumulador := v_acumulador + reg_hijo.monto;\n    END LOOP;\nEND LOOP;</pre>'
    },
    {
        id: 'e122-mc2',
        answer: 1, // Opción B
        explanation: '<strong>Correcto.</strong> Una sentencia <code>EXIT;</code> finaliza únicamente el bucle más interno en el que está contenida. El bucle exterior sigue su curso con la siguiente iteración.',
        fullSolution: 'Si se desea salir del bucle exterior desde el interior, se debe etiquetar el bucle exterior (ej: <code>&lt;&lt;bucle_exterior&gt;&gt;</code>) y usar <code>EXIT bucle_exterior;</code>.'
    },
    {
        id: 'e122-mc3',
        answer: 1, // Opción B
        explanation: '<strong>Correcto.</strong> Declarar el cursor detalle con un parámetro (ej: <code>CURSOR c_det(p_id NUMBER)</code>) e invocarlo en el bucle interior como <code>c_det(reg_maestro.id)</code> es la forma limpia y modular estándar en PL/SQL.',
        fullSolution: 'Esto permite que la consulta SQL del detalle solo recupere las filas relevantes para el padre actual.'
    },
    {
        id: 'e122-tf1',
        answer: true,
        explanation: '<strong>Verdadero.</strong> PL/SQL permite múltiples niveles de anidamiento de bucles (3 o más), por ejemplo: País -> Región -> Comuna -> Clientes.'
    },
    {
        id: 'e122-tf2',
        answer: true,
        explanation: '<strong>Verdadero.</strong> Como el bucle interior está dentro del ámbito léxico del bucle exterior, todas las variables del bucle padre (incluyendo su registro de cursor) son plenamente accesibles.'
    },
    {
        id: 'e122-fill1',
        answers: ['LOOP', ['c_sectores(rec.recinto_id)', 'c_sectores(rec.recinto_id) ']],
        explanation: 'Se abre el bucle con <code>LOOP</code> y se invoca el cursor interior pasando el ID del recinto actual: <code>c_sectores(rec.recinto_id)</code>.',
        fullSolution: '<pre>DECLARE\n    CURSOR c_recintos IS SELECT recinto_id, nombre FROM RECINTO;\n    CURSOR c_sectores(p_recinto_id NUMBER) IS\n        SELECT nombre_sector, capacidad FROM SECTOR_RECINTO WHERE recinto_id = p_recinto_id;\nBEGIN\n    FOR rec IN c_recintos LOOP\n        DBMS_OUTPUT.PUT_LINE(\'Recinto: \' || rec.nombre);\n        FOR sec IN c_sectores(rec.recinto_id) LOOP\n            DBMS_OUTPUT.PUT_LINE(\'  - Sector: \' || sec.nombre_sector);\n        END LOOP;\n    END LOOP;\nEND;</pre>'
    },
    {
        id: 'e122-fill2',
        answers: [['v_subtotal := 0', 'v_subtotal := 0;'], ['loc.precio * loc.stock_disponible', 'loc.stock_disponible * loc.precio']],
        explanation: 'Se reinicia <code>v_subtotal := 0</code> al iniciar cada evento, y se suma <code>loc.precio * loc.stock_disponible</code>.',
        fullSolution: '<pre>BEGIN\n    FOR ev IN c_eventos LOOP\n        v_subtotal := 0;\n        FOR loc IN c_localidades(ev.evento_id) LOOP\n            v_subtotal := v_subtotal + (loc.precio * loc.stock_disponible);\n        END LOOP;\n        DBMS_OUTPUT.PUT_LINE(ev.nombre || \' Total: $\' || v_subtotal);\n    END LOOP;\nEND;</pre>'
    },
    {
        id: 'e122-err1',
        answer: 5, // Línea 6 (índice 5): falta reiniciar v_total_eventos dentro del FOR p IN c_prod LOOP
        explanation: '<strong>Error en el bucle:</strong> Falta reiniciar <code>v_total_eventos := 0;</code> al comenzar cada iteración del bucle exterior (línea 6). De lo contrario, los eventos de cada productora se van acumulando con los de las anteriores.',
        fullSolution: 'Se debe insertar la instrucción de reinicio:<pre>    FOR p IN c_prod LOOP\n        v_total_eventos := 0; -- REINICIO NECESARIO\n        FOR e IN c_ev(p.productora_id) LOOP ...</pre>'
    },
    {
        id: 'e122-err2',
        answer: 6, // Línea 7 (índice 6): c_sectores() sin parámetro
        explanation: '<strong>Error en la línea 7:</strong> El cursor <code>c_sectores</code> fue declarado con un parámetro obligatorio (<code>p_recinto_id</code>), pero en el bucle interior se le invocó vacío <code>c_sectores()</code> sin pasarle el argumento <code>r.recinto_id</code>.',
        fullSolution: 'La línea corregida debe ser:<pre>        FOR s IN c_sectores(r.recinto_id) LOOP</pre>'
    },
    {
        id: 'e122-cw1',
        explanation: '<strong>¡Crucigrama completado correctamente!</strong> Todos los términos de ciclos anidados fueron ubicados.',
        fullSolution: `
            <h4>Solución del Crucigrama:</h4>
            <table>
                <tr><th>N°</th><th>Dirección</th><th>Palabra</th><th>Definición / Rol</th></tr>
                <tr><td>1</td><td>Vertical</td><td><strong>MAESTRO</strong></td><td>Entidad principal de la que dependen los registros detalle.</td></tr>
                <tr><td>2</td><td>Horizontal</td><td><strong>ANIDADO</strong></td><td>Estructura repetitiva dentro de otra.</td></tr>
                <tr><td>3</td><td>Vertical</td><td><strong>DETALLE</strong></td><td>Registros secundarios asociados a la clave del maestro.</td></tr>
                <tr><td>4</td><td>Horizontal</td><td><strong>LOOP</strong></td><td>Sentencia delimitadora de un bloque de iteración.</td></tr>
                <tr><td>5</td><td>Horizontal</td><td><strong>EXIT</strong></td><td>Instrucción para interrumpir un bucle activo.</td></tr>
            </table>
        `
    },
    {
        id: 'e122-prop1',
        explanation: 'Este ejercicio se resuelve en Oracle SQL Developer.',
        fullSolution: '<pre>DECLARE\n    CURSOR c_recintos IS\n        SELECT recinto_id, nombre, ciudad, direccion\n        FROM RECINTO\n        ORDER BY ciudad, nombre;\n\n    CURSOR c_sectores(p_rec_id NUMBER) IS\n        SELECT sector_id, nombre_sector, capacidad\n        FROM SECTOR_RECINTO\n        WHERE recinto_id = p_rec_id\n        ORDER BY nombre_sector;\n\n    v_capacidad_recinto NUMBER;\n    v_num_sectores      NUMBER;\nBEGIN\n    FOR rec IN c_recintos LOOP\n        v_capacidad_recinto := 0;\n        v_num_sectores := 0;\n        \n        DBMS_OUTPUT.PUT_LINE(\'========================================\');\n        DBMS_OUTPUT.PUT_LINE(\'RECINTO: \' || rec.nombre || \' (\' || rec.ciudad || \')\');\n        DBMS_OUTPUT.PUT_LINE(\'Dirección: \' || rec.direccion);\n        DBMS_OUTPUT.PUT_LINE(\'----------------------------------------\');\n        \n        FOR sec IN c_sectores(rec.recinto_id) LOOP\n            v_num_sectores := v_num_sectores + 1;\n            v_capacidad_recinto := v_capacidad_recinto + sec.capacidad;\n            \n            DBMS_OUTPUT.PUT_LINE(\n                \'   Sector \' || v_num_sectores || \': \' ||\n                RPAD(sec.nombre_sector, 20, \' \') ||\n                \' | Capacidad: \' || LPAD(TO_CHAR(sec.capacidad, \'999,999\'), 8, \' \') || \' asientos\'\n            );\n        END LOOP;\n        \n        DBMS_OUTPUT.PUT_LINE(\'----------------------------------------\');\n        DBMS_OUTPUT.PUT_LINE(\'CAPACIDAD TOTAL: \' || TO_CHAR(v_capacidad_recinto, \'999,999\') || \' asientos en \' || v_num_sectores || \' sectores.\');\n        DBMS_OUTPUT.NEW_LINE;\n    END LOOP;\nEND;\n/</pre>'
    },
    {
        id: 'e122-prop2',
        explanation: 'Este ejercicio se resuelve en Oracle SQL Developer.',
        fullSolution: '<pre>DECLARE\n    CURSOR c_bancos IS\n        SELECT convenio_banco_id, banco_nombre, descuento_porcentaje\n        FROM CONVENIO_BANCO\n        ORDER BY banco_nombre;\n\n    CURSOR c_pagos(p_convenio_id NUMBER) IS\n        SELECT transaccion_id, monto_final, metodo_pago\n        FROM TRANSACCION_PAGO\n        WHERE convenio_banco_id = p_convenio_id\n          AND estado = \'APROBADO\';\n\n    v_total_banco   NUMBER;\n    v_cant_pagos    NUMBER;\n    v_gran_total    NUMBER := 0;\n    v_gran_cantidad NUMBER := 0;\nBEGIN\n    DBMS_OUTPUT.PUT_LINE(\'===== AUDITORÍA DE PAGOS POR BANCO =====\');\n    \n    FOR b IN c_bancos LOOP\n        v_total_banco := 0;\n        v_cant_pagos  := 0;\n        \n        DBMS_OUTPUT.PUT_LINE(\'Banco: \' || b.banco_nombre || \' (Descuento: \' || b.descuento_porcentaje || \'%)\');\n        \n        FOR p IN c_pagos(b.convenio_banco_id) LOOP\n            v_cant_pagos  := v_cant_pagos + 1;\n            v_total_banco := v_total_banco + p.monto_final;\n            \n            DBMS_OUTPUT.PUT_LINE(\n                \'   Transacción #\' || p.transaccion_id ||\n                \' [\' || p.metodo_pago || \']\' ||\n                \' - Monto: $\' || TO_CHAR(p.monto_final, \'999,999,999\')\n            );\n        END LOOP;\n        \n        v_gran_total    := v_gran_total + v_total_banco;\n        v_gran_cantidad := v_gran_cantidad + v_cant_pagos;\n        \n        DBMS_OUTPUT.PUT_LINE(\n            \'>> Subtotal \' || b.banco_nombre || \': \' || v_cant_pagos ||\n            \' pagos | Recaudado: $\' || TO_CHAR(v_total_banco, \'999,999,999\')\n        );\n        DBMS_OUTPUT.PUT_LINE(\'----------------------------------------\');\n    END LOOP;\n    \n    DBMS_OUTPUT.PUT_LINE(\'========================================\');\n    DBMS_OUTPUT.PUT_LINE(\n        \'GRAN TOTAL AUDITADO: \' || v_gran_cantidad || \' transacciones | $\' ||\n        TO_CHAR(v_gran_total, \'999,999,999\')\n    );\nEND;\n/</pre>'
    }
];
