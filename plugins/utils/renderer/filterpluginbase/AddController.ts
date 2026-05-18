import GetFilterList from './GetFilterList';

var AddController = function(gameObject?: any, ControllerClass?: any, config?: any, external?: any) {
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