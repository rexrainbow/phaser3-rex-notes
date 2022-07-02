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

    setTypingSpeed(speed) {
        this.typingSpeed = speed;
        return this;
    }
}