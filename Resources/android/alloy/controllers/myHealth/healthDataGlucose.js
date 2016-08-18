function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function hideKeyboard() {
        $.field1.blur();
    }
    function showDatePicker() {
        var datePicker = Ti.UI.createPicker({
            type: Ti.UI.PICKER_TYPE_DATE,
            minDate: new Date(1930, 0, 1),
            maxDate: new Date(yyyy, mm, dd),
            id: "datePicker",
            visible: false
        });
        datePicker.showDatePickerDialog({
            value: new Date(yyyy, parseInt(mm), dd),
            callback: function(e) {
                e.cancel || changeDate(e);
            }
        });
        hideKeyboard();
    }
    function showTimePicker() {
        var timePicker = Ti.UI.createPicker({
            type: Ti.UI.PICKER_TYPE_TIME,
            id: "timePicker",
            visible: false
        });
        timePicker.showTimePickerDialog({
            callback: function(e) {
                e.cancel || changeTime(e);
            }
        });
        hideKeyboard();
    }
    function changeDate(e) {
        hd.changeDate({
            date: e.value
        });
    }
    function changeTime(e) {
        hd.changeTime({
            time: e.value
        });
    }
    function doSaveRecords() {
        var date = $.date_value.text;
        var time = $.time_value.text;
        var field1 = $.field1.value;
        var s_date = date.split("/");
        var newDate = s_date[2] + "-" + s_date[1] + "-" + s_date[0];
        var s_time = time.split(" ");
        var newTime = s_time[0];
        if ("PM" == s_time[1]) {
            hm = newTime.split(":");
            newTime = parseInt(hm[0]) + 12 + ":" + hm[1];
        }
        lib_health.addHealthData({
            date: newDate,
            time: newTime,
            field1: field1,
            amount: field1,
            type: formType
        });
        hd.loadInfo(formType);
        nav.closeWindow($.healthBGWin);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myHealth/healthDataGlucose";
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
    $.__views.healthBGWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Add Data",
        backButtonTitle: "",
        id: "healthBGWin",
        navTintColor: "#CE1D1C"
    });
    $.__views.healthBGWin && $.addTopLevelView($.__views.healthBGWin);
<<<<<<< HEAD
    $.__views.__alloyId684 = Ti.UI.createView({
        id: "__alloyId684"
=======
    $.__views.__alloyId688 = Ti.UI.createView({
        id: "__alloyId688"
>>>>>>> origin/master
    });
    $.__views.saveButton = Ti.UI.createButton({
        touchEnabled: false,
        id: "saveButton",
        color: "#ADADAD",
        title: "Save",
        right: 0
    });
<<<<<<< HEAD
    $.__views.__alloyId684.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, "touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthBGWin.rightNavButton = $.__views.__alloyId684;
=======
    $.__views.__alloyId688.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, "touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthBGWin.rightNavButton = $.__views.__alloyId688;
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.healthBGWin.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId685 = Ti.UI.createView({
=======
    $.__views.__alloyId689 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId685"
    });
    $.__views.main.add($.__views.__alloyId685);
    $.__views.__alloyId686 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId686"
    });
    $.__views.__alloyId685.add($.__views.__alloyId686);
=======
        id: "__alloyId689"
    });
    $.__views.main.add($.__views.__alloyId689);
    $.__views.__alloyId690 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId690"
    });
    $.__views.__alloyId689.add($.__views.__alloyId690);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId686.add($.__views.btnBack);
=======
    $.__views.__alloyId690.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "60%"
    });
<<<<<<< HEAD
    $.__views.__alloyId685.add($.__views.pageTitle);
    $.__views.__alloyId687 = Ti.UI.createLabel({
=======
    $.__views.__alloyId689.add($.__views.pageTitle);
    $.__views.__alloyId691 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Add Data",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId687"
    });
    $.__views.pageTitle.add($.__views.__alloyId687);
    $.__views.__alloyId688 = Ti.UI.createView({
        width: "20%",
        id: "__alloyId688"
    });
    $.__views.__alloyId685.add($.__views.__alloyId688);
=======
        id: "__alloyId691"
    });
    $.__views.pageTitle.add($.__views.__alloyId691);
    $.__views.__alloyId692 = Ti.UI.createView({
        width: "20%",
        id: "__alloyId692"
    });
    $.__views.__alloyId689.add($.__views.__alloyId692);
>>>>>>> origin/master
    $.__views.saveButton = Ti.UI.createButton({
        font: {
            fontSize: "10dp"
        },
        color: "#000",
        touchEnabled: false,
        id: "saveButton",
        title: "Save",
        right: 0
    });
