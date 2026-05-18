import { Utils as PhaserUtils } from 'phaser';
const BringToTop = PhaserUtils.Array.BringToTop;
const SendToBack = PhaserUtils.Array.SendToBack;
const MoveUp = PhaserUtils.Array.MoveUp;
const MoveDown = PhaserUtils.Array.MoveDown;
const MoveAbove = PhaserUtils.Array.MoveAbove;
const MoveBelow = PhaserUtils.Array.MoveBelow;

export default {
    moveChildToFist(child?: any) {
        SendToBack(this.children, child);
        return this;
    },

    moveChildToLast(child?: any) {
        BringToTop(this.children, child);
        return this;
    },
    movechildUp(child?: any) {
        MoveUp(this.children, child);
        return this;
    },

    movechildDown(child?: any) {
        MoveDown(this.children, child);
        return this;
    },

    movechildAbove(child?: any, baseChild?: any) {
        MoveAbove(this.children, child, baseChild);
        return this;
    },

    movechildBelow(child?: any, baseChild?: any) {
        MoveBelow(this.children, child, baseChild);
        return this;
    },

}