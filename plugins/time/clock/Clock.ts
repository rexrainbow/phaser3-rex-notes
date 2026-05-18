import BaseClock from './BaseClock';

class Clock extends BaseClock {
    isRunning: any;
    scene: any;
    tick: any;
    timeScale: any;

    startTicking() {
        super.startTicking();
        this.scene.sys.events.on('update', this.update, this);
    }

    stopTicking() {
        super.stopTicking();
        if (this.scene) { // Scene might be destoryed
            this.scene.sys.events.off('update', this.update, this);
        }
    }

    update(time?: any, delta?: any) {
        if ((!this.isRunning) || (this.timeScale === 0)) {
            return this;
        }
        this.tick(delta);
        return this;
    }
}

export default Clock;