import DrawRoundRectangleBackground from '../../../canvas/utils/DrawRoundRectangleBackground.js';

var GetStartLineIndex = function (lines, targetOffset) {
    // First line whose endOffset is greater than targetOffset
    var left = 0;
    var right = lines.length - 1;
    var result = lines.length;
    while (left <= right) {
        var mid = (left + right) >> 1;
        if (lines[mid].endOffset > targetOffset) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return result;
};

var GetEndLineIndex = function (lines, targetOffset) {
    // First line whose startOffset is greater than or equal to targetOffset
    var left = 0;
    var right = lines.length - 1;
    var result = lines.length;
    while (left <= right) {
        var mid = (left + right) >> 1;
        if (lines[mid].startOffset >= targetOffset) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return result;
};

export default {
    draw(startX, startY, textWidth, textHeight) {
        var penManager = this.penManager;
        this.hitAreaManager.clear();

        var context = this.context;
        context.save();

        var defaultStyle = this.defaultStyle;

        this.clear();
        DrawRoundRectangleBackground(
            this,
            defaultStyle.backgroundColor,
            defaultStyle.backgroundStrokeColor,
            defaultStyle.backgroundStrokeLineWidth,
            defaultStyle.backgroundCornerRadius,
            defaultStyle.backgroundColor2,
            defaultStyle.backgroundHorizontalGradient,
            defaultStyle.backgroundCornerIteration
        );

        var parent = this.parent;
        var padding = parent.padding;
        var viewportWidth = parent.width - padding.left - padding.right;
        var viewportHeight = parent.height - padding.top - padding.bottom;
        var contentHeight = this.linesHeight;
        var hasViewport = (viewportWidth > 0) && (viewportHeight > 0);
        var hasFixedHeight = (parent.style.fixedHeight > 0);
        var hasOverflow = (contentHeight > viewportHeight);
        var maxLines = defaultStyle.maxLines;
        var useVisibleRange = (maxLines <= 0) && (defaultStyle.valign === 'top') && hasViewport && hasFixedHeight && hasOverflow;
        var clipText = useVisibleRange;
        if (clipText) {
            context.save();
            context.beginPath();
            context.rect(padding.left, padding.top, viewportWidth, viewportHeight);
            context.clip();
        }

        // draw lines
        startX += this.startXOffset;
        startY += this.startYOffset;
        var defaultHalign = defaultStyle.halign,
            valign = defaultStyle.valign;

        var lineWidth;
        var lines = penManager.lines;
        var totalLinesNum = lines.length;
        var drawLinesNum, drawLineStartIdx, drawLineEndIdx;
        if (useVisibleRange && (totalLinesNum > 0)) {
            var visibleStart = -parent.scrollY;
            var visibleEnd = visibleStart + viewportHeight;
            drawLineStartIdx = GetStartLineIndex(lines, visibleStart);
            drawLineEndIdx = GetEndLineIndex(lines, visibleEnd);
            if (drawLineStartIdx < 0) {
                drawLineStartIdx = 0;
            }
            if (drawLineEndIdx > totalLinesNum) {
                drawLineEndIdx = totalLinesNum;
            }
            if (drawLineEndIdx < drawLineStartIdx) {
                drawLineEndIdx = drawLineStartIdx;
            }
        } else if ((maxLines > 0) && (totalLinesNum > maxLines)) {
            drawLinesNum = maxLines;
            if (valign === 'center') { // center
                drawLineStartIdx = Math.floor((totalLinesNum - drawLinesNum) / 2);
            } else if (valign === 'bottom') { // bottom
                drawLineStartIdx = totalLinesNum - drawLinesNum;
            } else {
                drawLineStartIdx = 0;
            }
            drawLineEndIdx = drawLineStartIdx + drawLinesNum;
        } else {
            drawLineStartIdx = 0;
            drawLineEndIdx = totalLinesNum;
        }

        var offsetX, offsetY;
        var rtl = this.rtl,
            rtlOffset = (rtl) ? this.parent.width : undefined;
        if (useVisibleRange) {
            offsetY = startY;
        } else {
            var totalLinesHeight = this.getLinesHeight(drawLineStartIdx, drawLineEndIdx);
            if (valign === 'center') { // center
                offsetY = Math.max((textHeight - totalLinesHeight) / 2, 0);
            } else if (valign === 'bottom') { // bottom
                offsetY = Math.max(textHeight - totalLinesHeight - 2, 0);
            } else {
                offsetY = 0;
            }
            offsetY += startY;
        }
        for (var lineIdx = drawLineStartIdx; lineIdx < drawLineEndIdx; lineIdx++) {
            lineWidth = penManager.getLineWidth(lineIdx);
            if (lineWidth === 0) {
                continue;
            }

            var line = lines[lineIdx];
            if (!line) {
                continue;
            }
            var pens = line.pens,
                penCount = pens.length;
            var halign = defaultHalign;
            // Seek if there has algin tag
            for (var penIdx = 0; penIdx < penCount; penIdx++) {
                var penAlign = pens[penIdx].prop.align
                if (penAlign !== undefined) {
                    halign = penAlign;
                    break;
                }
            }

            if (halign === 'center') { // center
                offsetX = (textWidth - lineWidth) / 2;
            } else if (halign === 'right') { // right
                offsetX = (!rtl) ? (textWidth - lineWidth) : 0;
            } else {
                offsetX = (!rtl) ? 0 : (textWidth - lineWidth);
            }
            offsetX += startX;

            var hitAreaHeight = this.getLineHeight(line) + defaultStyle.lineSpacing;
            for (var penIdx = 0; penIdx < penCount; penIdx++) {
                this.drawPen(pens[penIdx], offsetX, offsetY, rtlOffset, hitAreaHeight);
            }
        }

        if (clipText) {
            context.restore();
        }
        context.restore();
    },

    drawPen(pen, offsetX, offsetY, rtlOffset, lineHeight) {
        offsetX += pen.x;
        offsetY += pen.y + (pen.prop.y || 0);

        if (rtlOffset !== undefined) {
            offsetX = rtlOffset - offsetX;
        }

        var canvas = this.canvas;
        var context = this.context;
        context.save();

        var curStyle = this.parser.propToContextStyle(this.defaultStyle, pen.prop);

        // Background
        if ((curStyle.bgcolor !== null) && (pen.width > 0)) {
            var metrics = this.defaultStyle.metrics;
            var bgTLY = offsetY - metrics.ascent;
            var bgHeight = metrics.fontSize;
            this.drawRectangle(offsetX, bgTLY, pen.width, bgHeight, curStyle.bgcolor, curStyle);
        }

        // Underline
        if ((curStyle.underlineThickness > 0) && (pen.width > 0)) {
            var lineOffsetY = offsetY + curStyle.underlineOffset - (curStyle.underlineThickness / 2);
            this.drawLine(offsetX, lineOffsetY, pen.width, curStyle.underlineThickness, curStyle.underlineColor, curStyle);
        }

        // Text
        if (pen.isTextPen) {
            curStyle.buildFont();
            curStyle.syncFont(canvas, context);
            curStyle.syncStyle(canvas, context);
            this.drawText(offsetX, offsetY, pen.text, curStyle);
        }

        // Image
        if (pen.isImagePen) {
            this.drawImage(offsetX, offsetY, pen.prop.img, pen.prop.color, curStyle);
        }

        // Strikethrough
        if ((curStyle.strikethroughThickness > 0) && (pen.width > 0)) {
            var lineOffsetY = offsetY + curStyle.strikethroughOffset - (curStyle.strikethroughThickness / 2);
            this.drawLine(offsetX, lineOffsetY, pen.width, curStyle.strikethroughThickness, curStyle.strikethroughColor, curStyle);
        }

        context.restore();

        if (pen.hasAreaMarker && (pen.width > 0)) {
            var data;
            var areaKey = pen.prop.area;
            if (areaKey) {
                data = {
                    key: areaKey
                };
            } else {
                var url = pen.prop.url;
                data = {
                    key: `url:${url}`,
                    url: url
                };
            }

            this.hitAreaManager.add(
                offsetX,                       // x
                (offsetY - this.startYOffset), // y
                pen.width,                     // width
                (lineHeight || this.defaultStyle.lineHeight),  // height
                data
            );
        }
    },

    clear() {
        var canvas = this.canvas;
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    },

    drawRectangle(x, y, width, height, color, style) {
        if (this.autoRound) {
            x = Math.round(x);
            y = Math.round(y);
        }

        var context = this.context;
        context.fillStyle = color;
        context.fillRect(x, y, width, height);
    },

    drawLine(x, y, width, height, color, style) {
        if (this.autoRound) {
            x = Math.round(x);
            y = Math.round(y);
        }

        var context = this.context;
        style.syncShadow(context, style.shadowStroke);

        var savedLineCap = context.lineCap;
        context.lineCap = 'butt';
        context.strokeStyle = color;
        context.lineWidth = height;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo((x + width), y);
        context.stroke();
        context.lineCap = savedLineCap;
    },

    drawText(x, y, text, style) {
        if (this.autoRound) {
            x = Math.round(x);
            y = Math.round(y);
        }

        var context = this.context;
        var letterSpacing = style.letterSpacing;
        if (letterSpacing === 0) {
            if (style.stroke && (style.stroke !== 'none') && (style.strokeThickness > 0)) {
                style.syncShadow(context, style.shadowStroke);
                context.strokeText(text, x, y);
            }

            if (style.color && (style.color !== 'none')) {
                style.syncShadow(context, style.shadowFill);
                context.fillText(text, x, y);
            }

        } else {
            var charcters = text.split('');
            for (var i = 0, cnt = charcters.length; i < cnt; i++) {
                var character = charcters[i];
                if (style.stroke && (style.stroke !== 'none') && (style.strokeThickness > 0)) {
                    style.syncShadow(context, style.shadowStroke);
                    context.strokeText(character, x, y);
                }

                if (style.color && (style.color !== 'none')) {
                    style.syncShadow(context, style.shadowFill);
                    context.fillText(character, x, y);
                }

                x += context.measureText(character).width + letterSpacing;
            }

        }
    },

    drawImage(x, y, imgKey, color, style) {
        y -= this.startYOffset;
        this.parent.imageManager.draw(imgKey, this.context, x, y, color, this.autoRound);
    }

}
