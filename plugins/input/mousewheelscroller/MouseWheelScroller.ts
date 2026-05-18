import ComponentBase from '../../utils/componentbase/ComponentBase';
import IsPointerInBounds from '../../utils/input/IsPointerInBounds';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class MouseWheelScroller extends ComponentBase {
    emit: any;
    enable: any;
    focusMode: any;
    parent: any;
    scene: any;
    speed: any;

    constructor(gameObject?: any, config?: any) {
        super(gameObject, config);
        // this.parent = gameObject;

        if (this.parent !== this.scene) {
            this.focusMode = GetValue(config, 'focus', true);
        } else {
            this.focusMode = false;
        }

        if (typeof (this.focusMode) === 'boolean') {
            this.focusMode = (this.focusMode) ? 1 : 0;
        }

        this.setSpeed(GetValue(config, 'speed', 0.1));
        this.setEnable(GetValue(config, 'enable', true));

        switch (this.focusMode) {
            case 0:
            case 2:
                this.scene.input.on('wheel', this.onSceneScroll, this);
                break;

            default:  // case 1
                gameObject
                    .setInteractive(GetValue(config, "inputConfig", undefined))
                    .on('wheel', function(pointer?: any, dx?: any, dy?: any, dz?: any, event?: any) {
                        this.tryScroll(dy);
                    }, this);
                break;
        }
    }

    destroy() {
        switch (this.focusMode) {
            case 0:
            case 2:
                this.scene.input.off('wheel', this.onSceneScroll, this);
                break;

            default:  // case 1
                // GameObject events will be removed when this gameObject destroyed 
                break;
        }
    }

    onSceneScroll(pointer?: any, currentlyOver?: any, dx?: any, dy?: any, dz?: any, event?: any) {
        if (this.focusMode === 2) {
            if (!IsPointerInBounds(this.parent, pointer)) {
                return;
            }
        }

        this.tryScroll(dy);
    }

    setEnable(e?: any) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }

    setSpeed(speed?: any) {
        this.speed = speed;
        return this;
    }

    tryScroll(dy?: any) {
        if (!this.enable) {
            return;
        }
        this.scroll(dy);
        return this;
    }

    scroll(dy?: any) {
        dy *= this.speed;
        this.emit('scroll', dy, this.parent, this);
        return this;
    }
}

export default MouseWheelScroller;