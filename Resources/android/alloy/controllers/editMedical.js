function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadMedicalInfo() {
        loadImage();
        var title = details.title;
        "" != title && (title = title.replace(/&quot;/g, "'"));
        var clinic = details.clinic;
        "undefined" == clinic && (clinic = "");
        var treatment = details.treatment;
        "undefined" == treatment && (treatment = "");
        var message = details.message;
        var treatment = treatment;
        $.titleRecord.value = title;
        $.clinicRecord.value = clinic;
        $.proceduceTextArea.value = message;
        $.treatmentTextArea.value = treatment;
        $.lastUpdated.text = "Last updated: " + timeFormat(details.updated);
    }
    function loadImage() {
        var recAttachment = medicalAttachmentModel.getData(id);
        console.log("loadImage" + id);
        console.log(recAttachment);
        var counter = 0;
        removeAllChildren($.attachment);
        recAttachment.length > 0 && recAttachment.forEach(function(att) {
            var myImage = att.img_path;
            $.attachment.add(attachedPhoto(myImage, counter));
            counter++;
        });
    }
    function saveRecord() {
        var title = $.titleRecord.value;
        var clinic = $.clinicRecord.value;
        var message = $.proceduceTextArea.value;
        var treatment = $.treatmentTextArea.value;
        "" == title.trim() && (title = "Untitled - " + common.now());
        var param = {
            id: id,
            u_id: Ti.App.Properties.getString("u_id"),
            clinic: clinic,
            title: title,
            message: message,
            treatment: treatment,
            created: details.created,
            updated: common.now()
        };
        API.callByPost({
            url: "addUpdateMedicalRecord",
            params: param
        }, function() {
            medicalRecordsModel.saveArray([ {
                id: id,
                title: title.trim(),
                clinic: clinic.trim(),
                message: message.trim(),
                treatment: treatment.trim(),
                updated: common.now()
            } ]);
            Ti.App.fireEvent("displayRecords");
            nav.closeWindow($.editRecWin);
        });
    }
    function deleteRecord() {
        var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: [ "Cancel", "Confirm" ],
            message: "Are you sure want to delete this records?",
            title: "Delete Confirmation"
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel;
            if (1 === e.index) {
                var param = {
                    id: id,
                    status: 2
                };
                API.callByPost({
                    url: "changeMedicalRecord",
                    params: param
                }, function(responseText) {
                    console.log(responseText);
                    var res = JSON.parse(responseText);
                    if ("success" == res.status) {
                        medicalRecordsModel.saveArray(res.data);
                        skipUpdate = true;
                        nav.closeWindow($.editRecWin);
                    }
                });
            }
        });
        dialog.show();
    }
    function backAndSave() {
        var title = $.titleRecord.value;
        var message = $.proceduceTextArea.value;
        var treatment = $.treatmentTextArea.value;
        if ("" == title.trim() && "" == message.trim() && "" == treatment.trim()) {
            var recAttachment = medicalAttachmentModel.getRecordByMecId(id);
            0 == recAttachment.length && medicalRecordsModel.removeRecordById(id);
        } else saveRecord();
        Ti.App.fireEvent("displayRecords");
    }
    function attachedPhoto(image, position) {
        var iView = Ti.UI.createView({
            backgroundColor: "#D5D5D5",
            height: 50,
            position: position,
            width: 50,
            left: 5,
            right: 5,
            bottom: 0
        });
        console.log(image);
        var iImage = Ti.UI.createImageView({
            image: image,
            position: position,
            width: Ti.UI.FILL
        });
        iView.add(iImage);
        iView.addEventListener("click", function() {
            var currentTime = new Date();
            if (1e3 > currentTime - clickTime) return;
            clickTime = currentTime;
            var page = Alloy.createController("attachmentDetails", {
                rec_id: id,
                position: position
            }).getView();
            page.open();
            page.animate({
                curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
                opacity: 1,
                duration: 300
            });
        });
        return iView;
    }
    function showCategory() {
        var dialog = Titanium.UI.createOptionDialog({
            title: "Choose a test category...",
            options: [ "Blood Test", "X Ray", "ECG/Stress test", "Urine test", "Medication Records", "Allergic History", "etc", "Cancel" ],
            cancel: 7
        });
        dialog.addEventListener("click", function(e) {
            0 == e.index ? categoryType = "Blood Test" : 1 == e.index ? categoryType = "X Ray" : 2 == e.index ? categoryType = "ECG/Stress test" : 3 == e.index ? categoryType = "Urine test" : 4 == e.index ? categoryType = "Medication Records" : 5 == e.index ? categoryType = "Allergic History" : 6 == e.index && (categoryType = "etc");
            takePhoto();
        });
        dialog.show();
    }
    function takePhoto() {
        var dialog = Titanium.UI.createOptionDialog({
            title: "Choose an image source...",
            options: [ "Camera", "Photo Gallery", "Cancel" ],
            cancel: 2
        });
        Ti.Platform.displayCaps.platformWidth;
        Ti.Platform.displayCaps.platformHeight;
        dialog.addEventListener("click", function(e) {
            if (0 == e.index) Titanium.Media.showCamera({
                success: function(event) {
                    var image = event.media;
                    if (image.width > image.height) {
                        var newWidth = 640;
                        var ratio = 640 / image.width;
                        var newHeight = image.height * ratio;
                    } else {
                        var newHeight = 640;
                        var ratio = 640 / image.height;
                        var newWidth = image.width * ratio;
                    }
                    image = image.imageAsResized(newWidth, newHeight);
                    if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                        blobContainer = image;
                        var getStr = "&medical_id=" + id + "&u_id=" + Ti.App.Properties.getString("u_id") + "&caption=" + categoryType;
                        API.callByPostImage({
                            url: "addMedicalAttachment",
                            params: getStr,
                            image: image
                        }, function(responseText) {
                            var res = JSON.parse(responseText);
                            if ("success" == res.status) {
                                var model = Alloy.createCollection("medicalAttachmentV2");
                                var res = JSON.parse(responseText);
                                var arr = res.data || null;
                                model.saveArray(arr);
                            }
                            loadImage();
                        });
                    }
                },
                cancel: function() {},
                error: function(error) {
                    var a = Titanium.UI.createAlertDialog({
                        title: "Camera"
                    });
                    a.setMessage(error.code == Titanium.Media.NO_CAMERA ? "Device does not have camera" : "Unexpected error: " + error.code);
                    a.show();
                },
                allowImageEditing: true,
                mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ],
                saveToPhotoGallery: true
            }); else if (1 == e.index) {
                Titanium.Media.openPhotoGallery({
                    success: function(event) {
                        var image = event.media;
                        if (image.width > image.height) {
                            var newWidth = 640;
                            var ratio = 640 / image.width;
                            var newHeight = image.height * ratio;
                        } else {
                            var newHeight = 640;
                            var ratio = 640 / image.height;
                            var newWidth = image.width * ratio;
                        }
                        image = image.imageAsResized(newWidth, newHeight);
                        blobContainer = image;
                        ({
                            medical_id: id,
                            u_id: Ti.App.Properties.getString("u_id"),
                            caption: categoryType,
                            Filedata: image
                        });
                        var getStr = "&medical_id=" + id + "&u_id=" + Ti.App.Properties.getString("u_id") + "&caption=" + categoryType;
                        API.callByPostImage({
                            url: "addMedicalAttachment",
                            params: getStr,
                            image: image
                        }, function(responseText) {
                            var res = JSON.parse(responseText);
                            if ("success" == res.status) {
                                var model = Alloy.createCollection("medicalAttachmentV2");
                                var res = JSON.parse(responseText);
                                var arr = res.data || null;
                                model.saveArray(arr);
                            }
                            loadImage();
                        });
                    },
                    cancel: function() {},
                    mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
                });
            }
        });
        dialog.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "editMedical";
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
    $.__views.editRecWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        id: "editRecWin",
        title: "My Medical Record",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.editRecWin && $.addTopLevelView($.__views.editRecWin);
