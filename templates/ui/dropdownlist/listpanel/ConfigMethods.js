var methods = {
    setWrapEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.listWrapEnable = enable;
        return this;
    },

    setCreateButtonCallback(callback) {
        this.createButtonCallback = callback;
        return this;
    },

    setButtonClickCallback(callback) {
        this.onButtonClick = callback;
        return this;
    },

    setCreateBackgroundCallback(callback) {
        this.createBackgroundCallback = callback;
        return this;
    },

    setButtonOverCallback(callback) {
        this.onButtonOver = callback;
        return this;
    },

    setButtonOutCallback(callback) {
        this.onButtonOut = callback;
        return this;
    },

    setListWidth(width) {
        this.listWidth = width;
        return this;
    },

    setListHeight(height) {
        this.listHeight = height;
        return this;
    },

    setListSize(width, height) {
        this.setListWidth(width).setListHeight(height);
        return this;
    },

    setListAlignmentMode(mode) {
        this.listAlignMode = mode;
        return this;
    },

    setListBounds(bounds) {
        this.listBounds = bounds;
        return this;
    },

    setListEaseInDuration(duration) {
        if (duration === undefined) {
            duration = 0;
        }
        this.listEaseInDuration = duration;
        return this;
    },

    setListEaseOutDuration(duration) {
        if (duration === undefined) {
            duration = 0;
        }
        this.listEaseOutDuration = duration;
        return this;
    },

}

export default methods;