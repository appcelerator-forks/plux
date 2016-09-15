function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function saveRecord() {
        var remark = $.remarkTextArea.value;
        var appDate = $.appointment_datetime.text;
        var param_specialty = $.specialty.text || "";
        var appClinic = selectedClinic || "";
        if ("Choose Date and Time" == appDate) {
            common.createAlert("Fail", "Please choose appointment date and time");
            return false;
        }
        if ("" == appClinic) {
            common.createAlert("Fail", "Please choose a clinic");
            return false;
        }
        console.log(appDate);
        appDate = convertToDBDateFormat(appDate);
        remark = remark.replace(/\r?\n/g, "<br />");
        var param = {
            id: appointment_id,
            u_id: Ti.App.Properties.getString("u_id"),
            start_date: appDate,
            duration: duration,
            clinic_id: appClinic,
            specialty: param_specialty,
            remark: remark.trim(),
            created: currentDateTime(),
            updated: currentDateTime()
        };
        console.log(param);
        Ti.App.fireEvent("appointment_index:loadingStart");
        API.addAppointment({
            param: param
        }, savedAppointment);
    }
    function savedAppointment(ex) {
        var result = ex.param;
        console.log(result);
        if ("error" == result.status) {
            common.createAlert("Error", result.data);
            return false;
        }
        appointmentModel.saveArray(result.data);
        Ti.App.fireEvent("displayRecords");
        Ti.App.fireEvent("appointment_index:loadingFinish");
        Ti.App.fireEvent("appointment_index:windowClose");
    }
    function init() {
        details = appointmentModel.getAppointmentById(appointment_id) || "";
        if ("" != details) {
            var remark = details.remark;
            var regex = /<br\s*[\/]?>/gi;
            if (details.date >= currentDateTime()) $.remarkTextArea.value = remark.replace(regex, "\n"); else {
                $.remarkTextArea.height = 0;
                $.remarkTextArea_readonly.height = Ti.UI.SIZE;
                $.remarkTextArea_readonly.text = remark.replace(regex, "\n");
            }
            $.appointment_datetime.text = timeFormat(details.date);
            $.appointment_datetime.color = "#000000";
            var clinic = panelListModel.getPanelListById(details.clinic_id);
            $.appointment_clinic.text = clinic.clinicName;
            $.appointment_clinic.color = "#000000";
            selectedClinic = details.clinic_id;
            var specialty_field = details.specialty;
            $.specialty.text = specialty_field;
        }
        var curDate = currentDateTime();
        var d = curDate.substr(0, 10);
        var cd = d.split("-");
        var t = curDate.substr(2, 16);
        var ct = t.split(":");
        var minDate = new Date();
        minDate.setFullYear(cd[0]);
        minDate.setMonth(parseInt(cd[1]) - 1);
        minDate.setDate(parseInt(cd[2]));
        if ("" != details) {
            var selDate = details.date;
            d = selDate.substr(0, 10);
            cd = d.split("-");
            t = selDate.substr(2, 16);
            ct = t.split(":");
        }
        var value = new Date();
        value.setFullYear(cd[0]);
        value.setMonth(parseInt(cd[1]) - 1);
        value.setDate(parseInt(cd[2]));
        value.setHours(ct[0], ct[1], 0);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "askDoctor/_appointment_form";
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
    $.__views.aView = Ti.UI.createScrollView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "aView",
        top: 10,
        contentWidth: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        backgroundColor: "#ffffff"
    });
    $.__views.aView && $.addTopLevelView($.__views.aView);
    $.__views.tvrName = Ti.UI.createView({
        id: "tvrName",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.aView.add($.__views.tvrName);
<<<<<<< HEAD
    $.__views.__alloyId393 = Ti.UI.createView({
=======
    $.__views.__alloyId391 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId393"
    });
    $.__views.tvrName.add($.__views.__alloyId393);
    $.__views.__alloyId394 = Ti.UI.createLabel({
=======
        id: "__alloyId391"
    });
    $.__views.tvrName.add($.__views.__alloyId391);
    $.__views.__alloyId392 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Patient Name",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId394"
    });
    $.__views.__alloyId393.add($.__views.__alloyId394);
    $.__views.__alloyId395 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId395"
    });
    $.__views.__alloyId393.add($.__views.__alloyId395);
