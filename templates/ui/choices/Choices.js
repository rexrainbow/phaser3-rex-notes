import Dialog from '../dialog/Dialog.js';

class Choices extends Dialog {
    // Assume that each child is a Label or a text game object

    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        if (!config.hasOwnProperty('choices')) {
            config.choices = [];
        }

        var createChoiceCallback,
            createChoiceCallbackScope;
        if (typeof (config.choices) === 'function') {
            createChoiceCallback = config.choices;
            createChoiceCallbackScope = undefined;
            config.choices = [];
        } else {
            createChoiceCallback = config.createChoiceCallback;
            createChoiceCallbackScope = config.createChoiceCallbackScope;
        }

        super(scene, config);
        this.type = 'rexChoices';

        this.setCreateChoiceCallback(createChoiceCallback, createChoiceCallbackScope);
    }

    setCreateChoiceCallback(callback, scope) {
        this.createChoiceCallback = callback;
        this.createChoiceCallbackScope = scope;
        return this;
    }

    setChildText(child, text) {
        if (typeof (child) === 'string') {
            child = this.childrenMap[child];
        }

        if (!child) {
            return this;
        }

        if (text) {
            child.show().setText(text);
        } else {
            child.hide();
        }
        return this;
    }

    setTitle(text) {
        this.setChildText('title', text);
        return this;
    }

    setContent(text) {
        this.setChildText('content', text);
        return this;
    }

    setDescription(text) {
        this.setChildText('description', text);
        return this;
    }

    setChoices(textArray) {
        var choices = this.childrenMap.choices;

        if (textArray.length > choices.length) {
            var callback = this.createChoiceCallback;
            var scope = this.createChoiceCallbackScope;
            if (callback) {
                for (var i = 0, cnt = textArray.length - choices.length; i < cnt; i++) {
                    var gameObject;
                    if (scope) {
                        gameObject = callback.call(scope, this.scene);
                    } else {
                        gameObject = callback(this.scene);
                    }
                    this.addChoice(gameObject);
                }
            }
        }

        for (var i = 0, cnt = choices.length; i < cnt; i++) {
            this.setChildText(choices[i], textArray[i]);
        }

        return this;
    }

    setText(config) {
        if (config === undefined) {
            config = {};
        }

        this
            .setTitle(config.title)
            .setContent(config.content)
            .setDescription(config.description)
            .setChoices(config.choices)

        return this;
    }

    clickChoicePromise(config) {
        if (config) {
            this.setText(config).layout();
        }

        var self = this;
        return new Promise(function (resolve, reject) {
            self.once('choice.click', function (button, index, pointer, event) {
                resolve({
                    button: button,
                    index: index,
                    pointer: pointer
                });
            });
        });
    }
}

export default Choices;