'use strict'

class DragCursorPlugin extends Gashapon {
    constructor(scene, config) {
        super(config);

        //  The Scene that owns this plugin
        this.scene = scene;

        this.systems = scene.sys;

        if (!scene.sys.settings.isBooted) {
            scene.sys.events.once('boot', this.boot, this);
        }
    }

    //  Called when the Plugin is booted by the PluginManager.
    //  If you need to reference other systems in the Scene (like the Loader or DisplayList) then set-up those references now, not in the constructor.
    boot() {
        var eventEmitter = this.systems.events;

        //  Listening to the following events is entirely optional, although we would recommend cleanly shutting down and destroying at least.
        //  If you don't need any of these events then remove the listeners and the relevant methods too.

        eventEmitter.on('shutdown', this.shutdown, this);
        eventEmitter.on('destroy', this.destroy, this);
    }

    shutdown() {
        //  Should we reset the events?
    }

    destroy() {
        Gashapon.destroy.call(this);

        this.scene = undefined;
        this.systems = undefined;
    }
}

export default GashaponPlugin;