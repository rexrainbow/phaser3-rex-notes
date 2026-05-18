export default {
    clearText(name?: any) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).clearText();
        return this;
    },

    appendText(name?: any, text?: any) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).appendText(text);
        return this;
    },

    clearTyping(name?: any) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).clearTyping();
        return this;
    },

    typing(name?: any, text?: any) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).typing(text);
        return this;
    },

    appendTyping(name?: any, text?: any) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).appendTyping(text);
        return this;
    },

    setTypingSpeed(name?: any, speed?: any) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).setTypingSpeed(speed);
        return this;
    },
}