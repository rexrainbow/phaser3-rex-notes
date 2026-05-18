export default {
    setReadOnly(value?: any) {
        var inputField = this.childrenMap.inputField;
        if (inputField.setReadOnly) {
            inputField.setReadOnly(value);
        }
        return this;
    }
}