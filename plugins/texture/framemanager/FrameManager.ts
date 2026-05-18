import Methods from './methods/Methods';
import GetGame from '../../utils/system/GetGame';
import CreateTexture from '../../utils/texture/CreateTexture';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class FrameManager {
    cellHeight: any;
    cellPadding: any;
    cellWidth: any;
    columns: any;
    fillColor: any;
    height: any;
    key: any;
    rows: any;
    useDynamicTexture: any;
    width: any;

    bitmapFontCache: any;
    canvas: any;
    context: any;
    dirty: any;
    frameNames: any;
    outerCellHeight: any;
    outerCellWidth: any;
    scene: any;
    texture: any;
    totalCount: any;

    constructor(scene?: any, key?: any, width?: any, height?: any, cellWidth?: any, cellHeight?: any, fillColor?: any, useDynamicTexture?: any) {
        var columns, rows, cellPadding;
        if (IsPlainObject(key)) {
            var config = key;
            key = GetValue(config, 'key');
            width = GetValue(config, 'width');
            height = GetValue(config, 'height');
            cellWidth = GetValue(config, 'cellWidth');
            cellHeight = GetValue(config, 'cellHeight');
            cellPadding = GetValue(config, 'cellPadding', 0);
            columns = GetValue(config, 'columns');
            rows = GetValue(config, 'rows');
            fillColor = GetValue(config, 'fillColor');
            useDynamicTexture = GetValue(config, 'useDynamicTexture');
        } else {
            if (typeof (fillColor) === 'boolean') {
                useDynamicTexture = fillColor;
                fillColor = undefined;
            }
        }

        if (cellWidth === undefined) {
            cellWidth = 64;
        }

        if (cellHeight === undefined) {
            cellHeight = 64;
        }

        if (cellPadding === undefined) {
            cellPadding = 0;
        }

        this.scene = scene;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.cellPadding = cellPadding;
        this.outerCellWidth = cellWidth + (cellPadding * 2);
        this.outerCellHeight = cellHeight + (cellPadding * 2);

        if (columns?: any) {
            width = this.outerCellWidth * columns;
        } else {
            if (width === undefined) {
                width = 4096;
            }
            columns = Math.floor(width / this.outerCellWidth);
        }

        if (rows?: any) {
            height = this.outerCellHeight * rows;
        } else {
            if (height === undefined) {
                height = 4096;
            }
            rows = Math.floor(height / this.outerCellHeight);
        }

        if (useDynamicTexture === undefined) {
            useDynamicTexture = false;
        }

        var game = GetGame(scene);

        this.useDynamicTexture = useDynamicTexture;
        this.texture = CreateTexture(game, key, width, height, useDynamicTexture);
        this.canvas = (useDynamicTexture) ? undefined : this.texture.getCanvas();
        this.context = (useDynamicTexture) ? undefined : this.texture.getContext();
        this.bitmapFontCache = game.cache.bitmapFont;

        if (fillColor !== undefined) {
            if (useDynamicTexture?: any) {
                this.texture.fill(fillColor).render();

            } else {
                var context = this.context;
                context.fillStyle = fillColor;
                context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }

        this.key = key;
        this.width = width;
        this.height = height;
        this.columns = columns;
        this.rows = rows;
        this.totalCount = this.columns * this.rows;
        this.fillColor = fillColor;

        this.frameNames = Array(this.totalCount);
        for (var i = 0, cnt = this.frameNames.length; i < cnt; i++) {
            this.frameNames[i] = undefined;
        }

        this.dirty = false;
    }

    destroy() {
        this.scene = undefined;
        this.texture = undefined;
        this.canvas = undefined;
        this.context = undefined;
        this.frameNames = undefined;
        this.bitmapFontCache = undefined;
    }

    getFrameIndex(frameName?: any) {
        return this.frameNames.indexOf(frameName);
    }

    contains(frameName?: any) {
        return this.getFrameIndex(frameName) !== -1;
    }

    addFrameName(index?: any, frameName?: any) {
        this.frameNames[index] = frameName;
        return this;
    }

    get isFull() {
        return this.getFrameIndex(undefined) === -1;
    }

    getTopLeftPosition(frameIndex?: any, out?: any) {
        if (out === undefined) {
            out = {};
        }

        var columnIndex = frameIndex % this.columns;
        var rowIndex = Math.floor(frameIndex / this.columns);
        out.x = columnIndex * (this.cellWidth + (this.cellPadding * 2));
        out.y = rowIndex * (this.cellHeight + (this.cellPadding * 2));
        return out;
    }

    updateTexture() {
        if (this.useDynamicTexture) {
            this.texture.render();
        } else {
            this.texture.refresh();
        }

        this.dirty = false;

        return this;
    }

}

Object.assign(
    FrameManager.prototype,
    Methods
);

export default FrameManager;