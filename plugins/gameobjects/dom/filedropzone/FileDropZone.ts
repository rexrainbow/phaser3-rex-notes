import Methods from './methods/Methods';
import { DragDropEvents } from './FileDropZoneProperties';
import RouteEvents from '../utils/RouteEvents';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const DOMElement = PhaserGameObjects.DOMElement;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class FileDropZone extends DOMElement {
    _files: any;
    addFilters: any;
    emit: any;
    fileTypeFilters: any;
    resize: any;
    setDropEnable: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any, config?: any) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 0);
            height = GetValue(config, 'height', 0);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', 0);
            height = GetValue(config, 'height', 0);
        }

        if (config === undefined) {
            config = {};
        }

        var element = document.createElement('div');

        var style = GetValue(config, 'style', undefined);
        super(scene, x, y, element, style);
        this.type = 'rexFileDropZone';
        this.resize(width, height);

        this._files = [];
        this.setDropEnable(GetValue(config, 'dropEnable', true));

        var filters = GetValue(config, 'filters');
        if (filters?: any) {
            this.addFilters(filters);
        }

        // Apply events
        RouteEvents(this, element, DragDropEvents, {
            preventDefault: true,
            preTest(gameObject?: any) { return gameObject.dropEnable; }
        });

        this
            .on('drop', function(gameObject?: any, e?: any) {
                this._files = e.dataTransfer.files;
                var files = this._files;
                if (files && this.fileTypeFilters) {
                    for (var filterType in this.fileTypeFilters) {
                        var filterCallback = this.fileTypeFilters[filterType];

                        var filteredFiles = [];
                        for (var i = 0, cnt = files.length; i < cnt; i++) {
                            var file = files[i];
                            if (filterCallback(file, files)) {
                                filteredFiles.push(file);
                            }
                        }

                        if (filteredFiles.length > 0) {
                            this.emit(`drop.${filterType}`, filteredFiles);
                        }
                    }
                }
            }, this)
    }

    get files() {
        return this._files;
    }
}

Object.assign(
    FileDropZone.prototype,
    Methods,
);

export default FileDropZone;