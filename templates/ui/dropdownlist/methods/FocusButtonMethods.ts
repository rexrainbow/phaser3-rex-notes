export default {
    focusNextButton() {
        if (!this.isOpened) {
            return this;
        }

        var currentIndex = this.currentOverIndex;

        var nextIndex;
        if (currentIndex === undefined) {
            nextIndex = 0;
        } else {
            var total = this.listPanel.getButtons().length;
            nextIndex = (currentIndex + 1) % total;
        }

        this.emitButtonOver(nextIndex);

        return this;
    },

    focusPrevButton() {
        if (!this.isOpened) {
            return this;
        }

        var currentIndex = this.currentOverIndex;

        var nextIndex;
        if (currentIndex === undefined) {
            nextIndex = 0;
        } else {
            var total = this.listPanel.getButtons().length;
            nextIndex = (currentIndex - 1 + total) % total;
        }

        this.emitButtonOver(nextIndex);

        return this;
    }
}