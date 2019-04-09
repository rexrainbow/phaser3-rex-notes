export default {
    setChildOY: function (value) {
        this.childOY = value;
        return this;
    },

    setT: function (value) {
        this.t = value;
        return this;
    },

    updateController: function () {
        var scroller = this.childrenMap.scroller;
        var slider = this.childrenMap.slider;
        if (scroller) {
            scroller.setValue(this.childOY);
        }
        if (slider) {
            slider.setValue(this.t);
        }
    },

    scrollToTop: function () {
        this.t = 0;
        return this;
    },

    scrollToBottom: function () {
        this.t = 1;
        return this;
    },

    enableScrolling: function (enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        var scroller = this.childrenMap.scroller;
        var slider = this.childrenMap.slider;
        if (scroller) {
            scroller.setEnable(enabled);
        }
        if (slider) {
            slider.setEnable(enabled);
        }
        return this;
    },
};