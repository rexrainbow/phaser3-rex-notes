import TickTask from './TickTask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class SceneUpdateTickTask extends TickTask {
    constructor(parent, config) {
        super(parent, config);
        this.tickEventName = GetValue(config, 'tickEventName', 'update');
    }

    startTicking() {
        super.startTicking();
        this.scene.sys.events.on(this.tickEventName, this.update, this);
    }

    stopTicking() {
        super.stopTicking();
        if (this.scene) { // Scene might be destoryed
            this.scene.sys.events.off(this.tickEventName, this.update, this);
        }
    }

    // update(time, delta) {
    //     
    // }

}

export default SceneUpdateTickTask;