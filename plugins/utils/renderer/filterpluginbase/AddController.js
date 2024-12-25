import GetFilterList from './GetFilterList.js';

var AddController = function (gameObject, ControllerClass, config, external) {
    if (config === undefined) {
        config = {};
    }

    var filterList = GetFilterList(gameObject, external);

    var controller = filterList.add(
        new ControllerClass(filterList.camera, config)
    );

    if (config.name) {
        controller.name = config.name;
    }

    return controller;
}



export default AddController;