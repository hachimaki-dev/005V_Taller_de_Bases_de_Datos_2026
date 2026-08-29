// SlideViewer.js — Componente de presentaciones HTML5 proyectables
// Soporta navegación por teclado, fullscreen, y progress bar

const SlideViewer = {
    props: {
        slides: { type: Array, required: true }
    },
    data() {
        return {
            current: 0,
            isFullscreen: false
        };
    },
    computed: {
        total() { return this.slides.length; },
        progress() { return ((this.current + 1) / this.total) * 100; },
        slide() { return this.slides[this.current]; }
    },
    methods: {
        next() { if (this.current < this.total - 1) this.current++; },
        prev() { if (this.current > 0) this.current--; },
        goTo(i) { if (i >= 0 && i < this.total) this.current = i; },
        handleKey(e) {
            if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); this.next(); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); this.prev(); }
            if (e.key === 'Escape' && this.isFullscreen) { this.exitFullscreen(); }
        },
        async enterFullscreen() {
            const el = this.$refs.frame;
            if (el.requestFullscreen) await el.requestFullscreen();
            else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
            this.isFullscreen = true;
        },
        exitFullscreen() {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            this.isFullscreen = false;
        },
        onFsChange() {
            this.isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
        }
    },
    mounted() {
        window.addEventListener('keydown', this.handleKey);
        document.addEventListener('fullscreenchange', this.onFsChange);
        document.addEventListener('webkitfullscreenchange', this.onFsChange);
    },
    unmounted() {
        window.removeEventListener('keydown', this.handleKey);
        document.removeEventListener('fullscreenchange', this.onFsChange);
        document.removeEventListener('webkitfullscreenchange', this.onFsChange);
    },
    template: `
    <div class="slide-viewer">
        <div class="slide-toolbar">
            <span class="slide-counter">Slide {{ current + 1 }} de {{ total }}</span>
            <div class="slide-toolbar-actions">
                <button @click="enterFullscreen" title="Pantalla completa para proyección">
                    <i class="ph ph-monitor"></i> Proyectar
                </button>
            </div>
        </div>

        <div ref="frame" class="slide-frame" :class="{ fullscreen: isFullscreen }">
            <div class="slide" :class="slide.class || ''" v-html="slide.html"></div>

            <template v-if="isFullscreen">
                <span class="fs-counter">{{ current + 1 }} / {{ total }}</span>
                <button class="fs-exit" @click="exitFullscreen">ESC Salir</button>
                <div class="fs-nav">
                    <button @click="prev" :disabled="current === 0">← Anterior</button>
                    <button @click="next" :disabled="current === total - 1">Siguiente →</button>
                </div>
                <div class="fs-progress">
                    <div class="fs-progress-bar" :style="{ width: progress + '%' }"></div>
                </div>
            </template>
        </div>

        <div class="slide-nav" v-if="!isFullscreen">
            <button @click="prev" :disabled="current === 0">
                <i class="ph ph-caret-left"></i> Anterior
            </button>
            <span style="font-size:0.8rem;color:var(--text-muted);">{{ current + 1 }} / {{ total }}</span>
            <button @click="next" :disabled="current === total - 1">
                Siguiente <i class="ph ph-caret-right"></i>
            </button>
        </div>

        <div class="slide-progress" v-if="!isFullscreen">
            <div class="slide-progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
    </div>
    `
};
