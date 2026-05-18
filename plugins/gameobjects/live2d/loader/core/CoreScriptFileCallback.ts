import Live2dCoreScriptFile from './Live2dCoreScriptFile';

var CoreScriptFileCallback = function(url?: any) {
    this.addFile(new Live2dCoreScriptFile(this, url));
    return this;
}

export default CoreScriptFileCallback;