var GetSizerConfig = function(gameObject?: any) {
    if (!gameObject.hasOwnProperty('rexSizer')) {
        gameObject.rexSizer = {};
    }
    return gameObject.rexSizer;
}
export default GetSizerConfig;