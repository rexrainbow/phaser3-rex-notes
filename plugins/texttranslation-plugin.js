import AwaitFile from './loader/awaitloader/AwaitFile.js';
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import TextTranslation from './texttranslation.js';

var CreateAwiatFile = function (loader, config) {
    var callback = function (successCallback, failureCallback) {
        i18next.use(Backend).init(config, successCallback);
    }

    return new AwaitFile(loader, {
        type: 'initi18next',
        config: {
            callback: callback
        }
    });
}

var LoaderCallback = function (config) {
    this.addFile(CreateAwiatFile(this, config));
    return this;
}

class TextTranslationPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexInitI18Next', LoaderCallback);
        this.i18next = i18next;
        TextTranslation.setI18Next(i18next);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    addToScene(scene) {
        scene.sys.load['rexInitI18Next'] = LoaderCallback;
    }

    changeLanguage(lng, onComplete) {
        i18next.changeLanguage(lng, onComplete);
        return this;
    }

    add(gameObject, config) {
        return new TextTranslation(gameObject, config);
    }

}

export default TextTranslationPlugin;