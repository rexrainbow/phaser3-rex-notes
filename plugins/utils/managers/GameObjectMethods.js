export default {
    createGameObject(goType, name, ...params) {
        this.getGameObjectManager(goType, name).add(name, ...params);
        return this;
    },

    destroyGameObject(goType, name) {
        var gameObjectManager = this.getGameObjectManager(goType, name);
        if (name === undefined) {
            gameObjectManager.removeAll();
        } else {
            gameObjectManager.remove(name);
        }
        return this;
    },

    hasGameObject(goType, name) {
        return !!this.getGameObjectManager(goType, name);
    },

    callGameObjectMethod(goType, name, methodName, ...params) {
        this.getGameObjectManager(goType, name).call(name, methodName, ...params);
        return this;
    },

    setGameObjectProperty(goType, name, prop, value) {
        this.getGameObjectManager(goType, name).setProperty(name, prop, value);
        return this;
    },

    easeGameObjectProperty(goType, name, config) {
        this.getGameObjectManager(goType, name).easeProperty(name, config);
        return this;
    },

    getGameObjectTweenTask(goType, name, property) {
        return this.getGameObjectManager(goType, name).getTweenTask(name, property);
    },

    getGameObject(goType, name, out) {
        var gameobjectManager = this.getGameObjectManager(goType, name);
        if (!gameobjectManager) {
            return out;
        }
        if (typeof (name) === 'string') {
            return gameobjectManager.getGO(name);
        } else {
            if (out === undefined) {
                out = [];
            }

            var names = name;
            if (names === undefined) {
                names = Object.keys(gameobjectManager.bobs);
            }

            var isArrayOutput = Array.isArray(out);
            for (var i = 0, cnt = names.length; i < cnt; i++) {
                name = names[i];
                var gameObject = gameobjectManager.getGO(name);
                if (!gameObject) {
                    continue;
                }

                if (isArrayOutput) {
                    out.push(gameObject);
                } else {
                    out[name] = gameObject;
                }

            }

            return out;
        }
    },

    addGameObject(goType, name, gameObject) {
        var gameobjectManager = this.getGameObjectManager(goType, name);
        if (typeof (name) === 'string') {
            gameobjectManager.addGO(name, gameObject);
        } else {
            var names = name;
            for (name in names) {
                gameobjectManager.addGO(name, names[name]);
            }
        }
        return this;
    },

    drawGameObjectsBounds(goTypes, graphics, config) {
        if (goTypes instanceof Phaser.GameObjects.Graphics) {
            config = graphics;
            graphics = goTypes;
            goTypes = undefined;
        }

        if (goTypes === undefined) {
            goTypes = this.getGameObjectManagerNames();
        }

        if (!Array.isArray(goTypes)) {
            goTypes = [goTypes];
        }
        for (var i = 0, cnt = goTypes.length; i < cnt; i++) {
            this.getGameObjectManager(goTypes[i]).drawGameObjectsBounds(graphics, config)
        }

        return this;
    }

}