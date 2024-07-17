const AddItem = Phaser.Utils.Array.Add;
const RemoveItem = Phaser.Utils.Array.Remove;

const InstanceBank = [];

export default {
    add(instance) {
        AddItem(InstanceBank, instance);
    },

    remove(instance) {
        RemoveItem(InstanceBank, instance);
    },

    clear() {
        InstanceBank.length = 0;
    }
}