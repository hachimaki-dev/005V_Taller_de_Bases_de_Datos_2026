// ExerciseRunner.js — Motor de ejercicios interactivos
// Soporta: multiple-choice, multiple-select, true-false, fill-code, find-error, crossword, word-search, proposed

const ExerciseRunner = {
    props: {
        exercises: { type: Array, required: true },
        solutions: { type: Array, required: true },
        isSolutionTab: { type: Boolean, default: false }
    },
    data() {
        return {
            answers: {},        // { exerciseId: userAnswer }
            checked: {},        // { exerciseId: true/false }
            revealed: {},       // { exerciseId: true } — solución revelada
            fillInputs: {},     // { exerciseId: { blankIndex: value } }
            wsSelections: {},   // { exerciseId: [cellIndex, ...] } — celdas seleccionadas actualmente
            wsFoundWords: {},   // { exerciseId: ['WORD1', ...] } — palabras encontradas por el alumno
            cwInputs: {}        // { exerciseId: { 'r_c': 'LETTER' } }
        };
    },
    computed: {
        score() {
            let correct = 0;
            let total = 0;
            this.exercises.forEach(ex => {
                if (ex.type === 'proposed') return;
                total++;
                if (this.checked[ex.id] && this.isCorrect(ex)) correct++;
            });
            return { correct, total };
        }
    },
    created() {
        this.initExerciseStates();
    },
    watch: {
        exercises: {
            handler() { this.initExerciseStates(); },
            deep: true
        }
    },
    methods: {
        initExerciseStates() {
            this.exercises.forEach(ex => {
                if (this.isSolutionTab) {
                    this.checked[ex.id] = true;
                    this.revealed[ex.id] = true;
                }
                if (ex.type === 'crossword' && !this.cwInputs[ex.id]) {
                    this.cwInputs[ex.id] = {};
                }
                if (ex.type === 'word-search') {
                    if (!this.wsSelections[ex.id]) this.wsSelections[ex.id] = [];
                    if (!this.wsFoundWords[ex.id]) this.wsFoundWords[ex.id] = [];
                }
            });
        },
        selectAnswer(exId, answer) {
            if (this.checked[exId]) return;
            this.answers[exId] = answer;
        },
        toggleMultiSelect(exId, option) {
            if (this.checked[exId]) return;
            if (!this.answers[exId]) this.answers[exId] = [];
            const arr = [...this.answers[exId]];
            const idx = arr.indexOf(option);
            if (idx >= 0) arr.splice(idx, 1);
            else arr.push(option);
            this.answers[exId] = arr;
        },
        updateFill(exId, blankIdx, value) {
            if (!this.fillInputs[exId]) this.fillInputs[exId] = {};
            this.fillInputs[exId] = { ...this.fillInputs[exId], [blankIdx]: value };
        },
        checkAnswer(ex) {
            if (ex.type === 'fill-code') {
                this.answers[ex.id] = { ...this.fillInputs[ex.id] };
            }
            this.checked[ex.id] = true;
        },
        isCorrect(ex) {
            const sol = this.solutions.find(s => s.id === ex.id);
            if (!sol) return false;
            const answer = this.answers[ex.id];

            switch (ex.type) {
                case 'multiple-choice':
                case 'true-false':
                    return answer === sol.answer;
                case 'multiple-select':
                    if (!Array.isArray(answer)) return false;
                    const sorted1 = [...answer].sort();
                    const sorted2 = [...sol.answer].sort();
                    return JSON.stringify(sorted1) === JSON.stringify(sorted2);
                case 'fill-code':
                    if (!sol.answers) return false;
                    return sol.answers.every((expected, i) => {
                        const given = ((this.fillInputs[ex.id] || {})[i] || '').trim().toUpperCase();
                        if (Array.isArray(expected)) {
                            return expected.some(e => e.toUpperCase() === given);
                        }
                        return given === expected.toUpperCase();
                    });
                case 'find-error':
                    return answer === sol.answer;
                case 'crossword':
                    if (!ex.words) return false;
                    const inputs = this.cwInputs[ex.id] || {};
                    const grid = this.getCrosswordGrid(ex);
                    for (let r = 0; r < ex.gridRows; r++) {
                        for (let c = 0; c < ex.gridCols; c++) {
                            const cell = grid[r][c];
                            if (cell.isActive) {
                                const userVal = (inputs[r + '_' + c] || '').trim().toUpperCase();
                                if (userVal !== cell.expectedLetter) return false;
                            }
                        }
                    }
                    return true;
                case 'word-search':
                    const totalWords = (ex.words || []).length;
                    const foundCount = (this.wsFoundWords[ex.id] || []).length;
                    return totalWords > 0 && foundCount >= totalWords;
                default:
                    return false;
            }
        },
        getSolution(exId) {
            return this.solutions.find(s => s.id === exId);
        },
        toggleSolution(exId) {
            this.revealed[exId] = !this.revealed[exId];
        },
        isRevealed(exId) {
            return this.isSolutionTab || !!this.revealed[exId];
        },

        /* ---- CROSSWORD METHODS ---- */
        getCrosswordGrid(ex) {
            if (!ex.gridRows || !ex.gridCols || !ex.words) return [];
            
            const grid = [];
            for (let r = 0; r < ex.gridRows; r++) {
                grid[r] = [];
                for (let c = 0; c < ex.gridCols; c++) {
                    grid[r][c] = {
                        r,
                        c,
                        key: `${r}_${c}`,
                        isActive: false,
                        expectedLetter: '',
                        numbers: []
                    };
                }
            }

            ex.words.forEach(w => {
                const len = w.word.length;
                for (let i = 0; i < len; i++) {
                    const r = w.direction === 'across' ? w.row : w.row + i;
                    const c = w.direction === 'across' ? w.col + i : w.col;
                    if (r < ex.gridRows && c < ex.gridCols) {
                        const cell = grid[r][c];
                        cell.isActive = true;
                        cell.expectedLetter = w.word[i].toUpperCase();
                        if (i === 0) {
                            if (!cell.numbers.includes(w.number)) {
                                cell.numbers.push(w.number);
                            }
                        }
                    }
                }
            });

            return grid;
        },
        getCwVal(ex, r, c) {
            const key = `${r}_${c}`;
            if (this.isRevealed(ex.id)) {
                const grid = this.getCrosswordGrid(ex);
                return grid[r] && grid[r][c] ? grid[r][c].expectedLetter : '';
            }
            return (this.cwInputs[ex.id] && this.cwInputs[ex.id][key]) || '';
        },
        onCwInput(ex, r, c, event) {
            if (this.checked[ex.id] || this.isRevealed(ex.id)) return;
            const key = `${r}_${c}`;
            let val = event.target.value || '';
            val = val.slice(-1).toUpperCase();

            if (!this.cwInputs[ex.id]) this.cwInputs[ex.id] = {};
            this.cwInputs[ex.id][key] = val;
            event.target.value = val;

            if (val) {
                this.focusNextCwCell(ex, r, c);
            }
        },
        onCwKeydown(ex, r, c, event) {
            if (this.checked[ex.id] || this.isRevealed(ex.id)) return;
            const key = `${r}_${c}`;

            if (event.key === 'Backspace') {
                const curVal = (this.cwInputs[ex.id] && this.cwInputs[ex.id][key]) || '';
                if (!curVal) {
                    this.focusPrevCwCell(ex, r, c);
                }
            } else if (event.key === 'ArrowRight') {
                this.focusCwCell(ex, r, c + 1);
            } else if (event.key === 'ArrowLeft') {
                this.focusCwCell(ex, r, c - 1);
            } else if (event.key === 'ArrowDown') {
                this.focusCwCell(ex, r + 1, c);
            } else if (event.key === 'ArrowUp') {
                this.focusCwCell(ex, r - 1, c);
            }
        },
        focusCwCell(ex, r, c) {
            const inputId = `cw_${ex.id}_${r}_${c}`;
            const el = document.getElementById(inputId);
            if (el) el.focus();
        },
        focusNextCwCell(ex, r, c) {
            for (let nextC = c + 1; nextC < ex.gridCols; nextC++) {
                const el = document.getElementById(`cw_${ex.id}_${r}_${nextC}`);
                if (el) { el.focus(); return; }
            }
            for (let nextR = r + 1; nextR < ex.gridRows; nextR++) {
                for (let nextC = 0; nextC < ex.gridCols; nextC++) {
                    const el = document.getElementById(`cw_${ex.id}_${nextR}_${nextC}`);
                    if (el) { el.focus(); return; }
                }
            }
        },
        focusPrevCwCell(ex, r, c) {
            for (let prevC = c - 1; prevC >= 0; prevC--) {
                const el = document.getElementById(`cw_${ex.id}_${r}_${prevC}`);
                if (el) { el.focus(); return; }
            }
            for (let prevR = r - 1; prevR >= 0; prevR--) {
                for (let prevC = ex.gridCols - 1; prevC >= 0; prevC--) {
                    const el = document.getElementById(`cw_${ex.id}_${prevR}_${prevC}`);
                    if (el) { el.focus(); return; }
                }
            }
        },
        focusWord(ex, word) {
            this.focusCwCell(ex, word.row, word.col);
        },
        cwCellClass(ex, cell) {
            if (!cell.isActive) return 'black';
            const classes = ['active'];
            const userVal = this.getCwVal(ex, cell.r, cell.c);
            
            if (this.isRevealed(ex.id)) {
                classes.push('revealed-correct');
            } else if (this.checked[ex.id]) {
                if (userVal === cell.expectedLetter) {
                    classes.push('correct');
                } else if (userVal) {
                    classes.push('incorrect');
                } else {
                    classes.push('empty');
                }
            }
            return classes.join(' ');
        },

        /* ---- WORD SEARCH METHODS ---- */
        toggleWsCell(ex, ci) {
            if (this.isRevealed(ex.id)) return;
            if (!this.wsSelections[ex.id]) this.wsSelections[ex.id] = [];
            
            const currentSel = this.wsSelections[ex.id];
            const idx = currentSel.indexOf(ci);
            if (idx >= 0) {
                currentSel.splice(idx, 1);
            } else {
                currentSel.push(ci);
            }

            // Comprobar si la selección actual coincide con alguna palabra del placement
            if (ex.wordPlacements) {
                ex.wordPlacements.forEach(wp => {
                    const alreadyFound = (this.wsFoundWords[ex.id] || []).includes(wp.word);
                    if (!alreadyFound) {
                        const allSelected = wp.cells.every(c => currentSel.includes(c));
                        if (allSelected) {
                            if (!this.wsFoundWords[ex.id]) this.wsFoundWords[ex.id] = [];
                            this.wsFoundWords[ex.id].push(wp.word);
                            // Quitar esas celdas de la selección activa
                            this.wsSelections[ex.id] = currentSel.filter(c => !wp.cells.includes(c));
                            
                            // Si se encontraron todas, marcar checked
                            if (this.wsFoundWords[ex.id].length >= ex.words.length) {
                                this.checked[ex.id] = true;
                            }
                        }
                    }
                });
            }
        },
        clearWsSelection(exId) {
            this.wsSelections[exId] = [];
        },
        isWsCellSelected(ex, ci) {
            return (this.wsSelections[ex.id] || []).includes(ci);
        },
        isWsCellFound(ex, ci) {
            if (this.isRevealed(ex.id)) {
                if (ex.wordPlacements) {
                    return ex.wordPlacements.some(wp => wp.cells.includes(ci));
                }
                return true;
            }
            const foundWords = this.wsFoundWords[ex.id] || [];
            if (ex.wordPlacements && foundWords.length > 0) {
                return ex.wordPlacements.some(wp => foundWords.includes(wp.word) && wp.cells.includes(ci));
            }
            return false;
        },
        isWordFound(ex, wordName) {
            if (this.isRevealed(ex.id)) return true;
            return (this.wsFoundWords[ex.id] || []).includes(wordName);
        },
        getFoundCount(ex) {
            if (this.isRevealed(ex.id)) return (ex.words || []).length;
            return (this.wsFoundWords[ex.id] || []).length;
        },

        /* ---- STYLE HELPERS ---- */
        optionClass(ex, optionIdx) {
            const classes = [];
            if (this.answers[ex.id] === optionIdx) classes.push('selected');
            if (this.checked[ex.id] || this.isRevealed(ex.id)) {
                classes.push('disabled');
                const sol = this.getSolution(ex.id);
                if (sol) {
                    if (optionIdx === sol.answer) classes.push('correct');
                    else if (this.answers[ex.id] === optionIdx) classes.push('incorrect');
                }
            }
            return classes.join(' ');
        },
        msOptionClass(ex, optionIdx) {
            const classes = [];
            const selected = this.answers[ex.id] || [];
            if (selected.includes(optionIdx)) classes.push('selected');
            if (this.checked[ex.id] || this.isRevealed(ex.id)) {
                classes.push('disabled');
                const sol = this.getSolution(ex.id);
                if (sol) {
                    if (sol.answer.includes(optionIdx)) classes.push('correct');
                    else if (selected.includes(optionIdx)) classes.push('incorrect');
                }
            }
            return classes.join(' ');
        },
        tfClass(ex, value) {
            const classes = [];
            if (this.answers[ex.id] === value) classes.push('selected');
            if (this.checked[ex.id] || this.isRevealed(ex.id)) {
                classes.push('disabled');
                const sol = this.getSolution(ex.id);
                if (sol) {
                    if (value === sol.answer) classes.push('correct');
                    else if (this.answers[ex.id] === value) classes.push('incorrect');
                }
            }
            return classes.join(' ');
        },
        fillClass(exId, blankIdx) {
            if (this.isRevealed(exId)) return 'correct';
            if (!this.checked[exId]) return '';
            const sol = this.getSolution(exId);
            if (!sol || !sol.answers) return '';
            const given = ((this.fillInputs[exId] || {})[blankIdx] || '').trim().toUpperCase();
            const expected = sol.answers[blankIdx];
            if (Array.isArray(expected)) {
                return expected.some(e => e.toUpperCase() === given) ? 'correct' : 'incorrect';
            }
            return given === expected.toUpperCase() ? 'correct' : 'incorrect';
        },
        getFillVal(exId, blankIdx) {
            if (this.isRevealed(exId)) {
                const sol = this.getSolution(exId);
                if (sol && sol.answers && sol.answers[blankIdx]) {
                    const ans = sol.answers[blankIdx];
                    return Array.isArray(ans) ? ans[0] : ans;
                }
            }
            return (this.fillInputs[exId] || {})[blankIdx] || '';
        }
    },
    template: `
    <div class="exercise-runner">
        <!-- Barra de Progreso y Score -->
        <div class="exercise-progress">
            <span><strong>{{ exercises.length }}</strong> ejercicios en esta guía</span>
            <span class="score" v-if="score.total > 0 && !isSolutionTab">
                <i class="ph ph-medal"></i> {{ score.correct }} / {{ score.total }} correctos
            </span>
            <span class="badge" style="background:#dcfce7;color:#166534;font-weight:600;" v-if="isSolutionTab">
                <i class="ph ph-check"></i> Modo Solucionario Completo
            </span>
        </div>

        <div v-for="(ex, idx) in exercises" :key="ex.id" class="exercise-item fade-in">
            <div class="exercise-header">
                <span class="exercise-type" :class="ex.type === 'multiple-choice' ? 'mc' : ex.type === 'true-false' ? 'tf' : ex.type === 'fill-code' ? 'fill' : ex.type === 'find-error' ? 'error' : ex.type === 'crossword' ? 'crossword' : ex.type === 'word-search' ? 'wordsearch' : ex.type === 'multiple-select' ? 'ms' : 'proposed'">
                    {{ ex.type === 'multiple-choice' ? 'Alternativas' : ex.type === 'true-false' ? 'Verdadero / Falso' : ex.type === 'fill-code' ? 'Completar Código' : ex.type === 'find-error' ? 'Identificar Error' : ex.type === 'crossword' ? 'Crucigrama Interactivo' : ex.type === 'word-search' ? 'Sopa de Letras Interactiva' : ex.type === 'multiple-select' ? 'Selección Múltiple' : 'Ejercicio Propuesto' }}
                </span>
                <span class="exercise-number">Ejercicio {{ idx + 1 }}</span>
            </div>

            <div class="exercise-body">
                <div class="exercise-question" v-html="ex.question"></div>

                <!-- 1. MULTIPLE CHOICE -->
                <template v-if="ex.type === 'multiple-choice'">
                    <div class="mc-options">
                        <div v-for="(opt, oi) in ex.options" :key="oi"
                             class="mc-option" :class="optionClass(ex, oi)"
                             @click="selectAnswer(ex.id, oi)">
                            <span class="letter">{{ 'ABCDEFGH'[oi] }}</span>
                            <span v-html="opt"></span>
                        </div>
                    </div>
                    <button v-if="answers[ex.id] !== undefined && !checked[ex.id] && !isSolutionTab"
                            class="check-btn" @click="checkAnswer(ex)">
                        <i class="ph ph-check"></i> Verificar
                    </button>
                </template>

                <!-- 2. MULTIPLE SELECT -->
                <template v-if="ex.type === 'multiple-select'">
                    <div class="mc-options">
                        <div v-for="(opt, oi) in ex.options" :key="oi"
                             class="mc-option" :class="msOptionClass(ex, oi)"
                             @click="toggleMultiSelect(ex.id, oi)">
                            <span class="letter">{{ (answers[ex.id] || []).includes(oi) ? '✓' : 'ABCDEFGH'[oi] }}</span>
                            <span v-html="opt"></span>
                        </div>
                    </div>
                    <button v-if="(answers[ex.id] || []).length > 0 && !checked[ex.id] && !isSolutionTab"
                            class="check-btn" @click="checkAnswer(ex)">
                        <i class="ph ph-check"></i> Verificar
                    </button>
                </template>

                <!-- 3. TRUE / FALSE -->
                <template v-if="ex.type === 'true-false'">
                    <div class="tf-options">
                        <button class="tf-btn" :class="tfClass(ex, true)"
                                @click="selectAnswer(ex.id, true)">Verdadero</button>
                        <button class="tf-btn" :class="tfClass(ex, false)"
                                @click="selectAnswer(ex.id, false)">Falso</button>
                    </div>
                    <button v-if="answers[ex.id] !== undefined && !checked[ex.id] && !isSolutionTab"
                            class="check-btn" @click="checkAnswer(ex)">
                        <i class="ph ph-check"></i> Verificar
                    </button>
                </template>

                <!-- 4. FILL CODE -->
                <template v-if="ex.type === 'fill-code'">
                    <div class="fill-code-container">
                        <template v-for="(part, pi) in ex.parts" :key="pi">
                            <span v-if="part.type === 'text'" v-html="part.content"></span>
                            <input v-if="part.type === 'blank'"
                                   class="fill-blank" :class="fillClass(ex.id, part.index)"
                                   :placeholder="part.placeholder || '...'"
                                   :disabled="checked[ex.id] || isSolutionTab"
                                   :value="getFillVal(ex.id, part.index)"
                                   @input="updateFill(ex.id, part.index, $event.target.value)"
                                   :style="{ minWidth: (part.width || 120) + 'px' }">
                        </template>
                    </div>
                    <button v-if="!checked[ex.id] && !isSolutionTab" class="check-btn" @click="checkAnswer(ex)">
                        <i class="ph ph-check"></i> Verificar
                    </button>
                </template>

                <!-- 5. FIND ERROR -->
                <template v-if="ex.type === 'find-error'">
                    <div class="error-code-container">
                        <pre><template v-for="(line, li) in ex.lines" :key="li"><span
                            class="error-line"
                            :class="{ selected: answers[ex.id] === li, 'is-error': (checked[ex.id] || isSolutionTab) && getSolution(ex.id) && getSolution(ex.id).answer === li }"
                            @click="!checked[ex.id] && !isSolutionTab && selectAnswer(ex.id, li)"
                        >{{ line }}</span>
</template></pre>
                    </div>
                    <p style="font-size:0.8rem;color:var(--text-muted);margin-top:0.5rem;" v-if="!isSolutionTab">
                        Haz clic en la línea que contiene el error.
                    </p>
                    <button v-if="answers[ex.id] !== undefined && !checked[ex.id] && !isSolutionTab"
                            class="check-btn" @click="checkAnswer(ex)">
                        <i class="ph ph-check"></i> Verificar
                    </button>
                </template>

                <!-- 6. CROSSWORD INTERACTIVO -->
                <template v-if="ex.type === 'crossword'">
                    <div class="crossword-wrapper">
                        <!-- Grilla interactiva -->
                        <div class="crossword-grid-container">
                            <div class="crossword-grid" :style="{ gridTemplateColumns: 'repeat(' + ex.gridCols + ', 38px)' }">
                                <template v-for="(row, r) in getCrosswordGrid(ex)" :key="'r-'+r">
                                    <div v-for="(cell, c) in row" :key="'c-'+r+'-'+c"
                                         class="cw-cell" :class="cwCellClass(ex, cell)">
                                        <span v-if="cell.isActive && cell.numbers.length > 0" class="cw-number">
                                            {{ cell.numbers.join(',') }}
                                        </span>
                                        <input v-if="cell.isActive"
                                               :id="'cw_' + ex.id + '_' + r + '_' + c"
                                               type="text"
                                               maxlength="1"
                                               :value="getCwVal(ex, r, c)"
                                               :disabled="checked[ex.id] || isSolutionTab"
                                               @input="onCwInput(ex, r, c, $event)"
                                               @keydown="onCwKeydown(ex, r, c, $event)">
                                    </div>
                                </template>
                            </div>
                        </div>

                        <!-- Pistas interactivas -->
                        <div class="cw-clues">
                            <div class="cw-clues-column">
                                <h4><i class="ph ph-arrows-out-line-horizontal"></i> Horizontal →</h4>
                                <ul class="cw-clues-list">
                                    <li v-for="w in (ex.words || []).filter(item => item.direction === 'across')"
                                        :key="'ac-'+w.number"
                                        class="cw-clue-item"
                                        @click="focusWord(ex, w)"
                                        title="Haz clic para enfocar la palabra en la grilla">
                                        <span class="cw-clue-badge">{{ w.number }}</span>
                                        <div class="cw-clue-text">
                                            {{ w.clue }} <span class="cw-clue-len">({{ w.word.length }} letras)</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="cw-clues-column">
                                <h4><i class="ph ph-arrows-out-line-vertical"></i> Vertical ↓</h4>
                                <ul class="cw-clues-list">
                                    <li v-for="w in (ex.words || []).filter(item => item.direction === 'down')"
                                        :key="'dn-'+w.number"
                                        class="cw-clue-item"
                                        @click="focusWord(ex, w)"
                                        title="Haz clic para enfocar la palabra en la grilla">
                                        <span class="cw-clue-badge">{{ w.number }}</span>
                                        <div class="cw-clue-text">
                                            {{ w.clue }} <span class="cw-clue-len">({{ w.word.length }} letras)</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <button v-if="!checked[ex.id] && !isSolutionTab" class="check-btn" @click="checkAnswer(ex)">
                        <i class="ph ph-check"></i> Verificar Crucigrama
                    </button>
                </template>

                <!-- 7. WORD SEARCH INTERACTIVA -->
                <template v-if="ex.type === 'word-search'">
                    <div class="wordsearch-wrapper">
                        <!-- Barra de estado -->
                        <div class="ws-status-bar">
                            <span class="ws-counter">
                                <i class="ph ph-magnifying-glass"></i> Encontradas: <strong>{{ getFoundCount(ex) }}</strong> de <strong>{{ (ex.words || []).length }}</strong>
                            </span>
                            <button v-if="(wsSelections[ex.id] || []).length > 0 && !isSolutionTab"
                                    class="ws-clear-btn" @click="clearWsSelection(ex.id)">
                                <i class="ph ph-x"></i> Limpiar selección
                            </button>
                        </div>

                        <!-- Grilla interactiva -->
                        <div class="wordsearch-grid-container">
                            <div class="wordsearch-grid" :style="{ gridTemplateColumns: 'repeat(' + ex.gridSize + ', 36px)' }">
                                <div v-for="(cell, ci) in ex.grid" :key="'ws-'+ci"
                                     class="ws-cell"
                                     :class="{ selected: isWsCellSelected(ex, ci), found: isWsCellFound(ex, ci) }"
                                     @click="toggleWsCell(ex, ci)">
                                    {{ cell.letter }}
                                </div>
                            </div>
                        </div>

                        <!-- Lista de palabras a buscar con pistas -->
                        <div class="ws-words-container">
                            <h4>Palabras a encontrar:</h4>
                            <div class="ws-words">
                                <span v-for="w in (ex.words || [])" :key="'w-'+w"
                                      class="ws-word" :class="{ found: isWordFound(ex, w) }">
                                    <i class="ph" :class="isWordFound(ex, w) ? 'ph-check-circle' : 'ph-circle'"></i>
                                    {{ w }}
                                </span>
                            </div>
                        </div>

                        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:0.75rem;" v-if="!isSolutionTab">
                            <i class="ph ph-info"></i> Haz clic en las letras de la grilla para seleccionarlas. Al completar una palabra, se marcará automáticamente en verde.
                        </p>
                    </div>

                    <button v-if="!checked[ex.id] && !isSolutionTab" class="check-btn" @click="checkAnswer(ex)">
                        <i class="ph ph-check"></i> Verificar Sopa de Letras
                    </button>
                </template>

                <!-- 8. PROPOSED -->
                <template v-if="ex.type === 'proposed'">
                    <div class="proposed-exercise" v-html="ex.content"></div>
                </template>

                <!-- Feedback tras verificar -->
                <div v-if="checked[ex.id] && ex.type !== 'proposed' && !isSolutionTab"
                     class="feedback" :class="isCorrect(ex) ? 'correct' : 'incorrect'">
                    <i :class="isCorrect(ex) ? 'ph ph-check-circle' : 'ph ph-x-circle'"></i>
                    <span v-html="getSolution(ex.id) ? (isCorrect(ex) ? getSolution(ex.id).explanation : 'Hay respuestas incompletas o palabras por encontrar. Revisa las letras o casillas marcadas.') : ''"></span>
                </div>

                <!-- Botón Revelar Solución individual -->
                <button v-if="!isSolutionTab && (checked[ex.id] || ex.type === 'proposed' || ex.type === 'crossword' || ex.type === 'word-search')"
                        class="solution-toggle" @click="toggleSolution(ex.id)">
                    <i class="ph" :class="revealed[ex.id] ? 'ph-eye-slash' : 'ph-eye'"></i>
                    {{ revealed[ex.id] ? 'Ocultar solución' : 'Mostrar solución' }}
                </button>

                <!-- Bloque de Solución Detallada -->
                <div v-if="isRevealed(ex.id) && getSolution(ex.id)" class="solution-content fade-in">
                    <div v-html="getSolution(ex.id).fullSolution || getSolution(ex.id).explanation"></div>
                </div>
            </div>
        </div>
    </div>
    `
};
