import SetNoWrapText from '../../../utils/text/SetNoWrapText.js';

export default {
    showPage(idx) {
        this.displayText(
            this.getPage(idx)
        );
        return this;
    },

    showNextPage() {
        this.displayText(
            this.getNextPage()
        );
        return this;
    },

    showPreviousPage() {
        this.displayText(
            this.getPreviousPage()
        );
        return this;
    },

    showFirstPage() {
        this.displayText(
            this.getFirstPage()
        );
        return this;
    },

    showLastPage() {
        this.displayText(
            this.getLastPage()
        );
        return this;
    },

    show() {
        this.displayText(
            this.getLines()
        );
        return this;
    },

    showPageByLineIndex(lineIndex) {
        this.displayText(
            this.getPageByLineIndex(lineIndex)
        );
        return this;
    },

    showNextLine() {
        this.displayText(
            this.getPageByLineIndex(this.startLineIndex + 1)
        );
        return this;
    },

    showPreviousLine() {
        this.displayText(
            this.getPageByLineIndex(this.startLineIndex - 1)
        );
        return this;
    },

    displayText(text) {
        SetNoWrapText(this.parent, text);
    }
}