<<<<<<< HEAD
    $.__views.__alloyId688.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, "touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.__alloyId689 = Ti.UI.createView({
        layout: "vertical",
        height: 30,
        top: 10,
        id: "__alloyId689"
    });
    $.__views.main.add($.__views.__alloyId689);
=======
    $.__views.__alloyId692.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, "touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.__alloyId693 = Ti.UI.createView({
        layout: "vertical",
        height: 30,
        top: 10,
        id: "__alloyId693"
    });
    $.__views.main.add($.__views.__alloyId693);
>>>>>>> origin/master
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#878686",
        text: "Please fill in your information below",
        id: "description"
    });
<<<<<<< HEAD
    $.__views.__alloyId689.add($.__views.description);
=======
    $.__views.__alloyId693.add($.__views.description);
>>>>>>> origin/master
    $.__views.table = Ti.UI.createView({
        id: "table",
        height: Ti.UI.SIZE,
        top: 10,
        backgroundColor: "#ffffff",
        layout: "vertical",
        scrollable: false
    });
    $.__views.main.add($.__views.table);
<<<<<<< HEAD
    $.__views.__alloyId690 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId690"
    });
    $.__views.table.add($.__views.__alloyId690);
    showDatePicker ? $.addListener($.__views.__alloyId690, "click", showDatePicker) : __defers["$.__views.__alloyId690!click!showDatePicker"] = true;
    $.__views.__alloyId691 = Ti.UI.createView({
=======
    $.__views.__alloyId694 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId694"
    });
    $.__views.table.add($.__views.__alloyId694);
    showDatePicker ? $.addListener($.__views.__alloyId694, "click", showDatePicker) : __defers["$.__views.__alloyId694!click!showDatePicker"] = true;
    $.__views.__alloyId695 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 45,
        width: "100%",
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId691"
    });
    $.__views.__alloyId690.add($.__views.__alloyId691);
    $.__views.__alloyId692 = Ti.UI.createLabel({
=======
        id: "__alloyId695"
    });
    $.__views.__alloyId694.add($.__views.__alloyId695);
    $.__views.__alloyId696 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#A8A8A8",
        left: 20,
        font: {
            fontSize: "16dp"
        },
        text: "Date",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId692"
    });
    $.__views.__alloyId691.add($.__views.__alloyId692);
=======
        id: "__alloyId696"
    });
    $.__views.__alloyId695.add($.__views.__alloyId696);
>>>>>>> origin/master
    $.__views.date_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        color: "#707070",
        text: "",
        top: 12,
        id: "date_value",
        textAlign: "right"
    });
<<<<<<< HEAD
    $.__views.__alloyId691.add($.__views.date_value);
    $.__views.__alloyId693 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId693"
    });
    $.__views.table.add($.__views.__alloyId693);
    $.__views.__alloyId694 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId694"
    });
    $.__views.table.add($.__views.__alloyId694);
    showTimePicker ? $.addListener($.__views.__alloyId694, "click", showTimePicker) : __defers["$.__views.__alloyId694!click!showTimePicker"] = true;
    $.__views.__alloyId695 = Ti.UI.createView({
        layout: "horizontal",
        height: 45,
        width: "100%",
        id: "__alloyId695"
    });
    $.__views.__alloyId694.add($.__views.__alloyId695);
    $.__views.__alloyId696 = Ti.UI.createLabel({
=======
    $.__views.__alloyId695.add($.__views.date_value);
    $.__views.__alloyId697 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId697"
    });
    $.__views.table.add($.__views.__alloyId697);
    $.__views.__alloyId698 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId698"
    });
    $.__views.table.add($.__views.__alloyId698);
    showTimePicker ? $.addListener($.__views.__alloyId698, "click", showTimePicker) : __defers["$.__views.__alloyId698!click!showTimePicker"] = true;
    $.__views.__alloyId699 = Ti.UI.createView({
        layout: "horizontal",
        height: 45,
        width: "100%",
        id: "__alloyId699"
    });
    $.__views.__alloyId698.add($.__views.__alloyId699);
    $.__views.__alloyId700 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#A8A8A8",
        left: 20,
        font: {
            fontSize: "16dp"
        },
        text: "Time",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId696"
    });
    $.__views.__alloyId695.add($.__views.__alloyId696);
=======
        id: "__alloyId700"
    });
    $.__views.__alloyId699.add($.__views.__alloyId700);
>>>>>>> origin/master
    $.__views.time_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        color: "#707070",
        text: "",
        top: 12,
        id: "time_value",
        textAlign: "right"
    });
