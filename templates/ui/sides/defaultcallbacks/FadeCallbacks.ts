var GetShowCallback = function(duration?: any, alpha?: any) {
    if (alpha === undefined) {
        alpha = 1;
    }
    return function(child?: any, key?: any, sides?: any, reset?: any) {
        if (key !== 'panel') {
            sides.fadeChild(child, ((reset) ? 0 : duration), alpha);
        }
    }
}

var GetHideCallback = function(duration?: any, alpha?: any) {
    if (alpha === undefined) {
        alpha = 0;
    }
    return function(child?: any, key?: any, sides?: any, reset?: any) {
        if (key !== 'panel') {
            sides.fadeChild(child, ((reset) ? 0 : duration), alpha);
        }
    }
}

export default {
    show: GetShowCallback,
    hide: GetHideCallback
}