import Dialog from '../dialog/Dialog.js';

class Choices extends Dialog {
    // Assume that each child is a Label or a text game object

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
            self.once('button.click', function (button, groupName, index, pointer, event) {
                if (groupName !== 'choices') {
                    return;
                }
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