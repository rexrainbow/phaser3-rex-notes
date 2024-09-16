# Layout

Resize and place children.

## Steps

1. Skip layout if this game object is
    - Hidden
    - Not dirty
1. From isTopmostParent, Prelayout : 
    - Clear `_childrenWidth`, `_childrenHeight` properties of all children.
    - Custom logic of Prelayout
1. Resolve width and height
    1. From isTopmostParent, test if it needs `runWidthWrap` or `runHeightWrap`
    1. If `runWidthWrap`, calculate width of this game object (`resolveWidth()`)
        - Max value of total children width, or `minWidth` of this game object
        - Custom logic :
            - Sizer : Get proportionLength, if orientation is `x`
            - GridSizer : Get horizontal proportionLength
            - FixWidthSizer : Given width to layout children line by line. To get height of this FixWidthSizer, if orientation is `x`
    1. If `runHeightWrap`, calculate width of this game object (`resolveHeight()`)
        - Max value of total children height, or `minHeight` of this game object
        - Custom logic :
            - Sizer : Get proportionLength, if orientation is `y`
            - GridSizer : Get vertical proportionLength
            - FixWidthSizer : Given height to layout children line by line. To get width of this FixWidthSizer, if orientation is `y`
    1. If still can't get width, calculate width of this game object (`resolveWidth()`) again
        - `runWidthWrap` -> `runHeightWrap`, or
        - `runHeightWrap` -> `runWidthWrap`
        - If still can't get width or height, **resolving size failled**
1. Resize this game object
1. Layout children, start from step 3
    - Custom logic of `layoutChildren`
1.  Layout background
1.  Custom logic of PostLayout
    - Position and size of this element and children elements are all resolved
1.  From isTopmostParent, anchor position

