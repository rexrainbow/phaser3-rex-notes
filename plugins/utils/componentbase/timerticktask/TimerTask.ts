import TickTask from '../SceneUpdateTickTask';
import Timer from './Timer';

class TimerTickTask extends TickTask {
    isShutdown: any;
    timer: any;

    constructor(parent?: any, config?: any) {
        super(parent, config);
        this.timer = new Timer();
        // boot() later 
    }

    // override
    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        super.shutdown(fromScene);
        this.timer.destroy();
        this.timer = undefined;
    }

    start() {
        this.timer.start();
        super.start();
        return this;
    }

    stop() {
        this.timer.stop();
        super.stop();
        return this;
    }

    complete() {
        this.timer.stop();
        super.complete();
        return this;
    }

}

export default TimerTickTask;