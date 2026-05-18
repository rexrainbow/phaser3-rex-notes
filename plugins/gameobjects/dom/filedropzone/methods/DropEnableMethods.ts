export default {
    setDropEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }

        this.dropEnable = enable;
        return this;
    },

    toggleDropEnable() {
        this.dropEnable = !this.dropEnable;
        return this;
    },
}