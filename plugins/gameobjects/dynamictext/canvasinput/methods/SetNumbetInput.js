import NumberInputUpdateCallback from '../../../../behaviors/hiddentextedit/defaultcallbacks/NumberInputUpdateCallback.js';

var SetNumberInput = function () {
    this.textEdit.onUpdateCallback = NumberInputUpdateCallback;
    return this;
}

export default SetNumberInput;