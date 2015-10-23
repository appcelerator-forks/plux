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
    this.__controllerPath = "plux_profile_bak";
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
    $.__views.pluxProfileWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "PLUX Profile",
        backButtonTitle: "",
        id: "pluxProfileWin",
        navTintColor: "#CE1D1C"
    });
    $.__views.pluxProfileWin && $.addTopLevelView($.__views.pluxProfileWin);
    $.__views.__alloyId169 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId169"
    });
    $.__views.pluxProfileWin.add($.__views.__alloyId169);
    $.__views.__alloyId170 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId170"
    });
    $.__views.__alloyId169.add($.__views.__alloyId170);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId170.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId169.add($.__views.pageTitle);
    $.__views.__alloyId171 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "PLUX Profile",
        textAlign: "center",
        id: "__alloyId171"
    });
    $.__views.pageTitle.add($.__views.__alloyId171);
    $.__views.__alloyId172 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId172"
    });
    $.__views.pluxProfileWin.add($.__views.__alloyId172);
    $.__views.profileData = Ti.UI.createScrollView({
        id: "profileData",
        height: "90%"
    });
    $.__views.__alloyId172.add($.__views.profileData);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;