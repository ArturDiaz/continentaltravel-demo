/*
 * ScrollReveal — efecto general de revelado de contenido al hacer scroll (estilo Apple).
 * Uso: agregar data-reveal a cualquier elemento del HTML, sin tocar este archivo.
 *
 *   <div data-reveal="fade-up">...</div>
 *
 * Tipos disponibles (data-reveal): fade-up (por defecto), fade-down, fade-left, fade-right, zoom-in, fade-in
 *
 * Atributos opcionales por elemento:
 *   data-reveal-delay="150"        retraso en ms (por defecto 0)
 *   data-reveal-duration="800"     duración en ms (por defecto 800)
 *   data-reveal-distance="40"      distancia del desplazamiento en px (por defecto 40)
 *   data-reveal-ease="ease-out"    curva de la transición
 *   data-reveal-threshold="0.15"   % visible del elemento para disparar el efecto (0 a 1)
 *   data-reveal-once="false"       si es "false", el efecto se repite cada vez que el elemento entra/sale
 *
 * Grupos con stagger automático (cascada):
 *   <div data-reveal-group data-reveal-stagger="120">
 *       <div data-reveal="fade-up">...</div>
 *       <div data-reveal="fade-up">...</div>
 *   </div>
 *   Cada hijo [data-reveal] recibe un delay incremental (index * stagger) salvo que
 *   ya tenga su propio data-reveal-delay definido.
 *
 * API pública: window.ScrollReveal.refresh() — re-escanea el DOM (útil tras insertar
 * contenido dinámico, por ejemplo vía AJAX).
 */
(function (window, document) {
    'use strict';

    var DEFAULTS = {
        type: 'fade-up',
        delay: 0,
        duration: 800,
        distance: 40,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        threshold: 0.15,
        once: true
    };

    var reducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var observers = {};

    function toNumber(value, fallback) {
        var n = parseFloat(value);
        return isNaN(n) ? fallback : n;
    }

    function toBool(value, fallback) {
        if (value === undefined || value === null) return fallback;
        return value !== 'false';
    }

    function applyStagger(root) {
        var groups = root.querySelectorAll('[data-reveal-group]');
        groups.forEach(function (group) {
            var stagger = toNumber(group.getAttribute('data-reveal-stagger'), 100);
            var children = group.querySelectorAll('[data-reveal]');
            var i = 0;
            children.forEach(function (child) {
                if (!child.hasAttribute('data-reveal-delay')) {
                    child.setAttribute('data-reveal-delay', i * stagger);
                }
                i += 1;
            });
        });
    }

    function clearTransition(el) {
        el.style.transitionProperty = '';
        el.style.transitionDuration = '';
        el.style.transitionTimingFunction = '';
        el.style.transitionDelay = '';
    }

    function setTransition(el) {
        var duration = toNumber(el.getAttribute('data-reveal-duration'), DEFAULTS.duration);
        var delay = toNumber(el.getAttribute('data-reveal-delay'), DEFAULTS.delay);
        var ease = el.getAttribute('data-reveal-ease') || DEFAULTS.ease;

        el.style.transitionProperty = 'opacity, transform';
        el.style.transitionDuration = duration + 'ms';
        el.style.transitionTimingFunction = ease;
        el.style.transitionDelay = delay + 'ms';
    }

    function reveal(el) {
        setTransition(el);
        el.classList.add('is-revealed');

        var onEnd = function (evt) {
            if (evt.target !== el) return;
            clearTransition(el);
            el.removeEventListener('transitionend', onEnd);
        };
        el.addEventListener('transitionend', onEnd);
    }

    function hide(el) {
        setTransition(el);
        el.classList.remove('is-revealed');
    }

    function observe(el) {
        var threshold = toNumber(el.getAttribute('data-reveal-threshold'), DEFAULTS.threshold);
        var key = threshold.toFixed(2);

        if (!observers[key]) {
            observers[key] = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    var target = entry.target;
                    var once = toBool(target.getAttribute('data-reveal-once'), DEFAULTS.once);

                    if (entry.isIntersecting) {
                        reveal(target);
                        if (once) observers[key].unobserve(target);
                    } else if (!once) {
                        hide(target);
                    }
                });
            }, { threshold: threshold, rootMargin: '0px 0px -10% 0px' });
        }

        observers[key].observe(el);
    }

    function setup(el) {
        if (el.dataset.revealReady) return;
        el.dataset.revealReady = 'true';

        if (el.getAttribute('data-reveal') === '') {
            el.setAttribute('data-reveal', DEFAULTS.type);
        }

        var distance = toNumber(el.getAttribute('data-reveal-distance'), DEFAULTS.distance);
        el.style.setProperty('--reveal-distance', distance + 'px');

        if (reducedMotion) {
            el.classList.add('is-revealed');
            return;
        }

        observe(el);
    }

    function init(root) {
        root = root || document;
        applyStagger(root);
        root.querySelectorAll('[data-reveal]').forEach(setup);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(); });
    } else {
        init();
    }

    window.ScrollReveal = { refresh: init };
})(window, document);