=======
        id: "__alloyId392"
    });
    $.__views.__alloyId391.add($.__views.__alloyId392);
    $.__views.__alloyId393 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId393"
    });
    $.__views.__alloyId391.add($.__views.__alloyId393);
>>>>>>> origin/master
    $.__views.patient_name = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#000000",
        top: 12,
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 12
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "Date of visit a clinic",
        id: "patient_name"
    });
<<<<<<< HEAD
    $.__views.__alloyId395.add($.__views.patient_name);
    $.__views.__alloyId396 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId396"
    });
    $.__views.aView.add($.__views.__alloyId396);
=======
    $.__views.__alloyId393.add($.__views.patient_name);
    $.__views.__alloyId394 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId394"
    });
    $.__views.aView.add($.__views.__alloyId394);
>>>>>>> origin/master
    $.__views.tvrEmail = Ti.UI.createView({
        id: "tvrEmail",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.aView.add($.__views.tvrEmail);
<<<<<<< HEAD
    $.__views.__alloyId397 = Ti.UI.createView({
=======
    $.__views.__alloyId395 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId397"
    });
    $.__views.tvrEmail.add($.__views.__alloyId397);
    $.__views.__alloyId398 = Ti.UI.createLabel({
=======
        id: "__alloyId395"
    });
    $.__views.tvrEmail.add($.__views.__alloyId395);
    $.__views.__alloyId396 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Patient Email",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId398"
    });
    $.__views.__alloyId397.add($.__views.__alloyId398);
    $.__views.__alloyId399 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId399"
    });
    $.__views.__alloyId397.add($.__views.__alloyId399);
=======
        id: "__alloyId396"
    });
    $.__views.__alloyId395.add($.__views.__alloyId396);
    $.__views.__alloyId397 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId397"
    });
    $.__views.__alloyId395.add($.__views.__alloyId397);
>>>>>>> origin/master
    $.__views.patient_email = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#000000",
        top: 12,
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 12
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "Date of visit a clinic",
        id: "patient_email"
    });
<<<<<<< HEAD
    $.__views.__alloyId399.add($.__views.patient_email);
    $.__views.__alloyId400 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId400"
    });
    $.__views.aView.add($.__views.__alloyId400);
=======
    $.__views.__alloyId397.add($.__views.patient_email);
    $.__views.__alloyId398 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId398"
    });
    $.__views.aView.add($.__views.__alloyId398);
>>>>>>> origin/master
    $.__views.tvrDateVisit = Ti.UI.createView({
        id: "tvrDateVisit",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.aView.add($.__views.tvrDateVisit);
<<<<<<< HEAD
    $.__views.__alloyId401 = Ti.UI.createView({
=======
    $.__views.__alloyId399 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId401"
    });
    $.__views.tvrDateVisit.add($.__views.__alloyId401);
    $.__views.__alloyId402 = Ti.UI.createLabel({
=======
        id: "__alloyId399"
    });
    $.__views.tvrDateVisit.add($.__views.__alloyId399);
    $.__views.__alloyId400 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Appointment Date & Time",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId402"
    });
    $.__views.__alloyId401.add($.__views.__alloyId402);
    $.__views.__alloyId403 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId403"
    });
    $.__views.__alloyId401.add($.__views.__alloyId403);
=======
        id: "__alloyId400"
    });
    $.__views.__alloyId399.add($.__views.__alloyId400);
    $.__views.__alloyId401 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId401"
    });
    $.__views.__alloyId399.add($.__views.__alloyId401);
>>>>>>> origin/master
    $.__views.appointment_datetime = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#C8C8CD",
        top: 12,
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 12
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "Choose Date and Time",
        id: "appointment_datetime"
    });
