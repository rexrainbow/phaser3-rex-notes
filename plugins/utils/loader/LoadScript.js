var LoadScript = function (url, onload) {
    var scripts = document.getElementsByTagName("script");
    var exist = false;
    for (var i = 0, cnt = scripts.length; i < cnt; i++) {
        if (scripts[i].src.indexOf(url) != -1) {
            exist = true;
            break;
        }
    }
    if (!exist) {
        var newScriptTag = document.createElement("script");
        newScriptTag.type = "text/javascript";
        newScriptTag.src = url;

        if (onload) {
            newScriptTag.onload = onload;
        }

        document.getElementsByTagName("head")[0].appendChild(newScriptTag);
    }
};
export default LoadScript;