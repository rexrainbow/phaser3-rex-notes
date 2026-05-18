var MenuSetInteractive = function(menu?: any) {
    menu
        // Expand sub event
        .on(menu.root.expandEventName, function(button?: any, index?: any) {
            if (this._isPassedEvent) {
                return;
            }
            var childrenKey =  this.root.childrenKey;
            var subItems = this.items[index][childrenKey];
            if (subItems?: any) {
                this.expandSubMenu(button, subItems);
            } else {
                // this.root.on('button.click', button); // TODO
            }
        }, menu)
        // Click any button
        .on('button.click', function(button?: any, index?: any, pointer?: any, event?: any) {
            // Pass event to root menu object
            if (this !== this.root) {
                this.root._isPassedEvent = true;
                this.root.emit('button.click', button, index, pointer, event);
                this.root._isPassedEvent = false;
            }
        }, menu)
        //Pointer over any button
        .on('button.over', function(button?: any, index?: any, pointer?: any, event?: any) {
            // Pass event to root menu object
            if (this !== this.root) {
                this.root._isPassedEvent = true;
                this.root.emit('button.over', button, index, pointer, event);
                this.root._isPassedEvent = false;
            }
        }, menu)
        //Pointer out any button
        .on('button.out', function(button?: any, index?: any, pointer?: any, event?: any) {
            // Pass event to root menu object
            if (this !== this.root) {
                this.root._isPassedEvent = true;
                this.root.emit('button.out', button, index, pointer, event);
                this.root._isPassedEvent = false;
            }
        }, menu);
};

export default MenuSetInteractive;