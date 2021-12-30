// Include in Buttons/GridButtons/FixedWidthButtons class

export default {
    // For radio
    setSelectedButtonName(name) {
        this.buttonGroup.setSelectedButtonName(name);
        return this;
    },

    getSelectedButtonName() {
        return this.buttonGroup.getSelectedButtonName();
    },

    // For checkboxes
    setButtonState(name, state) {
        this.buttonGroup.setButtonState(name, state);
        return this;
    },

    getButtonState(name) {
        return this.buttonGroup.getButtonState(name);
    }
}