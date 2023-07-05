import StyleManager from './StyleManager.js';

export default {
    addStyleManager(config) {
        this.styleManager = new StyleManager(this, config);
        return this;
    },

    setActiveState(enable) {
        this.styleManager.setActiveState(enable);
        return this;
    },

    setHoverState(enable) {
        this.styleManager.setHoverState(enable);
        return this;
    },

    setDisableState(enable) {
        this.styleManager.setDisableState(enable);
        return this;
    }
}