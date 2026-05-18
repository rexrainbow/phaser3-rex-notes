export default {
    setTextOYByPercentage(percentage?: any) {
        this.setTextOY(-this.textVisibleHeight * percentage);
        return this;
    },

    getTextOYPercentage() {
        var textVisibleHeight = this.textVisibleHeight;
        if (textVisibleHeight === 0) {
            return 0;
        }
        return (this._textOY / -textVisibleHeight);
    },

    setTextOXByPercentage(percentage?: any) {
        this.setTextOX(-this.textVisibleWidth * percentage);
        return this;
    },

    getTextOXPercentage() {
        var textVisibleWidth = this.textVisibleWidth;
        if (textVisibleWidth === 0) {
            return 0;
        }
        return (this._textOX / -textVisibleWidth);
    }

}