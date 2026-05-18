export default {
    hasMethod(methodName?: any) {
        return typeof (this.gameObject[methodName]) === 'function';
    },

    call(methodName?: any, ...parameters) {
        if (!this.hasMethod(methodName)) {
            console.warn(`[GameObjectManager] Game object '${this.name}' does not have method '${methodName}'`)
            return this;
        }

        var gameObject = this.gameObject;
        gameObject[methodName].apply(gameObject, parameters);

        return this;
    }
}