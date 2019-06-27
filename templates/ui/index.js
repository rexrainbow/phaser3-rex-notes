import RoundRectangle from './roundrectangle/RoundRectangle.js';
import BBCodeText from './bbcodetext/BBCodeText.js';
import TagText from './tagtext/TagText.js';
import Container from './container/Container.js';

import Sizer from './sizer/Sizer.js';
import GridSizer from './gridsizer/GridSizer.js';
import FixWidthSizer from './fixwidthsizer/FixWidthSizer.js';

import Label from './label/Label.js';
import Buttons from './buttons/Buttons.js';
import Dialog from './dialog/Dialog.js';
import Tabs from './tabs/Tabs.js';
import Slider from './slider/Slider.js';
import GridTable from './gridtable/GridTable.js';
import Menu from './menu/Menu.js';
import TextBox from './textbox/Textbox.js';
import NumberBar from './numberbar/NumberBar.js';
import Pages from './pages/Pages.js';
import TextBlock from './textblock/TextBlock.js';
import TextArea from './textarea/TextArea.js';
import ScrollableBlock from './scrollableblock/ScrollableBlock.js';
import ScrollablePanel from './scrollablepanel/ScrollablePanel.js';
import Chart from './chart/Chart.js';
import Video from './video/Video.js';
import VideoCanvas from './video/VideoCanvas.js';
import YoutubePlayer from './youtubeplayer/YoutubePlayer.js';

import {
    Show,
    Hide
} from './utils/Hide.js';
import Edit from '../../plugins/behaviors/textedit/Edit.js';

export default {
    RoundRectangle: RoundRectangle,
    BBCodeText: BBCodeText,
    TagText: TagText,
    Container: Container,

    Sizer: Sizer,
    GridSizer: GridSizer,
    FixWidthSizer: FixWidthSizer,

    Label: Label,
    Buttons: Buttons,
    Dialog: Dialog,
    Tabs: Tabs,
    Slider: Slider,
    GridTable: GridTable,
    Menu: Menu,
    TextBox: TextBox,
    NumberBar: NumberBar,
    Pages: Pages,
    TextBlock: TextBlock,
    TextArea: TextArea,
    ScrollableBlock: ScrollableBlock,
    ScrollablePanel: ScrollablePanel,
    Chart: Chart,
    Video: Video,
    VideoCanvas: VideoCanvas,
    YoutubePlayer: YoutubePlayer,

    hide: Hide,
    show: Show,
    edit: Edit,
};