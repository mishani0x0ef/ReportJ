import debounce from "lodash.debounce"

export default class ElementObserver {
    constructor(selector) {
        this.selector = selector;
        this.handlers = new Set();

        this._callHandlers = debounce(($element, handlers) => {
            handlers.forEach((h) => h($element));
        }, 100, 200);

        this._createMutation();
    }

    onAppear(handler) {
        this.handlers.add(handler);
    }

    dispose() {
        this.handlers.clear();
        this.observer.disconnect();
    }

    _createMutation() {
        this.observer = new MutationObserver((m) => this._processMutations(m));

        this.observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false
        });
    }

    _processMutations(mutations) {
        mutations.forEach((mutation) => {
            const targetMatch = this._processElementMutation(mutation.target);
            if (!targetMatch && mutation.addedNodes) {
                mutation.addedNodes.forEach((elem) => this._processElementMutation(elem));
            }
        })
    }

    _processElementMutation(elem) {
        const isMatchSelector = elem.matches && elem.matches(this.selector);
        if (isMatchSelector) {
            this._callHandlers(elem, this.handlers);
        }
        return isMatchSelector;
    }
} 