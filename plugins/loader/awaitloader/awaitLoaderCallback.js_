import AwaitFile from './awaitFile.js';
import IsFunction from '../../utils/object/IsFunction.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

const loaderCallback = function (key, config) {
    if (IsFunction(key)) {
        var callback = key;
        var scope = config;
        config = {
            type: 'await',
            url: '',
            key: (new Date()).getTime().toString(),
            config: {
                callback: callback,
                scope: scope,
            }
        };
    } else if (IsPlainObject(key)) {
        config = key;
        if (config.hasOwnProperty('config')) {
            config.type = 'await';
            config.url = '';
        } else {
            config = {
                key: (new Date()).getTime().toString(),
                type: 'await',
                url: '',
                config: config
            };
        }
    } else {
        config = {
            type: 'await',
            url: '',
            key: key,
            config: config
        };
    }
    this.addFile(new AwaitFile(this, config));

    return this;
}

export default loaderCallback;