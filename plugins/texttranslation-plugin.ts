import EventEmitterMethods from './utils/eventemitter/EventEmitterMethods';
import Awaitloader from './awaitloader';
import i18next from 'i18next';
import Backend from 'i18next-http-backend/cjs';
import TextTranslation from './texttranslation';

import { Plugins as PhaserPlugins } from 'phaser';
class TextTranslationPlugin extends PhaserPlugins.BasePlugin {
    destroyEventEmitter: any;
    emit: any;
    game: any;
    i18next: any;
    onLanguageChanged: any;
    setEventEmitter: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        // Event emitter
        this.setEventEmitter();

        this.i18next = i18next;
        TextTranslation.setI18Next(i18next);

        // Route 'languageChanged' event        
        this.onLanguageChanged = (function(lng?: any) {
            this.emit('languageChanged', lng);
        }).bind(this);
        i18next.on('languageChanged', this.onLanguageChanged);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    destroy() {
        i18next.off('languageChanged', this.onLanguageChanged);

        super.destroy();

        this.destroyEventEmitter();
    }

    initI18Next(scene?: any, config?: any) {
        Awaitloader.call(scene.load, function(successCallback?: any, failureCallback?: any) {
            i18next.use(Backend).init(config, successCallback);
        })
        return this;
    }


    add(gameObject?: any, config?: any) {
        return new TextTranslation(gameObject, config);
    }

    changeLanguage(lng?: any, onComplete?: any) {
        i18next.changeLanguage(lng, onComplete);
        return this;
    }

    setDefaultNamespace(namespace?: any) {
        i18next.setDefaultNamespace(namespace);
        return this;
    }

    t(translationKey?: any, interpolation?: any) {
        return i18next.t(translationKey, interpolation);
    }
}

Object.assign(
    TextTranslationPlugin.prototype,
    EventEmitterMethods
);

export default TextTranslationPlugin;