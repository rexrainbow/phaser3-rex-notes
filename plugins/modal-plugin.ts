import { ModalBehavoir, Modal, ModalPromise, ModalClose } from './modal'

import { Plugins as PhaserPlugins } from 'phaser';
class ModalPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject?: any, config?: any) {
        return new ModalBehavoir(gameObject, config);
    }

    modal(gameObject?: any, config?: any) {
        return Modal(gameObject, config);
    }

    promise(gameObject?: any, config?: any) {
        return ModalPromise(gameObject, config);
    }

    close(gameObject?: any, closeEventData?: any) {
        return ModalClose(gameObject, closeEventData);
    }
}

export default ModalPlugin;