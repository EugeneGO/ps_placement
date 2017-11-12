doc = app.activeDocument;

//images are in this folder -yes, you need double "\\" for some reason I still don't know-
var dirImages = new Folder("~/Desktop/test/print/test/placement_test/pre/");
var imagesList = dirImages.getFiles();
var coordinates = [{ x: 525, y: 360 }, { x: 375, y: 360 }, { x: 225, y: 360 }, { x: 75, y: 360 }, { x: 525, y: 280 }, { x: 375, y: 280 }, { x: 225, y: 280 }, { x: 75, y: 280 }, { x: 525, y: 200 }, { x: 375, y: 200 }, { x: 225, y: 200 }, { x: 75, y: 200 }, { x: 525, y: 120 }, { x: 375, y: 120 }, { x: 225, y: 120 }, { x: 75, y: 120 }, { x: 525, y: 40 }, { x: 375, y: 40 }, { x: 225, y: 40 }, { x: 75, y: 40 }];
var mult = 2.834627813368105;
var places = {
    "080": [1, 20],
    "081": [2, 19],
    "082": [6, 16],
    "083": [5, 15],
    "084": [8, 14],
    "085": [3, 18],
    "086": [4, 17],
    "087": [9, 12],
    "088": [10, 11]
};
var currentCopy = 1;

var itemToPlace = {};

var currentLayer = doc.activeLayer;
var cmykGroup = currentLayer.groupItems.add();
var detailsGroup = currentLayer.groupItems.add();
var whiteGroup = currentLayer.groupItems.add();

cmykGroup.name = "cmyk";
detailsGroup.name = "details";
whiteGroup.name = "white";

function placeInProperGroup(item) {

    var group;
    var name = item.name;

    if (~name.indexOf('cmyk')) {
        group = cmykGroup;
    } else if (~name.indexOf('details')) {
        group = detailsGroup;
    } else {
        group = whiteGroup;
    }
    try {
        item.move(group, ElementPlacement.PLACEATBEGINNING)
    } catch (e) {
        $.writeln(e);
    }

}

function getAdditionalMove(position) {
    var res;

    if (position > 16) {
        res = 0.45;
    } else if (position > 12) {
        res = 0.3;
    } else if (position > 8) {
        res = 0.2;
    } else if (position > 4) {
        res = 0.1;
    } else {
        res = 0;
    }

    return res;
}

for (var i = 0; i < imagesList.length; i++) {

    var imgName = imagesList[i].name;
    var documentName = doc.name;

    // check identical names
    if (~imgName.indexOf(".pdf")) {

        var documentNumber = imgName[0] + imgName[1] + imgName[2];
        var _place = places[documentNumber][currentCopy];
        var _l = coordinates[_place - 1];
        var _j = getAdditionalMove(_place);
        // this I was missing!!!!!!!!!!!! 
        var itemToPlace = doc.placedItems.add();

        itemToPlace.file = imagesList[i];
        itemToPlace.layer = doc.activeLayer;
        itemToPlace.name = imgName;
        itemToPlace.top = (-1) * ((_l.y + _j) * mult - itemToPlace.height / 2);
        itemToPlace.left = (_l.x + _j) * mult - itemToPlace.width / 2;
        placeInProperGroup(itemToPlace);

    }
}



