/* 
1. Fade-out-destroy chess
*/

import FadeOutDestroy from '../../../plugins/fade-out-destroy.js';

var EliminateChess = function (chessArray, board, bejeweled) {
    const duration = 500; //ms
    for (var i = 0, cnt = chessArray.length; i < cnt; i++) {
        // Destroy chess game object after fading
        // Chess won't be reused in this case
        var fade = FadeOutDestroy(chessArray[i], duration);
        bejeweled.waitEvent(fade, 'complete');
    }
}

export default EliminateChess;