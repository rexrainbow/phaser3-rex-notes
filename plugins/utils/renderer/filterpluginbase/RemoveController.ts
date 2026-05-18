import GetFilterList from './GetFilterList';

import { Utils as PhaserUtils } from 'phaser';
const SpliceOne = PhaserUtils.Array.SpliceOne;

var RemoveController = function(gameObject?: any, ControllerClass?: any, name?: any, external?: any) {
    var list = GetFilterList(gameObject, external).list;
    if (name === undefined) {
        for (var i = (list.length - 1); i >= 0; i--) {
            var controller = list[i];
            if (controller instanceof ControllerClass) {
                controller.destroy();
                SpliceOne(controller, i);
            }
        }
    } else {
        for (var i = 0, cnt = list.length; i < cnt; i++) {
            var controller = list[i];
            if ((controller instanceof ControllerClass) && (controller.name === name)) {
                controller.destroy();
                SpliceOne(controller, i);
            }
        }
    }

}

export default RemoveController;