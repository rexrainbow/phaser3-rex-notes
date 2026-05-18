import StyleManager from './StyleManager';

export default {
    addStyleManager(config?: any) {
        this.styleManager = new StyleManager(this, config);
        return this;
    },

    setActiveState(enable?: any) {
        this.styleManager.setActiveState(enable);
        return this;
    },

    setHoverState(enable?: any) {
        this.styleManager.setHoverState(enable);
        return this;
    },

    setDisableState(enable?: any) {
        this.styleManager.setDisableState(enable);
        return this;
    }
}