import BaseClock from './BaseClock';
import GetGame from '../../utils/system/GetGame'

class Clock extends BaseClock {
    isRunning: any;
    parent: any;
    tick: any;
    timeScale: any;

    startTicking() {
        super.startTicking();
        GetGame(this.parent).events.on('step', this.update, this);
    }

    stopTicking() {
        super.stopTicking();
        GetGame(this.parent).events.off('step', this.update, this);
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