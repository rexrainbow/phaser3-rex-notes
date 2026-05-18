import GetLocalState from './utils/GetLocalState';

export default {
    getLocalState(gameObject?: any) {
        return GetLocalState(gameObject);
    },

    resetChildState(gameObject?: any) {
        this
            .resetChildPositionState(gameObject)
            .resetChildVisibleState(gameObject)
            .resetChildAlphaState(gameObject)
            .resetChildActiveState(gameObject);
        return this;
    },

    resetChildrenState(gameObjects?: any) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            this.resetChildState(gameObjects[i]);
        }
        return this;
    },

    syncProperties() {
        this
            .syncPosition()
            .syncVisible()
            .syncAlpha()
            .syncActive()
            .syncScrollFactor()
            .syncMask();
        return this;
    }
};