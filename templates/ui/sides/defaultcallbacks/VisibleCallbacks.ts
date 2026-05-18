var GetShowCallback = function() {
    return function(child?: any, key?: any, sides?: any, reset?: any) {
        if (key !== 'panel') {
            sides.setChildVisible(child, true);
        }
    }
}

var GetHideCallback = function() {
    return function(child?: any, key?: any, sides?: any, reset?: any) {
        if (key !== 'panel') {
            sides.setChildVisible(child, false);
        }
    }
}

export default {
    show: GetShowCallback,
    hide: GetHideCallback
}