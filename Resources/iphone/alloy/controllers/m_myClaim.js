function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init(e) {
        $.date.text = timeFormat(currentDateTime());
        var groups = {};
        for (var i = 0; i < e.data.length; i++) {
            var val = e.data[i];
            groups[val.name] = groups[val.name] || [];
            groups[val.name].push(val);
        }
        Object.keys(groups).map(function(group) {
            var personal_claim_view = Alloy.createController("_person_claim_view", {
                claim_data: groups[group],
                name: group
            }).getView();
            $.main.add(personal_claim_view);
        });
        Ti.UI.removeEventListener("data_loaded", init);
        common.hideLoading();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "m_myClaim";
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
    $.__views.m_myClaim = Ti.UI.createWindow({
        fullscreen: true,
        title: "My Claim Details",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_myClaim"
    });
    $.__views.m_myClaim && $.addTopLevelView($.__views.m_myClaim);
    $.__views.__alloyId246 = Ti.UI.createView({
        id: "__alloyId246"
    });
    $.__views.setting = Ti.UI.createImageView({
        right: "0",
        id: "setting",
        width: "30",
        image: "/images/icon_setting.png"
    });
    $.__views.__alloyId246.add($.__views.setting);
    $.__views.m_myClaim.rightNavButton = $.__views.__alloyId246;
    $.__views.__alloyId247 = Ti.UI.createView({
        id: "__alloyId247"
    });
    $.__views.m_myClaim.add($.__views.__alloyId247);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId247.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Alloy.Globals.topbarTop,
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId248 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId248"
    });
    $.__views.loadingBar.add($.__views.__alloyId248);
    $.__views.main = Ti.UI.createScrollView({
        backgroundColor: "#ffffff",
        id: "main",
        layout: "vertical"
    });
    $.__views.__alloyId247.add($.__views.main);
    $.__views.date = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        color: "#ff0000",
        top: "10dp",
        id: "date"
    });
    $.__views.main.add($.__views.date);
    $.__views.__alloyId249 = Ti.UI.createView({
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId249"
    });
    $.__views.main.add($.__views.__alloyId249);
    $.__views.__alloyId250 = Ti.UI.createView({
        borderColor: "#000000",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId250"
    });
    $.__views.__alloyId249.add($.__views.__alloyId250);
    $.__views.__alloyId251 = Ti.UI.createView({
        backgroundColor: "#ff0000",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId251"
    });
    $.__views.__alloyId250.add($.__views.__alloyId251);
    $.__views.__alloyId252 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 20
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        text: "Claims Balance",
        id: "__alloyId252"
    });
    $.__views.__alloyId251.add($.__views.__alloyId252);
    $.__views.__alloyId253 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId253"
    });
    $.__views.__alloyId250.add($.__views.__alloyId253);
    $.__views.__alloyId254 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp"
        },
        left: 10,
        right: 10,
        text: "KHAIRIL AZMY BIN MOHD AMINUDDIN",
        wordWrap: "false",
        ellipsize: "true",
        id: "__alloyId254"
    });
    $.__views.__alloyId250.add($.__views.__alloyId254);
    $.__views.__alloyId255 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId255"
    });
    $.__views.__alloyId250.add($.__views.__alloyId255);
    $.__views.__alloyId256 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId256"
    });
    $.__views.__alloyId250.add($.__views.__alloyId256);
    $.__views.__alloyId257 = Ti.UI.createLabel({
        width: "60%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        bottom: 5,
        top: 5,
        left: 10,
        text: "GP/OUT-PATIENT",
        id: "__alloyId257"
    });
    $.__views.__alloyId256.add($.__views.__alloyId257);
    $.__views.__alloyId258 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        bottom: 5,
        top: 5,
        color: "#ff0000",
        right: 10,
        text: "RM1000",
        id: "__alloyId258"
    });
    $.__views.__alloyId256.add($.__views.__alloyId258);
    $.__views.__alloyId259 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId259"
    });
    $.__views.__alloyId250.add($.__views.__alloyId259);
    $.__views.__alloyId260 = Ti.UI.createLabel({
        width: "60%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        bottom: 5,
        top: 5,
        left: 10,
        text: "DENTAL",
        id: "__alloyId260"
    });
    $.__views.__alloyId259.add($.__views.__alloyId260);
    $.__views.__alloyId261 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        bottom: 5,
        top: 5,
        color: "#ff0000",
        right: 10,
        text: "RM500",
        id: "__alloyId261"
    });
    $.__views.__alloyId259.add($.__views.__alloyId261);
    $.__views.__alloyId262 = Ti.UI.createView({
        backgroundColor: "#ff0000",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId262"
    });
    $.__views.__alloyId250.add($.__views.__alloyId262);
    $.__views.__alloyId263 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 20
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        text: "Claims Shared Balance",
        id: "__alloyId263"
    });
    $.__views.__alloyId262.add($.__views.__alloyId263);
    $.__views.__alloyId264 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId264"
    });
    $.__views.__alloyId250.add($.__views.__alloyId264);
    $.__views.__alloyId265 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp"
        },
        left: 10,
        right: 10,
        text: "ELEESYA SOFE",
        wordWrap: "false",
        ellipsize: "true",
        id: "__alloyId265"
    });
    $.__views.__alloyId250.add($.__views.__alloyId265);
    $.__views.__alloyId266 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId266"
    });
    $.__views.__alloyId250.add($.__views.__alloyId266);
    $.__views.__alloyId267 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId267"
    });
    $.__views.__alloyId250.add($.__views.__alloyId267);
    $.__views.__alloyId268 = Ti.UI.createLabel({
        width: "60%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        bottom: 5,
        top: 5,
        left: 10,
        text: "GP/OUT-PATIENT",
        id: "__alloyId268"
    });
    $.__views.__alloyId267.add($.__views.__alloyId268);
    $.__views.__alloyId269 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        bottom: 5,
        top: 5,
        color: "#ff0000",
        right: 10,
        text: "RM500",
        id: "__alloyId269"
    });
    $.__views.__alloyId267.add($.__views.__alloyId269);
    $.__views.__alloyId270 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId270"
    });
    $.__views.__alloyId250.add($.__views.__alloyId270);
    $.__views.__alloyId271 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp"
        },
        left: 10,
        right: 10,
        text: "MUHAMMAD IMRAN",
        wordWrap: "false",
        ellipsize: "true",
        id: "__alloyId271"
    });
    $.__views.__alloyId250.add($.__views.__alloyId271);
    $.__views.__alloyId272 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId272"
    });
    $.__views.__alloyId250.add($.__views.__alloyId272);
    $.__views.__alloyId273 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId273"
    });
    $.__views.__alloyId250.add($.__views.__alloyId273);
    $.__views.__alloyId274 = Ti.UI.createLabel({
        width: "60%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        bottom: 5,
        top: 5,
        left: 10,
        text: "GP/OUT-PATIENT",
        id: "__alloyId274"
    });
    $.__views.__alloyId273.add($.__views.__alloyId274);
    $.__views.__alloyId275 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        bottom: 5,
        top: 5,
        color: "#ff0000",
        right: 10,
        text: "RM500",
        id: "__alloyId275"
    });
    $.__views.__alloyId273.add($.__views.__alloyId275);
    $.__views.__alloyId276 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId276"
    });
    $.__views.__alloyId250.add($.__views.__alloyId276);
    $.__views.__alloyId277 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp"
        },
        left: 10,
        right: 10,
        text: "ZETI AZRI ZAMBAHARI",
        wordWrap: "false",
        ellipsize: "true",
        id: "__alloyId277"
    });
    $.__views.__alloyId250.add($.__views.__alloyId277);
    $.__views.__alloyId278 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId278"
    });
    $.__views.__alloyId250.add($.__views.__alloyId278);
    $.__views.__alloyId279 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId279"
    });
    $.__views.__alloyId250.add($.__views.__alloyId279);
    $.__views.__alloyId280 = Ti.UI.createLabel({
        width: "60%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        bottom: 5,
        top: 5,
        left: 10,
        text: "GP/OUT-PATIENT",
        id: "__alloyId280"
    });
    $.__views.__alloyId279.add($.__views.__alloyId280);
    $.__views.__alloyId281 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        bottom: 5,
        top: 5,
        color: "#ff0000",
        right: 10,
        text: "RM500",
        id: "__alloyId281"
    });
    $.__views.__alloyId279.add($.__views.__alloyId281);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users");
    var user = usersModel.getOwnerData();
    API.claimInfo({
        memno: user.icno,
        corpcode: user.corpcode
    });
    common.construct($);
    common.showLoading();
    Ti.UI.addEventListener("data_loaded", init);
    $.setting.addEventListener("click", function() {
        var nav = require("navigation");
        nav.navigationWindow("m_ClaimHistory");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;