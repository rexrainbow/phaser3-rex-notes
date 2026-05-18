/* 
1. Pop-up chess
*/

import PopUp from '../../../plugins/popup';

var PlaceChess = function(chessArray?: any, board?: any, bejeweled?: any) {
    const duration = 500; //ms
    for (var i = 0, cnt = chessArray.length; i < cnt; i++) {
        var fade = PopUp(chessArray[i], duration);
        bejeweled.waitEvent(fade, 'complete');
    }
}

export default PlaceChess;