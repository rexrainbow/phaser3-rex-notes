var GetLayoutSetting = function (setting, out) {
    if (out === undefined) {
        out = {};
    }
    var map = setting._json
        .getRoot()
        .getValueByString('Layout')
        .getMap();

    if (map == null) {
        return out;
    }

    for (
        var ite = map.begin();
        ite.notEqual(map.end());
        ite.preIncrement()
    ) {
        var ptr = ite.ptr();
        out[ptr.first] = ptr.second.toFloat();
    }

    return out;
}

export default GetLayoutSetting;