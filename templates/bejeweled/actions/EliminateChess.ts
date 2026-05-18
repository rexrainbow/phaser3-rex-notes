/* 
1. Fade-out-destroy chess
*/

var EliminateChess = function(chessArray?: any, board?: any, bejeweled?: any) {
    const duration = 500; //ms
    for (var i = 0, cnt = chessArray.length; i < cnt; i++) {
        // Destroy chess game object after fading
        // Chess won't be reused in this case
        const gameObject = chessArray[i];
        var fade = gameObject.scene.tweens.add({
            targets: gameObject,
            alpha: 0,
            duration: duration,
            onComplete(tw?: any, targets?: any) {
                targets[0].destroy();
            }
        });
        bejeweled.waitEvent(fade, 'complete');
    }
}

export default EliminateChess;