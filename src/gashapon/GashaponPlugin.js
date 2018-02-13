'use strict'

import Gashapon from './Gashapon.js';

class GashaponPlugin extends Gashapon {
    // TBD: constructor could not have other parameters?
    constructor(scene, config) {
        super(config);

        //  The Scene that owns this plugin
        this.scene = scene;

        this.systems = scene.sys;

        if (!scene.sys.settings.isBooted) {
            scene.sys.events.once('boot', this.boot, this);
        }
    }

    //  Static function called by the PluginFile Loader.
    static register(PluginManager) {
        //  Register this plugin with the PluginManager, so it can be added to Scenes.

        //  The first argument is the name this plugin will be known as in the PluginManager. It should not conflict with already registered plugins.
        //  The second argument is a reference to the plugin object, which will be instantiated by the PluginManager when the Scene boots.
        //  The third argument is the local mapping. This will make the plugin available under `this.sys.base` and also `this.base` from a Scene if
        //  it has an entry in the InjectionMap.        
        PluginManager.register('RexGashaponPlugin', GashaponPlugin, 'gashapon');
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