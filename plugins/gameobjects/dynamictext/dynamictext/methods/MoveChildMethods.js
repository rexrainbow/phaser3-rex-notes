import { Utils as PhaserUtils } from 'phaser';
const BringToTop = PhaserUtils.Array.BringToTop;
const SendToBack = PhaserUtils.Array.SendToBack;
const MoveUp = PhaserUtils.Array.MoveUp;
const MoveDown = PhaserUtils.Array.MoveDown;
const MoveAbove = PhaserUtils.Array.MoveAbove;
const MoveBelow = PhaserUtils.Array.MoveBelow;

export default {
    moveChildToFist(child) {
        SendToBack(this.children, child);
        return this;
    },

    moveChildToLast(child) {
        BringToTop(this.children, child);
        return this;
    },
    movechildUp(child) {
        MoveUp(this.children, child);
        return this;
    },

    movechildDown(child) {
        MoveDown(this.children, child);
        return this;
    },

    movechildAbove(child, baseChild) {
        MoveAbove(this.children, child, baseChild);
        return this;
    },

    movechildBelow(child, baseChild) {
        MoveBelow(this.children, child, baseChild);
        return this;
    },

}