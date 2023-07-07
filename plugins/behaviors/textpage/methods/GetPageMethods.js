const Clamp = Phaser.Math.Clamp;

export default {
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

    resetPageIdx() {
        this.pageIndex = -1;
        return this;
    },

    setPageIndex(idx) {
        idx = Clamp(idx, 0, this.lastPageIndex);
        this.pageIndex = idx;
        this.startLineIndex = this.pageStartIndexes[idx];
        this.endLineIndex = this.pageStartIndexes[idx + 1];
        return this;
    },
}