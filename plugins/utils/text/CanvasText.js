'use strict'

import PensManagerKlass from './PensManager.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var TMPPENSMGR = null;
class CanvasText {
    constructor(config) {
        this.context = GetValue(config, 'context', null);
        this.canvas = this.context.canvas;
        this.parser = GetValue(config, 'parser', null);
        this.defatultStyle = GetValue(config, 'style', null);
        this.textChanged = true;

        this.pensManager = new PensManagerKlass();
    }

    draw() {
        if (this.textChanged) {
            this.textChanged = false;
        }

        this.drawBackground();
        
    }

    drawBackground() {
        var color = this.defatultStyle.backgroundColor;
        if (color === null) {
            return;
        }
        var ctx = this.context;
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawPen(pen, offsetX, offsetY, textInfo) {
        var ctx = this.context;
        ctx.save();

        var style = this.parser.propToContextStyle(
            this.defatultStyle,
            pen.prop,
            (pen.text == "")
        );
        style.syncStyle(this.canvas, this.context);

        var startX = offsetX + pen.x;
        var startY = offsetY + pen.y;
        var text = pen.text;

        // underline
        this.drawUnderline(text, startX, startY, style.underline);

        // draw image: TODO

        // draw text
        if (style.strokeThickness) {
            style.syncShadow(ctx, style.shadowStroke);

            ctx.strokeText(text, startX, startY);
        }

        if (style.color) {
            style.syncShadow(ctx, style.shadowFill);

            ctx.fillText(text, startX, startY);
        }

        ctx.restore();
    };

    drawUnderline(text, x, y, underlineProp) {
        var thickness = underlineProp.thickness;
        if (thickness <= 0) {
            return;
        }
        var ctx = this.context;
        var width = ctx.measureText(text).width;
        //switch(ctx.textAlign)
        //{
        //case "center": x -= (width/2); break;
        //case "right": x -= width; break;
        //}
        y += underlineProp.offset;

        ctx.beginPath();
        ctx.strokeStyle = underlineProp.color;
        ctx.lineWidth = thickness;
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.stroke();
    }

    get lines() {
        return this.pensManager.lines;
    }

    getSubText(start, end, text) {
        if (text == null)
            return this.pensManager.getSliceTagText(start, end, this.parser.prop2TagText);

        if (TMPPENSMGR === null) {
            TMPPENSMGR = new PensManagerKlass();
        }

        // TODO
        //var textSave = this.textInfo.text;
        //this.textInfo.text = text;
        //this.updatePens(TMPPENSMGR, this.textInfo, true);
        //this.textInfo.text = textSave;

        return TMPPENSMGR.getSliceTagText(start, end, this.parser.prop2TagText);
    }

    copyPensManager(pensManager) {
        return this.pensManager.copy(pensManager);
    }

    getTextWidth(pensManager) {
        if (pensManager === undefined) {
            pensManager = this.pensManager;
        }

        return pensManager.getMaxLineWidth();
    }

    getLastPen(pensManager) {
        if (pensManager === undefined) {
            pensManager = this.pensManager;
        }

        return pensManager.lastPen;
    }
};

export default CanvasText;