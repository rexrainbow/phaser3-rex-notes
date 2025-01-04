export default {
    setTintFill(value) {
        if (value === undefined) { value = false; }

        this.tintFill = value;

        return this;
    },
}