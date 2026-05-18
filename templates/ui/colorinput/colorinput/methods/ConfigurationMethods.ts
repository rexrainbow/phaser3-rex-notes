var methods = {
    // Color picker
    setCreateColorPickerBackgroundCallback(callback?: any) {
        this.colorPickerCreateBackgroundCallback = callback;
        return this;
    },

    setColorPickerHPalettePosition(position?: any) {
        this.colorPickerHPalettePosition = position;
        return this;
    },

    setColorPickerExpandDirection(direction?: any) {
        if (typeof (direction) === 'string') {
            direction = ColorPickerExpandDirections[direction];
        }
        this.colorPickerExpandDirection = direction;
        return this;
    },

    setColorPickerEaseInDuration(duration?: any) {
        if (duration === undefined) {
            duration = 0;
        }
        this.colorPickerEaseInDuration = duration;
        return this;
    },

    setColorPickerEaseOutDuration(duration?: any) {
        if (duration === undefined) {
            duration = 0;
        }
        this.colorPickerEaseOutDuration = duration;
        return this;
    },

    setColorPickerTransitInCallback(callback?: any) {
        this.colorPickerTransitInCallback = callback;
        // callback = function(gameObject?: any, duration?: any) {}
        return this;
    },

    setColorPickerTransitOutCallback(callback?: any) {
        this.colorPickerTransitOutCallback = callback;
        // callback = function(gameObject?: any, duration?: any) {}
        return this;
    },

    setColorPickerBounds(bounds?: any) {
        this.colorPickerBounds = bounds;
        return this;
    },

    setColorPickerWidth(width?: any) {
        this.colorPickerWidth = width;
        return this;
    },

    setColorPickerHeight(height?: any) {
        this.colorPickerHeight = height;
        return this;
    },

    setColorPickerSize(width?: any, height?: any) {
        this.setColorPickerWidth(width).setColorPickerHeight(height);
        return this;
    },

    setColorPickerSpace(space?: any) {
        if (space === undefined) {
            space = {};
        }
        this.colorPickerSpace = space;
        return this;
    },

    // Color components
    setColorComponentsHeight(height?: any) {
        this.colorComponentsHeight = height;
        return this;
    },

    setColorComponentsFormatLabelConfig(config?: any) {
        this.colorComponentsFormatLabelConfig = config;
        return this;
    },

    setColorComponentsInputTextConfig(config?: any) {
        this.colorComponentsInputTextConfig = config;
        return this;
    },

    setColorComponentsSpace(space?: any) {
        if (space === undefined) {
            space = {};
        }
        this.colorComponentsSpace = space;
        return this;
    },
}

const ColorPickerExpandDirections = {
    down: 0,
    up: 1
}

export default methods;