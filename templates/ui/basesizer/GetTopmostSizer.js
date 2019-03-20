import GetSizerConfig from '../utils/GetSizerConfig.js';

var GetTopmostSizer = function (gameObject) {
    if (gameObject === undefined) {
        gameObject = this;
    }
    var parent = GetSizerConfig(gameObject).parent;
    while (parent) {
        gameObject = parent;
        parent = GetSizerConfig(gameObject).parent;
    }
    return gameObject;
}

export default GetTopmostSizer;