import $ from "jquery";

export default class ElementObserver {
    constructor(selector) {
        this.selector = selector;
        this.handlers = new Set();

        this.prevIsVisible = false;
        this.isVisible = false;

        this._createMutation();
    }

    onAppear(handler) {
        this.handlers.add(handler);
    }

    _createMutation() {
        var observer = new MutationObserver((m) => this._processMutations(m));

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: false
        });
    }

    _processMutations(mutations) {
        mutations.forEach((mutation) => {
            const $mutationTarget = $(mutation.target);
            if ($mutationTarget.is(this.selector)) {
                this._callAppendHandlers($mutationTarget);
            } else if (mutation.addedNodes) {
                const $target = $(mutation.addedNodes)
                    .map((_, elem) => $(elem).is(this.selector));

                if ($target.lenth > 0) {
                    this._callAppendHandlers($target);
                }
            }
        })
    }

    _callAppendHandlers($element) {
        this.handlers.forEach((h) => h($element));
    }
} 