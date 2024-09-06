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
        Focus.call(this, this.getFirst());
        return this;
    },

    last() {
        Focus.call(this, this.getLast());
        return this;
    },

    next() {
        Focus.call(this, this.getNext());
        return this;
    },

    previuos() {
        Focus.call(this, this.getPrevious());
        return this;
    },

    nextRow() {
        Focus.call(this, this.getNextRow());
        return this;
    },

    previousRow() {
        Focus.call(this, this.getPreviousRow());
        return this;
    },

    focus(gameObject) {
        // Already focus
        if (gameObject === this.focusedTarget) {
            return this;
        }

        var targets = this.targets;
        var is1DTargetsArray = (Array.isArray(targets)) && (!Array.isArray(targets[0]));

        if (is1DTargetsArray) {
            var x = targets.indexOf(gameObject);
            if (x !== -1) {
                this.focusIndex.x = x;
                this.focusIndex.y = 0;
                Focus.call(this, gameObject);
            }
        } else {
            for (var y = 0, rowCount = targets.length; i < rowCount; i++) {
                var row = targets[y];
                var x = row.indexOf(gameObject);
                if (x !== -1) {
                    this.focusIndex.x = x;
                    this.focusIndex.y = y;
                    Focus.call(this, gameObject);
                }
            }
        }
        return this;
    },

    blur: Blur,

}