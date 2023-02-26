import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import Awaitloader from './awaitloader.js';
import IsSceneObject from './utils/system/IsSceneObject';
import NOOP from './utils/object/NOOP.js';
import TextTranslation from './texttranslation.js';

class TextTranslationPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        this.i18next = i18next;
        TextTranslation.setI18Next(i18next);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    initI18Next(scene, config, onComplete) {
        if (IsSceneObject(scene)) {
            Awaitloader.call(scene.load, function (successCallback, failureCallback) {
                if (!onComplete) {
                    onComplete = successCallback;
                } else {
                    var onComplete_ = onComplete;
                    onComplete = function () {
                        onComplete_()
                        successCallback()
                    }
                }
                i18next.use(Backend).init(config, onComplete);
            })
        } else {
            onComplete = config || NOOP;
            config = scene;
            scene = undefined;
            i18next.use(Backend).init(config, onComplete);
        }
        return this;
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