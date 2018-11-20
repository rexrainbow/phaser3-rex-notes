var MenuSetInteractive = function (menu) {
    menu
        // Expand sub event
        .on(menu.root.expandEventName, function (button, index) {
            if (this.isPassedEvent) {
                return;
            }
            var subItems = this.items[index].children;
            if (subItems) {
                this.expandSubMenu(button, subItems);
            } else {
                // this.root.on('button.click', button); // TODO
            }
        }, menu)
        // Click any button
        .on('button.click', function (button, index) {
            // Pass event to root menu object
            if (this !== this.root) {
                this.root.isPassedEvent = true;
                this.root.emit('button.click', button, index);
                this.root.isPassedEvent = false;
            }
        }, menu)
        //Pointer over any button
        .on('button.over', function (button, index) {
            // Pass event to root menu object
            if (this !== this.root) {
                this.root.isPassedEvent = true;
                this.root.emit('button.over', button, index);
                this.root.isPassedEvent = false;
            }
        }, menu)
        //Pointer out any button
        .on('button.out', function (button, index) {
            // Pass event to root menu object
            if (this !== this.root) {
                this.root.isPassedEvent = true;
                this.root.emit('button.out', button, index);
                this.root.isPassedEvent = false;
            }
        }, menu);
};

export default MenuSetInteractive;