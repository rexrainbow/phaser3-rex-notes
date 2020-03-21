export default {
    showChild(key) {
        var child = this.sizerChildren[key];
        if (child) {
            this.emit('showchild', child, key, this);
            this.resetChildState(child);
        }
        return this;
    },

    hideChild(key) {
        var child = this.sizerChildren[key];
        if (child) {
            this.emit('hidechild', child, key, this);
            this.resetChildState(child);
        }
        return this;
    },

    swapChild(key) {
        if (this.currentChildKey === key) {
            // Do nothing
        } else if ((this.currentChildKey === 'panel') || (key === 'panel')) {
            this.previousChildKey = this.currentChildKey;
            this.currentChildKey = key;
            this.hideChild(this.previousChildKey);
            this.showChild(this.currentChildKey);
        } else { // Swap from current side to another side
            this.swapChild('panel');
            this.swapChild(key);
        }
        return this;
    },

    showPanel() {
        this.swapChild('panel');
        return this;
    },

    showLeftSide() {
        this.swapChild('leftSide');
        return this;
    },

    showRightSide() {
        this.swapChild('rightSide');
        return this;
    },

    showTopSide() {
        this.swapChild('topSide');
        return this;
    },

    showBottomSide() {
        this.swapChild('bottomSide');
        return this;
    },

    hideLeftSide() {
        if (this.currentChildKey == 'leftSide') {
            this.showPanel();
        }
        return this;
    },

    hideRightSide() {
        if (this.currentChildKey == 'rightSide') {
            this.showPanel();
        }
        return this;
    },

    hideTopSide() {
        if (this.currentChildKey == 'topSide') {
            this.showPanel();
        }
        return this;
    },

    hideBottomSide() {
        if (this.currentChildKey == 'bottomSide') {
            this.showPanel();
        }
        return this;
    },

    toggleLeftSide() {
        var key = (this.currentChildKey !== 'panel') ? 'panel' : 'leftSide';
        this.swapChild(key);
        return this;
    },

    toggleRightSide() {
        var key = (this.currentChildKey !== 'panel') ? 'panel' : 'rightSide';
        this.swapChild(key);
        return this;
    },

    toggleTopSide() {
        var key = (this.currentChildKey !== 'panel') ? 'panel' : 'topSide';
        this.swapChild(key);
        return this;
    },

    toggleBottomSide() {
        var key = (this.currentChildKey !== 'panel') ? 'panel' : 'bottomSide';
        this.swapChild(key);
        return this;
    }
};