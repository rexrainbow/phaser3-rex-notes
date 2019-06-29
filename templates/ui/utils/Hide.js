import GetSizerConfig from './GetSizerConfig.js';

var Show = function (gameObject) {
    _hide(gameObject, false);
};

var Hide = function (gameObject) {
    _hide(gameObject, true);
};

var IsShown = function(gameObject) {
    if (!gameObject) {
        return false;
    }
    var config = GetSizerConfig(gameObject);
    return !config.hidden;
}

var _hide = function (gameObject, hidden) {
    if (!gameObject) {
        return;
    }
    var config = GetSizerConfig(gameObject);
    config.hidden = hidden;
    gameObject.setVisible(!hidden);
};

export {
    Show,
    Hide,
    IsShown,
};