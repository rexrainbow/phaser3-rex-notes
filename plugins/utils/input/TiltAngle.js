import DeviceOrientation from './DeviceOrientation.js';
import GetValue from '../../../../phaser/src/utils/object/GetValue.js';

class TiltAngle extends DeviceOrientation {
    constructor(scene, config) {
        super(scene, config);
        this.setCalibrationMode(GetValue(config, 'calibrationMode', 0));

        this.isLandscape = screen.orientation.type.startsWith('landscape');

        this.onOrientationChange = (function () {
            this.isLandscape = screen.orientation.type.startsWith('landscape');
            this.calibration();
        }).bind(this);
        screen.orientation.addEventListener('change', this.onOrientationChange, false);
    }

    shutdown(fromScene) {
        screen.orientation.removeEventListener('change', this.onOrientationChange, false);

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
        return (this.isLandscape) ? this.gamma : this.beta;
    }

    get horizontalAngle() {
        return (this.isLandscape) ? this.beta : this.gamma;
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