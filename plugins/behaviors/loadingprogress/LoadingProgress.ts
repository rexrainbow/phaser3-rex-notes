import { Utils as PhaserUtils } from 'phaser';
import OpenCloseTransition from '../openclosetransition/OpenCloseTransition';
import PopUp from '../../popup';
import ScaleDown from '../scale/ScaleDown';
import NOOP from '../../utils/object/NOOP';
import AwaitLoader from '../../awaitloader';
import GetProgress from '../../utils/loader/GetProgress';

const GetValue = PhaserUtils.Objects.GetValue;

class LoadingProgress extends OpenCloseTransition {
    closeEventData: any;
    emit: any;
    parent: any;
    progressCallback: any;
    requestClose: any;
    requestOpen: any;
    scene: any;

    constructor(gameObject?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        if (!config.hasOwnProperty('transitIn')) {
            config.transitIn = PopUp;
        }
        if (!config.hasOwnProperty('transitOut')) {
            config.transitOut = ScaleDown;
        }

        config.destroy = true;

        super(gameObject, config);
        // this.parent = gameObject;
        // this.scene

        this.setProgressCallback(GetValue(config, 'progress'));

        this.start();
    }

    setProgressCallback(callback?: any) {
        if (!callback) {
            callback = NOOP;
        }

        this.progressCallback = callback;
        return this;
    }

    start() {
        var self = this;
        AwaitLoader.call(this.scene.load, function(successCallback?: any, failureCallback?: any) {
            self.once('close', successCallback);
        })

        this.requestOpen();
    }

    onOpen() {
        this.scene.load.on('progress', this.onProgress, this);
        this.emit('open', this.parent, this);
        super.onOpen();
        this.onProgress(); // Might requestClose if progress === 1
    }

    onClose() {
        this.scene.load.off('progress', this.onProgress, this);
        this.emit('close', this.closeEventData);
        super.onClose();
    }

    onProgress() {
        var progress = GetProgress(this.scene, 1);
        this.progressCallback(this.parent, progress);
        this.emit('progress', progress);
        if (progress === 1) {
            this.requestClose();
        }
    }
}

export default LoadingProgress;