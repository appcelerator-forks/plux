function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadBarData(e) {
        loadGraph("0" == e.index ? "month" : "year");
    }
    function loadGraph(dataPeriod) {
        hd.loadGraphByType(gType, dataPeriod);
    }
    function addData() {
        hd.navigateGraph(gType);
    }
    function editData() {
        nav.navigateWithArgs("myHealth/healthEditData", {
            gType: gType
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myHealth/healthDataSummary";
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
    var __defers = {};
    $.__views.dashboard = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Dashboard",
        id: "dashboard",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.dashboard && $.addTopLevelView($.__views.dashboard);
<<<<<<< HEAD
    $.__views.__alloyId508 = Ti.UI.createView({
        id: "__alloyId508"
    });
    $.__views.dashboard.add($.__views.__alloyId508);
=======
    $.__views.__alloyId510 = Ti.UI.createView({
        id: "__alloyId510"
    });
    $.__views.dashboard.add($.__views.__alloyId510);
>>>>>>> origin/master
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
<<<<<<< HEAD
    $.__views.__alloyId508.add($.__views.loadingBar);
=======
    $.__views.__alloyId510.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId509 = Ti.UI.createLabel({
=======
    $.__views.__alloyId511 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: "5",
        text: "Loading",
<<<<<<< HEAD
        id: "__alloyId509"
    });
    $.__views.loadingBar.add($.__views.__alloyId509);
=======
        id: "__alloyId511"
    });
    $.__views.loadingBar.add($.__views.__alloyId511);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        height: Ti.UI.SIZE,
        layout: "vertical",
        backgroundColor: "#ffffff",
        top: "0"
    });
<<<<<<< HEAD
    $.__views.__alloyId508.add($.__views.main);
    $.__views.__alloyId510 = Ti.UI.createView({
=======
    $.__views.__alloyId510.add($.__views.main);
    $.__views.__alloyId512 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId510"
    });
    $.__views.main.add($.__views.__alloyId510);
    $.__views.__alloyId511 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId511"
    });
    $.__views.__alloyId510.add($.__views.__alloyId511);
=======
        id: "__alloyId512"
    });
    $.__views.main.add($.__views.__alloyId512);
    $.__views.__alloyId513 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId513"
    });
    $.__views.__alloyId512.add($.__views.__alloyId513);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId511.add($.__views.btnBack);
=======
    $.__views.__alloyId513.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "80%"
    });
<<<<<<< HEAD
    $.__views.__alloyId510.add($.__views.pageTitle);
    $.__views.__alloyId512 = Ti.UI.createLabel({
=======
    $.__views.__alloyId512.add($.__views.pageTitle);
    $.__views.__alloyId514 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "All Recorded Data",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId512"
    });
    $.__views.pageTitle.add($.__views.__alloyId512);
    var __alloyId513 = [];
    var __alloyId516 = {
=======
        id: "__alloyId514"
    });
    $.__views.pageTitle.add($.__views.__alloyId514);
    var __alloyId515 = [];
    var __alloyId518 = {
>>>>>>> origin/master
        font: {
            fontSize: "12dp"
        },
        title: "Month"
    };
