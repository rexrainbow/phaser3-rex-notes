class ClickboardPaster {
    constructor(type, callback) {
        this.handler = function (event) {
            var items = event.clipboardData.items;
            switch (type) {
                case 'image':
                    for (var item of items) {
                        if (item.type.startsWith('image/')) {
                            callback(item.getAsFile());
                        }
                    }
                    break;

                default:
                    for (var item of items) {
                        if (item.kind === 'string') {
                            item.getAsString(callback);
                            return;
                        }
                    }
                    break;
            }
        }

        this.boot();
    }

    boot() {
        document.addEventListener('paste', this.handler);
    }

    destroy() {
        document.removeEventListener('paste', this.handler);
        this.handler = null;
    }
}

export default ClickboardPaster;