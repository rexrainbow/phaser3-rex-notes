export default {
    getGameObject(goType, name, out) {
        var gameobjectManager = this.getGameObjectManager(goType);
        if (typeof (name) === 'string') {
            return gameobjectManager.getGO(name);
        } else {
            var names = name;
            if (names === undefined) {
                names = gameobjectManager.bobs;
            }
            if (out === undefined) {
                out = {};
            }
            for (name in names) {
                out[name] = gameobjectManager.getGO(name);
            }
            return out;
        }
    },

    addGameObject(goType, name, gameObject) {
        var gameobjectManager = this.getGameObjectManager(goType);
        if (typeof (name) === 'string') {
            gameobjectManager.addGO(name, gameObject);
        } else {
            var names = name;
            for (name in names) {
                gameobjectManager.addGO(name, names[name]);
            }
        }
        return this;
    }

}