<<<<<<< HEAD
    __alloyId513.push(__alloyId516);
    var __alloyId517 = {
=======
    __alloyId515.push(__alloyId518);
    var __alloyId519 = {
>>>>>>> origin/master
        font: {
            fontSize: "12dp"
        },
        title: "Year"
    };
<<<<<<< HEAD
    __alloyId513.push(__alloyId517);
    $.__views.buttonbarData = (require("TabbedBar").createTabbedBar || Ti.UI.iOS.createTabbedBar)({
        labels: __alloyId513,
=======
    __alloyId515.push(__alloyId519);
    $.__views.buttonbarData = (require("TabbedBar").createTabbedBar || Ti.UI.iOS.createTabbedBar)({
        labels: __alloyId515,
>>>>>>> origin/master
        id: "buttonbarData",
        backgroundColor: "#CE1D1C",
        index: "0",
        color: "#ffffff",
        borderColor: "#CE1D1C",
        height: "35",
        width: Ti.UI.FILL
    });
    $.__views.main.add($.__views.buttonbarData);
    $.__views.bmiView = Ti.UI.createView({
        id: "bmiView",
        height: Ti.UI.SIZE,
        width: "100%",
        backgroundColor: "#EBEBEB"
    });
    $.__views.main.add($.__views.bmiView);
<<<<<<< HEAD
    var __alloyId518 = [];
=======
    var __alloyId520 = [];
>>>>>>> origin/master
    $.__views.addHealthData = Ti.UI.createTableViewRow({
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        backgroundSelectedColor: "#FFE1E1",
        id: "addHealthData",
        title: "Add Data Point",
        hasChild: "true"
    });
<<<<<<< HEAD
    __alloyId518.push($.__views.addHealthData);
    addData ? $.addListener($.__views.addHealthData, "click", addData) : __defers["$.__views.addHealthData!click!addData"] = true;
    $.__views.__alloyId519 = Ti.UI.createTableViewRow({
=======
    __alloyId520.push($.__views.addHealthData);
    addData ? $.addListener($.__views.addHealthData, "click", addData) : __defers["$.__views.addHealthData!click!addData"] = true;
    $.__views.__alloyId521 = Ti.UI.createTableViewRow({
>>>>>>> origin/master
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        backgroundSelectedColor: "#FFE1E1",
        title: "Show All Data",
        hasChild: "true",
<<<<<<< HEAD
        id: "__alloyId519"
    });
    __alloyId518.push($.__views.__alloyId519);
    editData ? $.addListener($.__views.__alloyId519, "click", editData) : __defers["$.__views.__alloyId519!click!editData"] = true;
    $.__views.healthTableData = Ti.UI.createTableView({
        data: __alloyId518,
=======
        id: "__alloyId521"
    });
    __alloyId520.push($.__views.__alloyId521);
    editData ? $.addListener($.__views.__alloyId521, "click", editData) : __defers["$.__views.__alloyId521!click!editData"] = true;
    $.__views.healthTableData = Ti.UI.createTableView({
        data: __alloyId520,
>>>>>>> origin/master
        id: "healthTableData",
        height: Ti.UI.SIZE,
        width: "100%",
        scrollable: "false"
    });
    $.__views.main.add($.__views.healthTableData);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var gType = args.gType || 1;
    var hd = require("healthData");
    common.construct($);
    if ("1" == gType) var url = "/html/bmi.html";
    if ("2" == gType) var url = "/html/bloodPressure.html";
    if ("3" == gType) var url = "/html/heartRate.html";
    if ("4" == gType) var url = "/html/bodyTemperature.html";
    if ("5" == gType) var url = "/html/height.html";
    if ("6" == gType) var url = "/html/weight.html";
    if ("7" == gType) var url = "/html/cholestrol.html";
    if ("8" == gType) var url = "/html/glucose.html";
    if ("10" == gType) var url = "/html/steps.html";
    var webview = $.UI.create("WebView", {
        id: "graphWebView",
        width: "100%",
        bottom: 10,
        url: url,
        height: Ti.UI.SIZE,
        backgroundColor: "#EBEBEB"
    });
    var line = $.UI.create("View", {
        height: 1,
        bottom: 0,
        backgroundColor: "#FC7474",
        width: "100%"
    });
    $.bmiView.add(webview);
    $.bmiView.add(line);
    $.buttonbarData.addEventListener("click", loadBarData);
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.dashboard);
    });
    __defers["$.__views.addHealthData!click!addData"] && $.addListener($.__views.addHealthData, "click", addData);
<<<<<<< HEAD
    __defers["$.__views.__alloyId519!click!editData"] && $.addListener($.__views.__alloyId519, "click", editData);
=======
    __defers["$.__views.__alloyId521!click!editData"] && $.addListener($.__views.__alloyId521, "click", editData);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;