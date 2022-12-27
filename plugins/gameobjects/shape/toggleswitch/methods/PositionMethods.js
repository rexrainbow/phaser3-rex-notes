export default {
    setThumbPosition(left, right) {
        if (right === undefined) {
            right = 1 - left;
        }

        this.thumbLeftX = left;
        this.thumbRightX = right;
        return this;
    }
}