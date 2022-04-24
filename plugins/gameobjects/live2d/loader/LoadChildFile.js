import Live2dBaseFile from './Live2dFileBase.js';
import SetValue from '../../../utils/object/SetValue.js';

var LoadChildFile = function (parentFile, fileName, onLoad) {
    var loader = parentFile.loader;
    var file = new Live2dBaseFile(
        loader,
        `${parentFile.key}!${fileName}`,     // key
        `${parentFile.homeDir}${fileName}`,  // url
        parentFile.xhrSettings
    );
    file.cache = false;  // Don't save data to cache

    loader.addFile(file);

    if (typeof (onLoad) === 'string') {
        var dataKey = onLoad;
        onLoad = function (key, type, data) {
            SetValue(parentFile.data, dataKey, data);
            console.log(`Add dataKey ${dataKey}`)
        }
    }
    loader.once(`filecomplete-${file.type}-${file.key}`, onLoad);
}

export default LoadChildFile;