var mainView = null;

exports.construct = function(mv){
	mainView = mv;
};
exports.deconstruct = function(){  
	mainView = null;
};

exports.createAlert = function(tt,msg){
	var box = Titanium.UI.createAlertDialog({
		title: tt,
		message: msg
	});
	box.show();
};
 
exports.hideLoading = function(){
	mainView.activityIndicator.hide();
	mainView.loadingBar.opacity = "0";
	mainView.loadingBar.height = "0";
	mainView.loadingBar.top = "0"; 
};

exports.showLoading = function(){ 
	mainView.activityIndicator.show();
	mainView.loadingBar.opacity = "1";
	mainView.loadingBar.zIndex = "100";
	mainView.loadingBar.height = "120";
	 
	if(Ti.Platform.osname == "android"){
		mainView.loadingBar.top =  (DPUnitsToPixels(Ti.Platform.displayCaps.platformHeight) / 2) -50; 
		mainView.activityIndicator.style = Ti.UI.ActivityIndicatorStyle.BIG;
		//mainView.activityIndicator.top = 0; 
	}else if (Ti.Platform.name === 'iPhone OS'){
		mainView.loadingBar.top = (Ti.Platform.displayCaps.platformHeight / 2) -80; 
		mainView.activityIndicator.style = Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
	}  
};

exports.createCustomAlert = function(win, title, msg){
	var mask = Titanium.UI.createView({
		width: "100%",
		height: "100%",
		zIndex: 19,
		backgroundColor: "#000",
		opacity:0.45,
	});
	
	var box = Titanium.UI.createView({
		width: "90%",
		height: Ti.UI.SIZE,
		layout: "vertical",
		opacity:1.0,zIndex: 20,
	});
	var header = Titanium.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		backgroundColor: "#EA2035",
	});
	var head_title = Titanium.UI.createLabel({
		text: title,
		top: '20dp',
		left: '20dp',
		right: '20dp',
		bottom: '20dp',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
	});
	header.add(head_title);
	var content = Titanium.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		backgroundColor: "#fff",
		layout: "vertical",
	});
	var content_text = Titanium.UI.createLabel({
		text: msg,
		top: '20dp',
		left: '20dp',
		right: '20dp',
		bottom: '20dp',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
	});
	var okButton = Ti.UI.createButton({
		title: "ok",
		width: "100dp",
		height: "40dp",
		bottom: "20dp",
	});
	content.add(content_text);
	content.add(okButton);
	box.add(header);
	box.add(content);
	win.add(box);
	win.add(mask);
	okButton.addEventListener("click", function(){
		win.remove(box);
		win.remove(mask);
	});
};