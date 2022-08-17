export default {
    getSprite(name) {
        return this.getGameObject('text', name);
    },

    addSprite(name, gameObject) {
        this.addGameObject('text', name, gameObject);
        return this;
    }

}