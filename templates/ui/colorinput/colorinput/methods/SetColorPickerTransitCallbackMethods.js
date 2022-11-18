var PopUp = function (colorPickerPanel, duration) {
    colorPickerPanel.popUp(duration, 1)
}

var ScaleDown = function (colorPickerPanel, duration) {
    // Don't destroy here
    colorPickerPanel.scaleDown(duration, 1);
}

export default {
    setColorPickerTransitInCallback(callback) {
        if (callback === undefined) {
            callback = PopUp;
        }

        this.colorPickerPanelTransitInCallback = callback;
        // callback = function(gameObject, duration) {}
        return this;
    },

    setColorPickerTransitOutCallback(callback) {
        if (callback === undefined) {
            callback = ScaleDown;
        }

        this.colorPickerPanelTransitOutCallback = callback;
        // callback = function(gameObject, duration) {}
        return this;
    }
}