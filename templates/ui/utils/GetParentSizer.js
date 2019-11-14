import GetSizerConfig from './GetSizerConfig.js';

var GetParentSizer = function (gameObject) {
    return GetSizerConfig(gameObject).parent;
}

export default GetParentSizer;