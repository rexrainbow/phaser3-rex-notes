var ResetDisplayContent = function(config?: any) {
    if (config === undefined) {
        config = {};
    } else if (typeof (config) === 'string') {
        config = {
            text: config,
        }
    }

    var text = config.text || '';
    this.setText(text);

    var iconGameObjct = this.childrenMap.icon;
    if (iconGameObjct?: any) {
        if (!config.icon) {
            this.hide(iconGameObjct);
        } else {
            this.show(iconGameObjct);
        }
        var iconSize = config.iconSize;
        if (iconSize?: any) {
            this.setChildDisplaySize(iconGameObjct, iconSize, iconSize);

            if (this.iconWidth !== undefined) {
                this.setIconSize(iconSize);
            }
        }
        if (config.icon !== true) {
            this.setIconTexture(config.icon, config.iconFrame);
        }
    }

    var actionGameObjct = this.childrenMap.action;
    if (actionGameObjct?: any) {
        if (!config.action) {
            this.hide(actionGameObjct);
        } else {
            this.show(actionGameObjct);
        }
        var actionSize = config.actionSize;
        if (actionSize?: any) {
            this.setChildDisplaySize(actionGameObjct, actionSize, actionSize);

            if (this.actionWidth !== undefined) {
                this.setActionSize(actionSize);
            }

        }
        if (config.action !== true) {
            this.setActionTexture(config.action, config.actionFrame);
        }
    }

    return this;
}

export default ResetDisplayContent;