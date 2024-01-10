export default {
    focusNextButton() {
        if (!this.isOpened) {
            return this;
        }

        var currentIndex = this.currentOverIndex;
        var total = this.listPanel.getButtons().length;

        var nextIndex;
        if (currentIndex === undefined) {
            nextIndex = 0;
        } else {
            nextIndex = (currentIndex + 1) % total;
        }

        this.emitButtonOver(index);

        return this;
    },

    focusPrevButton() {
        if (!this.isOpened) {
            return this;
        }

        var currentIndex = this.currentOverIndex;
        var total = this.listPanel.getButtons().length;

        var nextIndex;
        if (currentIndex === undefined) {
            nextIndex = 0;
        } else {
            nextIndex = (currentIndex - 1 + total) % total;
        }

        this.emitButtonOver(index);

        return this;
    }
}