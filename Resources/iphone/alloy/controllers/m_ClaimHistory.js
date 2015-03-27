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
    this.__controllerPath = "m_ClaimHistory";
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
    $.__views.m_ClaimHistory = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "My Claim History",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_ClaimHistory"
    });
    $.__views.m_ClaimHistory && $.addTopLevelView($.__views.m_ClaimHistory);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical"
    });
    $.__views.m_ClaimHistory.add($.__views.main);
<<<<<<< HEAD
    var __alloyId227 = [];
    $.__views.__alloyId228 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId228"
    });
    __alloyId227.push($.__views.__alloyId228);
    $.__views.__alloyId229 = Ti.UI.createView({
=======
    var __alloyId225 = [];
    $.__views.__alloyId226 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId226"
    });
    __alloyId225.push($.__views.__alloyId226);
    $.__views.__alloyId227 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "vertical",
        height: Ti.UI.SIZE,
        top: "10",
        left: "10",
        right: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId229"
    });
    $.__views.__alloyId228.add($.__views.__alloyId229);
    $.__views.__alloyId230 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId230"
    });
    $.__views.__alloyId229.add($.__views.__alloyId230);
    $.__views.__alloyId231 = Ti.UI.createLabel({
=======
        id: "__alloyId227"
    });
    $.__views.__alloyId226.add($.__views.__alloyId227);
    $.__views.__alloyId228 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId228"
    });
    $.__views.__alloyId227.add($.__views.__alloyId228);
    $.__views.__alloyId229 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        right: 80,
        font: {
            fontSize: 16
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "KLINIK SINGAPORE (RELAU)",
<<<<<<< HEAD
        id: "__alloyId231"
    });
    $.__views.__alloyId230.add($.__views.__alloyId231);
    $.__views.__alloyId232 = Ti.UI.createLabel({
=======
        id: "__alloyId229"
    });
    $.__views.__alloyId228.add($.__views.__alloyId229);
    $.__views.__alloyId230 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        right: 10,
        widht: 70,
        top: 0,
        font: {
            fontSize: 16
        },
        color: "#ff0000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "RM 55.00",
<<<<<<< HEAD
        id: "__alloyId232"
    });
    $.__views.__alloyId230.add($.__views.__alloyId232);
    $.__views.__alloyId233 = Ti.UI.createLabel({
=======
        id: "__alloyId230"
    });
    $.__views.__alloyId228.add($.__views.__alloyId230);
    $.__views.__alloyId231 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        color: "#ccc",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "8/27/2014, 12:00:00",
<<<<<<< HEAD
        id: "__alloyId233"
    });
    $.__views.__alloyId229.add($.__views.__alloyId233);
    $.__views.__alloyId234 = Ti.UI.createLabel({
=======
        id: "__alloyId231"
    });
    $.__views.__alloyId227.add($.__views.__alloyId231);
    $.__views.__alloyId232 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Category: GP",
<<<<<<< HEAD
        id: "__alloyId234"
    });
    $.__views.__alloyId229.add($.__views.__alloyId234);
    $.__views.__alloyId235 = Ti.UI.createLabel({
=======
        id: "__alloyId232"
    });
    $.__views.__alloyId227.add($.__views.__alloyId232);
    $.__views.__alloyId233 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "MC Days: 1",
<<<<<<< HEAD
        id: "__alloyId235"
    });
    $.__views.__alloyId229.add($.__views.__alloyId235);
    $.__views.__alloyId236 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId236"
    });
    __alloyId227.push($.__views.__alloyId236);
    $.__views.__alloyId237 = Ti.UI.createView({
=======
        id: "__alloyId233"
    });
    $.__views.__alloyId227.add($.__views.__alloyId233);
    $.__views.__alloyId234 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId234"
    });
    __alloyId225.push($.__views.__alloyId234);
    $.__views.__alloyId235 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "vertical",
        height: Ti.UI.SIZE,
        top: "10",
        left: "10",
        right: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId237"
    });
    $.__views.__alloyId236.add($.__views.__alloyId237);
    $.__views.__alloyId238 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId238"
    });
    $.__views.__alloyId237.add($.__views.__alloyId238);
    $.__views.__alloyId239 = Ti.UI.createLabel({
=======
        id: "__alloyId235"
    });
    $.__views.__alloyId234.add($.__views.__alloyId235);
    $.__views.__alloyId236 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId236"
    });
    $.__views.__alloyId235.add($.__views.__alloyId236);
    $.__views.__alloyId237 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        right: 80,
        font: {
            fontSize: 16
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "KLINIK SINGAPORE (RELAU)",
<<<<<<< HEAD
        id: "__alloyId239"
    });
    $.__views.__alloyId238.add($.__views.__alloyId239);
    $.__views.__alloyId240 = Ti.UI.createLabel({
=======
        id: "__alloyId237"
    });
    $.__views.__alloyId236.add($.__views.__alloyId237);
    $.__views.__alloyId238 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        right: 10,
        widht: 70,
        top: 0,
        font: {
            fontSize: 16
        },
        color: "#ff0000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "RM 30.00",
<<<<<<< HEAD
        id: "__alloyId240"
    });
    $.__views.__alloyId238.add($.__views.__alloyId240);
    $.__views.__alloyId241 = Ti.UI.createLabel({
=======
        id: "__alloyId238"
    });
    $.__views.__alloyId236.add($.__views.__alloyId238);
    $.__views.__alloyId239 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        color: "#ccc",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "8/28/2014, 12:00:00",
<<<<<<< HEAD
        id: "__alloyId241"
    });
    $.__views.__alloyId237.add($.__views.__alloyId241);
    $.__views.__alloyId242 = Ti.UI.createLabel({
=======
        id: "__alloyId239"
    });
    $.__views.__alloyId235.add($.__views.__alloyId239);
    $.__views.__alloyId240 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Category: GP",
<<<<<<< HEAD
        id: "__alloyId242"
    });
    $.__views.__alloyId237.add($.__views.__alloyId242);
    $.__views.__alloyId243 = Ti.UI.createLabel({
=======
        id: "__alloyId240"
    });
    $.__views.__alloyId235.add($.__views.__alloyId240);
    $.__views.__alloyId241 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "MC Days: 1",
<<<<<<< HEAD
        id: "__alloyId243"
    });
    $.__views.__alloyId237.add($.__views.__alloyId243);
    $.__views.__alloyId226 = Ti.UI.createTableView({
        data: __alloyId227,
        id: "__alloyId226"
    });
    $.__views.main.add($.__views.__alloyId226);
=======
        id: "__alloyId241"
    });
    $.__views.__alloyId235.add($.__views.__alloyId241);
    $.__views.__alloyId224 = Ti.UI.createTableView({
        data: __alloyId225,
        id: "__alloyId224"
    });
    $.__views.main.add($.__views.__alloyId224);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;