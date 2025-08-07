const Properties = ['groupName', 'parallel', 'active', 'once'];

var GetTreeConfig = function (jsonData) {
    var config = {};
    for (var i = 0, cnt = Properties.length; i < cnt; i++) {
        var name = Properties[i];
        if (jsonData.hasOwnProperty(name)) {
            config[name] = jsonData[name];
        }
    }

    return config;
}

export default GetTreeConfig;