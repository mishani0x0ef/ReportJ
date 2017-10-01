/**
 * bootbox.js [v4.4.0]
 *
 * http://bootboxjs.com/license.txt
 */

// Library was customized. MR

// @see https://github.com/makeusabrew/bootbox/issues/180
// @see https://github.com/makeusabrew/bootbox/issues/186
(function (root, factory) {

    "use strict";
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["jquery"], factory);
    } else if (typeof exports === "object") {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require("jquery"));
    } else {
        // Browser globals (root is window)
        root.bootbox = factory(root.jQuery);
    }

}(this, function init($, undefined) {

    "use strict";

    // the base DOM structure needed to create a modal
    var templates = {
        dialog: "<div class='bootbox modal' tabindex='-1' role='dialog'>" +
            "<div class='modal-dialog'>" +
            "<div class='modal-content'>" +
            "<div class='modal-body'><div class='bootbox-body'></div></div>" +
            "</div>" +
            "</div>" +
            "</div>",
        header: "<div class='modal-header'>" +
            "<h4 class='modal-title'></h4>" +
            "</div>",
        footer: "<div class='modal-footer'></div>",
        closeButton: "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
        form: "<form class='bootbox-form'></form>",
        inputs: {}
    };

    var defaults = {
        // default language
        locale: "en",
        // show backdrop or not. Default to static so user has to interact with dialog
        backdrop: "static",
        // animate the modal in/out
        animate: true,
        // additional class string applied to the top level dialog
        className: null,
        // whether or not to include a close button
        closeButton: true,
        // show the dialog immediately by default
        show: true,
        // dialog container
        container: "body"
    };

    // our public object; augmented after our private API
    var exports = {};

    /**
     * @private
     */
    function _t(key) {
        var locale = locales[defaults.locale];
        return locale ? locale[key] : locales.en[key];
    }

    function processCallback(e, dialog, callback) {
        e.stopPropagation();
        e.preventDefault();

        // by default we assume a callback will get rid of the dialog,
        // although it is given the opportunity to override this

        // so, if the callback can be invoked and it *explicitly returns false*
        // then we'll set a flag to keep the dialog active...
        var preserveDialog = $.isFunction(callback) && callback.call(dialog, e) === false;

        // ... otherwise we'll bin it
        if (!preserveDialog) {
            dialog.modal("hide");
        }
    }

    function getKeyLength(obj) {
        // @TODO defer to Object.keys(x).length if available?
        var k, t = 0;
        for (k in obj) {
            t++;
        }
        return t;
    }

    function each(collection, iterator) {
        var index = 0;
        $.each(collection, function (key, value) {
            iterator(key, value, index++);
        });
    }

    function sanitize(options) {
        var buttons;
        var total;

        if (typeof options !== "object") {
            throw new Error("Please supply an object of options");
        }

        if (!options.message) {
            throw new Error("Please specify a message");
        }

        // make sure any supplied options take precedence over defaults
        options = $.extend({}, defaults, options);

        if (!options.buttons) {
            options.buttons = {};
        }

        buttons = options.buttons;

        total = getKeyLength(buttons);

        each(buttons, function (key, button, index) {

            if ($.isFunction(button)) {
                // short form, assume value is our callback. Since button
                // isn't an object it isn't a reference either so re-assign it
                button = buttons[key] = {
                    callback: button
                };
            }

            // before any further checks make sure by now button is the correct type
            if ($.type(button) !== "object") {
                throw new Error("button with key " + key + " must be an object");
            }

            if (!button.label) {
                // the lack of an explicit label means we'll assume the key is good enough
                button.label = key;
            }

            if (!button.className) {
                if (total <= 2 && index === total - 1) {
                    // always add a primary to the main option in a two-button dialog
                    button.className = "btn-primary";
                } else {
                    button.className = "btn-default";
                }
            }
        });

        return options;
    }

    /**
     * map a flexible set of arguments into a single returned object
     * if args.length is already one just return it, otherwise
     * use the properties argument to map the unnamed args to
     * object properties
     * so in the latter case:
     * mapArguments(["foo", $.noop], ["message", "callback"])
     * -> { message: "foo", callback: $.noop }
     */
    function mapArguments(args, properties) {
        var argn = args.length;
        var options = {};

        if (argn < 1 || argn > 2) {
            throw new Error("Invalid argument length");
        }

        if (argn === 2 || typeof args[0] === "string") {
            options[properties[0]] = args[0];
            options[properties[1]] = args[1];
        } else {
            options = args[0];
        }

        return options;
    }

    /**
     * merge a set of default dialog options with user supplied arguments
     */
    function mergeArguments(defaults, args, properties) {
        return $.extend(
            // deep merge
            true,
            // ensure the target is an empty, unreferenced object
            {},
            // the base options object for this type of dialog (often just buttons)
            defaults,
            // args could be an object or array; if it's an array properties will
            // map it to a proper options object
            mapArguments(
                args,
                properties
            )
        );
    }

    /**
     * this entry-level method makes heavy use of composition to take a simple
     * range of inputs and return valid options suitable for passing to bootbox.dialog
     */
    function mergeDialogOptions(className, labels, properties, args) {
        //  build up a base set of dialog properties
        var baseOptions = {
            className: "bootbox-" + className,
            buttons: createLabels.apply(null, labels)
        };

        // ensure the buttons properties generated, *after* merging
        // with user args are still valid against the supplied labels
        return validateButtons(
            // merge the generated base properties with user supplied arguments
            mergeArguments(
                baseOptions,
                args,
                // if args.length > 1, properties specify how each arg maps to an object key
                properties
            ),
            labels
        );
    }

    /**
     * from a given list of arguments return a suitable object of button labels
     * all this does is normalise the given labels and translate them where possible
     * e.g. "ok", "confirm" -> { ok: "OK, cancel: "Annuleren" }
     */
    function createLabels() {
        var buttons = {};

        for (var i = 0, j = arguments.length; i < j; i++) {
            var argument = arguments[i];
            var key = argument.toLowerCase();
            var value = argument.toUpperCase();

            buttons[key] = {
                label: _t(value)
            };
        }

        return buttons;
    }

    function validateButtons(options, buttons) {
        var allowedButtons = {};
        each(buttons, function (key, value) {
            allowedButtons[value] = true;
        });

        each(options.buttons, function (key) {
            if (allowedButtons[key] === undefined) {
                throw new Error("button key " + key + " is not allowed (options are " + buttons.join("\n") + ")");
            }
        });

        return options;
    }

    exports.alert = function (message, title, callback) {
        return exports.dialog({
            message: message,
            title: title,
            onEscape: callback,
            buttons: {
                success: {
                    label: "OK",
                    className: "btn-primary",
                    callback: callback
                }
            }
        });
    };
    
    exports.confirm = function (message, title, callback) {
        return exports.dialog({
            message: message,
            title: title,
            onEscape: function () { 
                callback(false) 
            },
            buttons: {
                success: {
                    label: "OK",
                    className: "btn-primary",
                    callback: function () {
                        callback(true);
                    }
                },
                danger: {
                    label: "Cancel",
                    className: "btn-default",
                    callback: function () {
                        callback(false);
                    }
                }
            }
        });
    }

    exports.dialog = function (options) {
        options = sanitize(options);

        var dialog = $(templates.dialog);
        var innerDialog = dialog.find(".modal-dialog");
        var body = dialog.find(".modal-body");
        var buttons = options.buttons;
        var buttonStr = "";
        var callbacks = {
            onEscape: options.onEscape
        };

        if ($.fn.modal === undefined) {
            throw new Error(
                "$.fn.modal is not defined; please double check you have included " +
                "the Bootstrap JavaScript library. See http://getbootstrap.com/javascript/ " +
                "for more details."
            );
        }

        each(buttons, function (key, button) {

            // @TODO I don't like this string appending to itself; bit dirty. Needs reworking
            // can we just build up button elements instead? slower but neater. Then button
            // can just become a template too
            buttonStr += "<button data-bb-handler='" + key + "' type='button' class='btn " + button.className + "'>" + button.label + "</button>";
            callbacks[key] = button.callback;
        });

        body.find(".bootbox-body").html(options.message);

        if (options.animate === true) {
            dialog.addClass("fade");
        }

        if (options.className) {
            dialog.addClass(options.className);
        }

        if (options.size === "large") {
            innerDialog.addClass("modal-lg");
        } else if (options.size === "small") {
            innerDialog.addClass("modal-sm");
        }

        if (options.title) {
            body.before(templates.header);
        }

        if (options.closeButton) {
            var closeButton = $(templates.closeButton);

            if (options.title) {
                dialog.find(".modal-header").prepend(closeButton);
            } else {
                closeButton.css("margin-top", "-10px").prependTo(body);
            }
        }

        if (options.title) {
            dialog.find(".modal-title").html(options.title);
        }

        if (buttonStr.length) {
            body.after(templates.footer);
            dialog.find(".modal-footer").html(buttonStr);
        }


        /**
         * Bootstrap event listeners; used handle extra
         * setup & teardown required after the underlying
         * modal has performed certain actions
         */

        dialog.on("hidden.bs.modal", function (e) {
            // ensure we don't accidentally intercept hidden events triggered
            // by children of the current dialog. We shouldn't anymore now BS
            // namespaces its events; but still worth doing
            if (e.target === this) {
                dialog.remove();
            }
        });

        /*
        dialog.on("show.bs.modal", function() {
          // sadly this doesn't work; show is called *just* before
          // the backdrop is added so we'd need a setTimeout hack or
          // otherwise... leaving in as would be nice
          if (options.backdrop) {
            dialog.next(".modal-backdrop").addClass("bootbox-backdrop");
          }
        });
        */

        dialog.on("shown.bs.modal", function () {
            dialog.find(".btn-primary:first").focus();
        });

        /**
         * Bootbox event listeners; experimental and may not last
         * just an attempt to decouple some behaviours from their
         * respective triggers
         */

        if (options.backdrop !== "static") {
            // A boolean true/false according to the Bootstrap docs
            // should show a dialog the user can dismiss by clicking on
            // the background.
            // We always only ever pass static/false to the actual
            // $.modal function because with `true` we can't trap
            // this event (the .modal-backdrop swallows it)
            // However, we still want to sort of respect true
            // and invoke the escape mechanism instead
            dialog.on("click.dismiss.bs.modal", function (e) {
                // @NOTE: the target varies in >= 3.3.x releases since the modal backdrop
                // moved *inside* the outer dialog rather than *alongside* it
                if (dialog.children(".modal-backdrop").length) {
                    e.currentTarget = dialog.children(".modal-backdrop").get(0);
                }

                if (e.target !== e.currentTarget) {
                    return;
                }

                dialog.trigger("escape.close.bb");
            });
        }

        dialog.on("escape.close.bb", function (e) {
            if (callbacks.onEscape) {
                processCallback(e, dialog, callbacks.onEscape);
            }
        });

        /**
         * Standard jQuery event listeners; used to handle user
         * interaction with our dialog
         */

        dialog.on("click", ".modal-footer button", function (e) {
            var callbackKey = $(this).data("bb-handler");

            processCallback(e, dialog, callbacks[callbackKey]);
        });

        dialog.on("click", ".bootbox-close-button", function (e) {
            // onEscape might be falsy but that's fine; the fact is
            // if the user has managed to click the close button we
            // have to close the dialog, callback or not
            processCallback(e, dialog, callbacks.onEscape);
        });

        dialog.on("keyup", function (e) {
            if (e.which === 27) {
                dialog.trigger("escape.close.bb");
            }
        });

        // the remainder of this method simply deals with adding our
        // dialogent to the DOM, augmenting it with Bootstrap's modal
        // functionality and then giving the resulting object back
        // to our caller

        $(options.container).append(dialog);

        dialog.modal({
            backdrop: options.backdrop ? "static" : false,
            keyboard: false,
            show: false
        });

        if (options.show) {
            dialog.modal("show");
        }

        // @TODO should we return the raw element here or should
        // we wrap it in an object on which we can expose some neater
        // methods, e.g. var d = bootbox.alert(); d.hide(); instead
        // of d.modal("hide");

        /*
         function BBDialog(elem) {
           this.elem = elem;
         }

         BBDialog.prototype = {
           hide: function() {
             return this.elem.modal("hide");
           },
           show: function() {
             return this.elem.modal("show");
           }
         };
         */

        return dialog;

    };

    exports.setDefaults = function () {
        var values = {};

        if (arguments.length === 2) {
            // allow passing of single key/value...
            values[arguments[0]] = arguments[1];
        } else {
            // ... and as an object too
            values = arguments[0];
        }

        $.extend(defaults, values);
    };

    exports.hideAll = function () {
        $(".bootbox").modal("hide");

        return exports;
    };


    /**
     * standard locales. Please add more according to ISO 639-1 standard. Multiple language variants are
     * unlikely to be required. If this gets too large it can be split out into separate JS files.
     */
    var locales = {
        en: {
            OK: "OK",
            CANCEL: "Cancel",
            CONFIRM: "OK"
        },
        ua: {
            OK: "ОК",
            CANCEL: "Відміна",
            CONFIRM: "ОК"
        }
    };

    exports.addLocale = function (name, values) {
        $.each(["OK", "CANCEL", "CONFIRM"], function (_, v) {
            if (!values[v]) {
                throw new Error("Please supply a translation for '" + v + "'");
            }
        });

        locales[name] = {
            OK: values.OK,
            CANCEL: values.CANCEL,
            CONFIRM: values.CONFIRM
        };

        return exports;
    };

    exports.removeLocale = function (name) {
        delete locales[name];

        return exports;
    };

    exports.setLocale = function (name) {
        return exports.setDefaults("locale", name);
    };

    exports.init = function (_$) {
        return init(_$ || $);
    };

    return exports;
}));