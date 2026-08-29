// app.js — Aplicación Vue principal
const { createApp, ref, computed } = Vue;

// Mapa de archivos de datos a variables globales
const dataMap = {
    s1_3_1_slides: () => s1_3_1_slides,
    s1_3_1_exercises: () => s1_3_1_exercises,
    s1_3_1_solutions: () => s1_3_1_solutions,
    s1_3_2_slides: () => s1_3_2_slides,
    s1_3_2_exercises: () => s1_3_2_exercises,
    s1_3_2_solutions: () => s1_3_2_solutions,
    s1_4_1_slides: () => s1_4_1_slides,
    s1_4_1_exercises: () => s1_4_1_exercises,
    s1_4_1_solutions: () => s1_4_1_solutions,
    s1_4_2_slides: () => s1_4_2_slides,
    s1_4_2_exercises: () => s1_4_2_exercises,
    s1_4_2_solutions: () => s1_4_2_solutions
};

const App = {
    components: {
        'slide-viewer': SlideViewer,
        'exercise-runner': ExerciseRunner
    },
    setup() {
        const course = ref(courseStructure);
        const view = ref('home');
        const session = ref(null);
        const tab = ref('slides');
        const sidebarOpen = ref(false);

        const currentSlides = computed(() => {
            if (!session.value) return null;
            const fn = dataMap[session.value.slidesFile];
            return fn ? fn() : null;
        });

        const currentExercises = computed(() => {
            if (!session.value) return null;
            const fn = dataMap[session.value.exercisesFile];
            return fn ? fn() : null;
        });

        const currentSolutions = computed(() => {
            if (!session.value) return null;
            const fn = dataMap[session.value.solutionsFile];
            return fn ? fn() : null;
        });

        function goHome() {
            view.value = 'home';
            session.value = null;
            sidebarOpen.value = false;
        }

        function openSession(s) {
            session.value = s;
            view.value = 'session';
            tab.value = 'slides';
            sidebarOpen.value = false;
        }

        function getModuleTitle(sessionId) {
            for (const mod of course.value.modules) {
                if (mod.sessions.find(s => s.id === sessionId)) return mod.title;
            }
            return '';
        }

        return {
            course, view, session, tab, sidebarOpen,
            currentSlides, currentExercises, currentSolutions,
            goHome, openSession, getModuleTitle
        };
    }
};

createApp(App).mount('#app');
