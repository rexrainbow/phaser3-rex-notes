var Focus = function (gameObject) {
    // Already focus
    if (gameObject === this.focusedTarget) {
        return this;
    }

    Blur.call(this);

    this.focusedTarget = gameObject;
    if (gameObject) {
        this.emit('focus', gameObject);
    }
}

var Blur = function () {
    if (!this.focusedTarget) {
        return this;
    }

    var gameObject = this.focusedTarget;
    this.focusedTarget = null;
    this.emit('blur', gameObject);
}

export default {
    first() {
        if (!this.enable) {
            return this;
        }

        Focus.call(this, this.getFirst());
        return this;
    },

    last() {
        if (!this.enable) {
            return this;
        }

        Focus.call(this, this.getLast());
        return this;
    },

    next() {
        if (!this.enable) {
            return this;
        }

        Focus.call(this, this.getNext());
        return this;
    },

    previous() {
        if (!this.enable) {
            return this;
        }

        Focus.call(this, this.getPrevious());
        return this;
    },

    nextRow() {
        if (!this.enable) {
            return this;
        }

        Focus.call(this, this.getNextRow());
        return this;
    },

    previousRow() {
        if (!this.enable) {
            return this;
        }

        Focus.call(this, this.getPreviousRow());
        return this;
    },

    focus(gameObject) {
        if (!this.enable) {
            return this;
        }

        if (!gameObject) {
            this.blur();
            return this;
        }

        if (!this.isTargetFocusEnable(gameObject)) {
            return this;
        }

        var index = this.getTargetIndex(gameObject);
        if (index.x === undefined) {
            this.blur();
            return this;
        }

        this.focusIndex.x = index.x;
        this.focusIndex.y = index.y;

        // Already focus
        if (gameObject !== this.focusedTarget) {
            Focus.call(this, gameObject);
        }

        return this;
    },

    blur() {
        if (!this.enable) {
            return this;
        }

        Blur.call(this);
        return this;
    },

}