<<<<<<< HEAD
    $.__views.__alloyId403.add($.__views.appointment_datetime);
    $.__views.__alloyId404 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId404"
    });
    $.__views.aView.add($.__views.__alloyId404);
    $.__views.__alloyId405 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId405"
    });
    $.__views.aView.add($.__views.__alloyId405);
    $.__views.__alloyId406 = Ti.UI.createView({
=======
    $.__views.__alloyId401.add($.__views.appointment_datetime);
    $.__views.__alloyId402 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId402"
    });
    $.__views.aView.add($.__views.__alloyId402);
    $.__views.__alloyId403 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId403"
    });
    $.__views.aView.add($.__views.__alloyId403);
    $.__views.__alloyId404 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId406"
    });
    $.__views.__alloyId405.add($.__views.__alloyId406);
    $.__views.__alloyId407 = Ti.UI.createLabel({
=======
        id: "__alloyId404"
    });
    $.__views.__alloyId403.add($.__views.__alloyId404);
    $.__views.__alloyId405 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Clinic",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId407"
    });
    $.__views.__alloyId406.add($.__views.__alloyId407);
    $.__views.__alloyId408 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId408"
    });
    $.__views.__alloyId406.add($.__views.__alloyId408);
=======
        id: "__alloyId405"
    });
    $.__views.__alloyId404.add($.__views.__alloyId405);
    $.__views.__alloyId406 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId406"
    });
    $.__views.__alloyId404.add($.__views.__alloyId406);
>>>>>>> origin/master
    $.__views.appointment_clinic = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#C8C8CD",
        top: 12,
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 12
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "Choose Clinic to attend",
        id: "appointment_clinic"
    });
<<<<<<< HEAD
    $.__views.__alloyId408.add($.__views.appointment_clinic);
    $.__views.__alloyId409 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId409"
    });
    $.__views.aView.add($.__views.__alloyId409);
    $.__views.__alloyId410 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId410"
    });
    $.__views.aView.add($.__views.__alloyId410);
    $.__views.__alloyId411 = Ti.UI.createView({
=======
    $.__views.__alloyId406.add($.__views.appointment_clinic);
    $.__views.__alloyId407 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId407"
    });
    $.__views.aView.add($.__views.__alloyId407);
    $.__views.__alloyId408 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId408"
    });
    $.__views.aView.add($.__views.__alloyId408);
    $.__views.__alloyId409 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId411"
    });
    $.__views.__alloyId410.add($.__views.__alloyId411);
    $.__views.__alloyId412 = Ti.UI.createLabel({
=======
        id: "__alloyId409"
    });
    $.__views.__alloyId408.add($.__views.__alloyId409);
    $.__views.__alloyId410 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Specialty",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId412"
    });
    $.__views.__alloyId411.add($.__views.__alloyId412);
    $.__views.__alloyId413 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId413"
    });
    $.__views.__alloyId411.add($.__views.__alloyId413);
=======
        id: "__alloyId410"
    });
    $.__views.__alloyId409.add($.__views.__alloyId410);
    $.__views.__alloyId411 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId411"
    });
    $.__views.__alloyId409.add($.__views.__alloyId411);
>>>>>>> origin/master
    $.__views.specialty = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#C8C8CD",
        top: 12,
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 12
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "Choose Specialty",
        id: "specialty"
    });
<<<<<<< HEAD
    $.__views.__alloyId413.add($.__views.specialty);
    $.__views.__alloyId414 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId414"
    });
    $.__views.aView.add($.__views.__alloyId414);
    $.__views.__alloyId415 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId415"
    });
    $.__views.aView.add($.__views.__alloyId415);
    $.__views.__alloyId416 = Ti.UI.createView({
=======
    $.__views.__alloyId411.add($.__views.specialty);
    $.__views.__alloyId412 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId412"
    });
    $.__views.aView.add($.__views.__alloyId412);
    $.__views.__alloyId413 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId413"
    });
    $.__views.aView.add($.__views.__alloyId413);
    $.__views.__alloyId414 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId416"
    });
    $.__views.__alloyId415.add($.__views.__alloyId416);
    $.__views.__alloyId417 = Ti.UI.createLabel({
=======
        id: "__alloyId414"
    });
    $.__views.__alloyId413.add($.__views.__alloyId414);
    $.__views.__alloyId415 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Remark",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId417"
    });
    $.__views.__alloyId416.add($.__views.__alloyId417);
