import DeviceOrientation from './DeviceOrientation.js';

class TiltAngle extends DeviceOrientation {
    constructor(scene, config) {
        super(scene, config);
        this.scaleManager = scene.scale;
        this.setCalibrationMode(GetValue(o, 'calibrationMode', 0));

        this.boot();
    }

    boot() {
        this.scaleManager.on('orientationchange', this.calibration, this);
    }

    shutdown(fromScene) {
        this.scaleManager.off('orientationchange', this.calibration, this);
        this.scaleManager = undefined;

        super.shutdown(fromScene);
    }

    setCalibrationMode(m) {
        if (typeof (m) === 'string') {
            m = CalibrationModeType[m];
        }
        this.calibrationMode = m;
        return this;
    }

    get verticalAngle() {
        return (this.scaleManager.isLandscape) ? this.gamma : this.bete;
    }

    get horizontalAngle() {
        return (this.scaleManager.isLandscape) ? this.bete : this.gamma;
    }

    calibration() {
        if (this.calibrationMode === 0) {
            this.verticalAngle0 = 0;
            this.horizontalAngle0 = 0;
        } else {
            this.verticalAngle0 = this.tiltAngle.verticalAngle;
            this.horizontalAngle0 = this.tiltAngle.horizontalAngle;
        }

        return this;
    }

}

var CalibrationModeType = {
    '0': 0,
    'current': 1,
}

export default TiltAngle;