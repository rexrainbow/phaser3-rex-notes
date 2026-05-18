import { Utils as PhaserUtils } from 'phaser';
import ComponentBase from '../../utils/componentbase/ComponentBase';
import State from './State';
import Methods from './methods/Methods';

const GetValue = PhaserUtils.Objects.GetValue;

class OpenCloseTransition extends ComponentBase {
    _state: any;
    closeEventData: any;
    delayCallTimer: any;
    isShutdown: any;
    oneShotMode: any;
    openEventData: any;
    parent: any;
    removeDelayCall: any;
    scene: any;
    setTransitInCallback: any;
    setTransitInTime: any;
    setTransitOutCallback: any;
    setTransitOutTime: any;
    transitInCallback: any;
    transitOutCallback: any;

    constructor(gameObject?: any, config?: any) {
        super(gameObject, config);
        // this.parent = gameObject;
        // this.scene

        this.setTransitInTime(GetValue(config, 'duration.in', 200));
        this.setTransitOutTime(GetValue(config, 'duration.out', 200));
        this.setTransitInCallback(GetValue(config, 'transitIn'));
        this.setTransitOutCallback(GetValue(config, 'transitOut'));

        this.oneShotMode = GetValue(config, 'destroy', false);

        this.delayCallTimer = undefined;
        this._state = new State(this, {
            eventEmitter: false,
            initState: GetValue(config, 'initState', 'IDLE')
        });
        this.openEventData = undefined;
        this.closeEventData = undefined;
    }

    get state() {
        return this._state.state;
    }

    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.transitInCallback = undefined;
        this.transitOutCallback = undefined;
        this.openEventData = undefined;
        this.closeEventData = undefined;

        this.removeDelayCall();

        super.shutdown(fromScene);
    }
}

Object.assign(
    OpenCloseTransition.prototype,
    Methods,
)

export default OpenCloseTransition;