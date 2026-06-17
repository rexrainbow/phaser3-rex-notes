const ExcludeProperties = ['title', 'condition', 'script', 'fallback'];

var GetTreeConfig = function (jsonData) {
    var config = {};
    for (var key in jsonData) {
        if (ExcludeProperties.includes(key)) {
            continue;
        }
        config[key] = jsonData[key];
    }

    return config;
}

export default GetTreeConfig;