<<<<<<< HEAD
    $.__views.__alloyId114 = Ti.UI.createView({
        layout: "vertical",
        bottom: 90,
        id: "__alloyId114"
    });
    $.__views.editRecWin.add($.__views.__alloyId114);
    $.__views.__alloyId115 = Ti.UI.createView({
=======
    $.__views.__alloyId102 = Ti.UI.createView({
        layout: "vertical",
        bottom: 90,
        id: "__alloyId102"
    });
    $.__views.editRecWin.add($.__views.__alloyId102);
    $.__views.__alloyId103 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId115"
    });
    $.__views.__alloyId114.add($.__views.__alloyId115);
    $.__views.__alloyId116 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId116"
    });
    $.__views.__alloyId115.add($.__views.__alloyId116);
=======
        id: "__alloyId103"
    });
    $.__views.__alloyId102.add($.__views.__alloyId103);
    $.__views.__alloyId104 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId104"
    });
    $.__views.__alloyId103.add($.__views.__alloyId104);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId116.add($.__views.btnBack);
    $.__views.__alloyId117 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId117"
    });
    $.__views.__alloyId115.add($.__views.__alloyId117);
=======
    $.__views.__alloyId104.add($.__views.btnBack);
    $.__views.__alloyId105 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId105"
    });
    $.__views.__alloyId103.add($.__views.__alloyId105);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "My Medical Record",
        id: "pageTitle",
        textAlign: "center"
    });
