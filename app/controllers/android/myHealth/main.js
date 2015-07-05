var args = arguments[0] || {};
var category = args.category || "";
var nav = require('navigation');
var hd = require('healthData');  
common.construct($);
//common.showLoading();
hd.stepsMotion();
function resetGraph(){
	$.bmiView.setHeight("0");
	$.bloodPressureView.setHeight("0");
	$.heartRateView.setHeight("0");
	$.bodyTemperatureView.setHeight("0");
	//$.heightView.setHeight("0");
	//$.weightView.setHeight("0");
	$.bmiView.setTop("0");
	$.bloodPressureView.setTop("0");
	$.heartRateView.setTop("0");
	$.bodyTemperatureView.setTop("0");
	//$.heightView.setTop("0");
	//$.weightView.setTop("0");
}

function filterList(e){
	 
	if(e.category == "measurement"){
		resetGraph();
		$.bmiView.setHeight(Ti.UI.SIZE);
		//$.heightView.setHeight(Ti.UI.SIZE);
		//$.weightView.setHeight(Ti.UI.SIZE);
		$.bmiView.setTop(10);
		//$.heightView.setTop(10);
		//$.weightView.setTop(10);
		
		$.bmiView.show();
		//$.heightView.show();
		//$.weightView.show(); 
	}else if(e.category == "vitals"){
		resetGraph();
		$.heartRateView.setHeight(Ti.UI.SIZE);
		$.bodyTemperatureView.setHeight(Ti.UI.SIZE);
		$.bloodPressureView.setHeight(Ti.UI.SIZE);
		$.heartRateView.setTop(10);
		$.bodyTemperatureView.setTop(10);
		$.bloodPressureView.setTop(10);
		
		$.heartRateView.show();
		$.bodyTemperatureView.show();
		$.bloodPressureView.show();
	}else{
		$.bmiView.setHeight(Ti.UI.SIZE);
		//$.heightView.setHeight(Ti.UI.SIZE);
		//$.weightView.setHeight(Ti.UI.SIZE);
		$.heartRateView.setHeight(Ti.UI.SIZE);
		$.bodyTemperatureView.setHeight(Ti.UI.SIZE);
		$.bloodPressureView.setHeight(Ti.UI.SIZE);
		
		$.bmiView.setTop(10);
		//$.heightView.setTop(10);
		//$.weightView.setTop(10);
		$.heartRateView.setTop(10);
		$.bodyTemperatureView.setTop(10);
		$.bloodPressureView.setTop(10);
		
		//$.weightView.show(); 
		//$.heightView.show(); 
		$.bmiView.show();
		$.bloodPressureView.show();
		$.heartRateView.show();
		$.bodyTemperatureView.show();
	}
	
}

Ti.App.addEventListener('filterList',filterList);
Ti.App.addEventListener('populateDataById',populateDataById);

function populateDataById(e){
	hd.loadInfo(e.id);
}
/*setTimeout(function(){ 
	hd.populateData();
	common.hideLoading();
}, 2000);*/
filterList({category: "all"}); 

$.bmiView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 1});
});

$.bmiView.addEventListener('load', websiteSetHeight);

function websiteSetHeight(e){
	var actualHeight = e.source.evalJS("document.height;");
	e.source.height = parseInt(actualHeight);
}

$.bloodPressureView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 2});
});

$.bloodPressureView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	e.source.height = parseInt(actualHeight);
});

$.heartRateView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 3});
});

$.heartRateView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	e.source.height = parseInt(actualHeight);
});

$.bodyTemperatureView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 4});
});

$.bodyTemperatureView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	e.source.height = parseInt(actualHeight);
});

/*$.heightView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 5});
});

$.heightView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	e.source.height = parseInt(actualHeight);
});

$.weightView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 6});
});

$.weightView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	e.source.height = parseInt(actualHeight);
});
*/
$.moreHealth.addEventListener('click', function(e){
	/*var page = Alloy.createController('myHealth/_menu').getView();
	page.open();
	page.animate({
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
		opacity: 1,
		duration: 200
	});*/
	var dialog = Ti.UI.createOptionDialog({
	  cancel: 3,
	  options: ['Me', 'Body Measurement', 'Vitals', 'Cancel'],
	  title: 'More'
	});
	
	dialog.show();
	
	dialog.addEventListener("click", function(e){
		if(e.index == 0){
			nav.navigationWindow("myHealth/profile");
		}else if(e.index == 1){
			Ti.App.fireEvent('filterList',{category: "measurement"});
			//API.loadCategory({types: "popular"});
		}else if(e.index == 2){
			Ti.App.fireEvent('filterList',{category: "vitals"});
		}
	});
});

$.myhealth.addEventListener("close", function(e){
	Ti.App.removeEventListener('filterList',filterList);
	Ti.App.removeEventListener('populateDataById',populateDataById);
});

$.btnBack.addEventListener('click', function(){  
	nav.closeWindow($.myhealth); 
});