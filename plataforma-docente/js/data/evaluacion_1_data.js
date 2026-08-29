// evaluacion_1_data.js — Instrucciones y Pauta de la Evaluación 1

const evaluacion_1_data = {
    id: 'eval-1',
    title: 'Evaluación 1: Proyecto Integral en Oracle PL/SQL',
    subtitle: 'Taller de Bases de Datos — Instrucciones Oficiales, Pauta de Informe y Defensa',
    weights: [
        {
            title: 'Quizzes Previos',
            percentage: '30%',
            type: 'Individual',
            timing: 'Semana previa a la entrega',
            icon: 'ph-check-square-offset',
            color: '#3b82f6',
            bgColor: '#eff6ff',
            desc: 'Evaluación formativa y sumativa en clase con preguntas conceptuales y resolución de ejercicios sobre los contenidos vistos.'
        },
        {
            title: 'Informe Técnico',
            percentage: '10%',
            type: 'Grupal',
            timing: 'Entrega por encargo',
            icon: 'ph-file-text',
            color: '#10b981',
            bgColor: '#ecfdf5',
            desc: 'Documento formal que describe el contexto de negocio, arquitectura de datos, justificación técnica y scripts completos.'
        },
        {
            title: 'Defensa Oral',
            percentage: '60%',
            type: 'Individual',
            timing: 'Presentación en clase',
            icon: 'ph-microphone-stage',
            color: '#8b5cf6',
            bgColor: '#f5f3ff',
            desc: 'Presentación y defensa técnica individual ante el docente donde cada estudiante justifica las decisiones de diseño e implementación.'
        }
    ],
    sectionsReport: [
        {
            number: '1',
            title: 'Introducción',
            items: [
                { subtitle: 'Descripción del Proyecto', text: 'Breve descripción del proyecto, su objetivo de negocio y cómo se utilizará PL/SQL para cumplirlo.' },
                { subtitle: 'Alcance', text: 'Definir el alcance de la solución y los componentes del negocio beneficiados por el desarrollo.' },
                { subtitle: 'Tecnologías Utilizadas', text: 'Mencionar y justificar las herramientas y motores empleados (Oracle Database, PL/SQL, SQL Developer, etc.).' }
            ]
        },
        {
            number: '2',
            title: 'Tipos de Datos Compuestos (RECORD y VARRAY)',
            items: [
                { subtitle: 'Integración en el Proyecto', text: 'Describir cómo los tipos RECORD y colecciones VARRAY se integran en las estructuras de datos del proyecto. Incluir diagramas conceptuales.' },
                { subtitle: 'Mejora de Eficiencia', text: 'Explicar técnicamente cómo el uso de RECORD y VARRAY optimiza el procesamiento de datos en memoria frente a variables escalares sueltas.' }
            ]
        },
        {
            number: '3',
            title: 'Cursores Explícitos Complejos y Ciclos Anidados',
            items: [
                { subtitle: 'Concepto de Cursor Explícito', text: 'Explicar qué es un cursor explícito y cuándo es necesario utilizarlo frente a un SELECT INTO.' },
                { subtitle: 'Cursores Simples vs Complejos', text: 'Diferenciar consultas básicas de consultas con JOINs múltiples, funciones agregadas y subconsultas.' },
                { subtitle: 'Cursores con Parámetros y Bucles Anidados', text: 'Detallar la definición de parámetros y su utilidad en esquemas maestro-detalle con bucles anidados.' },
                { subtitle: 'Resolución de Problemas del Proyecto', text: 'Describir cómo se aplicaron cursores complejos para resolver requerimientos específicos del negocio.' },
                { subtitle: 'Ventajas de Rendimiento', text: 'Explicar las ventajas de procesar grandes volúmenes de datos con cursores explícitos y control de transacciones.' }
            ]
        },
        {
            number: '4',
            title: 'Integración y Control de Excepciones',
            items: [
                { subtitle: 'Excepciones Predefinidas de Oracle', text: 'Describir las excepciones del motor (NO_DATA_FOUND, TOO_MANY_ROWS, DUP_VAL_ON_INDEX, etc.) y su manejo.' },
                { subtitle: 'Excepciones Definidas por el Usuario', text: 'Explicar cómo se definen y disparan excepciones para reglas de negocio mediante RAISE y RAISE_APPLICATION_ERROR (-20000 a -20999).' },
                { subtitle: 'Integración en los Bloques PL/SQL', text: 'Mostrar cómo se estructuran las secciones EXCEPTION con handlers específicos y WHEN OTHERS (SQLCODE / SQLERRM).' },
                { subtitle: 'Integridad y Prevención de Errores', text: 'Explicar cómo el manejo adecuado de excepciones previene bloqueos y garantiza la consistencia de los datos.' }
            ]
        },
        {
            number: '5',
            title: 'Procedimientos, Funciones, Packages y Triggers',
            items: [
                { subtitle: 'Procedimientos Almacenados', text: 'Definición, parámetros IN/OUT y su uso en la ejecución de tareas automatizadas y transacciones DML.' },
                { subtitle: 'Funciones Almacenadas', text: 'Definición, cláusula RETURN y su integración en cálculos y consultas SQL.' },
                { subtitle: 'Paquetes (Packages)', text: 'Separación en Especificación (pública) y Cuerpo (BODY), modularización y encapsulamiento.' },
                { subtitle: 'Triggers (Disparadores)', text: 'Eventos BEFORE/AFTER, FOR EACH ROW, pseudo-registros :NEW y :OLD, y automatización de auditorías.' },
                { subtitle: 'Estrategia de Solución Integral', text: 'Estrategia clara de interacción entre paquetes, funciones, procedimientos y triggers para una solución robusta.' },
                { subtitle: 'Reutilización y Mantenimiento', text: 'Cómo los subprogramas facilitan el mantenimiento del software y reducen código duplicado.' },
                { subtitle: 'Limitaciones y Buenas Prácticas', text: 'Análisis de posibles impactos en rendimiento (mutating tables ORA-04091, triggers recursivos) y seguridad.' }
            ]
        },
        {
            number: '6',
            title: 'Conclusiones y Recomendaciones',
            items: [
                { subtitle: 'Resumen Ejecutivo', text: 'Síntesis de los principales módulos y aprendizajes del proyecto.' },
                { subtitle: 'Impacto en el Negocio', text: 'Análisis de cómo la solución implementada en PL/SQL optimiza la gestión operativa de la organización.' },
                { subtitle: 'Recomendaciones Futuras', text: 'Propuestas de escalabilidad y mejoras continuas sobre la base de datos.' }
            ]
        },
        {
            number: '7',
            title: 'Anexos',
            items: [
                { subtitle: 'Código Fuente Completo', text: 'Scripts SQL y PL/SQL completos, comentados y listos para su ejecución en Oracle.' },
                { subtitle: 'Diagramas y Modelos', text: 'Modelo Entidad-Relación (MER), diagramas de flujo y arquitectura de paquetes.' }
            ]
        }
    ],
    defenseRequirements: [
        {
            letter: 'a',
            title: 'Comprensión y Contexto del Problema',
            desc: 'Explicar con solidez el problema de negocio que aborda el proyecto, demostrando entendimiento de su impacto y objetivos.'
        },
        {
            letter: 'b',
            title: 'Identificación de Datos e Información',
            desc: 'Identificar con precisión los datos de entrada a procesar y los reportes/salidas que la solución debe generar.'
        },
        {
            letter: 'c',
            title: 'Justificación de Tipos Compuestos',
            desc: 'Justificar técnicamente por qué se utilizaron tipos RECORD y colecciones VARRAY en las estructuras de la solución.'
        },
        {
            letter: 'd',
            title: 'Justificación de Cursores y Ciclos Anidados',
            desc: 'Demostrar el funcionamiento de los cursores con/sin parámetros y la lógica de bucles anidados maestro-detalle.'
        },
        {
            letter: 'e',
            title: 'Justificación del Manejo de Excepciones',
            desc: 'Explicar las condiciones donde se aplican excepciones predefinidas de Oracle y dónde se requieren excepciones personalizadas.'
        },
        {
            letter: 'f',
            title: 'Evaluación de Procedimientos, Funciones, Packages y Triggers',
            desc: 'Explicar la arquitectura de subprogramas y disparadores que conforman la solución integral.'
        },
        {
            letter: 'g',
            title: 'Conclusiones Finales',
            desc: 'Sintetizar los resultados obtenidos y responder con propiedad las preguntas técnicas individuales del docente.'
        }
    ],
    presentationTips: [
        {
            icon: 'ph-slideshow',
            title: 'Diapositivas Claras y Concisas',
            desc: 'Eviten bloques densos de texto. Usen viñetas breves, esquemas conceptuales y fragmentos de código bien enfocados.'
        },
        {
            icon: 'ph-code',
            title: 'Fragmentos de Código Legibles',
            desc: 'Destaquen en color las líneas clave (cursores, excepciones, paquetes). No peguen capturas borrosas ni scripts gigantes.'
        },
        {
            icon: 'ph-timer',
            title: 'Gestión del Tiempo',
            desc: 'Ensayen la presentación en equipo e individualmente para ajustarse al tiempo asignado por el docente, asegurando fluidez.'
        },
        {
            icon: 'ph-brain',
            title: 'Preparación para Preguntas Individuales',
            desc: 'Cada integrante debe dominar el 100% del código entregado, no solo la parte que le tocó redactar.'
        }
    ]
};
