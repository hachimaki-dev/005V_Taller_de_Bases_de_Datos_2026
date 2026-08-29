// course-structure.js — Estructura del curso
// Para agregar una nueva sesión, copiar un bloque de sessions y crear los archivos de datos correspondientes.

const courseStructure = {
    courseName: 'Taller de Bases de Datos',
    modules: [
        {
            id: '1-2',
            title: '1.2 Cursores y Ciclos Anidados',
            sessions: [
                {
                    id: '1-2-1',
                    title: 'Sesión 1: Cursores Complejos',
                    slidesFile: 's1_2_1_slides',
                    exercisesFile: 's1_2_1_exercises',
                    solutionsFile: 's1_2_1_solutions'
                },
                {
                    id: '1-2-2',
                    title: 'Sesión 2: Ciclos Anidados',
                    slidesFile: 's1_2_2_slides',
                    exercisesFile: 's1_2_2_exercises',
                    solutionsFile: 's1_2_2_solutions'
                }
            ]
        },
        {
            id: '1-3',
            title: '1.3 Excepciones',
            sessions: [
                {
                    id: '1-3-1',
                    title: 'Sesión 1: Excepciones Predefinidas',
                    slidesFile: 's1_3_1_slides',
                    exercisesFile: 's1_3_1_exercises',
                    solutionsFile: 's1_3_1_solutions'
                },
                {
                    id: '1-3-2',
                    title: 'Sesión 2: Excepciones Definidas por el Usuario',
                    slidesFile: 's1_3_2_slides',
                    exercisesFile: 's1_3_2_exercises',
                    solutionsFile: 's1_3_2_solutions'
                }
            ]
        },
        {
            id: '1-4',
            title: '1.4 Evaluaciones Prácticas',
            sessions: [
                {
                    id: '1-4-1',
                    title: 'Sesión 1: Evaluación Proc, Func y Packages',
                    slidesFile: 's1_4_1_slides',
                    exercisesFile: 's1_4_1_exercises',
                    solutionsFile: 's1_4_1_solutions'
                },
                {
                    id: '1-4-2',
                    title: 'Sesión 2: Evaluación Triggers',
                    slidesFile: 's1_4_2_slides',
                    exercisesFile: 's1_4_2_exercises',
                    solutionsFile: 's1_4_2_solutions'
                }
            ]
        }
    ],
    evaluations: [
        {
            id: 'eval-1',
            title: 'Evaluación 1: Proyecto Integral PL/SQL',
            badge: 'Hito 1',
            desc: 'Quizzes Previos (30%) + Informe Grupal (10%) + Defensa Oral (60%)'
        }
    ]
};
