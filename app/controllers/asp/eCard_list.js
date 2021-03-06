var args = arguments[0] || {};
var loading = Alloy.createController("loading");
var data = [];

function navToEcard(e){
	var id = parent({name: "source"}, e.source);
	console.log(id);
	nav.navigateWithArgs("asp/eCard", {u_id: id});  
}

/*
 Render e-card listing
 * */
function render_ecard_list(){
	$.inner_box.removeAllChildren();

	for (var i=0; i < data.length; i++) { 
		var row = Titanium.UI.createTableViewRow({
		    touchEnabled: true,
		    height: 50,
		    source: data[i].id,
		    backgroundSelectedColor: "#FFE1E1", 
			color: "transparent", 
		   });
	 	
	 	var rowView = $.UI.create('View',{
			classes: ['wfill', 'hfill'], 
			source: data[i].id 
		});
		
		var Label_name = $.UI.create('Label',{
			classes : ['themeColor', 'h5', 'bold', 'padding', 'hfill'],
			text: data[i].name || "",
			font:{fontSize:14},
			source: data[i].id,
			textAlign:'left',
		}); 
		
		var forwardImg = $.UI.create('ImageView',{
			classes : ['wsize', 'hsize'],
			image : "/images/btn-forward.png",
			width: 15,
			zIndex: 10,
			right:5 
		});  
		
		rowView.add(Label_name);
		rowView.add(forwardImg);
		row.add(rowView);
		$.inner_box.appendRow(row);
		rowView.addEventListener("click", navToEcard);
	}
}

/*
 Page refresh
 * */
function refresh(){
	loading.start();
	var usersModel = Alloy.createCollection('users'); 
	data = usersModel.getUserByEmpNo();
	render_ecard_list();
	loading.finish();
}

/*
 Controller init
 * */
function init(){
	$.inner_box.add(loading.getView());
	refresh();
}

init();

/**
 * Closes the Window
 */
function closeWindow(){
	$.win.close();
}

Ti.App.addEventListener('eCard_list:refresh',refresh);

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener('eCard_list:refresh',refresh);
	$.destroy();
});

 
if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.win); 
	}); 
}