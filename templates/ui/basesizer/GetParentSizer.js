import GetSizerConfig from '../utils/GetSizerConfig.js';

var GetParentSizer = function (gameObject) {
    if (gameObject === undefined) {
        gameObject = this;
    }
    return GetSizerConfig(gameObject).parent;
}

export default GetParentSizer;