<<<<<<< HEAD
    $.__views.__alloyId117.add($.__views.pageTitle);
    $.__views.__alloyId118 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId118"
    });
    $.__views.__alloyId115.add($.__views.__alloyId118);
=======
    $.__views.__alloyId105.add($.__views.pageTitle);
    $.__views.__alloyId106 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId106"
    });
    $.__views.__alloyId103.add($.__views.__alloyId106);
>>>>>>> origin/master
    $.__views.saveRecord = Ti.UI.createButton({
        font: {
            fontSize: "10dp"
        },
        color: "#000",
        id: "saveRecord",
        title: "Done"
    });
<<<<<<< HEAD
    $.__views.__alloyId118.add($.__views.saveRecord);
=======
    $.__views.__alloyId106.add($.__views.saveRecord);
>>>>>>> origin/master
    $.__views.titleRecord = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: 40,
        font: {
            fontSize: "14dp"
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "95%",
        backgroundColor: "#ffffff",
        top: 0,
        id: "titleRecord",
        borderColor: "#ffffff",
        hintText: "Medical Problem"
    });
<<<<<<< HEAD
    $.__views.__alloyId114.add($.__views.titleRecord);
    $.__views.__alloyId119 = Ti.UI.createView({
        height: 1,
        width: "100%",
        backgroundColor: "#CE1D1C",
        id: "__alloyId119"
    });
    $.__views.__alloyId114.add($.__views.__alloyId119);
=======
    $.__views.__alloyId102.add($.__views.titleRecord);
    $.__views.__alloyId107 = Ti.UI.createView({
        height: 1,
        width: "100%",
        backgroundColor: "#CE1D1C",
        id: "__alloyId107"
    });
    $.__views.__alloyId102.add($.__views.__alloyId107);
>>>>>>> origin/master
    $.__views.aView = Ti.UI.createScrollView({
        id: "aView",
        height: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        layout: "vertical"
    });
<<<<<<< HEAD
    $.__views.__alloyId114.add($.__views.aView);
    $.__views.__alloyId120 = Ti.UI.createLabel({
=======
    $.__views.__alloyId102.add($.__views.aView);
    $.__views.__alloyId108 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        text: "Clinic/Hospital/Specialist",
        left: 10,
        top: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
<<<<<<< HEAD
        id: "__alloyId120"
    });
    $.__views.aView.add($.__views.__alloyId120);
=======
        id: "__alloyId108"
    });
    $.__views.aView.add($.__views.__alloyId108);
