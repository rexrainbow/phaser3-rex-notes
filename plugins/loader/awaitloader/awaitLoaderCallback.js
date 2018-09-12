import AwaitFile from './awaitFile.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

const loaderCallback = function (key, config) {
    if (IsPlainObject(key)) {
        config = key;
        if (config.hasOwnProperty('config')) {
            config.type = 'await';
            config.url = '';
        } else {
            config = {
                key: 'await',
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