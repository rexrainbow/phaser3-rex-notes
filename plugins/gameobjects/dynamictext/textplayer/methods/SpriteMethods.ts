export default {
    getSprite(name?: any) {
        return this.spriteManager.getGO(name);
    },

    addSprite(name?: any, gameObject?: any) {
        this.spriteManager.addGO(name, gameObject);
        return this;
    }

}