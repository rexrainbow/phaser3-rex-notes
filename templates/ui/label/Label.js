import Sizer from '../sizer/Sizer.js';
import AddChildMask from '../../../plugins/gameobjects/container/containerlite/mask/AddChildMask.js';
import SetDisplaySize from '../../../plugins/utils/size/SetDisplaySize.js';

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
                if (text || action) {
                    padding = { right: iconSpace };
                }
            } else {
                if (text || action) {
                    padding = { bottom: iconSpace };
                }
            }

            this.add(
                icon,
                { proportion: 0, padding: padding, }
            );

            if (iconMask) {
                iconMask = AddChildMask.call(this, icon, icon, 1); // Circle mask
            }
        }
        var iconSize = GetValue(config, 'iconSize');
        this.setIconSize(
            GetValue(config, 'iconWidth', iconSize),
            GetValue(config, 'iconHeight', iconSize)
        );

        if (text) {
            var expandTextWidth = GetValue(config, 'expandTextWidth', false);
            var expandTextHeight = GetValue(config, 'expandTextHeight', false);
            var proportion, padding, expand;
            if (this.orientation === 0) {
                proportion = (expandTextWidth) ? 1 : 0;
                if (action) {
                    padding = { right: textSpace };
                }
                expand = expandTextHeight;
            } else {
                proportion = (expandTextHeight) ? 1 : 0;
                if (action) {
                    padding = { bottom: textSpace };
                }
                expand = expandTextWidth;
            }

            this.add(
                text,
                { proportion: proportion, expand: expand, padding: padding, }
            );
        }

        if (action) {
            this.add(action);

            if (actionMask) {
                actionMask = AddChildMask.call(this, action, action, 1); // Circle mask
            }
        }
        var actionSize = GetValue(config, 'actionSize');
        this.setActionSize(
            GetValue(config, 'actionWidth', actionSize),
            GetValue(config, 'actionHeight', actionSize)
        );

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

    // Access text game object
    get text() {
        var textObject = this.childrenMap.text;
        if (textObject === undefined) {
            return '';
        }
        return textObject.text;
    }

    set text(value) {
        var textObject = this.childrenMap.text;
        if (textObject === undefined) {
            return;
        }
        textObject.setText(value);
    }

    setText(value) {
        this.text = value;
        return this;
    }

    appendText(value) {
        this.text += value;
        return this;
    }

    // Access icon game object
    setIconTexture(key, frame) {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return this;
        }
        imageObject.setTexture(key, frame);

        SetDisplaySize(imageObject, this.iconWidth, this.iconHeight);
        this.resetChildScaleState(imageObject);

        return this;
    }

    setTexture(key, frame) {
        this.setIconTexture(key, frame);
        return this;
    }

    setIconSize(width, height) {
        this.iconWidth = width;
        this.iconHeight = height;

        return this;
    }

    get texture() {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return undefined;
        }
        return imageObject.texture;
    }

    get frame() {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return undefined;
        }
        return imageObject.frame;
    }

    setActionTexture(key, frame) {
        var imageObject = this.childrenMap.action;
        if (imageObject === undefined) {
            return this;
        }
        imageObject.setTexture(key, frame);

        SetDisplaySize(imageObject, this.actionWidth, this.actionHeight);
        this.resetChildScaleState(imageObject);

        return this;
    }

    get actionTexture() {
        var imageObject = this.childrenMap.action;
        if (imageObject === undefined) {
            return undefined;
        }
        return imageObject.texture;
    }

    get actionFrame() {
        var imageObject = this.childrenMap.action;
        if (imageObject === undefined) {
            return undefined;
        }
        return imageObject.frame;
    }

    setActionSize(width, height) {
        this.actionWidth = width;
        this.actionHeight = height;

        return this;
    }

    preLayout() {
        super.preLayout();
        SetDisplaySize(this.childrenMap.icon, this.iconWidth, this.iconHeight);
        SetDisplaySize(this.childrenMap.action, this.actionWidth, this.actionHeight);
    }

    runLayout(parent, newWidth, newHeight) {
        if (this.ignoreLayout) {
            return this;
        }

        super.runLayout(parent, newWidth, newHeight);
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

    resetDisplayContent(config) {
        if (config === undefined) {
            config = {};
        }

        var text = config.text || '';
        this.setText(text);

        var iconGameObjct = this.childrenMap.icon;
        if (iconGameObjct) {
            if (config.icon === undefined) {
                this.hide(iconGameObjct);
            } else {
                this.show(iconGameObjct);
            }
            if (config.iconSize) {
                iconGameObjct.setDisplaySize(config.iconSize, config.iconSize);
            }
            this.setIconTexture(config.icon, config.iconFrame);
        }

        var actionGameObjct = this.childrenMap.action;
        if (actionGameObjct) {
            if (config.action === undefined) {
                this.hide(actionGameObjct);
            } else {
                this.show(actionGameObjct);
            }
            if (config.actionSize) {
                actionGameObjct.setDisplaySize(config.actionSize, config.actionSize);
            }
            this.setActionTexture(config.action, config.actionFrame);
        }

        return this;
    }
}

export default Label;