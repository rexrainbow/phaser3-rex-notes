var methods = {
    setWrapEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }

        this.listWrapEnable = enable;
        return this;
    },

    setCreateButtonCallback(callback?: any) {
        this.listCreateButtonCallback = callback;
        return this;
    },

    setCreateListBackgroundCallback(callback?: any) {
        this.listCreateBackgroundCallback = callback;
        return this;
    },

    setCreateListSliderTrackCallback(callback?: any) {
        this.listCreateSliderTrackCallback = callback;
        return this;
    },

    setCreateListSliderThumbCallback(callback?: any) {
        this.listCreateSliderThumbCallback = callback;
        return this;
    },

    setListSliderAdaptThumbSizeEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.listSliderAdaptThumbSizeEnable = enable;
        return this;
    },

    setListScrollerConfig(config?: any) {
        if (config === undefined) {
            config = {};
        }
        this.listScrollerConfig = config;
        return this;
    },

    setListMouseWheelScrollerConfig(config?: any) {
        this.listMouseWheelScrollerConfig = config;
        return this;
    },

    setButtonClickCallback(callback?: any) {
        this.listOnButtonClick = callback;
        return this;
    },

    setButtonOverCallback(callback?: any) {
        this.listOnButtonOver = callback;
        return this;
    },

    setButtonOutCallback(callback?: any) {
        this.listOnButtonOut = callback;
        return this;
    },

    setListExpandDirection(direction?: any) {
        if (typeof (direction) === 'string') {
            direction = ListExpandDirections[direction];
        }
        this.listExpandDirection = direction;
        return this;
    },

    setListEaseInDuration(duration?: any) {
        if (duration === undefined) {
            duration = 0;
        }
        this.listEaseInDuration = duration;
        return this;
    },

    setListEaseOutDuration(duration?: any) {
        if (duration === undefined) {
            duration = 0;
        }
        this.listEaseOutDuration = duration;
        return this;
    },

    setListTransitInCallback(callback?: any) {
        this.listTransitInCallback = callback;
        // callback = function(gameObject?: any, duration?: any) {}
        return this;
    },

    settListTransitOutCallback(callback?: any) {
        this.listTransitOutCallback = callback;
        // callback = function(gameObject?: any, duration?: any) {}
        return this;
    },

    setListBounds(bounds?: any) {
        this.listBounds = bounds;
        return this;
    },

    setListWidth(width?: any) {
        this.listWidth = width;
        return this;
    },

    setListHeight(height?: any) {
        this.listHeight = height;
        return this;
    },

    setListSize(width?: any, height?: any) {
        this.setListWidth(width).setListHeight(height);
        return this;
    },

    setListMaxHeight(height?: any) {
        this.listMaxHeight = height;
        return this;
    },


    setListAlignmentMode(mode?: any) {
        this.listAlignMode = mode;
        return this;
    },

    setListAlignmentSide(side?: any) {
        if (side === undefined) {
            side = '';
        }

        this.listAlignSide = side;
        return this;
    },

    setListSpace(space?: any) {
        if (space === undefined) {
            space = {};
        }
        this.listSpace = space;
        return this;
    },

    setListDraggable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.listDraggable = enable;
        return this;
    },

}

const ListExpandDirections = {
    down: 0,
    up: 1
}

export default methods;