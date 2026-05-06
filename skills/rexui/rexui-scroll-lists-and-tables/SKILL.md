---
name: rexui-scroll-lists-and-tables
description: "Use this skill when building RexUI scrollable lists, gridTable, scrollablePanel, scrollbar, textArea scrolling, trees, folder, pages, tabPages, inventory UI, item grids, virtualized list cells, or multi-page panels. Triggers on: RexUI list, RexUI scrollablePanel, RexUI gridTable, RexUI scrollbar, RexUI tree, RexUI folder, RexUI pages, RexUI tabPages, inventory UI."
---

# RexUI Scroll Lists And Tables

Use this skill for RexUI UI that presents many items, scrolls content, virtualizes cells, expands tree-like sections, or swaps between pages.

## Use This First

Choose the component:

| Need | Use |
|---|---|
| Many repeated data items, large inventory, level select, message list | `gridTable` |
| Scroll a composed RexUI child such as `sizer`, `fixWidthSizer`, or a form | `scrollablePanel` |
| Scroll only text content | `textArea` |
| Standalone normalized scrollbar control | `scrollBar` |
| Collapsible title + child section | `folder` |
| Tree with nested nodes | `trees` |
| Programmatic page stack | `pages` |
| Tabs controlling page stack | `tabPages` |

Prefer `gridTable` for large or data-backed lists because it can reuse visible cell containers. Prefer `scrollablePanel` when each child is already a real UI object and the item count is modest.

## Required Setup

This skill assumes RexUI is available as `this.rexUI`. If not, use `rexui-setup-and-factory`.

## References

Read these only when needed:

- `references/gridtable-config.md`: virtualized table setup, cell callbacks, events, updates, scrolling.
- `references/scrollablepanel-config.md`: panel child setup, slider/scroller config, scroll methods.
- `references/pages-trees-and-events.md`: `pages`, `tabPages`, `folder`, `trees`, and event names.
- `references/list-recipes.md`: reduced recipes for common list/table/panel/page/tree patterns.

## Core Rules

- Call `.layout()` after creating or mutating `gridTable`, `scrollablePanel`, `textArea`, `folder`, `trees`, `pages`, or `tabPages`.
- In `gridTable`, assume `createCellContainerCallback(cell, cellContainer, gridTable)` may receive a reused `cellContainer`; update all item-dependent state every time.
- Do not close over a stale `item` inside reused grid cells. Read `cell.item` inside the callback and event handlers should use `cellIndex` to look up current data.
- Enable `table.reuseCellContainer: true` for large lists, unless each cell owns state that is hard to reset.
- Use `scrollablePanel.panel.child` for exactly one child object; put multiple objects inside a `sizer`, `gridSizer`, or `fixWidthSizer` first.
- Create an opaque `scrollablePanel` background before creating `panel.child`; otherwise Phaser display-list order can draw the background over the content.
- Use `scrollMode: 0` or `'vertical'` for vertical lists, `1` or `'horizontal'` for horizontal lists, and `2` or `'xy'` for both axes.
- Use `mouseWheelScroller: { focus: true }` when wheel scrolling should only work while the pointer is over the component.
- Use package imports only in full setup examples; local `templates/ui/...` paths are source-map paths.

## Source File Map

- `templates/ui/gridtable/GridTable.d.ts`
- `templates/ui/scrollablepanel/ScrollablePanel.d.ts`
- `templates/ui/scrollbar/ScrollBar.d.ts`
- `templates/ui/textarea/TextArea.d.ts`
- `templates/ui/pages/Pages.d.ts`
- `templates/ui/tabpages/TabPages.d.ts`
- `templates/ui/folder/Folder.d.ts`
- `templates/ui/trees/Trees.d.ts`
- `templates/ui/trees/tree/Tree.d.ts`
- `templates/ui/utils/scrollable/Scrollable.d.ts`

## Related Skills

- `rexui-setup-and-factory`: plugin setup and factory discovery.
- `rexui-components-catalog`: choose the correct component family.
- `rexui-layout-sizers`: panel children and cell container layout.
- `rexui-basic-widgets`: labels, buttons, tabs, and controls inside cells.
- `rexui-dialogs-and-popups`: modal list selection or popup lists.
- `rexui-text-and-input`: rich text and input-specific text area behavior.
