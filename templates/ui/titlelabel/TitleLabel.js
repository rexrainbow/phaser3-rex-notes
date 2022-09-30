import Sizer from '../sizer/Sizer.js';
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
        // Space
        var iconSpace = GetValue(config, 'space.icon', 0);
        var textSpace = GetValue(config, 'space.text', 0);

        if (background) {
            this.addBackground(background);
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

        if (text || title || separator) {
            var textOrientation = GetValue(config, 'textOrientation', 1);
            var textSizer = new Sizer(scene, {
                orientation: textOrientation,
            })
            textOrientation = textSizer.orientation;

            var separatorSpace = GetValue(config, 'space.separator', 0);

            if (textOrientation === 1) {  // Title, text in vertical layout
                if (title) {
                    var titleAlign = GetValue(config, 'align.title', 'right');
                    textSizer.add(
                        title,
                        { align: titleAlign }
                    );
                }

                if (separator) {
                    var padding = {
                        top: (title) ? separatorSpace : 0,
                        bottom: (text) ? separatorSpace : 0
                    };
                    textSizer.add(
                        separator,
                        { expand: true, padding: padding }
                    );
                }


                if (text) {
                    var textAlign = GetValue(config, 'align.text', 'right');
                    textSizer.add(
                        text,
                        { align: textAlign }
                    );
                }


            } else {  // Title, text in horizontal layout
                if (title) {
                    var titleAlign = GetValue(config, 'align.title', 'left');
                    textSizer.add(
                        title,
                        { align: titleAlign }
                    );
                }

                if (separator) {
                    var padding = {
                        left: (title) ? separatorSpace : 0,
                        right: (text) ? separatorSpace : 0
                    };
                    textSizer.add(
                        separator,
                        { proportion: 1, padding: padding }
                    );
                }

                if (text) {
                    var textAlign = GetValue(config, 'align.text', 'right');

                    // Special case : title aligns to left, text aligns to right, wo separator
                    if (!separator && title && (titleAlign === 'left') && (textAlign === 'right')) {
                        textSizer.addSpace();
                    }

                    textSizer.add(
                        text,
                        { align: textAlign }
                    );
                }

            }

            var padding;
            if (action) {
                padding = { right: textSpace };
            }
            this.add(
                textSizer,
                { proportion: 1, padding: padding }
            );
        }

        if (action) {
            this.add(action);

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