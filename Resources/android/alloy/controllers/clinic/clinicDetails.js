function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function populateMap(mapHeight) {
        if ("" != details.latitude && "" != details.longitude) {
            var mapview = Map.createView({
                mapType: Map.NORMAL_TYPE,
                region: {
                    latitude: details.latitude,
                    longitude: details.longitude,
                    latitudeDelta: .005,
                    longitudeDelta: .005
                },
                animate: true,
                regionFit: true,
                height: mapHeight,
                top: 0,
                userLocation: true
            });
            var merchantLoc = Map.createAnnotation({
                latitude: details.latitude,
                longitude: details.longitude,
                title: details.clinicName,
                image: "/images/marker.png",
                animate: true,
                pincolor: Map.ANNOTATION_RED
            });
            mapview.addAnnotation(merchantLoc);
            $.clinicMap.height = mapHeight;
            $.clinicMap.add(mapview);
        }
    }
    function clickToCall() {
        var tel = details.tel;
        tel = tel.replace(/[+]/g, "");
        Ti.Platform.openURL("tel:+" + tel);
    }
    function addToContact() {
        "1" != isAddedToContact && (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED ? performAddressBookFunction() : Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN ? Ti.Contacts.requestAuthorization(function(e) {
            e.success ? performAddressBookFunction() : addressBookDisallowed();
        }) : addressBookDisallowed());
    }
    function direction2here() {
        var locationCallback = function(e) {
            if (!e.success || e.error) {
                alert("Please enable location services");
                Ti.API.info("error:" + JSON.stringify(e.error));
                return;
            }
            var longitude = e.coords.longitude;
            var latitude = e.coords.latitude;
            var url = "geo:" + latitude + "," + longitude + "?q=" + details.clinicName + " (" + details.add1 + "\r\n" + add2 + details.postcode + ", " + details.city + "\r\n" + details.state + ")";
            if (Ti.Android) try {
                var waze_url = "waze://?ll=" + details.latitude + "," + details.longitude + "&navigate=yes";
                var intent = Ti.Android.createIntent({
                    action: Ti.Android.ACTION_VIEW,
                    data: waze_url
                });
                Ti.Android.currentActivity.startActivity(intent);
            } catch (ex) {
                try {
                    Ti.API.info("Trying to Launch via Intent");
                    var intent = Ti.Android.createIntent({
                        action: Ti.Android.ACTION_VIEW,
                        data: url
                    });
                    Ti.Android.currentActivity.startActivity(intent);
                } catch (e) {
                    Ti.API.info("Caught Error launching intent: " + e);
                    exports.Install();
                }
            } else Titanium.Platform.openURL("Maps://http://maps.google.com/maps?ie=UTF8&t=h&z=16&saddr=" + latitude + "," + longitude + "&daddr=" + details.latitude + "," + details.longitude);
            Titanium.Geolocation.removeEventListener("location", locationCallback);
        };
        Titanium.Geolocation.addEventListener("location", locationCallback);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "clinic/clinicDetails";
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
    $.__views.panelDetails = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Panel Details",
        id: "panelDetails",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.panelDetails && $.addTopLevelView($.__views.panelDetails);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.panelDetails.add($.__views.main);
    $.__views.__alloyId505 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId505"
    });
    $.__views.main.add($.__views.__alloyId505);
    $.__views.__alloyId506 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId506"
    });
    $.__views.__alloyId505.add($.__views.__alloyId506);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId506.add($.__views.btnBack);
    $.__views.__alloyId507 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId507"
    });
    $.__views.__alloyId505.add($.__views.__alloyId507);
    $.__views.__alloyId508 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Panel Details",
        textAlign: "center",
        id: "__alloyId508"
    });
    $.__views.__alloyId507.add($.__views.__alloyId508);
    $.__views.__alloyId509 = Ti.UI.createView({
        right: 0,
        width: "20%",
        id: "__alloyId509"
    });
    $.__views.__alloyId505.add($.__views.__alloyId509);
    $.__views.btnDirection = Ti.UI.createImageView({
        right: 10,
        id: "btnDirection",
        visible: false,
        width: 25,
        height: 25,
        image: "/images/map.png"
    });
    $.__views.__alloyId509.add($.__views.btnDirection);
    $.__views.__alloyId510 = Ti.UI.createScrollView({
        layout: "vertical",
        scrollType: "vertical",
        backgroundColor: "#ffffff",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: 0,
        id: "__alloyId510"
    });
    $.__views.main.add($.__views.__alloyId510);
    $.__views.__alloyId511 = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10,
        bottom: 0,
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        borderColor: "#dfe0e4",
        backgroundColor: "#F5F5F5",
        borderRadius: "5",
        id: "__alloyId511"
    });
    $.__views.__alloyId510.add($.__views.__alloyId511);
    $.__views.clinicMap = Ti.UI.createView({
        id: "clinicMap",
        height: 0,
        width: Ti.UI.FILL
    });
    $.__views.__alloyId511.add($.__views.clinicMap);
    $.__views.showFullMap = Ti.UI.createImageView({
        right: 10,
        top: 10,
        id: "showFullMap",
        zIndex: 99,
        width: 25,
        height: 25,
        image: "/images/zoom_in.png"
    });
    $.__views.clinicMap.add($.__views.showFullMap);
    $.__views.__alloyId512 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        borderColor: "#dfe0e4",
        backgroundColor: "#ffffff",
        borderRadius: "5",
        top: 0,
        height: 80,
        id: "__alloyId512"
    });
    $.__views.__alloyId511.add($.__views.__alloyId512);
    $.__views.__alloyId513 = Ti.UI.createView({
        width: "32%",
        height: 80,
        layout: "vertical",
        id: "__alloyId513"
    });
    $.__views.__alloyId512.add($.__views.__alloyId513);
    direction2here ? $.addListener($.__views.__alloyId513, "click", direction2here) : __defers["$.__views.__alloyId513!click!direction2here"] = true;
    $.__views.__alloyId514 = Ti.UI.createImageView({
        image: "/images/map.png",
        width: 40,
        height: 40,
        top: 5,
        id: "__alloyId514"
    });
    $.__views.__alloyId513.add($.__views.__alloyId514);
    $.__views.__alloyId515 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#626262",
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Direction To Here",
        id: "__alloyId515"
    });
    $.__views.__alloyId513.add($.__views.__alloyId515);
    $.__views.__alloyId516 = Ti.UI.createView({
        width: 1,
        height: 80,
        backgroundColor: "#dfe0e4",
        id: "__alloyId516"
    });
    $.__views.__alloyId512.add($.__views.__alloyId516);
    $.__views.__alloyId517 = Ti.UI.createView({
        width: "32%",
        height: 80,
        layout: "vertical",
        id: "__alloyId517"
    });
    $.__views.__alloyId512.add($.__views.__alloyId517);
    clickToCall ? $.addListener($.__views.__alloyId517, "click", clickToCall) : __defers["$.__views.__alloyId517!click!clickToCall"] = true;
    $.__views.__alloyId518 = Ti.UI.createImageView({
        image: "/images/call.png",
        width: 30,
        height: 30,
        top: 5,
        id: "__alloyId518"
    });
    $.__views.__alloyId517.add($.__views.__alloyId518);
    $.__views.__alloyId519 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#626262",
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Call",
        top: 10,
        id: "__alloyId519"
    });
    $.__views.__alloyId517.add($.__views.__alloyId519);
    $.__views.__alloyId520 = Ti.UI.createView({
        width: 1,
        height: 80,
        backgroundColor: "#dfe0e4",
        id: "__alloyId520"
    });
    $.__views.__alloyId512.add($.__views.__alloyId520);
    $.__views.add2contact = Ti.UI.createView({
        width: "auto",
        height: 80,
        id: "add2contact",
        layout: "vertical"
    });
    $.__views.__alloyId512.add($.__views.add2contact);
    addToContact ? $.addListener($.__views.add2contact, "click", addToContact) : __defers["$.__views.add2contact!click!addToContact"] = true;
    $.__views.__alloyId521 = Ti.UI.createImageView({
        image: "/images/add_to_contact.png",
        width: 35,
        height: 35,
        top: 5,
        id: "__alloyId521"
    });
    $.__views.add2contact.add($.__views.__alloyId521);
    $.__views.__alloyId522 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#626262",
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Add To Contact",
        top: 5,
        id: "__alloyId522"
    });
    $.__views.add2contact.add($.__views.__alloyId522);
    $.__views.clinicDetails = Ti.UI.createView({
        layout: "vertical",
        id: "clinicDetails",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId511.add($.__views.clinicDetails);
    $.__views.clinicName = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#5E5E5E",
        left: 10,
        font: {
            fontSize: 18
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "clinicName",
        top: 10,
        bottom: 10
    });
    $.__views.clinicDetails.add($.__views.clinicName);
    $.__views.__alloyId523 = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        left: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Address",
        id: "__alloyId523"
    });
    $.__views.clinicDetails.add($.__views.__alloyId523);
    $.__views.clinicAddress = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        color: "#777777",
        left: 10,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicAddress",
        bottom: 10
    });
    $.__views.clinicDetails.add($.__views.clinicAddress);
    $.__views.__alloyId524 = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        left: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Coordinate",
        id: "__alloyId524"
    });
    $.__views.clinicDetails.add($.__views.__alloyId524);
    $.__views.clinicLocation = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        color: "#777777",
        left: 10,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicLocation",
        bottom: 10
    });
    $.__views.clinicDetails.add($.__views.clinicLocation);
    $.__views.__alloyId525 = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        left: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Telephone/Mobile",
        id: "__alloyId525"
    });
    $.__views.clinicDetails.add($.__views.__alloyId525);
    $.__views.clinicTel = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        color: "#777777",
        left: 10,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicTel",
        bottom: 10
    });
    $.__views.clinicDetails.add($.__views.clinicTel);
    $.__views.__alloyId526 = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        left: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Operation Hours",
        id: "__alloyId526"
    });
    $.__views.clinicDetails.add($.__views.__alloyId526);
    $.__views.clinicOper = Ti.UI.createView({
        left: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        font: {
            fontSize: 14
        },
        color: "#777777",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        layout: "vertical",
        right: 5,
        id: "clinicOper",
        bottom: 10
    });
    $.__views.clinicDetails.add($.__views.clinicOper);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var Map = require("ti.map");
    var panel_id = args.panel_id || "";
    var panelListModel = Alloy.createCollection("panelList");
    var details = panelListModel.getPanelListById(panel_id);
    var contacts = Ti.Contacts.getAllPeople();
    var isAddedToContact = "0";
    populateMap(200);
    for (var i = 0; i < contacts.length; i++) {
        var phone = contacts[i].phone || "";
        var workPhone = phone.mobile;
        if (null != workPhone && workPhone[0] == details.tel) {
            isAddedToContact = "1";
            $.add2contact.title = "Already added to contact";
        }
    }
    var phoneArr = [];
    if ("" != details) {
        var operHour = details.openHour;
        var operHour_arr = operHour.split("[nl]");
        var oh;
        for (var i = 0; i < operHour_arr.length; i++) {
            oh = operHour_arr[i].trim();
            "" != oh && (oh += oh + "<br>\r\n");
        }
        $.clinicName.text = details.clinicName;
        var add2 = details.add2;
        "" != add2.trim() && (add2 += "\r\n");
        $.clinicAddress.text = details.add1 + "\r\n" + add2 + details.postcode + ", " + details.city + "\r\n" + details.state;
        $.clinicLocation.text = details.latitude + ", " + details.longitude;
        for (var i = 0; i < operHour_arr.length; i++) {
            var oh = operHour_arr[i].trim();
            if ("" != oh) {
                oh = oh.replace(/&quot;/g, "'");
                var oper_label = $.UI.create("Label", {
                    classes: [ "clinic_address" ],
                    text: oh,
                    width: "100%",
                    height: Ti.UI.SIZE,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                    bottom: 1
                });
                $.clinicOper.add(oper_label);
            }
        }
        $.clinicTel.text = "TEL : " + details.tel;
        phoneArr.push(details.tel);
    }
    var performAddressBookFunction = function() {
        var workAddress1 = {
            CountryCode: "my",
            Street: details.add1 + " " + details.add2,
            City: details.city,
            State: details.state,
            Country: "Malaysia",
            ZIP: details.postcode
        };
        var phoneList = {
            mobile: phoneArr
        };
        Ti.Contacts.createPerson({
            firstName: details.clinicName,
            lastName: "",
            address: {
                work: [ workAddress1 ]
            },
            phone: phoneList
        });
        isAddedToContact = "1";
        $.add2contact.title = "Already added to contact";
        common.createAlert("Success", "Successfully added to contact book.");
    };
    var addressBookDisallowed = function() {
        common.createAlert("Cannot Access Contact Book", "You need allow APLUX to access your contact book.");
    };
    $.btnDirection.addEventListener("click", direction2here);
    var showFull = false;
    $.showFullMap.addEventListener("click", function() {
        if (false === showFull) {
            $.clinicDetails.visible = false;
            $.clinicDetails.height = 0;
            $.clinicMap.height = Titanium.Platform.displayCaps.platformHeight;
            $.showFullMap.image = "/images/zoom_out.png";
            $.btnDirection.visible = true;
            showFull = true;
            populateMap(Titanium.Platform.displayCaps.platformHeight);
        } else {
            $.clinicDetails.visible = true;
            $.btnDirection.visible = false;
            $.clinicDetails.height = Ti.UI.SIZE;
            $.clinicMap.height = 200;
            $.showFullMap.image = "/images/zoom_in.png";
            showFull = false;
            populateMap(200);
        }
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.panelDetails);
    });
    __defers["$.__views.__alloyId513!click!direction2here"] && $.addListener($.__views.__alloyId513, "click", direction2here);
    __defers["$.__views.__alloyId517!click!clickToCall"] && $.addListener($.__views.__alloyId517, "click", clickToCall);
    __defers["$.__views.add2contact!click!addToContact"] && $.addListener($.__views.add2contact, "click", addToContact);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;