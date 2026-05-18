import GetFilterList from './GetFilterList';

var GetController = function(gameObject?: any, ControllerClass?: any, name?: any, external?: any) {
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