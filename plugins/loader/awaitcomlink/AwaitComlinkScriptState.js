const IDLE = 0;
const LOADING = 1;
const LOADED = 2;

var AwaitComlinkScriptState = IDLE;

var SetState = function (state) {
    AwaitComlinkScriptState = state;
}

var IsIdle = function () {
    return (AwaitComlinkScriptState === IDLE);
}

var IsLoading = function () {
    return (AwaitComlinkScriptState === LOADING);
}

var IsLoaded = function () {
    return (AwaitComlinkScriptState === LOADED);
}

export {
    IDLE, LOADING, LOADED,
    SetState, IsIdle, IsLoading, IsLoaded
}