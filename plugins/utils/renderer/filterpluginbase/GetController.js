import GetFilterList from './GetFilterList.js';

var GetController = function (gameObject, ControllerClass, name, external) {
    var list = GetFilterList(gameObject, external).list;
    if (name === undefined) {
        var result = [];
        for (var i = 0, cnt = list.length; i < cnt; i++) {
            var controller = list[i];
            if (controller instanceof ControllerClass) {
                result.push(controller)
            }
        }
        return result;
    } else {
        for (var i = 0, cnt = list.length; i < cnt; i++) {
            var controller = list[i];
            if ((controller instanceof ControllerClass) && (controller.name === name)) {
                return controller;
            }
        }
    }
}

export default GetController;