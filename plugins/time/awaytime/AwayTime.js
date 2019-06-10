const GetValue = Phaser.Utils.Objects.GetValue;

class AwayTime {
    constructor(config) {
        this.state = IDLE;
        this.key = GetValue(config, 'key', 'away');
        this.period = GetValue(config, 'period', 1000);
    }

    destroy() {
        this.stop();
    }

    get awayTime() {
        var prevTime = parseInt(localStorage.getItem(this.key));
        var curTime = this.curTime;
        if ((prevTime < 0) || (prevTime > curTime)) {
            return 0;
        }
        // console.log(new Date(prevTime).toLocaleString());
        // console.log(new Date(curTime).toLocaleString());
        this.start();
        return curTime - prevTime;
    }

    get curTime() {
        return new Date().getTime();
    }

    start() {
        if (this.state === UPDATING) {
            return this;
        }
        this.timer = setInterval(this.updateTime.bind(this), this.period);
        this.state = UPDATING;
        return this;
    }

    stop() {
        if (this.state === IDLE) {
            return this;
        }
        clearTimeout(this.timer);
        this.timer = undefined;
        this.state = IDLE;
        return this;
    }

    updateTime() {
        localStorage.setItem(this.key, this.curTime);
        return this;
    }
}

const IDLE = 0;
const UPDATING = 1;

export default AwayTime;