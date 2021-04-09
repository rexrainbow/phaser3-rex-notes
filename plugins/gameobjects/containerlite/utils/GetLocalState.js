var GetLocalState = function (gameObject) {
    if (!gameObject.hasOwnProperty('rexContainer')) {
        gameObject.rexContainer = {};
    }
    return gameObject.rexContainer;
}

export default GetLocalState;