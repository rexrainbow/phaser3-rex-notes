import FadeOutDestroy from '../../../plugins/fade-out-destroy.js';
var EliminateChess = function (chess, completeCallback, scope) {
    const duration = 500; //ms
    chess.forEach(function (item) {
        FadeOutDestroy(item, duration);
    });
    this.eliminatingTimer = this.scene.time.delayedCall(duration, completeCallback, [], scope); // delay in ms
    return this;
}
export default EliminateChess;