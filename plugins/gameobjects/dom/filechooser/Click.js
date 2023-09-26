var Click = function (fileInput) {
    if (fileInput.click) {
        fileInput.click();

    } else {
        try {
            var event = new Event('Event', { bubbles: true, cancelable: true });
            fileInput.dispatchEvent(event);
        } catch (e) {
            console.log(e);
        }

    }
}

export default Click;