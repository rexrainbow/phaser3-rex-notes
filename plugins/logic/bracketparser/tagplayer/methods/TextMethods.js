export default {
    getText(name) {
        return this.textManager.getGO(name);
    },

    addText(name, gameObject) {
        this.textManager.addGO(name, gameObject);
        return this;
    }

}