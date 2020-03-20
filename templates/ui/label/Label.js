import Sizer from '../sizer/Sizer.js';
import AddChildMask from '../utils/AddChildMask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Label extends Sizer {
    constructor(scene, config) {
        // Create sizer
        super(scene, config);
        this.type = 'rexLabel';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var icon = GetValue(config, 'icon', undefined);
        var iconMask = GetValue(config, 'iconMask', undefined);
        var text = GetValue(config, 'text', undefined);
        var action = GetValue(config, 'action', undefined);
        var actionMask = GetValue(config, 'actionMask', undefined);
        // Align
        var align = GetValue(config, 'align', undefined); // undefined/left/top: no space
        // Space
        var paddingLeft = GetValue(config, 'space.left', 0);
        var paddingRight = GetValue(config, 'space.right', 0);
        var paddingTop = GetValue(config, 'space.top', 0);
        var paddingBottom = GetValue(config, 'space.bottom', 0);
        var iconSpace = GetValue(config, 'space.icon', 0);
        var textSpace = GetValue(config, 'space.text', 0);

        if (background) {
            this.addBackground(background);
        }

        // Add space
        if (
            (align === 'right') ||
            (align === 'bottom') ||
            (align === 'center')
        ) {
            this.addSpace();
        }

        if (icon) {
            var padding;
            if (this.orientation === 0) {
                padding = {
                    left: paddingLeft,
                    right: (text || action) ? iconSpace : paddingRight,
                    top: paddingTop,
                    bottom: paddingBottom
                }
            } else {
                padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: paddingTop,
                    bottom: (text || action) ? iconSpace : paddingBottom
                }
            }

            this.add(icon, 0, 'center', padding);

            if (iconMask) {
                iconMask = this.addChildMask(icon, icon, 1); // Circle mask
            }
        }

        if (text) {
            var expandTextWidth = GetValue(config, 'expandTextWidth', false);
            var expandTextHeight = GetValue(config, 'expandTextHeight', false);
            var proportion, padding, expand;
            if (this.orientation === 0) {
                proportion = (expandTextWidth) ? 1 : 0;
                padding = {
                    left: (icon) ? 0 : paddingLeft,
                    right: (action) ? textSpace : paddingRight,
                    top: paddingTop,
                    bottom: paddingBottom
                };
                expand = expandTextHeight;
            } else {
                proportion = (expandTextHeight) ? 1 : 0;
                padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: (icon) ? 0 : paddingTop,
                    bottom: (action) ? textSpace : paddingBottom
                }
                expand = expandTextWidth;
            }
            this.add(text, proportion, 'center', padding, expand);
        }

        if (action) {
            var padding;
            if (this.orientation === 0) {
                padding = {
                    left: (icon || text) ? 0 : paddingLeft,
                    right: paddingRight,
                    top: paddingTop,
                    bottom: paddingBottom
                }
            } else {
                padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: (icon || text) ? 0 : paddingTop,
                    bottom: paddingBottom
                }
            }
            this.add(action, 0, 'center', padding);

            if (actionMask) {
                actionMask = this.addChildMask(action, action, 1); // Circle mask
            }
        }

        // Add space
        if (align === 'center') {
            this.addSpace();
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('icon', icon);
        this.addChildrenMap('iconMask', iconMask);
        this.addChildrenMap('text', text);
        this.addChildrenMap('action', action);
        this.addChildrenMap('actionMask', actionMask);
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

    appendText(value) {
        this.text += value;
    }

    layout(parent, newWidth, newHeight) {
        super.layout(parent, newWidth, newHeight);
        // Pin icon-mask to icon game object
        var iconMask = this.childrenMap.iconMask;
        if (iconMask) {
            iconMask.setPosition();
            this.resetChildPositionState(iconMask);
        }
        // Pin action-mask to action game object
        var actionMask = this.childrenMap.actionMask;
        if (actionMask) {
            actionMask.setPosition();
            this.resetChildPositionState(actionMask);
        }
        return this;
    }

    resize(width, height) {
        super.resize(width, height);
        // Resize icon-mask to icon game object
        var iconMask = this.childrenMap.iconMask;
        if (iconMask) {
            iconMask.resize();
        }
        // Resize action-mask to icon game object
        var actionMask = this.childrenMap.actionMask;
        if (actionMask) {
            actionMask.resize();
        }
        return this;
    }
}

var methods = {
    addChildMask: AddChildMask
}

Object.assign(
    Label.prototype,
    methods
);

export default Label;