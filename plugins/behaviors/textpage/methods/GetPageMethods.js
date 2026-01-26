const Clamp = Phaser.Math.Clamp;

export default {

    resetIndex() {
        this.pageIndex = -1;
        this.startLineIndex = -1;
        this.endLineIndex = undefined;
        return this;
    },

    setPageIndex(idx) {
        idx = Clamp(idx, 0, this.lastPageIndex);
        this.pageIndex = idx;
        this.startLineIndex = this.pageStartIndexes[idx];
        this.endLineIndex = this.pageStartIndexes[idx + 1];
        return this;
    },

    getPage(idx) {
        if (idx === undefined) {
            idx = this.pageIndex;
        }

        return this.setPageIndex(idx).getLines(this.startLineIndex, this.endLineIndex);
    },

    getNextPage() {
        return this.getPage(this.pageIndex + 1);
    },

    getPreviousPage() {
        return this.getPage(this.pageIndex - 1);
    },

    getFirstPage() {
        return this.getPage(0);
    },

    getLastPage() {
        return this.getPage(this.lastPageIndex);
    },

    setStartLineIndex(idx) {
        if (this.isVariableLineHeightMode) {
            var padding = this.parent.padding;
            var pageHeight = this.parent.height - padding.top - padding.bottom;
            if (pageHeight <= 0) {
                this.startLineIndex = 0;
                this.endLineIndex = this.totalLinesCount;
                return this;
            }
            var lastStartLineIndex = this.getLastStartLineIndexByHeight(pageHeight);
            idx = Clamp(idx, 0, lastStartLineIndex);
            this.startLineIndex = idx;
            var endLineIndex = this.getLineIndexByHeight(this.startLineIndex, pageHeight);
            if (endLineIndex <= idx) {
                endLineIndex = idx + 1;
            }
            this.endLineIndex = endLineIndex;

        } else {
            var lastStartLineIndex = Math.max(this.totalLinesCount - this.pageLinesCount, 0);
            idx = Clamp(idx, 0, lastStartLineIndex);

            this.startLineIndex = idx;
            this.endLineIndex = idx + this.pageLinesCount;
        }

        return this;
    },

    getPageByLineIndex(idx) {
        return this.setStartLineIndex(idx).getLines(this.startLineIndex, this.endLineIndex);
    },

    getPageOfNextLine() {
        return this.getPageByLineIndex(this.startLineIndex + 1);
    },

    getPageOfPreviousLine() {
        return this.getPageByLineIndex(this.startLineIndex - 1);
    },

    getPageOfFirstLine() {
        return this.getPageByLineIndex(0);
    },

    getPageOfLastLine() {
        return this.getPageByLineIndex(this.totalLinesCount);
    },

}
