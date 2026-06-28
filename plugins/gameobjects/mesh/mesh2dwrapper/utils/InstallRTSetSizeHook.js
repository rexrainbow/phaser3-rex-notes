var InstallRTSetSizeHook = function (rt, callback) {
    var setSize = rt.setSize;

    rt.setSize = function (width, height, forceEven) {
        var result = setSize.call(this, width, height, forceEven);
        callback();
        return result;
    };
}

export default InstallRTSetSizeHook;
