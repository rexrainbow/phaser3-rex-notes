import CreateListPanel from './CreateListPanel';
import DropDown from '../../../dropdown/DropDown';

var OpenListPanel = function() {
    if (this.listPanel) {
        return this;
    }

    if (this.options.length === 0) {
        return this;
    }

    var listPanel = CreateListPanel.call(this);

    // Button over/out
    listPanel
        .on('button.over', function(button?: any, index?: any, pointer?: any, event?: any) {
            this.currentOverIndex = index;

            if (this.listOnButtonOver) {
                this.listOnButtonOver.call(this, button, index, pointer, event);
            }

            this.emit('button.over', this, listPanel, button, index, pointer, event);
        }, this)
        .on('button.out', function(button?: any, index?: any, pointer?: any, event?: any) {
            if (this.currentOverIndex === index) {
                this.currentOverIndex = undefined;
            }

            if (this.listOnButtonOut) {
                this.listOnButtonOut.call(this, button, index, pointer, event);
            }

            this.emit('button.out', this, listPanel, button, index, pointer, event);
        }, this);


    var alignTargetX;
    if (!this.listAlignMode || (this.listAlignMode === 'label')) {
        alignTargetX = this;
    } else {
        alignTargetX = this.getElement(this.listAlignMode)
    }

    var dropDownBehavior = new DropDown(listPanel, {
        // Transition
        duration: {
            in: this.listEaseInDuration,
            out: this.listEaseOutDuration
        },
        transitIn: this.listTransitInCallback,
        transitOut: this.listTransitOutCallback,

        // Position
        expandDirection: this.listExpandDirection,

        alignTargetX: alignTargetX,
        alignTargetY: this,
        alignSide: this.listAlignSide,

        bounds: this.listBounds,

        // Close condition        
    })
        .on('open', function() {
            // After popping up
            // Can click
            listPanel
                .on('button.click', function(button?: any, index?: any, pointer?: any, event?: any) {
                    if (this.listOnButtonClick) {
                        this.listOnButtonClick.call(this, button, index, pointer, event);
                    }
                    this.emit('button.click', this, listPanel, button, index, pointer, event);
                    this.dropDownBehavior.requestClose();
                }, this);

            this.emit('list.open', this, listPanel);
        }, this)

        .on('close', function() {
            this.listPanel = undefined;
            this.dropDownBehavior = undefined;

            this.emit('list.close', this);
        }, this)

    listPanel
        .onClickOutside(function() {
            dropDownBehavior.requestClose();
        })

    this.listPanel = listPanel;
    this.dropDownBehavior = dropDownBehavior;

    this.pin(listPanel);

    return this;
}

export default OpenListPanel;