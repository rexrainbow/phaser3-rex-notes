import Clock from '../clock/Clock.js';
import Timer from './Timer.js';
import Pool from './TimerPool.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const TimerPool = new Pool();

class Timeline extends Clock {
    constructor(parent, config) {
        super(parent, config);

        this.addedTimers = [];
        this.timers = [];
        this.timerPool = GetValue(config, 'pool', TimerPool);
    }

    addTimer(config) {
        var timer = this.timerPool.allocate();
        if (!timer) {
            timer = new Timer(this, config)
        } else {
            timer
                .setTimeline(this)
                .reset(config)
        }
        this.addedTimers.push(timer);
        timer.runCallback(timer.onStart);

        if (!this.isRunning) {
            this.start();
        }
        return timer;
    }

    update(time, delta) {
        super.update(time, delta);

        this.timers.push(...this.addedTimers);
        this.addedTimers.length = 0;
        var pendingTimers = [];
        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
            var timer = this.timers[i];
            var isStopped = timer.update(this.now, this.delta);
            if (isStopped) {
                this.timerPool.free(timer);  // Free timer
            } else {
                pendingTimers.push(timer);  // Add to timer queue
            }
        }
        this.timers = pendingTimers;

        if ((this.timers.length === 0) && (this.addedTimers.length === 0)) {
            this.complete(); // Emit 'complete' event
        }
    }
}

export default Timeline