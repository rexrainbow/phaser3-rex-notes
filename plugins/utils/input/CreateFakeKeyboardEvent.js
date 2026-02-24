var CreateFakeKeyboardEvent = function () {
    return {
        timeStamp: 0,
        keyCode: 0,
        altKey: false,
        ctrlKey: false,
        shiftKey: false,
        metaKey: false,
        location: 0,
    };
}
export default CreateFakeKeyboardEvent;