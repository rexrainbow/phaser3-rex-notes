import { Utils as PhaserUtils } from 'phaser';
import OpenCloseTransition from '../openclosetransition/OpenCloseTransition';
import PopUp from '../../popup';
import ScaleDown from '../scale/ScaleDown';
import SetPosition from './SetPosition';
import IsPointInBounds from '../../utils/bounds/IsPointInBounds';

const GetValue = PhaserUtils.Objects.GetValue;

class DropDown extends OpenCloseTransition {
    clickOutsideTest: any;
    emit: any;
    isShutdown: any;
    once: any;
    parent: any;
    requestClose: any;
    requestOpen: any;
    scene: any;

    constructor(gameObject?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        if (config.transitIn == null) {
            config.transitIn = function(gameObject?: any, duration?: any) {
                PopUp(gameObject, duration, 'y', 'Cubic')
            };
        }
        if (config.transitOut == null) {
            config.transitOut = function(gameObject?: any, duration?: any) {
                // Don't destroy here
                ScaleDown(gameObject, duration, 'y', 'Linear')
            };
        }
        config.manualClose = true;
        config.clickOutsideClose = true;
        config.destroy = true;

        super(gameObject, config);
        // this.parent = gameObject;
        // this.scene

        SetPosition(gameObject, config);

        if (gameObject.isRexSizer) {
            gameObject.layout();
        }

        // Close conditions:
        var touchOutsideClose = GetValue(config, 'touchOutsideClose', false);
        var anyTouchClose = GetValue(config, 'anyTouchClose', false);

        if (anyTouchClose?: any) {
            touchOutsideClose = false;
        }

        // Registet touch-close event after opened
        if (anyTouchClose?: any) {
            this.once('open', this.anyTouchClose, this);
        } else if (touchOutsideClose) {
            this.once('open', this.touchOutsideClose, this);
        }

        this.requestOpen();
    }

    shutdown(fromScene?: any) {
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
        this.clickOutsideTest = true;
        return this;
    }

    anyTouchClose() {
        this.scene.input.once('pointerup', this.touchCloseCallback, this);
        return this;
    }

    touchCloseCallback(pointer?: any) {
        if (this.clickOutsideTest && IsPointInBounds(this.parent, pointer.worldX, pointer.worldY)) {
            return;
        }
        this.requestClose();
    }

    onOpen() {
        this.emit('open', this.parent, this);
        super.onOpen();
    }

    onClose() {
        this.emit('close', this.parent, this);
        super.onClose();
    }

}

export default DropDown;