import Transition from '../transition/Transition.js';
import PopUp from '../../popup.js';
import ScaleDown from '../scale/ScaleDown.js';
import SetPosition from './SetPosition.js';
import IsPointInBounds from '../../utils/bounds/IsPointInBounds.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class DropDown extends Transition {
    constructor(gameObject, config) {
        if (config === undefined) {
            config = {};
        }
        if (!config.hasOwnProperty('transitIn')) {
            config.transitIn = PopUp;
        }
        if (!config.hasOwnProperty('transitOut')) {
            config.transitOut = ScaleDown;
        }
        config.manualClose = true;
        config.clickOutsideClose = true;

        super(gameObject, config);
        // this.parent = gameObject;
        // this.scene

        SetPosition(gameObject, config);

        if (gameObject.isRexSizer) {
            gameObject.layout();
        }

        // Close conditions:
        var touchOutsideClose = GetValue(config, 'touchOutsideClose', true);
        if (touchOutsideClose) {
            this.touchOutsideClose();
        }

        this.start();
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        // Registered in touchOutsideClose()
        this.scene.input.off('pointerup', this.touchCloseCallback, this);

        super.shutdown(fromScene);
    }

    touchOutsideClose() {
        this.scene.input.on('pointerup', this.touchCloseCallback, this);
        return this;
    }

    touchCloseCallback(pointer) {
        if (IsPointInBounds(this.parent, pointer.worldX, pointer.worldY)) {
            return;
        }
        this.requestClose();
    }
}

export default DropDown;
