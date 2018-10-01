var CreateGameObject = function (board, tileX, tileY, callback, scope) {
    var gameObject;
    if (scope) {
        gameObject = callback.call(scope, board, tileX, tileY);
    } else {
        gameObject = callback(board, tileX, tileY);
    }
    return gameObject;
}
export default CreateGameObject;