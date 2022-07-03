export default {
    setText(name, text) {
        if (!this.has(name)) {
            this.add(name);
        }

        this.get(name).setText(text);
        return this;
    },

    typingText(name, text) {
        if (!this.has(name)) {
            this.add(name);
        }

        this.get(name).typing(text);
        return this;
    },

    setTypingSpeed(name, speed) {
        this.get(name).setTypingSpeed(speed);
        return this;
    },

    getTypingTask(name) {
        if (this.has(name)) {
            return this.get(name).getTypingTask();
        }
        return null;
    }
}