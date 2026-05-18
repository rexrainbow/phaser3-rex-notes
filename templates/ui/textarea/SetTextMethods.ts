export default {
    setText(text?: any) {
        var textBlock = this.childrenMap.child;
        textBlock.setText(text);

        this.resizeController();
        return this;
    },

    appendText(text?: any) {
        this.setText(this.text + text);
        return this;
    }
}