const Clamp = Phaser.Math.Clamp;

export default {
    setChildOY(value, clamp) {
        if (clamp === undefined) {
            clamp = false;
        }
        if (clamp) {
            value = Clamp(value, this.bottomChildOY, this.topChildOY);
        }
        this.childOY = value;
        return this;
    },

    addChildOY(inc, clamp) {
        this.setChildOY(this.childOY + inc, clamp);
        return this;
    },

    setT(value, clamp) {
        if (clamp === undefined) {
            clamp = false;
        }
        if (clamp) {
            value = Clamp(value, 0, 1);
        }
        this.t = value;
        return this;
    },

    addT(inc, clamp) {
        this.setT(this.t + inc, clamp);
        return this;
    },

    scrollToTop() {
        this.t = 0;
        return this;
    },

    scrollToBottom() {
        this.t = 1;
        // t will be 0 if panel/table does not exceed visible area
        if (this.t === 0) {
            return this;
        }

        // Panel/Table height might be expanded while cells are visible        
        do {
            this.t = 1;
        } while (this.t !== 1)

        return this;
    },

    setChildOX(value, clamp) {
        if (clamp === undefined) {
            clamp = false;
        }
        if (clamp) {
            value = Clamp(value, this.leftChildOX, this.rightChildOX);
        }
        this.childOX = value;
        return this;
    },

    addChildOX(inc, clamp) {
        this.setChildOX(this.childOX + inc, clamp);
        return this;
    },

    setS(value, clamp) {
        if (clamp === undefined) {
            clamp = false;
        }
        if (clamp) {
            value = Clamp(value, 0, 1);
        }
        this.s = value;
        return this;
    },

    addS(inc, clamp) {
        this.setS(this.s + inc, clamp);
        return this;
    },

    scrollToLeft() {
        this.s = 0;
        return this;
    },

    scrollToRight() {
        this.s = 1;
        // s will be 0 if panel/table does not exceed visible area
        if (this.s === 0) {
            return this;
        }

        // Panel/Table height might be expanded while cells are visible        
        do {
            this.s = 1;
        } while (this.s !== 1)

        return this;
    },

}