#target "Illustrator"

app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;

var docRef = app.activeDocument;
var layers = docRef.layers;
var numLayers = docRef.layers.length;
var artboardsRef = docRef.artboards;
var curArtboard = docRef.artboards.getActiveArtboardIndex();

// use current fill color
var bgColor = docRef.defaultFillColor;

// input window
var title = "Add Artboard Fill";
var bgLayerName = String(prompt ("Layer Name", "Background", title));

addBg();

function addBg(){
  // loop through all artboards to find current one
  for (i = 0; i < artboardsRef.length; i++) {
      if (i == curArtboard) {

        // get size of artboard
        var top = artboardsRef[i].artboardRect[1];
        var left = artboardsRef[i].artboardRect[0];
        var width = artboardsRef[i].artboardRect[2] - artboardsRef[i].artboardRect[0];
        var height = artboardsRef[i].artboardRect[1] - artboardsRef[i].artboardRect[3];

        var bgLayer = docRef.layers.add();
        bgLayer.name = bgLayerName;

        // create rectangle size of artboard
        var rect = bgLayer.pathItems.rectangle (top, left, width, height);
        rect.fillColor = bgColor;
      }
  }
  // move layer to bottom and lock it
  sortAndLock(bgLayerName);
}

function sortAndLock(whichLayer){
  for (var i = 0; i < numLayers; i++) {
    var layer = docRef.layers[i];
    var layerName = layer.name;
    if (layerName.match(whichLayer)) {
      layers[layerName].zOrder(ZOrderMethod.SENDTOBACK);
      layer.locked = true;
    }
  }
}
