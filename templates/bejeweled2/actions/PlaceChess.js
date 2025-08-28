/* 
1. Pop-up chess
*/

import PopUp from '../../../plugins/popup.js';

var PlaceChess = function (chessArray, board, bejeweled) {
    const duration = 500; //ms
    for (var i = 0, cnt = chessArray.length; i < cnt; i++) {
        var fade = PopUp(chessArray[i], duration);
        bejeweled.waitEvent(fade, 'complete');
    }
}

export default PlaceChess;