import Sizer from '../sizer/Sizer.js';
import BuildHorizontalTextSizer from './methods/BuildHorizontalTextSizer.js';
import BuildVerticalTextSizer from './methods/BuildVerticalTextSizer.js';
import AddChildMask from '../../../plugins/gameobjects/container/containerlite/mask/AddChildMask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TitleLabel extends Sizer {
    constructor(scene, config) {
        // Create sizer
        super(scene, config);
        this.type = 'rexTitleLabell';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var icon = GetValue(config, 'icon', undefined);
        var iconMask = GetValue(config, 'iconMask', undefined);
        var title = GetValue(config, 'title', undefined);
        var separator = GetValue(config, 'separator', undefined);
        var text = GetValue(config, 'text', undefined);
        var action = GetValue(config, 'action', undefined);
        var actionMask = GetValue(config, 'actionMask', undefined);

        if (background) {
            this.addBackground(background);
        }

        if (icon) {
            var padding;
            if (this.orientation === 0) {
                if (text || action) {
                    padding = {
                        right: GetValue(config, 'space.icon', 0),
                        top: GetValue(config, 'space.iconTop', 0),
                        bottom: GetValue(config, 'space.iconBottom', 0),
                    };
                }
            } else {
                if (text || action) {
                    padding = {
                        bottom: GetValue(config, 'space.icon', 0),
                        left: GetValue(config, 'space.iconLeft', 0),
                        right: GetValue(config, 'space.iconRight', 0),
                    };
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

        if (text || title || separator) {
            var textOrientation = GetValue(config, 'textOrientation', 1);
            var textSizer = new Sizer(scene, {
                orientation: textOrientation,
            })

            if (textSizer.orientation === 1) {  // Title, text in vertical layout
                BuildHorizontalTextSizer(textSizer, config);

            } else {  // Title, text in horizontal layout
                BuildVerticalTextSizer(textSizer, config);
            }

            var padding;
            if (action) {
                padding = {
                    right: GetValue(config, 'space.text', 0)
                };
            }
            this.add(
                textSizer,
                { proportion: 1, padding: padding }
            );
        }

        if (action) {
            var padding;
            if (this.orientation === 0) {
                padding = {
                    top: GetValue(config, 'space.actionTop', 0),
                    bottom: GetValue(config, 'space.actionBottom', 0),
                };
            } else {
                padding = {
                    left: GetValue(config, 'space.actionLeft', 0),
                    right: GetValue(config, 'space.actionRight', 0),
                };
            }

            this.add(
                action,
                { proportion: 0, padding: padding, }
            );

            if (actionMask) {
                actionMask = AddChildMask.call(this, action, action, 1); // Circle mask
            }
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('icon', icon);
        this.addChildrenMap('iconMask', iconMask);
        this.addChildrenMap('title', title);
        this.addChildrenMap('separator', separator);
        this.addChildrenMap('text', text);
        this.addChildrenMap('action', action);
        this.addChildrenMap('actionMask', actionMask);
    }

    // Access title game object
    get title() {
        var textObject = this.childrenMap.title;
        if (textObject === undefined) {
            return '';
        }
        return textObject.title;
    }

    set title(value) {
        var textObject = this.childrenMap.title;
        if (textObject === undefined) {
            return;
        }
        textObject.setText(value);
    }

    setTitle(value) {
        this.title = value;
        return this;
    }

    appendTitle(value) {
        this.title += value;
        return this;
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
    setTexture(key, frame) {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return;
        }
        imageObject.setTexture(key, frame);
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
}

export default TitleLabel;