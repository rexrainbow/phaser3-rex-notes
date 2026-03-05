// Do we need sync title width width other input rows?
// ArrayTable element does not propagate title width
export default {
    getMaxInputRowTitleWidth() {
        return 0;
    },

    setInputRowTitleWidth(width) {
        return this;
    }
}
