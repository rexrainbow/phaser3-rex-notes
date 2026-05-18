import GetEaseConfig from './GetEaseConfig';

var PopUp = function(menu?: any, duration?: any) {
    menu.popUp(GetEaseConfig(menu.root.easeIn, menu))
}

var ScaleDown = function(menu?: any, duration?: any) {
    // Don't destroy here
    menu.scaleDown(GetEaseConfig(menu.root.easeOut, menu));
}

export default {
    setTransitInCallback(callback?: any) {
        if (callback === undefined) {
            callback = PopUp;
        }

        this.transitInCallback = callback;
        // callback = function(gameObject?: any, duration?: any) {}
        return this;
    },

    setTransitOutCallback(callback?: any) {
        if (callback === undefined) {
            callback = ScaleDown;
        }

        this.transitOutCallback = callback;
        // callback = function(gameObject?: any, duration?: any) {}
        return this;
    }
}