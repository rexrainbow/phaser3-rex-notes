import GetSizerConfig from './GetSizerConfig.js';

var Hide = function (gameObject, hidden) {
    if (hidden === undefined) {
        hidden = true;
    }
    var config = GetSizerConfig(gameObject);
    config.hidden = hidden;
    gameObject.setVisible(!hidden);
}
export default Hide;