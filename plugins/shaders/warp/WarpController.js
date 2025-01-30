import { FilterName } from './const.js';

const Vector2 = Phaser.Math.Vector2;
const GetValue = Phaser.Utils.Objects.GetValue;

class WarpController extends Phaser.Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.frequencyX = 10;
        this.frequencyY = 10;

        this.amplitudeX = 10;
        this.amplitudeY = 10;

        this.speedEnable = false;
        this.now = 0;
        this.speed = new Vector2(0, 0);

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        var frequency = GetValue(o, 'frequency', 10);
        this.setFrequency(GetValue(o, 'frequencyX', frequency), GetValue(o, 'frequencyY', frequency));

        var amplitude = GetValue(o, 'amplitude', 10);
        this.setAmplitude(GetValue(o, 'amplitudeX', amplitude), GetValue(o, 'amplitudeY', amplitude));

        var speed = GetValue(o, 'speed', 0);
        this.setSpeed(GetValue(o, 'speedX', speed), GetValue(o, 'speedY', speed));

        this.setSpeedEnable(GetValue(o, 'speedEnable', (this.speedX !== 0) || (this.speedY !== 0)));

        return this;
    }

    // frequencyX
    setFrequencyX(value) {
        this.frequencyX = value;
        return this;
    }

    // frequencyY
    setFrequencyY(value) {
        this.frequencyY = value;
        return this;
    }

    setFrequency(width, height) {
        if (height === undefined) {
            height = width;
        }
        this.frequencyX = width;
        this.frequencyY = height;
        return this;
    }

    get frequency() {
        return (this.frequencyX + this.frequencyY) / 2;
    }

    set frequency(value) {
        this.frequencyX = value;
        this.frequencyY = value;
    }

    // amplitudeX
    setAmplitudeX(value) {
        this.amplitudeX = value;
        return this;
    }

    // amplitudeY
    setAmplitudeY(value) {
        this.amplitudeY = value;
        return this;
    }

    setAmplitude(x, y) {
        if (y === undefined) {
            y = x;
        }
        this.amplitudeX = x;
        this.amplitudeY = y;
        return this;
    }

    get amplitude() {
        return (this.amplitudeX + this.amplitudeY) / 2;
    }

    set amplitude(value) {
        this.amplitudeX = value;
        this.amplitudeY = value;
    }

    // speed
    setSpeedX(value) {
        this.speedX = value;
        return this;
    }
    setSpeedY(value) {
        this.speed.y = value;
        return this;
    }
    get speedX() {
        return this.speed.x;
    }
    set speedX(value) {
        this.speed.x = value;
    }
    get speedY() {
        return this.speed.y;
    }
    set speedY(value) {
        this.speed.y = value;
    }

    setSpeed(x, y) {
        if (y === undefined) {
            y = x;
        }
        this.speedX = x;
        this.speedY = y;
        return this;
    }

    // Speed enable
    setSpeedEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.speedEnable = enable;
        return this;
    }

}

export default WarpController;