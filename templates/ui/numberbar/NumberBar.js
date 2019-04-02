import Sizer from '../sizer/Sizer.js';
import Slider from '../slider/Slider.js';
import DefaultMask from '../../../plugins/utils/mask/DefaultMask.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Percent = Phaser.Math.Percent;
const Linear = Phaser.Math.Linear;

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
        var paddingLeft = GetValue(config, 'space.left', 0);
        var paddingRight = GetValue(config, 'space.right', 0);
        var paddingTop = GetValue(config, 'space.top', 0);
        var paddingBottom = GetValue(config, 'space.bottom', 0);
        var iconSpace = GetValue(config, 'space.icon', 0);
        var sliderSpace = GetValue(config, 'space.slider', 0);

        if (background) {
            this.addBackground(background);
        }

        if (icon) {
            var padding;
            if (this.orientation === 0) {
                padding = {
                    left: paddingLeft,
                    right: (sliderConfig || text) ? iconSpace : paddingRight,
                    top: paddingTop,
                    bottom: paddingBottom
                }
            } else {
                padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: paddingTop,
                    bottom: (sliderConfig || text) ? iconSpace : paddingBottom
                }
            }

            this.add(icon, 0, 'center', padding);

            if (iconMask) {
                iconMask = new DefaultMask(icon, 1); // Circle mask
                icon.setMask(iconMask.createGeometryMask());
                this.add(iconMask, null);
            }
        }

        var slider;
        if (sliderConfig) {
            sliderConfig.orientation = (this.orientation == 0) ? 1 : 0;
            sliderConfig.eventEmitter = this;
            sliderConfig.value = null;
            if (!sliderConfig.hasOwnProperty('input')) {
                sliderConfig.input = -1;
            }
            slider = new Slider(scene, sliderConfig);

            var padding;
            if (this.orientation === 0) {
                padding = {
                    left: (icon) ? 0 : paddingLeft,
                    right: (text) ? sliderSpace : paddingRight,
                    top: paddingTop,
                    bottom: paddingBottom
                }
            } else {
                padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: (icon) ? 0 : paddingTop,
                    bottom: (text) ? sliderSpace : paddingBottom
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
            var padding;
            if (this.orientation === 0) {
                padding = {
                    left: (icon || sliderConfig) ? 0 : paddingLeft,
                    right: paddingRight,
                    top: paddingTop,
                    bottom: paddingBottom
                }
            } else {
                padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: (icon || sliderConfig) ? 0 : paddingTop,
                    bottom: paddingBottom
                }
            }
            this.add(text, 0, 'center', padding);
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('icon', icon);
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
            return this;
        }
        if (enable === undefined) {
            enable = true;
        }
        this.childrenMap.slider.enable = enable;
        return this;
    }

    get value() {
        if (this.childrenMap.slider) {
            return this.childrenMap.slider.value;
        }
        return 0;
    }

    set value(value) {
        if (!this.childrenMap.slider) {
            return;
        }
        this.childrenMap.slider.value = value;
    }

    setValue(value, min, max) {
        if (min !== undefined) {
            value = Percent(value, min, max);
        }
        this.value = value;
        return this;
    }

    addValue(inc, min, max) {
        if (min !== undefined) {
            inc = Percent(inc, min, max);
        }
        this.value += inc;
        return this;
    }

    getValue(min, max) {
        var value = this.value;
        if (min !== undefined) {
            value = Linear(min, max, value);
        }
        return value;
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
export default NumberBar;