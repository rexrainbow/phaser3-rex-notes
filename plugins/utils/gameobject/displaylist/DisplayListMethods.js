export default {
    bringToTop() {
        var displayList = this.displayList;
        if (!displayList) {
            return this;
        }

        displayList.bringToTop(this);
        return this;
    },

    bringMeToTop() {
        return this.bringToTop();
    },

    sendToBack() {
        var displayList = this.displayList;
        if (!displayList) {
            return this;
        }

        displayList.sendToBack(this);
        return this;
    },

    sendMeToBack() {
        return this.sendToBack();
    },

    moveDepthBelow(gameObject) {
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

    moveMyDepthBelow(gameObject) {
        return this.moveDepthBelow(gameObject);
    },

    moveDepthAbove(gameObject) {
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

    moveMyDepthAbove(gameObject) {
        return this;
    }
}