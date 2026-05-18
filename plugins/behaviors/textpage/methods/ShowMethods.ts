import SetNoWrapText from '../../../utils/text/SetNoWrapText';

export default {
    showPage(idx?: any) {
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

    showPageByLineIndex(lineIndex?: any) {
        this.displayText(
            this.getPageByLineIndex(lineIndex)
        );
        return this;
    },

    showNextLine() {
        this.displayText(
            this.getPageOfNextLine()
        );
        return this;
    },

    showPreviousLine() {
        this.displayText(
            this.getPageOfPreviousLine()
        );
        return this;
    },

    showFirstLine() {
        this.displayText(
            this.getPageOfFirstLine()
        );
        return this;
    },

    showLastLine() {
        this.displayText(
            this.getPageOfLastLine()
        );
        return this;
    },

    displayText(text?: any) {
        SetNoWrapText(this.parent, text);
    }
}