<<<<<<< HEAD
    $.__views.__alloyId695.add($.__views.time_value);
    $.__views.__alloyId697 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId697"
    });
    $.__views.table.add($.__views.__alloyId697);
=======
    $.__views.__alloyId699.add($.__views.time_value);
    $.__views.__alloyId701 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId701"
    });
    $.__views.table.add($.__views.__alloyId701);
>>>>>>> origin/master
    $.__views.tvrField1 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "tvrField1",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrField1);
<<<<<<< HEAD
    $.__views.__alloyId698 = Ti.UI.createView({
        layout: "horizontal",
        height: 55,
        width: "100%",
        id: "__alloyId698"
    });
    $.__views.tvrField1.add($.__views.__alloyId698);
    $.__views.__alloyId699 = Ti.UI.createLabel({
=======
    $.__views.__alloyId702 = Ti.UI.createView({
        layout: "horizontal",
        height: 55,
        width: "100%",
        id: "__alloyId702"
    });
    $.__views.tvrField1.add($.__views.__alloyId702);
    $.__views.__alloyId703 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "50%",
        height: Titanium.UI.SIZE,
        color: "#A8A8A8",
        left: 20,
        font: {
            fontSize: "16dp"
        },
        text: "Blood Glucose (mmol/L)",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId699"
    });
    $.__views.__alloyId698.add($.__views.__alloyId699);
=======
        id: "__alloyId703"
    });
    $.__views.__alloyId702.add($.__views.__alloyId703);
>>>>>>> origin/master
    $.__views.field1 = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: "14dp"
        },
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        id: "field1",
        top: 5,
        bottom: 5,
        right: 5,
        textAlign: "right",
        borderColor: "#ffffff",
        value: "",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
<<<<<<< HEAD
    $.__views.__alloyId698.add($.__views.field1);
    $.__views.__alloyId700 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId700"
    });
    $.__views.table.add($.__views.__alloyId700);
=======
    $.__views.__alloyId702.add($.__views.field1);
    $.__views.__alloyId704 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId704"
    });
    $.__views.table.add($.__views.__alloyId704);
>>>>>>> origin/master
    $.__views.selectorView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "selectorView",
        bottom: 0
    });
    $.__views.main.add($.__views.selectorView);
    $.__views.datePicker = Ti.UI.createPicker({
        format24: false,
        calendarViewShown: false,
        id: "datePicker",
        type: Ti.UI.PICKER_TYPE_DATE,
        visible: false
    });
    $.__views.selectorView.add($.__views.datePicker);
    changeDate ? $.addListener($.__views.datePicker, "change", changeDate) : __defers["$.__views.datePicker!change!changeDate"] = true;
    $.__views.timePicker = Ti.UI.createPicker({
        format24: false,
        calendarViewShown: false,
        id: "timePicker",
        type: Ti.UI.PICKER_TYPE_TIME,
        visible: false
    });
    $.__views.selectorView.add($.__views.timePicker);
    changeTime ? $.addListener($.__views.timePicker, "change", changeTime) : __defers["$.__views.timePicker!change!changeTime"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var formType = 8;
    var lib_health = Alloy.createCollection("health");
    var hd = require("healthData");
    hd.construct($);
    hd.todayDate();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    $.field1.addEventListener("change", function(e) {
        var field1 = $.field1.value;
        "" != e.value && "" != field1 ? hd.enableSaveButton() : hd.disableSaveButton();
    });
    $.tvrField1.addEventListener("click", function() {
        $.field1.focus();
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.healthBGWin);
    });
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.addListener($.__views.saveButton, "touchend", doSaveRecords);
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.addListener($.__views.saveButton, "touchend", doSaveRecords);
<<<<<<< HEAD
    __defers["$.__views.__alloyId690!click!showDatePicker"] && $.addListener($.__views.__alloyId690, "click", showDatePicker);
    __defers["$.__views.__alloyId694!click!showTimePicker"] && $.addListener($.__views.__alloyId694, "click", showTimePicker);
=======
    __defers["$.__views.__alloyId694!click!showDatePicker"] && $.addListener($.__views.__alloyId694, "click", showDatePicker);
    __defers["$.__views.__alloyId698!click!showTimePicker"] && $.addListener($.__views.__alloyId698, "click", showTimePicker);
>>>>>>> origin/master
    __defers["$.__views.datePicker!change!changeDate"] && $.addListener($.__views.datePicker, "change", changeDate);
    __defers["$.__views.timePicker!change!changeTime"] && $.addListener($.__views.timePicker, "change", changeTime);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;