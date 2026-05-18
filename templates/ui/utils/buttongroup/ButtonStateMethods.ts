// Include in Buttons/GridButtons/FixedWidthButtons class

export default {
    // Common
    clearAllButtonsState() {
        this.buttonGroup.clearAllButtonsState();
        return this;
    },

    getAllButtonsState() {
        return this.buttonGroup.getAllButtonsState();
    },

    // For radio
    setSelectedButtonName(name?: any) {
        this.buttonGroup.setSelectedButtonName(name);
        return this;
    },

    getSelectedButtonName() {
        return this.buttonGroup.getSelectedButtonName();
    },

    // For checkboxes
    setButtonState(name?: any, state?: any) {
        this.buttonGroup.setButtonState(name, state);
        return this;
    },

    getButtonState(name?: any) {
        return this.buttonGroup.getButtonState(name);
    }
}