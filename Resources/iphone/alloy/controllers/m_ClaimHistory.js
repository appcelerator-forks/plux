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
    var __alloyId145 = [];
    $.__views.__alloyId146 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId146"
    });
    __alloyId145.push($.__views.__alloyId146);
    $.__views.__alloyId147 = Ti.UI.createView({
=======
    var __alloyId147 = [];
    $.__views.__alloyId148 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId148"
    });
    __alloyId147.push($.__views.__alloyId148);
    $.__views.__alloyId149 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "vertical",
        height: Ti.UI.SIZE,
        top: "10",
        left: "10",
        right: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId147"
    });
    $.__views.__alloyId146.add($.__views.__alloyId147);
    $.__views.__alloyId148 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId148"
    });
    $.__views.__alloyId147.add($.__views.__alloyId148);
    $.__views.__alloyId149 = Ti.UI.createLabel({
=======
        id: "__alloyId149"
    });
    $.__views.__alloyId148.add($.__views.__alloyId149);
    $.__views.__alloyId150 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId150"
    });
    $.__views.__alloyId149.add($.__views.__alloyId150);
    $.__views.__alloyId151 = Ti.UI.createLabel({
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
        id: "__alloyId149"
    });
    $.__views.__alloyId148.add($.__views.__alloyId149);
    $.__views.__alloyId150 = Ti.UI.createLabel({
=======
        id: "__alloyId151"
    });
    $.__views.__alloyId150.add($.__views.__alloyId151);
    $.__views.__alloyId152 = Ti.UI.createLabel({
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
        id: "__alloyId150"
    });
    $.__views.__alloyId148.add($.__views.__alloyId150);
    $.__views.__alloyId151 = Ti.UI.createLabel({
=======
        id: "__alloyId152"
    });
    $.__views.__alloyId150.add($.__views.__alloyId152);
    $.__views.__alloyId153 = Ti.UI.createLabel({
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
        id: "__alloyId151"
    });
    $.__views.__alloyId147.add($.__views.__alloyId151);
    $.__views.__alloyId152 = Ti.UI.createLabel({
=======
        id: "__alloyId153"
    });
    $.__views.__alloyId149.add($.__views.__alloyId153);
    $.__views.__alloyId154 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Category: GP",
<<<<<<< HEAD
        id: "__alloyId152"
    });
    $.__views.__alloyId147.add($.__views.__alloyId152);
    $.__views.__alloyId153 = Ti.UI.createLabel({
=======
        id: "__alloyId154"
    });
    $.__views.__alloyId149.add($.__views.__alloyId154);
    $.__views.__alloyId155 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "MC Days: 1",
<<<<<<< HEAD
        id: "__alloyId153"
    });
    $.__views.__alloyId147.add($.__views.__alloyId153);
    $.__views.__alloyId154 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId154"
    });
    __alloyId145.push($.__views.__alloyId154);
    $.__views.__alloyId155 = Ti.UI.createView({
=======
        id: "__alloyId155"
    });
    $.__views.__alloyId149.add($.__views.__alloyId155);
    $.__views.__alloyId156 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId156"
    });
    __alloyId147.push($.__views.__alloyId156);
    $.__views.__alloyId157 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "vertical",
        height: Ti.UI.SIZE,
        top: "10",
        left: "10",
        right: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId155"
    });
    $.__views.__alloyId154.add($.__views.__alloyId155);
    $.__views.__alloyId156 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId156"
    });
    $.__views.__alloyId155.add($.__views.__alloyId156);
    $.__views.__alloyId157 = Ti.UI.createLabel({
=======
        id: "__alloyId157"
    });
    $.__views.__alloyId156.add($.__views.__alloyId157);
    $.__views.__alloyId158 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId158"
    });
    $.__views.__alloyId157.add($.__views.__alloyId158);
    $.__views.__alloyId159 = Ti.UI.createLabel({
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
        id: "__alloyId157"
    });
    $.__views.__alloyId156.add($.__views.__alloyId157);
    $.__views.__alloyId158 = Ti.UI.createLabel({
=======
        id: "__alloyId159"
    });
    $.__views.__alloyId158.add($.__views.__alloyId159);
    $.__views.__alloyId160 = Ti.UI.createLabel({
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
        id: "__alloyId158"
    });
    $.__views.__alloyId156.add($.__views.__alloyId158);
    $.__views.__alloyId159 = Ti.UI.createLabel({
=======
        id: "__alloyId160"
    });
    $.__views.__alloyId158.add($.__views.__alloyId160);
    $.__views.__alloyId161 = Ti.UI.createLabel({
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
        id: "__alloyId159"
    });
    $.__views.__alloyId155.add($.__views.__alloyId159);
    $.__views.__alloyId160 = Ti.UI.createLabel({
=======
        id: "__alloyId161"
    });
    $.__views.__alloyId157.add($.__views.__alloyId161);
    $.__views.__alloyId162 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Category: GP",
<<<<<<< HEAD
        id: "__alloyId160"
    });
    $.__views.__alloyId155.add($.__views.__alloyId160);
    $.__views.__alloyId161 = Ti.UI.createLabel({
=======
        id: "__alloyId162"
    });
    $.__views.__alloyId157.add($.__views.__alloyId162);
    $.__views.__alloyId163 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "MC Days: 1",
<<<<<<< HEAD
        id: "__alloyId161"
    });
    $.__views.__alloyId155.add($.__views.__alloyId161);
    $.__views.__alloyId144 = Ti.UI.createTableView({
        data: __alloyId145,
        id: "__alloyId144"
    });
    $.__views.main.add($.__views.__alloyId144);
=======
        id: "__alloyId163"
    });
    $.__views.__alloyId157.add($.__views.__alloyId163);
    $.__views.__alloyId146 = Ti.UI.createTableView({
        data: __alloyId147,
        id: "__alloyId146"
    });
    $.__views.main.add($.__views.__alloyId146);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;