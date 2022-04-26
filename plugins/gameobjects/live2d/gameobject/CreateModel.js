import LAppModel from './lappmodel/LAppModel.js';

var CreateModel = function (globalData) {
    var model = new LAppModel();
    model._frameBuffer = globalData.frameBuffer;
    model._viewport = globalData.viewport;

    return model;
}

export default CreateModel;