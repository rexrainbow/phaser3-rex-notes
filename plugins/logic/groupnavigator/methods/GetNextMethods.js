const Wrap = Phaser.Math.Wrap;

var GetNextameObject = function ({
    startX, startY, backward,
}) {

    var targets = this.targets;
    var is1DTargetsArray = !Array.isArray(targets[0]);

    // Correct startX, startY
    if (is1DTargetsArray) {
        startY = 0;
    } else {
        // Wrap 
        startY = Wrap(startY, 0, targets.length);
    }

    var row;
    if (is1DTargetsArray) {
        row = targets;
    } else {
        row = targets[startY];
    }
    // Wrap 
    startX = Wrap(startX, 0, row.length);

    var x = startX;
    var y = startY;

    var gameObject;
    while (!gameObject) {
        // Get game object from targets array
        var row;
        if (is1DTargetsArray) {
            row = targets;
        } else {
            row = targets[y];
        }
        gameObject = row[x];

        // Test if this game object is focus-able
        var focusEnable = this.isTargetFocusEnable(gameObject);

        // Not focus-enable
        if (!focusEnable) {
            gameObject = null;  // Select game object at next index

            if (!backward) {
                x += 1;
                if (x >= row.length) {
                    x = 0;
                    // Next row
                    if (!is1DTargetsArray) {
                        y = Wrap(y + 1, 0, targets.length - 1);
                    }
                }

            } else {
                x -= 1;
                if (x < 0) {
                    x = row.length - 1;
                    // Previous row
                    if (!is1DTargetsArray) {
                        y = Wrap(y - 1, 0, targets.length - 1);
                    }
                }
            }

            // Back to startX, startY, fail
            if ((startX === x) && (startY === y)) {
                this.focusIndex.x = undefined;
                this.focusIndex.y = undefined;
                return null;
            }
        }

    }

    // Return game object
    this.focusIndex.x = x;
    this.focusIndex.y = y;
    return gameObject;
}

export default {
    isTargetFocusEnable(gameObject) {
        var focusEnable = true;
        if (this.getFocusEnableCallback) {
            focusEnable = this.getFocusEnableCallback(gameObject);
        }
        return focusEnable;
    },

    getFirst() {
        return GetNextameObject.call(this, {
            startX: 0,
            startY: 0,
            backward: false
        });
    },

    getLast() {
        return GetNextameObject.call(this, {
            startX: -1,
            startY: -1,
            backward: true,
        });
    },

    getNext() {
        if (this.focusIndex.x === undefined) {
            return this.getFirst();
        }

        return GetNextameObject.call(this, {
            startX: this.focusIndex.x + 1,
            startY: this.focusIndex.y,
            backward: false
        });
    },

    getPrevious() {
        if (this.focusIndex.x === undefined) {
            return this.getLast();
        }

        return GetNextameObject.call(this, {
            startX: this.focusIndex.x - 1,
            startY: this.focusIndex.y,
            backward: true,
        });
    },

    getNextRow() {
        if (this.focusIndex.x === undefined) {
            return this.getFirst();
        }

        return GetNextameObject.call(this, {
            startX: this.focusIndex.x,
            startY: this.focusIndex.y + 1,
            backward: false
        });
    },

    getPreviousRow() {
        if (this.focusIndex.x === undefined) {
            return this.getLast();
        }

        return GetNextameObject.call(this, {
            startX: this.focusIndex.x,
            startY: this.focusIndex.y - 1,
            backward: true,
        });
    },
}