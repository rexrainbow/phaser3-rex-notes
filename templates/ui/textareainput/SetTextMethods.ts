export default {
    setText(text?: any) {
        var inputText = this.childrenMap.child;
        inputText.setText(text);
        return this;
    },

    appendText(text?: any) {
        this.setText(this.text + text);
        return this;
    }
}