# treepad
Operation system for trees

## Processes

#### Create schema
Application's user have to create own schema for his purposes.

To reach it the user should:
1. Call context menu with right mouse click on `schemes` node
2. Hit `New schema` option in context menu
3. Enter new schema name in popup prompt window and confirm it
4. New and empty user's schema has been created

#### Create schema node
Application's user have to create a set of schema's nodes.

1. Call context menu on any schema's node
2. Hit `New node` option in context menu
3. Enter new node name in popup prompt window and confirm it
4. New schema's node has been created then

#### Define schema restrictions
Schema's node restrictions define the node behaviour in two ways:
1. Which another schema's nodes may be parent of the node
2. Which another schema's nodes may be children of the node

## Entities

#### Custom node
Custom node is a target for application's user

## Directories

__src/libs__ stuff uses across all project files regardless it role in application architecture.

__src/libs/context-menu__ library implements context menu functionality and interface appropriate application arch

__src/libs/modal-windows__ a set of implementations such abstract modal window as `src/ui/custom/modal-window`

__src/libs/type__ abstract classes to develop stuff in order to supply _type-system_ (look somewhere here)

__src/libs/ui-builder__ fail attempt to implement builder for _UiNode-system_, candidate for deletion

__src/libs/bootstrap.ts__ application entry point for webpack (package main module)

__src/libs/context.ts__ object that passing through whole application (run-time shared stuff)

__src/libs/ui.ts__ library provide _UiNode-system_

__src/nodes__ old application implementation; in refactoring now; candidate for deletion

__src/types__ _types-system_ implementation

__src/types/*__ type's directory

__src/types/*/index.ts__ type-script definition of the type

__src/types/*/controller.ts__ type controller implementation

__src/ui__ implementations of the _UiNode-system_

__src/ui/custom__ custom ui-nodes, that implements behaviour other than html elements do

__src/ui/html__ ui-nodes, that reproduces html elements behaviour

__src/ui/types__ ui-nodes reproduces type's views (more special than src/ui/custom, for types only)
