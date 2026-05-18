export default {
    onOver(gameObject?: any, callback?: any, scope?: any) {
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

    onOut(gameObject?: any, callback?: any, scope?: any) {
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