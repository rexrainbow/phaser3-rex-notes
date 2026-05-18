import AwaitFile from './AwaitFile';
import IsFunction from '../../utils/object/IsFunction';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

const LoaderCallback = function(key?: any, config?: any) {
    if (IsFunction(key)) {
        var callback = key;
        var scope = config;
        config = {
            config: {
                callback: callback,
                scope: scope,
            }
        };
    } else if (IsPlainObject(key)) {
        config = key;
        if (!config.hasOwnProperty('config')) {
            config = {
                config: config
            };
        }
    } else {
        config = {
            key: key,
            config: config
        };
    }
    this.addFile(new AwaitFile(this, config));

    return this;
}

export default LoaderCallback;