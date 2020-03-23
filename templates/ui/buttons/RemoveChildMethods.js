const RemoveItem = Phaser.Utils.Array.Remove;

export default {
    removeButton(gameObject, destroyChild) {
        var gameObject = this.getButton(gameObject);
        if (!gameObject) {
            return this;
        }

        if (this.buttons.length === 1) {
            this.clearButtons(destroyChild);
        } else {
            RemoveItem(this.buttons, gameObject);
            this.remove(gameObject, destroyChild);
        }
        return this;
    },

    clearButtons(destroyChild) {
        this.buttons.length = 0;
        this.clear(destroyChild);
        return this;
    }
}