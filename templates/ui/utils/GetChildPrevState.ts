import GetSizerConfig from './GetSizerConfig';

var GetChildPrevState = function(child?: any) {
    var childConfig = GetSizerConfig(child);
    if (!childConfig.hasOwnProperty('prevState')) {
        childConfig.prevState = {};
    }
    return childConfig.prevState;
}

export default GetChildPrevState;