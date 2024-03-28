import AwaitLoader from '../../loader/awaitloader/AwaitLoaderCallback.js';
import GetProgress from './GetProgress.js';

class LastLoadTask extends Phaser.Events.EventEmitter {
    constructor(scene) {
        super();
        this.scene = scene;

        this.boot();
    }

    boot() {
        var self = this;
        var loader = this.scene.load;

        AwaitLoader.call(loader, function (successCallback, failureCallback) {
            var onProgress = function () {
                var progress = GetProgress(loader, 1);
                self.emit('progress', progress);

                if (progress === 1) {
                    var count = self.listenerCount('complete');
                    if (count === 0) {
                        onProgressComplete();
                    } else {
                        self.emit('complete', onProgressComplete);
                    }
                }
            }

            var runOnce = false;
            var onProgressComplete = function () {
                if (runOnce) {
                    return;
                }
                runOnce = true;
                self.emit('shutdown');
                loader.off('progress', onProgress);
                successCallback();
                self.destroy();
            }

            loader.on('progress', onProgress);
        });
    }

    destroy() {
        this.scene = undefined;
        super.destroy();
    }
}

export default LastLoadTask;