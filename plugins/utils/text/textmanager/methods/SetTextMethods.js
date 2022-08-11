export default {
    setText(name, text) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).setText(text);
        return this;
    },

    typingText(name, text) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).typing(text);
        return this;
    },

    setTypingSpeed(name, speed) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).setTypingSpeed(speed);
        return this;
    },

    getTypingTask(name) {
        if (!this.has(name)) {
            return null;
        }

        return this.get(name).getTypingTask();
    }
}