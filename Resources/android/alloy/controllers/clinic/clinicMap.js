function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "clinic/clinicMap";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.panelMapWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Panel Map",
        id: "panelMapWin",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.panelMapWin && $.addTopLevelView($.__views.panelMapWin);
<<<<<<< HEAD
    $.__views.__alloyId584 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId584"
    });
    $.__views.panelMapWin.add($.__views.__alloyId584);
    $.__views.__alloyId585 = Ti.UI.createView({
=======
    $.__views.__alloyId572 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId572"
    });
    $.__views.panelMapWin.add($.__views.__alloyId572);
    $.__views.__alloyId573 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId585"
    });
    $.__views.__alloyId584.add($.__views.__alloyId585);
    $.__views.__alloyId586 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId586"
    });
    $.__views.__alloyId585.add($.__views.__alloyId586);
=======
        id: "__alloyId573"
    });
    $.__views.__alloyId572.add($.__views.__alloyId573);
    $.__views.__alloyId574 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId574"
    });
    $.__views.__alloyId573.add($.__views.__alloyId574);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId586.add($.__views.btnBack);
=======
    $.__views.__alloyId574.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
<<<<<<< HEAD
    $.__views.__alloyId585.add($.__views.pageTitle);
    $.__views.__alloyId587 = Ti.UI.createLabel({
=======
    $.__views.__alloyId573.add($.__views.pageTitle);
    $.__views.__alloyId575 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Clinic Map",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId587"
    });
    $.__views.pageTitle.add($.__views.__alloyId587);
=======
        id: "__alloyId575"
    });
    $.__views.pageTitle.add($.__views.__alloyId575);
>>>>>>> origin/master
    $.__views.panelMap = Ti.UI.createScrollView({
        id: "panelMap",
        scrollType: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
<<<<<<< HEAD
    $.__views.__alloyId584.add($.__views.panelMap);
=======
    $.__views.__alloyId572.add($.__views.panelMap);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var maps = args.map_url;
    $.panelMap.add(Ti.UI.createWebView({
        url: maps,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    }));
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.panelMapWin);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;