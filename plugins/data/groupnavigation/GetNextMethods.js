const Clamp = Phaser.Math.Clamp;
const Wrap = Phaser.Math.Wrap;

var GetNextameObject = function (config) {
    var {
        startX, startY, dec,
        x, y,
    } = config;

    // Correct startX, startY
    if (this.is1DTargetsArray) {
        startY = 0;
    } else {
        // Wrap 
        startY = Wrap(startY, 0, this.targets.length - 1);
    }

    var row;
    if (this.is1DTargetsArray) {
        row = this.targets;
    } else {
        row = this.targets[startY];
    }
    // Wrap 
    startX = Wrap(startX, 0, row.length - 1);

    // Correct x, y
    if (x === undefined) {
        x = startX;
        y = startY;
    }

    if (this.is1DTargetsArray) {
        y = 0;
        x = Clamp(x, 0, this.targets.length - 1);
    } else {
        y = Clamp(y, 0, this.targets.length - 1);
        x = Clamp(x, 0, this.targets[y].length - 1);
    }

    // Get game object from targets array
    var row;
    if (this.is1DTargetsArray) {
        row = this.targets;
    } else {
        row = this.targets[y];
    }
    var gameObject = row[x];

    // Test if this game object is focus-able
    var focusEnable = true;
    if (this.getFocusEnableCallback) {
        focusEnable = this.getFocusEnableCallback(gameObject);
    }

    // Not focus-enable
    if (!focusEnable) {
        if (!dec) {
            x += 1;
            if (x >= row.length) {
                x = 0;

                if (!this.is1DTargetsArray) {
                    y += 1;
                    if (y >= this.targets.length) {
                        y = 0;
                    }
                }
            }
        } else {
            x -= 1;
            if (x < 0) {
                x = row.length - 1;

                if (!this.is1DTargetsArray) {
                    y -= 1;
                    if (y < 0) {
                        y = this.targets.length - 1;
                    }
                }
            }
        }

        if ((startX === x) && (startY === y)) {
            this.focusIndex.x = undefined;
            this.focusIndex.y = undefined;
            return null;
        }

        config.x = x;
        config.y = y;
        return GetNextameObject.call(this, config);
    }

    // Return game object
    this.focusIndex.x = x;
    this.focusIndex.y = y;
    return gameObject;
}

export default {
    getFirst() {
        return GetNextameObject.call(this, {
            startX: 0,
            startY: 0,
            dec: false
        });
    },

    getLast() {
        return GetNextameObject.call(this, {
            startX: -1,
            startY: -1,
            dec: true,
        });
    },

    getNext() {
        if (this.focusIndex.x === undefined) {
            return this.getFirst();
        }

        return GetNextameObject.call(this, {
            startX: this.focusIndex.x + 1,
            startY: this.focusIndex.y,
            dec: false
        });
    },

    getPrevious() {
        if (this.focusIndex.x === undefined) {
            return this.getLast();
        }

        return GetNextameObject.call(this, {
            startX: this.focusIndex.x - 1,
            startY: this.focusIndex.y,
            dec: true,
        });
    },

    getNextRow() {
        if (this.focusIndex.x === undefined) {
            return this.getFirst();
        }

        return GetNextameObject.call(this, {
            startX: this.focusIndex.x,
            startY: this.focusIndex.y + 1,
            dec: false
        });
    },

    getPreviousRow() {
        if (this.focusIndex.x === undefined) {
            return this.getLast();
        }

        return GetNextameObject.call(this, {
            startX: this.focusIndex.x,
            startY: this.focusIndex.y - 1,
            dec: true,
        });
    },
}