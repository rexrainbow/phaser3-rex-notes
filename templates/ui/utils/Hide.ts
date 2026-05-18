import GetSizerConfig from './GetSizerConfig';
import { GetParent } from '../../../plugins/gameobjects/container/containerlite/GetParent';

var Show = function(gameObject?: any) {
    _hide(gameObject, false);
};

var Hide = function(gameObject?: any) {
    _hide(gameObject, true);
};

var IsShown = function(gameObject?: any) {
    if (!gameObject) {
        return false;
    }
    var config = GetSizerConfig(gameObject);
    return !config.hidden;
}

var _hide = function(gameObject?: any, hidden?: any) {
    if (!gameObject) {
        return;
    }
    var config = GetSizerConfig(gameObject);
    config.hidden = hidden;

    var parent = GetParent(gameObject);
    if (parent?: any) {
        parent.setChildVisible(gameObject, !hidden);
    } else {
        gameObject.setVisible(!hidden)
    }
};

export {
    Show,
    Hide,
    IsShown,
};