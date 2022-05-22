const RemoveItem = Phaser.Utils.Array.Remove;

export default {
    remove(gameObject) {
        RemoveItem(this.buttons, gameObject);

        if (this.buttonsType) {
            var key = gameObject.name;
            delete this.buttonMap[key];
            this.dataManager.remove(key);
        }

        return this;
    },

    clear() {
        this.buttons.length = 0;

        if (this.buttonsType) {
            for (var key in this.buttonMap) {
                delete this.buttonMap[key];
                this.dataManager.remove(key);
            }
        }

        return this;
    }
}