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
    $.__views.__alloyId322 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId322"
    });
    $.__views.main.add($.__views.__alloyId322);
    $.__views.__alloyId323 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId323"
    });
    $.__views.__alloyId322.add($.__views.__alloyId323);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId323.add($.__views.btnBack);
    $.__views.__alloyId324 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId324"
    });
    $.__views.__alloyId322.add($.__views.__alloyId324);
    $.__views.__alloyId325 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Panel Details",
        textAlign: "center",
        id: "__alloyId325"
    });
    $.__views.__alloyId324.add($.__views.__alloyId325);
    $.__views.__alloyId326 = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#ffffff",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: "0",
        id: "__alloyId326"
    });
    $.__views.main.add($.__views.__alloyId326);
    $.__views.__alloyId327 = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10,
        bottom: "0",
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        borderRadius: "5",
        borderColor: "#dfe0e4",
        backgroundColor: "#F5F5F5",
        id: "__alloyId327"
    });
    $.__views.__alloyId326.add($.__views.__alloyId327);
    $.__views.clinicMap = Ti.UI.createView({
        id: "clinicMap",
        height: "0",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId327.add($.__views.clinicMap);
    $.__views.showFullMap = Ti.UI.createImageView({
        right: "10",
        top: "10",
        id: "showFullMap",
        zIndex: "99",
        width: "25",
        height: "25",
        image: "/images/zoom_in.png"
    });
    $.__views.clinicMap.add($.__views.showFullMap);
    $.__views.__alloyId328 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        borderRadius: "5",
        borderColor: "#dfe0e4",
        backgroundColor: "#ffffff",
        top: "0",
        id: "__alloyId328"
    });
    $.__views.__alloyId327.add($.__views.__alloyId328);
    $.__views.__alloyId329 = Ti.UI.createView({
        width: "32%",
        height: "80",
        layout: "vertical",
        id: "__alloyId329"
    });
    $.__views.__alloyId328.add($.__views.__alloyId329);
    direction2here ? $.addListener($.__views.__alloyId329, "click", direction2here) : __defers["$.__views.__alloyId329!click!direction2here"] = true;
    $.__views.__alloyId330 = Ti.UI.createImageView({
        image: "/images/map.png",
        width: "40",
        height: "40",
        top: "5",
        id: "__alloyId330"
    });
    $.__views.__alloyId329.add($.__views.__alloyId330);
    $.__views.__alloyId331 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#626262",
        text: "Direction To Here",
        id: "__alloyId331"
    });
    $.__views.__alloyId329.add($.__views.__alloyId331);
    $.__views.__alloyId332 = Ti.UI.createView({
        width: "1",
        height: "80",
        backgroundColor: "#dfe0e4",
        id: "__alloyId332"
    });
    $.__views.__alloyId328.add($.__views.__alloyId332);
    $.__views.__alloyId333 = Ti.UI.createView({
        width: "32%",
        height: "80",
        layout: "vertical",
        id: "__alloyId333"
    });
    $.__views.__alloyId328.add($.__views.__alloyId333);
    clickToCall ? $.addListener($.__views.__alloyId333, "click", clickToCall) : __defers["$.__views.__alloyId333!click!clickToCall"] = true;
    $.__views.__alloyId334 = Ti.UI.createImageView({
        image: "/images/call.png",
        width: "30",
        height: "30",
        top: "5",
        id: "__alloyId334"
    });
    $.__views.__alloyId333.add($.__views.__alloyId334);
    $.__views.__alloyId335 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#626262",
        text: "Call",
        top: "10",
        id: "__alloyId335"
    });
    $.__views.__alloyId333.add($.__views.__alloyId335);
    $.__views.__alloyId336 = Ti.UI.createView({
        width: "1",
        height: "80",
        backgroundColor: "#dfe0e4",
        id: "__alloyId336"
    });
    $.__views.__alloyId328.add($.__views.__alloyId336);
    $.__views.add2contact = Ti.UI.createView({
        width: "auto",
        height: "80",
        id: "add2contact",
        layout: "vertical"
    });
    $.__views.__alloyId328.add($.__views.add2contact);
    addToContact ? $.addListener($.__views.add2contact, "click", addToContact) : __defers["$.__views.add2contact!click!addToContact"] = true;
    $.__views.__alloyId337 = Ti.UI.createImageView({
        image: "/images/add_to_contact.png",
        width: "35",
        height: "35",
        top: "5",
        id: "__alloyId337"
    });
    $.__views.add2contact.add($.__views.__alloyId337);
    $.__views.__alloyId338 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#626262",
        text: "Add To Contact",
        top: "5",
        id: "__alloyId338"
    });
    $.__views.add2contact.add($.__views.__alloyId338);
    $.__views.clinicDetails = Ti.UI.createView({
        layout: "vertical",
        id: "clinicDetails",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId327.add($.__views.clinicDetails);
    $.__views.clinicName = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        left: 10,
        font: {
            fontSize: 18
        },
        color: "#5E5E5E",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "clinicName",
        top: "10",
        bottom: "10"
    });
    $.__views.clinicDetails.add($.__views.clinicName);
    $.__views.__alloyId339 = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        left: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        color: "#CE1D1C",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Address",
        id: "__alloyId339"
    });
    $.__views.clinicDetails.add($.__views.__alloyId339);
    $.__views.clinicAddress = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        left: 10,
        font: {
            fontSize: 14
        },
        color: "#777777",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicAddress",
        bottom: "10"
    });
    $.__views.clinicDetails.add($.__views.clinicAddress);
    $.__views.__alloyId340 = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        left: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        color: "#CE1D1C",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Coordinate",
        id: "__alloyId340"
    });
    $.__views.clinicDetails.add($.__views.__alloyId340);
    $.__views.clinicLocation = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        left: 10,
        font: {
            fontSize: 14
        },
        color: "#777777",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicLocation",
        bottom: "10"
    });
    $.__views.clinicDetails.add($.__views.clinicLocation);
    $.__views.__alloyId341 = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        left: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        color: "#CE1D1C",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Telephone/Mobile",
        id: "__alloyId341"
    });
    $.__views.clinicDetails.add($.__views.__alloyId341);
    $.__views.clinicTel = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        left: 10,
        font: {
            fontSize: 14
        },
        color: "#777777",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicTel",
        bottom: "10"
    });
    $.__views.clinicDetails.add($.__views.clinicTel);
    $.__views.__alloyId342 = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        left: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        color: "#CE1D1C",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Operation Hours",
        id: "__alloyId342"
    });
    $.__views.clinicDetails.add($.__views.__alloyId342);
    $.__views.clinicOper = Ti.UI.createView({
        left: "0",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        font: {
            fontSize: 14
        },
        color: "#777777",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        layout: "vertical",
        right: "5",
        id: "clinicOper",
        bottom: "10"
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
    __defers["$.__views.__alloyId329!click!direction2here"] && $.addListener($.__views.__alloyId329, "click", direction2here);
    __defers["$.__views.__alloyId333!click!clickToCall"] && $.addListener($.__views.__alloyId333, "click", clickToCall);
    __defers["$.__views.add2contact!click!addToContact"] && $.addListener($.__views.add2contact, "click", addToContact);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;