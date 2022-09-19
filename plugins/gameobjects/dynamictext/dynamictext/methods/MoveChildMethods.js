const BringToTop = Phaser.Utils.Array.BringToTop;
const SendToBack = Phaser.Utils.Array.SendToBack;
const MoveUp = Phaser.Utils.Array.MoveUp;
const MoveDown = Phaser.Utils.Array.MoveDown;
const MoveAbove = Phaser.Utils.Array.MoveAbove;
const MoveBelow = Phaser.Utils.Array.MoveBelow;

export default {
    moveChildToFist(bob) {
        BringToTop(this.children, bob);
        return this;
    },

    moveChildToLast(bob) {
        SendToBack(this.children, bob);
        return this;
    },
    movechildUp(bob) {
        MoveUp(this.children, bob);
        return this;
    },

    movechildDown(bob) {
        MoveDown(this.children, bob);
        return this;
    },

    movechildAbove(bob, baseBob) {
        MoveAbove(this.children, bob, baseBob);
        return this;
    },

    movechildBelow(bob, baseBob) {
        MoveBelow(this.children, bob, baseBob);
        return this;
    },

}