>>>>>>> origin/master
    $.__views.clinicRecord = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: 40,
        font: {
            fontSize: "14dp"
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#f6f6f6",
        top: 0,
        left: 10,
        right: 10,
        id: "clinicRecord",
        borderColor: "#f6f6f6",
        hintText: "Please fill in Clinic/Hospital/Specialist"
    });
    $.__views.aView.add($.__views.clinicRecord);
<<<<<<< HEAD
    $.__views.__alloyId121 = Ti.UI.createLabel({
=======
    $.__views.__alloyId109 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        text: "Treatment",
        left: 10,
        top: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
<<<<<<< HEAD
        id: "__alloyId121"
    });
    $.__views.aView.add($.__views.__alloyId121);
=======
        id: "__alloyId109"
    });
    $.__views.aView.add($.__views.__alloyId109);
>>>>>>> origin/master
    $.__views.treatmentTextArea = Ti.UI.createTextArea({
        id: "treatmentTextArea",
        backgroundColor: "#f6f6f6",
        color: "#888",
        textAlign: "left",
        hintText: "Treatment",
        value: "",
        width: Ti.UI.FILL,
        left: 10,
        right: 10,
        height: 200,
        suppressReturn: false
    });
    $.__views.aView.add($.__views.treatmentTextArea);
<<<<<<< HEAD
    $.__views.__alloyId122 = Ti.UI.createLabel({
=======
    $.__views.__alloyId110 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        text: "Procedures",
        left: 10,
        top: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
<<<<<<< HEAD
        id: "__alloyId122"
    });
    $.__views.aView.add($.__views.__alloyId122);
=======
        id: "__alloyId110"
    });
    $.__views.aView.add($.__views.__alloyId110);
>>>>>>> origin/master
    $.__views.proceduceTextArea = Ti.UI.createTextArea({
        id: "proceduceTextArea",
        backgroundColor: "#f6f6f6",
        color: "#888",
        textAlign: "left",
        hintText: "Procedures",
        value: "",
        width: Ti.UI.FILL,
        left: 10,
        right: 10,
        height: 200,
        suppressReturn: false
    });
    $.__views.aView.add($.__views.proceduceTextArea);
<<<<<<< HEAD
    $.__views.__alloyId123 = Ti.UI.createView({
=======
    $.__views.__alloyId111 = Ti.UI.createView({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        bottom: 40,
        layout: "horizontal",
        height: 50,
<<<<<<< HEAD
        id: "__alloyId123"
    });
    $.__views.editRecWin.add($.__views.__alloyId123);
=======
        id: "__alloyId111"
    });
    $.__views.editRecWin.add($.__views.__alloyId111);
>>>>>>> origin/master
    $.__views.attachment = Ti.UI.createScrollView({
        id: "attachment",
        scrollType: "horizontal",
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "80%"
    });
<<<<<<< HEAD
    $.__views.__alloyId123.add($.__views.attachment);
    $.__views.__alloyId124 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.SIZE,
        id: "__alloyId124"
    });
    $.__views.__alloyId123.add($.__views.__alloyId124);
    showCategory ? $.addListener($.__views.__alloyId124, "click", showCategory) : __defers["$.__views.__alloyId124!click!showCategory"] = true;
    $.__views.__alloyId125 = Ti.UI.createView({
=======
    $.__views.__alloyId111.add($.__views.attachment);
    $.__views.__alloyId112 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.SIZE,
        id: "__alloyId112"
    });
    $.__views.__alloyId111.add($.__views.__alloyId112);
    showCategory ? $.addListener($.__views.__alloyId112, "click", showCategory) : __defers["$.__views.__alloyId112!click!showCategory"] = true;
    $.__views.__alloyId113 = Ti.UI.createView({
>>>>>>> origin/master
        backgroundColor: "#CE1D1C",
        height: 50,
        width: Ti.UI.FILL,
        right: 0,
<<<<<<< HEAD
        id: "__alloyId125"
    });
    $.__views.__alloyId124.add($.__views.__alloyId125);
=======
        id: "__alloyId113"
    });
    $.__views.__alloyId112.add($.__views.__alloyId113);
