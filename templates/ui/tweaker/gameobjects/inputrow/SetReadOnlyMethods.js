export default {
    setReadOnly(value) {
        var inputField = this.childrenMap.inputField;
        if (inputField.setReadOnly) {
            inputField.setReadOnly(value);
        }
        return this;
    }
}