var CreateFakeInputEvent = function () {
    return {
        cancelled: false,
        isSynthetic: true,
        stopPropagation() { this.cancelled = true; }
    }
}
export default CreateFakeInputEvent;