>>>>>>> origin/master
    $.__views.addLbl = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        id: "addLbl",
        text: "+"
    });
<<<<<<< HEAD
    $.__views.__alloyId125.add($.__views.addLbl);
    $.__views.__alloyId126 = Ti.UI.createView({
=======
    $.__views.__alloyId113.add($.__views.addLbl);
    $.__views.__alloyId114 = Ti.UI.createView({
>>>>>>> origin/master
        height: 40,
        layout: "horizontal",
        bottom: 0,
        width: "100%",
        backgroundColor: "#EEEEEE",
<<<<<<< HEAD
        id: "__alloyId126"
    });
    $.__views.editRecWin.add($.__views.__alloyId126);
    $.__views.__alloyId127 = Ti.UI.createButton({
=======
        id: "__alloyId114"
    });
    $.__views.editRecWin.add($.__views.__alloyId114);
    $.__views.__alloyId115 = Ti.UI.createButton({
>>>>>>> origin/master
        backgroundImage: "/images/btn-remove.png",
        textAlign: "left",
        left: 15,
        width: 30,
        height: 30,
<<<<<<< HEAD
        id: "__alloyId127"
    });
    $.__views.__alloyId126.add($.__views.__alloyId127);
    deleteRecord ? $.addListener($.__views.__alloyId127, "click", deleteRecord) : __defers["$.__views.__alloyId127!click!deleteRecord"] = true;
    $.__views.__alloyId128 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.FILL,
        id: "__alloyId128"
    });
    $.__views.__alloyId126.add($.__views.__alloyId128);
=======
        id: "__alloyId115"
    });
    $.__views.__alloyId114.add($.__views.__alloyId115);
    deleteRecord ? $.addListener($.__views.__alloyId115, "click", deleteRecord) : __defers["$.__views.__alloyId115!click!deleteRecord"] = true;
    $.__views.__alloyId116 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.FILL,
        id: "__alloyId116"
    });
    $.__views.__alloyId114.add($.__views.__alloyId116);
>>>>>>> origin/master
    $.__views.lastUpdated = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#888",
        font: {
            fontSize: "12dp"
        },
        id: "lastUpdated",
        textAlign: "right",
        right: 10
    });
<<<<<<< HEAD
    $.__views.__alloyId128.add($.__views.lastUpdated);
=======
    $.__views.__alloyId116.add($.__views.lastUpdated);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var id = args.id || "";
    var MRECORDS = require("medicalRecords");
    MRECORDS.construct($);
    var clickTime = null;
    var skipUpdate = false;
    var medicalAttachmentModel = Alloy.createCollection("medicalAttachmentV2");
    var medicalRecordsModel = Alloy.createCollection("medicalRecordsV2");
    var details = medicalRecordsModel.getDataById(id);
    loadMedicalInfo();
    var categoryType = "Blood Test";
    $.proceduceTextArea.addEventListener("focus", function() {});
    $.editRecWin.addEventListener("close", function() {
        skipUpdate || backAndSave();
        Ti.App.removeEventListener("refreshAttachment", loadImage);
        $.destroy();
        Ti.App.fireEvent("myMedicalRecord:refresh");
        console.log("window close");
    });
    Ti.App.addEventListener("refreshAttachment", loadImage);
    $.saveRecord.addEventListener("click", saveRecord);
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.editRecWin);
    });
    var applicationDatDirectory = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory);
    applicationDatDirectory.getDirectoryListing();
<<<<<<< HEAD
    __defers["$.__views.__alloyId124!click!showCategory"] && $.addListener($.__views.__alloyId124, "click", showCategory);
    __defers["$.__views.__alloyId127!click!deleteRecord"] && $.addListener($.__views.__alloyId127, "click", deleteRecord);
=======
    __defers["$.__views.__alloyId112!click!showCategory"] && $.addListener($.__views.__alloyId112, "click", showCategory);
    __defers["$.__views.__alloyId115!click!deleteRecord"] && $.addListener($.__views.__alloyId115, "click", deleteRecord);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;