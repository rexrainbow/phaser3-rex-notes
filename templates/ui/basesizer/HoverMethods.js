export default {
    onOver(gameObject, callback, scope) {
        if (!gameObject) {
            return this;
        }
        if (typeof (gameObject) === 'function') {
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        gameObject
            .setInteractive()
            .on('pointerover', callback, scope);

        return this;
    },

    onOut(gameObject, callback, scope) {
        if (!gameObject) {
            return this;
        }
        if (typeof (gameObject) === 'function') {
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        gameObject
            .setInteractive()
            .on('pointerout', callback, scope);

        return this;
    },
}