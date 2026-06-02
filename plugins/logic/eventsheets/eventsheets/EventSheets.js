import EventSheetManager from '../eventsheetmanager/EventSheetManager.js';

class EventSheets extends EventSheetManager {
    constructor(scene, config) {
        super(scene, config);

        this.scene = this.owner;

        this.boot();
    }

    boot() {
        if (this.scene) {
            this.scene.sys.events.once('shutdown', this.destroy, this);
        }
    }

    shutdown(fromScene) {
        if (this.isShutdown) {
            return;
        }

        if (this.scene) {
            this.scene.sys.events.off('shutdown', this.destroy, this);
        }

        super.shutdown(fromScene);

        this.scene = undefined;

        return this;
    }

}

export default EventSheets;
