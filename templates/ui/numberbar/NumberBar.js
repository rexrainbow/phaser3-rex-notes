import Sizer from '../sizer/Sizer.js';
import AddChildMask from '../utils/AddChildMask.js';
import Slider from '../slider/Slider.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class NumberBar extends Sizer {
    constructor(scene, config) {
        // Create sizer
        super(scene, config);
        this.type = 'rexNumberBar';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var icon = GetValue(config, 'icon', undefined);
        var iconMask = GetValue(config, 'iconMask', undefined);
        var sliderConfig = GetValue(config, 'slider', undefined);
        var text = GetValue(config, 'text', undefined);

        // Space
        var iconSpace = GetValue(config, 'space.icon', 0);
        var sliderSpace = GetValue(config, 'space.slider', 0);

        if (background) {
            this.addBackground(background);
        }

        if (icon) {
            var padding;
            if (this.orientation === 0) {
                if (sliderConfig || text) {
                    padding = { right: iconSpace };
                }
            } else {
                if (sliderConfig || text) {
                    padding = { bottom: iconSpace };
                }
            }

            this.add(icon, 0, 'center', padding);

            if (iconMask) {
                iconMask = this.addChildMask(icon, icon, 1); // Circle mask
            }
        }

        var slider;
        if (sliderConfig) {
            sliderConfig.orientation = this.orientation;
            sliderConfig.eventEmitter = this;
            sliderConfig.value = null;
            if (!sliderConfig.hasOwnProperty('input')) {
                sliderConfig.input = -1;
            }
            slider = new Slider(scene, sliderConfig);

            var padding;
            if (this.orientation === 0) {
                if (text) {
                    padding = { right: sliderSpace };
                }
            } else {
                if (text) {
                    padding = { bottom: sliderSpace };
                }
            }

            var proportion;
            if (this.orientation === 0) {
                var sliderWidth = GetValue(sliderConfig, 'width', undefined);
                proportion = (sliderWidth === undefined) ? 1 : 0;
            } else {
                var sliderHeight = GetValue(sliderConfig, 'height', undefined);
                proportion = (sliderHeight === undefined) ? 1 : 0;
            }
            this.add(slider, proportion, 'center', padding);
        }


        if (text) {
            this.add(text);
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('icon', icon);
        this.addChildrenMap('iconMask', iconMask);
        this.addChildrenMap('slider', slider);
        this.addChildrenMap('text', text);

        var callback = GetValue(config, 'valuechangeCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
            this.on('valuechange', callback, scope);
        }
        this.setEnable(GetValue(config, 'enable', undefined));
        this.setValue(GetValue(config, 'value', 0));
    }

    setEnable(enable) {
        if (this.childrenMap.slider) {
            this.childrenMap.slider.setEnable(enable);
        }
        return this;
    }

    get value() {
        if (this.childrenMap.slider) {
            return this.childrenMap.slider.value;
        } else {
            return 0;
        }
    }

    set value(value) {
        if (!this.childrenMap.slider) {
            return;
        }
        this.childrenMap.slider.value = value;
    }

    setValue(value, min, max) {
        if (this.childrenMap.slider) {
            this.childrenMap.slider.setValue(value, min, max);
        }
        return this;
    }

    addValue(inc, min, max) {
        if (this.childrenMap.slider) {
            this.childrenMap.slider.addValue(inc, min, max);
        }
        return this;
    }

    getValue(min, max) {
        if (this.childrenMap.slider) {
            return this.childrenMap.slider.getValue(min, max);
        } else {
            return 0;
        }
    }

    easeValueTo(value, min, max) {
        if (this.childrenMap.slider) {
            this.childrenMap.slider.easeValueTo(value, min, max);
        }
        return this;
    }

    get text() {
        var textObject = this.childrenMap.text;
        if (textObject === undefined) {
            return '';
        }
        var value;
        if (textObject.text) {
            value = textObject.text;
        } else {
            value = textObject.getData('text');
        }
        return value;
    }

    set text(value) {
        var textObject = this.childrenMap.text;
        if (textObject === undefined) {
            return;
        }
        if (textObject.setText) {
            textObject.setText(value);
        } else {
            textObject.setData('text', value);
        }
    }

    setText(value) {
        this.text = value;
        return this;
    }
}

var methods = {
    addChildMask: AddChildMask
}

Object.assign(
    NumberBar.prototype,
    methods
);

export default NumberBar;