=======
        id: "__alloyId415"
    });
    $.__views.__alloyId414.add($.__views.__alloyId415);
>>>>>>> origin/master
    $.__views.remarkTextArea = Ti.UI.createTextArea({
        font: {
            fontSize: 12
        },
        id: "remarkTextArea",
        color: "#000000",
        textAlign: "right",
        hintText: "Remark",
        value: "",
        width: Ti.UI.FILL,
        left: 10,
        right: 10,
        height: 100,
        suppressReturn: false
    });
<<<<<<< HEAD
    $.__views.__alloyId416.add($.__views.remarkTextArea);
    $.__views.__alloyId418 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId418"
    });
    $.__views.aView.add($.__views.__alloyId418);
    $.__views.__alloyId419 = Ti.UI.createView({
=======
    $.__views.__alloyId414.add($.__views.remarkTextArea);
    $.__views.__alloyId416 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId416"
    });
    $.__views.aView.add($.__views.__alloyId416);
    $.__views.__alloyId417 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 10,
<<<<<<< HEAD
        id: "__alloyId419"
    });
    $.__views.aView.add($.__views.__alloyId419);
    $.__views.__alloyId420 = Ti.UI.createButton({
=======
        id: "__alloyId417"
    });
    $.__views.aView.add($.__views.__alloyId417);
    $.__views.__alloyId418 = Ti.UI.createButton({
>>>>>>> origin/master
        title: "Submit Appointment",
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        width: "70%",
        top: 5,
        height: 40,
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId420"
    });
    $.__views.__alloyId419.add($.__views.__alloyId420);
    saveRecord ? $.addListener($.__views.__alloyId420, "click", saveRecord) : __defers["$.__views.__alloyId420!click!saveRecord"] = true;
=======
        id: "__alloyId418"
    });
    $.__views.__alloyId417.add($.__views.__alloyId418);
    saveRecord ? $.addListener($.__views.__alloyId418, "click", saveRecord) : __defers["$.__views.__alloyId418!click!saveRecord"] = true;
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var appointment_id = args.appointment_id || "";
    var userModel = Alloy.createCollection("users_plux");
    var appointmentModel = Alloy.createCollection("appointment");
    var user = userModel.getUserById(Ti.App.Properties.getString("u_id"));
    var panelListModel = Alloy.createCollection("panelList");
    var selectedClinic;
    var appointmentDatetime;
    var duration = parseInt(Ti.App.Properties.getString("timeblock")) || 30;
    $.patient_name.text = user.fullname;
    $.patient_email.text = user.email;
    Titanium.UI.createView({
        layout: "vertical",
        height: 200,
        width: Ti.UI.FILL,
        visible: true
    });
    init();
    $.update_selectClinic = function(e) {
        selectedClinic = e.clinicId;
        $.appointment_clinic.text = e.clinicName;
        $.appointment_clinic.color = "#000000";
    };
    $.update_specialty = function(e) {
        $.specialty.text = e.specialty;
        $.specialty.color = "#000000";
    };
    $.update_chooseDateTime = function(e) {
        appointmentDatetime = e.date;
        $.appointment_datetime.text = e.date;
        $.appointment_datetime.color = "#000000";
    };
    $.appointment_datetime.addEventListener("click", function() {
        Ti.App.fireEvent("appointment_index:scrollToViewPage", {
            number: 2
        });
    });
    $.appointment_clinic.addEventListener("click", function() {
        Ti.App.fireEvent("appointment_index:scrollToViewPage", {
            number: 0
        });
    });
<<<<<<< HEAD
    __defers["$.__views.__alloyId420!click!saveRecord"] && $.addListener($.__views.__alloyId420, "click", saveRecord);
=======
    __defers["$.__views.__alloyId418!click!saveRecord"] && $.addListener($.__views.__alloyId418, "click", saveRecord);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;