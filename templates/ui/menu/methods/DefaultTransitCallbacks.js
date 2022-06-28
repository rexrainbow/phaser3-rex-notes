import GetEaseConfig from './GetEaseConfig.js';

export default {
    popUp: function (menu, duration) {
        menu.popUp(GetEaseConfig(menu.root.easeIn, menu))
    },

    scaleDownDestroy: function (menu, duration) {
        // Don't destroy here
        menu.scaleDown(GetEaseConfig(menu.root.easeOut, menu));
    }
}