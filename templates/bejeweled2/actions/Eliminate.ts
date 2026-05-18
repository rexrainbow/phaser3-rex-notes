/* 
1. Fade-out-destroy chess
*/

import FadeOutDestroy from '../../../plugins/fade-out-destroy';

var Eliminate = function(chessArray?: any, board?: any, bejeweled?: any) {
    const duration = 500; //ms
    for (var i = 0, cnt = chessArray.length; i < cnt; i++) {
        var fade = FadeOutDestroy(chessArray[i], duration);
        bejeweled.waitEvent(fade, 'complete');
    }
}

export default Eliminate;