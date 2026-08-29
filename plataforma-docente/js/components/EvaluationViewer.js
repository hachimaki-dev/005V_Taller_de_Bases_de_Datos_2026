// EvaluationViewer.js — Componente interactivo para pautas e instrucciones de evaluación

const EvaluationViewer = {
    props: {
        evalData: { type: Object, required: true }
    },
    data() {
        return {
            currentTab: 'resumen', // 'resumen' | 'informe' | 'defensa' | 'quizzes'
            expandedSection: null, // número de sección expandida en informe
            checklist: {}          // { 'sec_1_0': true/false }
        };
    },
    created() {
        // Cargar checklist guardado en localStorage si existe
        try {
            const saved = localStorage.getItem(`checklist_${this.evalData.id}`);
            if (saved) this.checklist = JSON.parse(saved);
        } catch (e) {
            this.checklist = {};
        }
    },
    methods: {
        toggleSection(secNum) {
            this.expandedSection = this.expandedSection === secNum ? null : secNum;
        },
        toggleCheck(key) {
            this.checklist[key] = !this.checklist[key];
            try {
                localStorage.setItem(`checklist_${this.evalData.id}`, JSON.stringify(this.checklist));
            } catch (e) {}
        },
        isCheck(key) {
            return !!this.checklist[key];
        },
        totalChecklistItems() {
            let total = 0;
            this.evalData.sectionsReport.forEach(sec => {
                total += sec.items.length;
            });
            return total;
        },
        completedChecklistCount() {
            return Object.values(this.checklist).filter(Boolean).length;
        },
        checklistProgress() {
            const total = this.totalChecklistItems();
            if (total === 0) return 0;
            return Math.round((this.completedChecklistCount() / total) * 100);
        }
    },
    template: `
    <div class="evaluation-viewer fade-in">
        <!-- Hero Header -->
        <div class="eval-hero">
            <div class="eval-badge"><i class="ph ph-certificate"></i> Hito Evaluativo Oficial</div>
            <h1 class="eval-title">{{ evalData.title }}</h1>
            <p class="eval-subtitle">{{ evalData.subtitle }}</p>

            <!-- Cards de Ponderación -->
            <div class="eval-weights-grid">
                <div v-for="w in evalData.weights" :key="w.title" class="eval-weight-card" :style="{ borderTopColor: w.color }">
                    <div class="weight-icon" :style="{ background: w.bgColor, color: w.color }">
                        <i class="ph" :class="w.icon"></i>
                    </div>
                    <div class="weight-main">
                        <span class="weight-pct" :style="{ color: w.color }">{{ w.percentage }}</span>
                        <h3 class="weight-title">{{ w.title }}</h3>
                        <span class="weight-type" :class="w.type === 'Grupal' ? 'type-group' : 'type-indiv'">
                            <i class="ph" :class="w.type === 'Grupal' ? 'ph-users' : 'ph-user'"></i> {{ w.type }}
                        </span>
                    </div>
                    <p class="weight-desc">{{ w.desc }}</p>
                    <div class="weight-timing"><i class="ph ph-calendar"></i> {{ w.timing }}</div>
                </div>
            </div>
        </div>

        <!-- Navegación por Pestañas -->
        <div class="tabs eval-tabs">
            <button class="tab" :class="{ active: currentTab === 'resumen' }" @click="currentTab = 'resumen'">
                <i class="ph ph-chart-pie-slice"></i> Resumen y Ponderaciones
            </button>
            <button class="tab" :class="{ active: currentTab === 'informe' }" @click="currentTab = 'informe'">
                <i class="ph ph-file-text"></i> Informe Escrito (10%)
            </button>
            <button class="tab" :class="{ active: currentTab === 'defensa' }" @click="currentTab = 'defensa'">
                <i class="ph ph-microphone-stage"></i> Defensa Oral (60%)
            </button>
            <button class="tab" :class="{ active: currentTab === 'quizzes' }" @click="currentTab = 'quizzes'">
                <i class="ph ph-check-square-offset"></i> Quizzes Previos (30%)
            </button>
        </div>

        <!-- TAB 1: RESUMEN -->
        <div v-if="currentTab === 'resumen'" class="eval-panel fade-in">
            <div class="eval-card">
                <h3><i class="ph ph-scales"></i> Estructura de la Evaluación</h3>
                <p>La Evaluación 1 se compone de <strong>tres situaciones complementarias</strong> diseñadas para evaluar tanto el dominio conceptual individual como la capacidad de diseño e integración técnica en equipo:</p>

                <div class="table-responsive" style="margin-top: 1rem;">
                    <table>
                        <thead>
                            <tr>
                                <th>Instancia</th>
                                <th>Ponderación</th>
                                <th>Modalidad</th>
                                <th>Momento</th>
                                <th>Evidencia Requerida</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>1. Quizzes en Clase</strong></td>
                                <td><span class="badge-pct pct-blue">30%</span></td>
                                <td><span class="badge-type indiv">Individual</span></td>
                                <td>Semana previa</td>
                                <td>Cuestionario interactivo / resolución de ejercicios en clase</td>
                            </tr>
                            <tr>
                                <td><strong>2. Informe Técnico (Encargo)</strong></td>
                                <td><span class="badge-pct pct-green">10%</span></td>
                                <td><span class="badge-type group">Grupal</span></td>
                                <td>Día de entrega</td>
                                <td>Documento formal con justificación, modelos y script SQL</td>
                            </tr>
                            <tr>
                                <td><strong>3. Defensa de Presentación</strong></td>
                                <td><span class="badge-pct pct-purple">60%</span></td>
                                <td><span class="badge-type indiv">Individual</span></td>
                                <td>Día de entrega</td>
                                <td>Exposición oral individual + ronda de preguntas del docente</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="eval-grid-two" style="margin-top: 1.5rem;">
                <div class="eval-card">
                    <h4><i class="ph ph-lightbulb"></i> Recomendaciones para el Equipo</h4>
                    <ul class="styled-list">
                        <li><strong>Trabajo Colaborativo:</strong> Aunque el informe es grupal, cada integrante debe comprender todas las líneas del código.</li>
                        <li><strong>Modelo de Negocio:</strong> Tomen como referencia un negocio real o el clon de <em>Punto Ticket</em> que venimos trabajando.</li>
                        <li><strong>Scripts Verificados:</strong> Asegúrense de que los scripts compilen sin errores en Oracle antes de adjuntarlos al informe.</li>
                    </ul>
                </div>
                <div class="eval-card">
                    <h4><i class="ph ph-shield-check"></i> Criterios de Excelencia</h4>
                    <ul class="styled-list">
                        <li><strong>Manejo de Excepciones:</strong> No dejen transacciones abiertas sin control de errores.</li>
                        <li><strong>Modularidad:</strong> Usen Packages para agrupar lógica de negocio coherente.</li>
                        <li><strong>Triggers de Auditoría:</strong> Utilicen pseudo-registros <code>:NEW</code> y <code>:OLD</code> en tablas de log.</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- TAB 2: INFORME ESCRITO -->
        <div v-if="currentTab === 'informe'" class="eval-panel fade-in">
            <div class="eval-card">
                <div class="checklist-header">
                    <div>
                        <h3><i class="ph ph-file-text"></i> Estructura Oficial del Informe (10% — Grupal)</h3>
                        <p>El informe debe incluir obligatoriamente los siguientes <strong>7 apartados</strong>. Puedes usar este checklist para verificar tu progreso:</p>
                    </div>
                    <div class="checklist-progress-box">
                        <span class="progress-num">{{ completedChecklistCount() }} / {{ totalChecklistItems() }}</span>
                        <span class="progress-lbl">Requisitos listos ({{ checklistProgress() }}%)</span>
                        <div class="progress-bar-bg">
                            <div class="progress-bar-fill" :style="{ width: checklistProgress() + '%' }"></div>
                        </div>
                    </div>
                </div>

                <div class="report-sections-list">
                    <div v-for="sec in evalData.sectionsReport" :key="sec.number" class="report-section-accordion" :class="{ open: expandedSection === sec.number }">
                        <div class="accordion-header" @click="toggleSection(sec.number)">
                            <div class="sec-title-group">
                                <span class="sec-badge">{{ sec.number }}</span>
                                <h4>{{ sec.title }}</h4>
                            </div>
                            <i class="ph" :class="expandedSection === sec.number ? 'ph-caret-up' : 'ph-caret-down'"></i>
                        </div>

                        <div class="accordion-body" v-show="expandedSection === sec.number">
                            <div v-for="(item, idx) in sec.items" :key="'item-'+sec.number+'-'+idx" class="report-item" :class="{ completed: isCheck('sec_' + sec.number + '_' + idx) }">
                                <div class="item-check" @click="toggleCheck('sec_' + sec.number + '_' + idx)">
                                    <i class="ph" :class="isCheck('sec_' + sec.number + '_' + idx) ? 'ph-check-square-fill' : 'ph-square'"></i>
                                </div>
                                <div class="item-content">
                                    <strong>{{ item.subtitle }}</strong>
                                    <p>{{ item.text }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB 3: DEFENSA ORAL -->
        <div v-if="currentTab === 'defensa'" class="eval-panel fade-in">
            <div class="eval-card">
                <h3><i class="ph ph-microphone-stage"></i> Requisitos de la Presentación Oral (60% — Individual)</h3>
                <p>Durante la defensa, <strong>cada estudiante</strong> será evaluado individualmente y deberá demostrar dominio técnico en los siguientes puntos:</p>

                <div class="defense-grid">
                    <div v-for="req in evalData.defenseRequirements" :key="req.letter" class="defense-item">
                        <span class="defense-letter">{{ req.letter }}</span>
                        <div>
                            <h4>{{ req.title }}</h4>
                            <p>{{ req.desc }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Consejos para la presentación -->
            <div class="eval-card" style="margin-top: 1.5rem;">
                <h3><i class="ph ph-presentation"></i> Consejos Clave para la Presentación</h3>
                <div class="tips-grid">
                    <div v-for="tip in evalData.presentationTips" :key="tip.title" class="tip-card">
                        <i class="ph" :class="tip.icon"></i>
                        <h4>{{ tip.title }}</h4>
                        <p>{{ tip.desc }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB 4: QUIZZES PREVIOS -->
        <div v-if="currentTab === 'quizzes'" class="eval-panel fade-in">
            <div class="eval-card">
                <h3><i class="ph ph-check-square-offset"></i> Quizzes Previos en Clase (30% — Individual)</h3>
                <p>En la semana previa a la entrega final se aplicará una evaluación de validación de conocimientos que pondera un <strong>30% de la nota final</strong> de la Unidad 1.</p>

                <div class="quiz-topics-grid" style="margin-top: 1.25rem;">
                    <div class="topic-box">
                        <span class="topic-num">1</span>
                        <h4>Tipos Compuestos</h4>
                        <p>Declaración de <code>RECORD</code> personalizados, <code>%ROWTYPE</code> y colecciones <code>VARRAY</code> en memoria.</p>
                    </div>
                    <div class="topic-box">
                        <span class="topic-num">2</span>
                        <h4>Cursores y Ciclos Anidados</h4>
                        <p>Cursores explícitos con parámetros, bucles <code>FOR ... IN</code>, cláusulas <code>FOR UPDATE</code> / <code>WHERE CURRENT OF</code> y reinicio de acumuladores en ciclos anidados.</p>
                    </div>
                    <div class="topic-box">
                        <span class="topic-num">3</span>
                        <h4>Control de Excepciones</h4>
                        <p>Excepciones predefinidas (<code>NO_DATA_FOUND</code>, <code>TOO_MANY_ROWS</code>, <code>DUP_VAL_ON_INDEX</code>), <code>RAISE</code> y <code>RAISE_APPLICATION_ERROR</code>.</p>
                    </div>
                    <div class="topic-box">
                        <span class="topic-num">4</span>
                        <h4>Subprogramas y Triggers</h4>
                        <p>Diferencias entre Procedimientos y Funciones, estructura de Packages (Spec y Body), y disparadores con <code>:NEW</code> y <code>:OLD</code>.</p>
                    </div>
                </div>

                <div class="tip-box" style="margin-top: 1.5rem;">
                    <strong><i class="ph ph-compass"></i> ¿Cómo prepararse?</strong><br>
                    Puedes practicar resolviendo las <strong>Guías Prácticas Interactivas</strong> de cada sesión en esta misma plataforma (alternativas, completar código, identificar errores y crucigramas).
                </div>
            </div>
        </div>
    </div>
    `
};
