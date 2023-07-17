var AddClearEffectCallback = function (gameObject, effectSwitchName) {
    if (!gameObject._effectSwitchNames) {
        gameObject._effectSwitchNames = [];

        gameObject.clearAllEffects = function () {
            var effectSwitchNames = gameObject._effectSwitchNames;
            for (var i = 0, cnt = effectSwitchNames.length; i < cnt; i++) {
                gameObject[effectSwitchNames[i]] = null;
            }

            return gameObject;
        }
        gameObject.on('destroy', gameObject.clearAllEffects, gameObject);
    }

    gameObject._effectSwitchNames.push(effectSwitchName);
}

export default AddClearEffectCallback;