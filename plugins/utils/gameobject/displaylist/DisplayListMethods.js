export default {
    bringMeToTop() {
        var displayList = this.displayList;
        if (!displayList) {
            return this;
        }

        displayList.bringToTop(this);
        return this;
    },

    sendMeToBack() {
        var displayList = this.displayList;
        if (!displayList) {
            return this;
        }

        displayList.sendToBack(this);
        return this;
    },

    moveMyDepthBelow(gameObject) {
        var displayList = this.displayList;
        if (!displayList) {
            return this;
        }
        if (gameObject.displayList !== displayList) {
            // Do nothing if not at the same display list
            return this;
        }

        displayList.moveBelow(gameObject, this);
        return this;
    },

    moveMyDepthAbove(gameObject) {
        var displayList = this.displayList;
        if (!displayList) {
            return this;
        }
        if (gameObject.displayList !== displayList) {
            // Do nothing if not at the same display list
            return this;
        }

        displayList.moveAbove(gameObject, this);
        return this;
    },
}