import DeviceOrientation from './DeviceOrientation';
import GetValue from '../../../../phaser/src/utils/object/GetValue';

class TiltAngle extends DeviceOrientation {
    beta: any;
    calibrationMode: any;
    gamma: any;
    horizontalAngle0: any;
    isLandscape: any;
    onOrientationChange: any;
    tiltAngle: any;
    verticalAngle0: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.setCalibrationMode(GetValue(config, 'calibrationMode', 0));

        this.isLandscape = screen.orientation.type.startsWith('landscape');

        this.onOrientationChange = (function() {
            this.isLandscape = screen.orientation.type.startsWith('landscape');
            this.calibration();
        }).bind(this);
        screen.orientation.addEventListener('change', this.onOrientationChange, false);
    }

    shutdown(fromScene?: any) {
        screen.orientation.removeEventListener('change', this.onOrientationChange, false);

        super.shutdown(fromScene);
    }

    setCalibrationMode(m?: any) {
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