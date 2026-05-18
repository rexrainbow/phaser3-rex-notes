import { GameObjects as PhaserGameObjects, Scenes as PhaserScenes, Structs as PhaserStructs, Utils as PhaserUtils } from 'phaser';
const List = PhaserStructs.List;
const StableSort = PhaserUtils.Array.StableSort;
const GameObjectEvents = PhaserGameObjects.Events;
const SceneEvents = PhaserScenes.Events;

class ChildrenDisplayList extends List {
    active: any;
    addCallback: any;
    events: any;
    isRexContainerLiteLayer: any;
    list: any;
    parent: any;
    removeCallback: any;
    scene: any;
    sortChildrenFlag: any;

    constructor(parent?: any) {
        super(parent.scene);

        this.parent = parent;
        this.scene = parent.scene;
        this.events = this.scene.sys.events;
        this.active = false;
        this.isRexContainerLiteLayer = true;
        this.sortChildrenFlag = false;

        this.addCallback = this.addChildCallback;
        this.removeCallback = this.removeChildCallback;
    }

    addChildCallback(gameObject?: any) {
        var displayList = gameObject.displayList;

        if (displayList && displayList !== this) {
            gameObject.removeFromDisplayList();
        }

        if (gameObject.parentContainer) {
            gameObject.parentContainer.remove(gameObject);
        }

        if (!gameObject.displayList) {
            this.queueDepthSort();

            gameObject.displayList = this;

            gameObject.emit(GameObjectEvents.ADDED_TO_SCENE, gameObject, this.scene);
            this.events.emit(SceneEvents.ADDED_TO_SCENE, gameObject, this.scene);
        }
    }

    removeChildCallback(gameObject?: any) {
        this.queueDepthSort();

        if (gameObject.displayList === this) {
            gameObject.displayList = null;
        }

        gameObject.emit(GameObjectEvents.REMOVED_FROM_SCENE, gameObject, this.scene);
        this.events.emit(SceneEvents.REMOVED_FROM_SCENE, gameObject, this.scene);
    }

    queueDepthSort() {
        this.sortChildrenFlag = true;
        return this;
    }

    depthSort() {
        if (!this.sortChildrenFlag || this.list.length < 2) {
            this.sortChildrenFlag = false;
            return this;
        }

        StableSort(this.list, this.sortByDepth);
        this.sortChildrenFlag = false;

        return this;
    }

    sortByDepth(childA?: any, childB?: any) {
        return childA._depth - childB._depth;
    }
}

export default ChildrenDisplayList;