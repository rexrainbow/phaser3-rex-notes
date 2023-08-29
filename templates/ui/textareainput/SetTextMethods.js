export default {
    setText(text) {
        var inputText = this.childrenMap.child;
        inputText.setText(text);
        return this;
    },

    appendText(text) {
        this.setText(this.text + text);
        return this;
    }
}