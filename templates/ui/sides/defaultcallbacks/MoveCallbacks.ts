var GetCallback = function(duration?: any, ease?: any) {
    return function(child?: any, key?: any, sides?: any, reset?: any) {
        if (key !== 'panel') {
            sides.moveChild(child, ((reset) ? 0 : duration), ease);
        }
    }
}

export default {
    show: GetCallback,
    hide: GetCallback
}