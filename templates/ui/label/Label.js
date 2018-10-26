import Sizer from '../sizer/Sizer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Label extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = defaultConfig;
        }
        // Create sizer
        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var minWidth = GetValue(config, 'width', 0);
        var minHeight = GetValue(config, 'height', 0);
        config.orientation = 0; // Left to right
        super(scene, x, y, minWidth, minHeight, config);
        scene.add.existing(this);

        // Add elements
        var backgroundObject = GetValue(config, 'background', undefined);
        var iconObject = GetValue(config, 'icon', undefined);
        var textObject = GetValue(config, 'text', undefined);
        var space = (iconObject && textObject) ? GetValue(config, 'space.icon', 0) : 0;
        var paddingLeft = (iconObject || textObject) ? GetValue(config, 'space.left', 0) : 0;
        var paddingRight = (iconObject || textObject) ? GetValue(config, 'space.right', 0) : 0;

        if (backgroundObject) {
            this.add(backgroundObject, -1);
        }

        if (iconObject) {
            var padding = {
                left: paddingLeft,
                right: (textObject)? space : paddingRight,
                top: 0,
                bottom: 0
            }
            this.add(iconObject, 0, undefined, padding);
        }

        if (textObject) {
            var padding = {
                left: (iconObject)? 0:paddingLeft,
                right: paddingRight,
                top: 0,
                bottom: 0
            }
            this.add(textObject, 0, 'left', padding);
        }

        this.childrenMap = {};
        this.childrenMap.background = backgroundObject;
        this.childrenMap.icon = iconObject;
        this.childrenMap.text = textObject;
    }

    get text() {
        var textObject = this.childrenMap.text;
        if (textObject === undefined) {
            return '';
        }
        var value;
        if (textObject.hasOwnProperty('text')) {
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

    appendText(value) {
        this.text += value;
        return this;
    }
}

const defaultConfig = {};

export default Label;