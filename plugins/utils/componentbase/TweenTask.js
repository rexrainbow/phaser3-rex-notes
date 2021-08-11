import TickTask from "./TimerTickTask/TimerTask";

class TweenTask extends TickTask {
    start() {
        // Don't restart if timer is in DELAY or COUNTDOWN
        if (this.timer.isRunning) {
            return this;
        }

        super.start();
        return this;
    }

    restart() {
        this.timer.stop();
        this.start();
        return this;
    }
}

export default TweenTask;