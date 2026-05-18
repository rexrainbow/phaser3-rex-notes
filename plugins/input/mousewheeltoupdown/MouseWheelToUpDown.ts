import CursorKeys from '../../utils/input/CursorKeys';

class MouseWheelToUpDown extends CursorKeys {
    _enable: any;
    clearAllKeysState: any;
    downKeyDown: any;
    noKeyDown: any;
    scene: any;
    setKeyState: any;
    upKeyDown: any;

    constructor(scene?: any, config?: any) {
        super(scene);

        this.scene = scene;
        this.boot();
    }

    boot() {
        this.scene.input.on('wheel', this.onWheeling, this);
        this.scene.sys.events.on('postupdate', this.clearAllKeysState, this);
        this.scene.sys.events.once('shutdown', this.destroy, this);
    }

    shutdown() {
        if (!this.scene) {
            return
        }

        this.scene.input.off('wheel', this.onWheeling, this);
        this.scene.sys.events.off('postupdate', this.clearAllKeysState, this);
        this.scene.sys.events.off('shutdown', this.destroy, this);
        this.scene = undefined;

        super.shutdown();
    }

    destroy() {
        this.shutdown();
    }

    get enable() {
        return this._enable;
    }

    set enable(e) {
        if (this._enable === e) {
            return;
        }
        if (!e) {
            this.clearAllKeysState();
        }
        this._enable = e;
        return this;
    }

    setEnable(e?: any) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }

    onWheeling(pointer?: any, currentlyOver?: any, dx?: any, dy?: any, dz?: any, event?: any) {
        if (!this.enable) {
            return;
        }
        this.setKeyState('up', dy < 0);
        this.setKeyState('down', dy > 0);
    }

    get up() {
        return this.upKeyDown;
    }

    get down() {
        return this.downKeyDown;
    }

    get noKey() {
        return this.noKeyDown;
    }
}

export default MouseWheelToUpDown;