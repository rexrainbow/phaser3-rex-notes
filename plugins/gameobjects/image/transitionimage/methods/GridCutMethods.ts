import GridCutImage from '../../../../actions/GridCutImage';
import { ClearMask } from '../../../../utils/mask/MaskMethods';

export default {
    gridCutImage(gameObject?: any, columns?: any, rows?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        config.objectPool = this.imagesPool;
        var cellImages = GridCutImage(gameObject, columns, rows, config),
            cellImage;
        for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
            cellImage = cellImages[i];
            cellImage.setVisible(true);
            this.add(cellImage);
        }

        this.cellImages = cellImages;
        this.setChildLocalVisible(gameObject, false);  // Set cut target to invisible
        return cellImages;
    },

    gridCutCurrentImage(columns?: any, rows?: any, config?: any) {
        return this.gridCutImage(this.currentImage, columns, rows, config);
    },

    gridCutNextImage(columns?: any, rows?: any, config?: any) {
        return this.gridCutImage(this.nextImage, columns, rows, config);
    },

    getCellImages() {
        return this.cellImages;
    },

    freeCellImages() {
        if (this.cellImages.length === 0) {
            return this;
        }

        var texture = this.cellImages[0].texture;
        var cellImages = this.cellImages,
            cellImage, frameName;
        for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
            cellImage = cellImages[i];

            // Reset property of cell image
            this
                .setChildLocalAlpha(cellImage, 1)
                .setChildLocalScale(cellImage, 1)
                .setChildLocalVisible(cellImage, false)

            ClearMask(cellImage);

            // Remove frame object
            frameName = cellImage.frame.name;
            cellImage.setTexture();
            texture.remove(frameName);
        }

        this.imagesPool.push(...cellImages);
        cellImages.length = 0;

        return this;
    }
}