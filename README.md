[![codecov](https://codecov.io/gh/harrel56/vuela/branch/master/graph/badge.svg?token=82DE91AQ1Z)](https://codecov.io/gh/harrel56/vuela) [![Build Status](https://app.travis-ci.com/harrel56/vue-dnd.svg?branch=master)](https://app.travis-ci.com/harrel56/vue-dnd)

# vue-dnd

Simple vue 3.x drag and drop plugin

## Example
```html
<DropZone>
  <div class="z1">
    <Draggable><div class="d1"></div></Draggable>
    <Draggable><div class="d2"></div></Draggable>
    <Draggable><div class="d3"></div></Draggable>
  </div>
</DropZone>
<DropZone dropping-class="test-dropping">
  <div class="z2">
    <Draggable><div class="d1"></div></Draggable>
    <Draggable><div class="d2"></div></Draggable>
  </div>
</DropZone>
```
