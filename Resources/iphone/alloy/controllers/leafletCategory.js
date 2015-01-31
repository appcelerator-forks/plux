function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function navWindow(e) {
        var title = e.source.mod;
        var nav = require("navigation");
        nav.navigationWindow("leaflet", "", "", {
            title: title
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "leafletCategory";
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
    var __defers = {};
    $.__views.leafletCategory = Ti.UI.createWindow({
        fullscreen: true,
        title: "Leaflet",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "leafletCategory"
    });
    $.__views.leafletCategory && $.addTopLevelView($.__views.leafletCategory);
    $.__views.main = Ti.UI.createView({
        backgroundColor: "#4A4A4A",
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        id: "main"
    });
    $.__views.leafletCategory.add($.__views.main);
    $.__views.__alloyId140 = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        contentHeight: "auto",
        layout: "horizontal",
        contentWidth: Titanium.UI.FILL,
        id: "__alloyId140"
    });
    $.__views.main.add($.__views.__alloyId140);
    $.__views.__alloyId141 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Bone Health",
        id: "__alloyId141"
    });
    $.__views.__alloyId140.add($.__views.__alloyId141);
    navWindow ? $.__views.__alloyId141.addEventListener("click", navWindow) : __defers["$.__views.__alloyId141!click!navWindow"] = true;
    $.__views.__alloyId142 = Ti.UI.createLabel({
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Bone Health",
        mod: "Bone Health",
        id: "__alloyId142"
    });
    $.__views.__alloyId141.add($.__views.__alloyId142);
    $.__views.__alloyId143 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Bone Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/bone-health-category.png",
        id: "__alloyId143"
    });
    $.__views.__alloyId141.add($.__views.__alloyId143);
    $.__views.__alloyId144 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Women Health",
        id: "__alloyId144"
    });
    $.__views.__alloyId140.add($.__views.__alloyId144);
    navWindow ? $.__views.__alloyId144.addEventListener("click", navWindow) : __defers["$.__views.__alloyId144!click!navWindow"] = true;
    $.__views.__alloyId145 = Ti.UI.createLabel({
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Women Health",
        mod: "Women Health",
        id: "__alloyId145"
    });
    $.__views.__alloyId144.add($.__views.__alloyId145);
    $.__views.__alloyId146 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Women Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/women-health-category.png",
        id: "__alloyId146"
    });
    $.__views.__alloyId144.add($.__views.__alloyId146);
    $.__views.__alloyId147 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId147"
    });
    $.__views.__alloyId140.add($.__views.__alloyId147);
    navWindow ? $.__views.__alloyId147.addEventListener("click", navWindow) : __defers["$.__views.__alloyId147!click!navWindow"] = true;
    $.__views.__alloyId148 = Ti.UI.createLabel({
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Man Health",
        mod: "Man Health",
        id: "__alloyId148"
    });
    $.__views.__alloyId147.add($.__views.__alloyId148);
    $.__views.__alloyId149 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId149"
    });
    $.__views.__alloyId147.add($.__views.__alloyId149);
    $.__views.__alloyId150 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId150"
    });
    $.__views.__alloyId140.add($.__views.__alloyId150);
    navWindow ? $.__views.__alloyId150.addEventListener("click", navWindow) : __defers["$.__views.__alloyId150!click!navWindow"] = true;
    $.__views.__alloyId151 = Ti.UI.createLabel({
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Children Health",
        mod: "Children Health",
        id: "__alloyId151"
    });
    $.__views.__alloyId150.add($.__views.__alloyId151);
    $.__views.__alloyId152 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId152"
    });
    $.__views.__alloyId150.add($.__views.__alloyId152);
    $.__views.__alloyId153 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId153"
    });
    $.__views.__alloyId140.add($.__views.__alloyId153);
    navWindow ? $.__views.__alloyId153.addEventListener("click", navWindow) : __defers["$.__views.__alloyId153!click!navWindow"] = true;
    $.__views.__alloyId154 = Ti.UI.createLabel({
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Man Health",
        mod: "Man Health",
        id: "__alloyId154"
    });
    $.__views.__alloyId153.add($.__views.__alloyId154);
    $.__views.__alloyId155 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId155"
    });
    $.__views.__alloyId153.add($.__views.__alloyId155);
    $.__views.__alloyId156 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId156"
    });
    $.__views.__alloyId140.add($.__views.__alloyId156);
    navWindow ? $.__views.__alloyId156.addEventListener("click", navWindow) : __defers["$.__views.__alloyId156!click!navWindow"] = true;
    $.__views.__alloyId157 = Ti.UI.createLabel({
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Children Health",
        mod: "Children Health",
        id: "__alloyId157"
    });
    $.__views.__alloyId156.add($.__views.__alloyId157);
    $.__views.__alloyId158 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId158"
    });
    $.__views.__alloyId156.add($.__views.__alloyId158);
    $.__views.__alloyId159 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId159"
    });
    $.__views.__alloyId140.add($.__views.__alloyId159);
    navWindow ? $.__views.__alloyId159.addEventListener("click", navWindow) : __defers["$.__views.__alloyId159!click!navWindow"] = true;
    $.__views.__alloyId160 = Ti.UI.createLabel({
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Man Health",
        mod: "Man Health",
        id: "__alloyId160"
    });
    $.__views.__alloyId159.add($.__views.__alloyId160);
    $.__views.__alloyId161 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId161"
    });
    $.__views.__alloyId159.add($.__views.__alloyId161);
    $.__views.__alloyId162 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId162"
    });
    $.__views.__alloyId140.add($.__views.__alloyId162);
    navWindow ? $.__views.__alloyId162.addEventListener("click", navWindow) : __defers["$.__views.__alloyId162!click!navWindow"] = true;
    $.__views.__alloyId163 = Ti.UI.createLabel({
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Children Health",
        mod: "Children Health",
        id: "__alloyId163"
    });
    $.__views.__alloyId162.add($.__views.__alloyId163);
    $.__views.__alloyId164 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId164"
    });
    $.__views.__alloyId162.add($.__views.__alloyId164);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId141!click!navWindow"] && $.__views.__alloyId141.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId144!click!navWindow"] && $.__views.__alloyId144.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId147!click!navWindow"] && $.__views.__alloyId147.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId150!click!navWindow"] && $.__views.__alloyId150.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId153!click!navWindow"] && $.__views.__alloyId153.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId156!click!navWindow"] && $.__views.__alloyId156.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId159!click!navWindow"] && $.__views.__alloyId159.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId162!click!navWindow"] && $.__views.__alloyId162.addEventListener("click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;