function navigationWindow (target, checkAuth, callback, param){
	if(checkAuth == 1){
		var auth = require("auth_login");
		if(!auth.checkLogin()){ 
			var win = Alloy.createController("asp/login", {target: target}).getView(); 
			if(Ti.Platform.osname == "android"){ 
				win.open(); 
			}else{
				Alloy.Globals.navMenu.openWindow(win,{animated:true});
			}
			
		}else if(target =="m_eCard"){
			 
			var win = Alloy.createController(target).getView(); 
			win.orientationModes = [Titanium.UI.PORTRAIT,
		    Titanium.UI.LANDSCAPE_LEFT,
		    Titanium.UI.LANDSCAPE_RIGHT,];
		    if(Ti.Platform.osname == "android"){ 
				win.open(); 
			}else{
				Alloy.Globals.navMenu.openWindow(win,{animated:true});
			}
			
		}else{
			var win = Alloy.createController(target).getView(); 
			if(Ti.Platform.osname == "android"){ 
				win.open(); 
			}else{
				Alloy.Globals.navMenu.openWindow(win,{animated:true});
			}
			 
		}
		return;
	}else{
		if(target =="m_eCard"){
			 
			var win = Alloy.createController(target).getView(); 
			win.orientationModes = [Titanium.UI.PORTRAIT,
		    Titanium.UI.LANDSCAPE_LEFT,
		    Titanium.UI.LANDSCAPE_RIGHT,];
			if(Ti.Platform.osname == "android"){ 
				win.open(); 
			}else{
				Alloy.Globals.navMenu.openWindow(win,{animated:true});
			}
		}else if(typeof param !== undefined && param !== null){
			 
			var win = Alloy.createController(target, param).getView();
			if(Ti.Platform.osname == "android"){ 
				win.open(); 
			}else{
				Alloy.Globals.navMenu.openWindow(win,{animated:true});
			}
		}else{ 
			var win = Alloy.createController(target).getView(); 
			if(Ti.Platform.osname == "android"){ 
				win.open(); 
			}else{
				Alloy.Globals.navMenu.openWindow(win,{animated:true});
			}
		}
	}
};

function navigationWebview(webview, title){
	var win = Titanium.UI.createWindow({title: title});
    win.add(webview);
    if(Ti.Platform.osname == "android"){ 
		win.open(); 
	}else{
		Alloy.Globals.navMenu.openWindow(win,{animated:true});
	}
	 
};

function navigateWithArgs(target, args){
	var win = Alloy.createController(target, args).getView(); 
	 
	if(Ti.Platform.osname == "android"){ 
		if(target == "login"){
			 
			win.fbProxy = FACEBOOK.createActivityWorker({lifecycleContainer: win});
		}
		win.open(); 
	}else{
		Alloy.Globals.navMenu.openWindow(win,{animated:true});
	}
}

function closeWindow(win){
	if(Ti.Platform.osname == "android"){ 
		win.close(); 
	}else{
		if(Alloy.Globals.navMenu != null){
			Alloy.Globals.navMenu.closeWindow(win);
		}else{
			win.close();
		}
	}
};

//var navigateWithArgs = _.debounce(nagivate_args, 1000, true);
exports.navigationWindow = _.debounce(navigationWindow, 1000, true);
exports.navigationWebview = _.debounce(navigationWebview, 1000, true);
exports.navigateWithArgs = _.debounce(navigateWithArgs, 1000, true);
exports.closeWindow = _.debounce(closeWindow, 1000, true);

