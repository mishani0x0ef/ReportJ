import $ from "jquery";

export default class ElementObserver {
    constructor(selector) {
        this.selector = selector;
        this.handlers = new Set();

        this.prevIsVisible = false;
        this.isVisible = false;

        // todo: use proper flow for element identification. MR
        //this._createMutation();
        this.setTimer();
    }

    onAppear(handler) {
        this.handlers.add(handler);
    }

    _createMutation() {
        var observer = new MutationObserver((m) => this._processMutations(m));

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false
        });
    }

    _processMutations(mutations) {
        mutations.forEach((mutation) => {
            if (!mutation.addedNodes) {
                return;
            }

            const $nodes = $(mutation.addedNodes);
            const elementAppeared = $nodes.has(this.selector);

            if (elementAppeared) {
                this.handlers.forEach((h) => h($nodes));
                return;
            }
        })
    }

    setTimer() {
        setInterval(() => {
            const $element = $(document).find(this.selector);
            this.prevIsVisible = this.isVisible;
            this.isVisible = $element.lenth !== 0;
            if (!this.isVisible) {
                return;
            }
            this.handlers.forEach((handler) => {
                handler($element);
            });
        }, 2000);
    }
} 