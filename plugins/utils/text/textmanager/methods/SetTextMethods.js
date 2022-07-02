export default {
    setText(name, text) {
        if (!this.has(name)) {
            this.add(name);
        }

        this.get(name).setText(text);
        return this;
    },

    typing(name, text) {
        if (!this.has(name)) {
            this.add(name);
        }

        this.get(name).typing(text);
        return this;
    }
}