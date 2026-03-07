export default {
    onOver() {
        var background = this.getElement('background');
        background.setHoverState(true);
    },

    onOut() {
        var background = this.getElement('background');
        background.setHoverState(false);
    },
}