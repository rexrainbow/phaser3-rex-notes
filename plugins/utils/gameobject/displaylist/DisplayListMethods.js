const ArrayUtils = Phaser.Utils.Array;

export default {
    bringMeToTop() {
        var list;
        if (this.parentContainer) {
            list = this.parentContainer.list;
        } else if (this.displayList) {
            list = this.displayList.list;
        }
        if (!list) {
            return this;
        }

        ArrayUtils.BringToTop(list, this);

        return this;
    },

    sendMeToBack() {
        var list;
        if (this.parentContainer) {
            list = this.parentContainer.list;
        } else if (this.displayList) {
            list = this.displayList.list;
        }
        if (!list) {
            return this;
        }

        ArrayUtils.SendToBack(list, this);

        return this;
    },

    moveMyDepthBelow(gameObject) {
        var list;
        if (this.parentContainer) {
            list = this.parentContainer.list;
        } else if (this.displayList) {
            list = this.displayList.list;
        }
        if (!list) {
            return this;
        }

        ArrayUtils.MoveBelow(list, this, gameObject);

        return this;
    },

    moveMyDepthAbove(gameObject) {
        var list;
        if (this.parentContainer) {
            list = this.parentContainer.list;
        } else if (this.displayList) {
            list = this.displayList.list;
        }
        if (!list) {
            return this;
        }

        ArrayUtils.MoveAbove(list, this, gameObject);

        return this;
    },
}