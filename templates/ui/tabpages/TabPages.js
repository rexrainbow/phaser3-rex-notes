import GridSizer from '../gridsizer/GridSizer.js';
import Buttons from '../buttons/Buttons.js';
import FixWidthButtons from '../fixwidthbuttons/FixWidthButtons.js';
import Pages from '../pages/Pages.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const SizerAdd = GridSizer.prototype.add;

class TabPages extends GridSizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        // Create sizer
        config.column = 3;
        config.row = 3;
        config.columnProportions = [0, 0, 0];
        config.rowProportions = [0, 0, 0];

        var expandPages = GetValue(config, 'expand.pages', true);
        if (expandPages) {
            config.columnProportions[1] = 1;
            config.rowProportions[1] = 1;
        }

        super(scene, config);
        this.type = 'rexTabPages';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        if (background) {
            this.addBackground(background);
        }

        var pagesConfig = GetValue(config, 'pages');
        var pages = new Pages(scene, pagesConfig);
        scene.add.existing(pages);

        var tabsPosition = GetValue(config, 'tabsPosition', undefined);
        if (tabsPosition === undefined) {
            tabsPosition = GetValue(config, 'tabPosition', 'top');
        }

        var wrapTabs = GetValue(config, 'wrapTabs', false);

        var ButtonsClass = (wrapTabs) ? FixWidthButtons : Buttons;

        var tabsConfig = GetValue(config, 'tabs', undefined);
        if (tabsConfig === undefined) {
            tabsConfig = {};
        }
        tabsConfig.orientation = ((tabsPosition === 'top') || (tabsPosition === 'bottom')) ? 'x' : 'y';
        tabsConfig.buttonsType = 'radio';
        if (!wrapTabs && !tabsConfig.hasOwnProperty('expand')) {
            tabsConfig.expand = GetValue(config, 'expand.tabs', false)
        }
        var tabs = new ButtonsClass(scene, tabsConfig);
        scene.add.existing(tabs);


        // Add to sizer
        SizerAdd.call(this, pages, {
            column: 1, row: 1,
            expand: expandPages
        });

        var tabColumnIndex, tabRowIndex;
        var tabPadding = GetValue(config, 'space.item', 0);  // Backward compatible
        switch (tabsPosition) {
            case 'top':
                tabColumnIndex = 1;
                tabRowIndex = 0;
                tabPadding = { bottom: tabPadding };
                break;

            case 'bottom':
                tabColumnIndex = 1;
                tabRowIndex = 2;
                tabPadding = { top: tabPadding };
                break;

            case 'left':
                tabColumnIndex = 0;
                tabRowIndex = 1;
                tabPadding = { right: tabPadding };
                break;

            case 'right':
                tabColumnIndex = 2;
                tabRowIndex = 1;
                tabPadding = { left: tabPadding };
                break;
        }

        SizerAdd.call(this, tabs, {
            column: tabColumnIndex, row: tabRowIndex,
            padding: tabPadding,
            expand: (wrapTabs) ? true : GetValue(config, 'expand.tabs', false),
            align: GetValue(config, 'align.tabs', 'left')
        });

        this.addChildrenMap('background', background);
        this.addChildrenMap('tabs', tabs);
        this.addChildrenMap('pages', pages);

        this.tabsPosition = tabsPosition;

        // Register events
        tabs.on('button.click', function (tab) {
            var key = tab.name;
            if (pages.hasPage(key)) {
                pages.swapPage(key);
            }
        });

        tabs.on('button.statechange', function (tab, index, value, previousValue) {
            var eventName = (value) ? 'tab.focus' : 'tab.blur';
            this.emit(eventName, tab, tab.name);
        }, this)

        pages.on('pagevisible', function (pageObject, key, pages) {
            this.emit('page.focus', pageObject, key);
        })

        pages.on('pageinvisible', function (pageObject, key, pages) {
            this.emit('page.blur', pageObject, key);
        })

    }

    get currentKey() {
        return this.getElement('pages').currentKey;
    }

    set currentKey(key) {
        this.showPage(key);
    }

    get keys() {
        return this.getElement('pages').keys;
    }

    get currentPage() {
        return this.getElement('pages').currentPage;
    }

    get previousPage() {
        return this.getElement('pages').previousPage;
    }

}

Object.assign(
    TabPages.prototype,
    Methods
);

export default TabPages;