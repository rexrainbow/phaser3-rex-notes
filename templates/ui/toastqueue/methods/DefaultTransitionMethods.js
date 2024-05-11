export default {
    transitIn(gameObject, duration, parent) {
        switch (parent.queueDirection) {
            case 0:  // bottom-to-top
                gameObject.setOrigin(0.5, 1);
                gameObject.popUp(duration, 'y');
                break;
            case 1:  // top-to-bottom
                gameObject.setOrigin(0.5, 0);
                gameObject.popUp(duration, 'y');
                break;
            case 2: // right-to-left
                gameObject.setOrigin(1, 0.5);
                gameObject.popUp(duration, 'x');
                break;
            case 3: // left-to-right
                gameObject.setOrigin(0, 0.5);
                gameObject.popUp(duration, 'x');
                break;
        }
    },

    transitOut(gameObject, duration, parent) {
        gameObject.fadeOut(duration);
    }
}