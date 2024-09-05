export default {
    focus(gameObject) {
        if (gameObject === this.focusedGameObject) {
            return this;
        }

        this.blur();

        this.focusedGameObject = gameObject;
        this.emit('focus', gameObject);

        return this;
    },

    blur() {
        if (!this.focusedGameObject) {
            return this;
        }

        var gameObject = this.focusedGameObject;
        this.focusedGameObject = null;
        this.emit('blur', gameObject);
        return this;
    },

    first() {
        this.focus(this.getFirst());
        return this;
    },

    last() {
        this.focus(this.getLast());
        return this;
    },

    next() {
        this.focus(this.getNext());
        return this;
    },

    previuos() {
        this.focus(this.getPrevious());
        return this;
    },

    nextRow() {
        this.focus(this.getNextRow());
        return this;
    },

    previousRow() {
        this.focus(this.getPreviousRow());
        return this;
    }
}