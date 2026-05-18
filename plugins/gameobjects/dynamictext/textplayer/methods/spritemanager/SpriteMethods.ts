export default {
    getSprite(name?: any) {
        return this.getGameObject('sprite', name);
    },

    addSprite(name?: any, gameObject?: any) {
        this.addGameObject('sprite', name, gameObject);
        return this;
    }

}