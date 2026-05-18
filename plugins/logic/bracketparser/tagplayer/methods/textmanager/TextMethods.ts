export default {
    getTextGameObject(name?: any) {
        return this.getGameObject('text', name);
    },

    addTextGameObject(name?: any, gameObject?: any) {
        this.addGameObject('text', name, gameObject);
        return this;
    }

}