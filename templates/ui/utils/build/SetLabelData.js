var SetLabelData = function(label, config) {
    if (config === undefined) {
        config = {};
    }

    var text = config.text || '';
    label.setText(text);

    var iconGameObjct = label.childrenMap.icon;
    iconGameObjct.setTexture(config.icon, config.iconFrame);

    if (config.iconSize) {
        iconGameObjct.setDisplaySize(config.iconSize, config.iconSize);
    }

    if (config.icon === undefined) {
        label.hide(iconGameObjct);
    } else {
        label.show(iconGameObjct);
    }

    var actionGameObjct = label.childrenMap.action;
    actionGameObjct.setTexture(config.action, config.actionFrame);

    if (config.iconSize) {
        actionGameObjct.setDisplaySize(config.actionSize, config.actionSize);
    }

    if (config.action === undefined) {
        label.hide(actionGameObjct);
    } else {
        label.show(actionGameObjct);
    }

}

export default SetLabelData;