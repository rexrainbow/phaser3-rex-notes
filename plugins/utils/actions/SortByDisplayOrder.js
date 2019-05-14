var SortByDisplayOrder = function (gameObjects) {
    if (gameObjects.length < 2) {
        return gameObjects;
    }
    var scene = gameObjects[0].scene;
    scene.sys.depthSort();
    var displayList = scene.sys.displayList;
    gameObjects.sort(function (childA, childB) {
        if (!childA.parentContainer && !childB.parentContainer) {
            //  Quick bail out when neither child has a container
            return displayList.getIndex(childB) - displayList.getIndex(childA);
        }
        else if (childA.parentContainer === childB.parentContainer) {
            //  Quick bail out when both children have the same container
            return childB.parentContainer.getIndex(childB) - childA.parentContainer.getIndex(childA);
        }
        else if (childA.parentContainer === childB) {
            //  Quick bail out when childA is a child of childB
            return -1;
        }
        else if (childB.parentContainer === childA) {
            //  Quick bail out when childA is a child of childB
            return 1;
        }
        else {
            //  Container index check
            var listA = childA.getIndexList();
            var listB = childB.getIndexList();
            var len = Math.min(listA.length, listB.length);

            for (var i = 0; i < len; i++) {
                var indexA = listA[i];
                var indexB = listB[i];

                if (indexA === indexB) {
                    //  Go to the next level down
                    continue;
                }
                else {
                    //  Non-matching parents, so return
                    return indexB - indexA;
                }
            }
        }

        //  Technically this shouldn't happen, but ...
        return 0;
    })
    return gameObjects;
}
export default SortByDisplayOrder;