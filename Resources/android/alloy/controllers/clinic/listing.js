function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function listing(e) {
        var TheTable = Titanium.UI.createTableView({
            width: "100%",
            separatorColor: "#CE1D1C",
            height: Ti.UI.SIZE,
            top: 0,
            scrollable: false
        });
        var data = [];
        if ("" == e) var arr = details; else var arr = e.details;
        if (arr.length < 1) {
            var noRecord = Ti.UI.createLabel({
                text: "No record found",
                color: "#CE1D1C",
                textAlign: "center",
                font: {
                    fontSize: 14,
                    fontStyle: "italic"
                },
                top: 15,
                width: Ti.UI.SIZE
            });
            $.panelListTbl.add(noRecord);
        } else {
            arr.forEach(function(entry) {
                var row = Titanium.UI.createTableViewRow({
                    touchEnabled: true,
                    height: 70,
                    id: entry.clinicType,
                    selectedBackgroundColor: "#FFE1E1",
                    backgroundColor: "#ffffff"
                });
                console.log("/images/" + entry.clinicType + ".png");
                var leftImage = Titanium.UI.createImageView({
                    image: entry.clinicType + ".png",
                    width: 50,
                    height: 50,
                    left: 10
                });
                var popUpTitle = Titanium.UI.createLabel({
                    text: entry.clinicType,
                    font: {
                        fontSize: 16
                    },
                    source: entry.clinicType,
                    color: "#848484",
                    width: "65%",
                    textAlign: "left",
                    left: 70,
                    height: 25
                });
                var totalPanel = Titanium.UI.createLabel({
                    text: entry.total,
                    source: entry.clinicType,
                    font: {
                        fontSize: 14,
                        fontWeight: "bold"
                    },
                    width: "auto",
                    color: "#848484",
                    right: 50,
                    height: 25
                });
                var rightForwardBtn = Titanium.UI.createImageView({
                    image: "/images/btn-forward.png",
                    source: entry.clinicType,
                    width: 15,
                    right: 20
                });
                row.add(leftImage);
                row.add(popUpTitle);
                row.add(totalPanel);
                row.add(rightForwardBtn);
                data.push(row);
            });
            TheTable.setData(data);
            $.panelListTbl.add(TheTable);
        }
        TheTable.addEventListener("click", function(e) {
            var nav = require("navigation");
            nav.navigateWithArgs("clinic/clinicLocator", {
                clinicType: e.rowData.id
            });
        });
        common.hideLoading();
        Ti.App.removeEventListener("aspClinic", listing);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "clinic/listing";
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
    $.__views.clinicList = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Clinic Type List",
        id: "clinicList",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.clinicList && $.addTopLevelView($.__views.clinicList);
    $.__views.panelListTbl = Ti.UI.createView({
        id: "panelListTbl",
        layout: "vertical"
    });
    $.__views.clinicList.add($.__views.panelListTbl);
    $.__views.__alloyId162 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId162"
    });
    $.__views.panelListTbl.add($.__views.__alloyId162);
    $.__views.__alloyId163 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId163"
    });
    $.__views.__alloyId162.add($.__views.__alloyId163);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId163.add($.__views.btnBack);
    $.__views.__alloyId164 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId164"
    });
    $.__views.__alloyId162.add($.__views.__alloyId164);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Clinic Type List",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId164.add($.__views.pageTitle);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.clinicList.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId165 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId165"
    });
    $.__views.loadingBar.add($.__views.__alloyId165);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var library = Alloy.createCollection("panelList");
    var corp = Ti.App.Properties.getString("corpcode");
    var details;
    common.construct($);
    common.showLoading();
    if ("" == corp) {
        details = library.getCountClinicType();
        listing("");
    } else API.loadPanelList({
        clinicType: ""
    });
    Ti.App.addEventListener("aspClinic", listing);
    $.btnBack.addEventListener("click", function() {
        console.log("close!!");
        nav.closeWindow($.clinicList);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;