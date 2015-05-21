function addForm(text, type, options) {
    function formEvent(ex) {
        form_label[ex.source.counter].text = ex.row.title;
        $.picker.removeAllChildren();
        ex.source.removeEventListener("change", formEvent);
        form[ex.source.counter].setSelectedRow(0, ex.rowIndex);
        form[ex.source.counter].row_value = ex.rowIndex;
    }
    if ("TextField" == type) {
        var label_textfield = $.UI.create("Label", {
            text: text,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });
        var cancel = Titanium.UI.createButton({
            backgroundImage: "/images/btn-down.png",
            textAlign: "right",
            right: 0,
            width: 20,
            height: 20
        });
        cancel.addEventListener("click", function() {
            for (a = 0; a < form.length; a++) form[a].blur();
        });
        var keyboardToolbarButtons = Ti.UI.iOS.createToolbar({
            items: [ cancel ],
            right: 5,
            width: 20,
            height: 20
        });
        var textField = $.UI.create("TextField", {
            width: Ti.UI.FILL,
            height: 40,
            borderColor: "#cccccc",
            keyboardToolbar: keyboardToolbarButtons
        });
        var view_textfield = $.UI.create("View", {
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
            layout: "vertical"
        });
        form.push(textField);
        view_textfield.add(label_textfield);
        view_textfield.add(textField);
        count++;
        form_label.push([]);
        return view_textfield;
    }
    if ("Picker" == type) {
        var data = [];
        var label_picker = $.UI.create("Label", {
            text: text,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });
        var picker = $.UI.create("Picker", {
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            counter: count,
            row_value: 0,
            bottom: 0
        });
        var label_picker_value = $.UI.create("Label", {
            text: options[0],
            counter: count,
            mod: 0,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        });
        var view_border_pv = $.UI.create("View", {
            backgroundColor: "#ffffff",
            borderCorder: "#dddddd",
            borderRadius: 10,
            text: options[0],
            counter: count,
            height: Ti.UI.SIZE
        });
        view_border_pv.add(label_picker_value);
        label_picker_value.addEventListener("click", function(e) {
            var index = e.source.counter;
            $.picker.add(form[index]);
            form[index].addEventListener("change", formEvent);
        });
        for (var a = 0; a < options.length; a++) {
            var row = Ti.UI.createPickerRow({
                title: options[a]
            });
            data.push(row);
        }
        picker.add(data);
        var view_picker = $.UI.create("View", {
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
            layout: "vertical"
        });
        form.push(picker);
        form_label.push(label_picker_value);
        view_picker.add(label_picker);
        view_picker.add(view_border_pv);
        count++;
        return view_picker;
    }
}

function formular() {
    var total_score = 0;
    for (a = 0; a < form.length; a++) form[a].row_value || total_score++;
    3 >= total_score ? resultPopUp("RESULT", "Diet alert! Your diet is probably too high in calories and fat and too low in plant foods like vegetables, fruits, and grains. You may want to take a look at your eating habits and find ways to make some changes. And don’t forget – exercise is important too. ") : 6 >= total_score ? resultPopUp("RESULT", "Not bad! You are halfway there. You still have a way to go. Look at your 'No' answers to help you decide which areas of your diet need to be improved, or whether your physical activity level should be increased.") : 8 >= total_score && resultPopUp("RESULT", "Good for you! You are living smart! Keep up the good habits, and keep looking for ways to improve.");
}

function resultPopUp(title, msg) {
    var mask = Titanium.UI.createView({
        width: "100%",
        height: "100%",
        zIndex: 19,
        backgroundColor: "#000",
        opacity: .45
    });
    var box = Titanium.UI.createView({
        width: "90%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        opacity: 1,
        zIndex: 20
    });
    var header = Titanium.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#EA2035"
    });
    var head_title = Titanium.UI.createLabel({
        text: title,
        top: "20dp",
        left: "20dp",
        right: "20dp",
        bottom: "20dp",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    });
    header.add(head_title);
    var content = Titanium.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        layout: "vertical"
    });
    var content_text = Titanium.UI.createLabel({
        text: msg,
        top: "20dp",
        left: "20dp",
        right: "20dp",
        bottom: "20dp",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    });
    var okButton = Ti.UI.createButton({
        title: "OK",
        width: "100dp",
        backgroundColor: "#ff0000",
        height: "40dp",
        bottom: "20dp"
    });
    content.add(content_text);
    content.add(okButton);
    box.add(header);
    box.add(content);
    $.win.add(box);
    $.win.add(mask);
    okButton.addEventListener("click", function() {
        $.win.remove(box);
        $.win.remove(mask);
    });
}

var $ = null;

var form = null;

var form_label = null;

var count = null;

exports.title = "Nutritional Profile";

exports.construct = function(mv) {
    $ = mv;
    form = [];
    form_label = [];
    count = 0;
};

exports.description = function() {
    var label_desc1 = $.UI.create("Label", {
        classes: [ "title" ],
        text: "Nutritional Profile"
    });
    var label_desc2 = $.UI.create("Label", {
        classes: [ "paragraph" ],
        text: "Are you making healthy choices when it comes to nutrition and physical activity? Find out by taking this quick quiz. "
    });
    var view_container = $.UI.create("View", {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    view_container.add(label_desc1);
    view_container.add(label_desc2);
    return view_container;
};

exports.input_box = function() {
    var view_header = $.UI.create("View", {
        classes: [ "header_view" ]
    });
    var label_header_text = $.UI.create("Label", {
        classes: [ "header_text" ],
        text: "Enter your waist and hips circumference to calculate :"
    });
    view_header.add(label_header_text);
    var view_inputbox = $.UI.create("View", {
        backgroundColor: "#efefef",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    var yes_no_options = [ "Yes", "No" ];
    view_inputbox.add(view_header);
    view_inputbox.add(addForm("I eat at least 2½ cups of vegetables and fruits every day.", "Picker", yes_no_options));
    view_inputbox.add(addForm("I eat whole-grain bread, pasta, and cereal instead of refined grain products.", "Picker", yes_no_options));
    view_inputbox.add(addForm("I try to choose foods low in calories and fat.", "Picker", yes_no_options));
    view_inputbox.add(addForm("I rarely eat red meat or processed meat like bacon, hot dogs, and sausage.", "Picker", yes_no_options));
    view_inputbox.add(addForm("I take it easy on high-calorie, baked goods such as cakes, cookies and doughnuts.", "Picker", yes_no_options));
    view_inputbox.add(addForm("I rarely add butter, margarine, oil or mayonnaise to foods when I’m cooking or at the table.", "Picker", yes_no_options));
    view_inputbox.add(addForm("I rarely (less than twice a week) eat fried foods.", "Picker", yes_no_options));
    view_inputbox.add(addForm("I never, or only occasionally, drink alcohol.", "Picker", yes_no_options));
    var button_submit = $.UI.create("Button", {
        title: "Calculate",
        top: 10,
        width: 100,
        height: 50,
        backgroundColor: "#ff0000",
        borderColor: "#cccccc",
        color: "#ffffff"
    });
    view_inputbox.add(button_submit);
    var view_container = $.UI.create("View", {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    view_container.add(view_inputbox);
    button_submit.addEventListener("click", formular);
    return view_container;
};