# Layout

Resize and place children.

## Steps

1. Set scaleX, scaleY to `1` of this game object
    1. Store current scaleX, scaleY
    1. Set scaleX, scaleY to `1`
1. Layout this game object
    1. Skip layout if this game object is
        - Hidden
        - Not dirty
    1. From isTopmostParent, Prelayout : 
        - Clear `_childrenWidth`, `_childrenHeight` properties of all children.
        - Custom logic of Prelayout
    1. Calculate width of this game object
        - Max value of total children width, or `minWidth` of this game object
    1. From isTopmostParent, calculate width of all children
    1. From isTopmostParent, run width-wrap of this game object and all children
    1. Calculate height of this game object
    1. Custom logic of change size of children
    1. Resize this game object according to step 2.3 and step 2.6
    1. Layout children, start from step 2
        - Custom logic of `layoutChildren`
    1. Layout background
    1. Default PostLayout :
        - Anchor position
    1. Custom logic of PostLayout
1. Restore scaleX, scaleY of this game object
