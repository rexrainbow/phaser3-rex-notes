import { GameObjects as PhaserGameObjects } from 'phaser';
export default {
    createGameObject(goType?: any, name?: any, ...params) {
        this.getGameObjectManager(goType, name).add(name, ...params);
        return this;
    },

    destroyGameObject(goType?: any, name?: any) {
        var gameObjectManager = this.getGameObjectManager(goType, name);
        if (name === undefined) {
            gameObjectManager.removeAll();
        } else {
            gameObjectManager.remove(name);
        }
        return this;
    },

    hasGameObject(goType?: any, name?: any) {
        return !!this.getGameObjectManager(goType, name);
    },

    callGameObjectMethod(goType?: any, name?: any, methodName?: any, ...params) {
        this.getGameObjectManager(goType, name).call(name, methodName, ...params);
        return this;
    },

    setGameObjectProperty(goType?: any, name?: any, prop?: any, value?: any) {
        this.getGameObjectManager(goType, name).setProperty(name, prop, value);
        return this;
    },

    easeGameObjectProperty(goType?: any, name?: any, config?: any) {
        this.getGameObjectManager(goType, name).easeProperty(name, config);
        return this;
    },

    getGameObjectTweenTask(goType?: any, name?: any, property?: any) {
        return this.getGameObjectManager(goType, name).getTweenTask(name, property);
    },

    getGameObject(goType?: any, name?: any, out?: any) {
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

                if (isArrayOutput?: any) {
                    out.push(gameObject);
                } else {
                    out[name] = gameObject;
                }

            }

            return out;
        }
    },

    addGameObject(goType?: any, name?: any, gameObject?: any) {
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

    drawGameObjectsBounds(goTypes?: any, graphics?: any, config?: any) {
        if (goTypes instanceof PhaserGameObjects.Graphics) {
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