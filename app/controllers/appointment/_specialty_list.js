
var listing = [];   

function render_specialty_list(){
	$.specialty_container.removeAllChildren();
	
	var docTable = Ti.UI.createTableView();
	var data=[]; 
	var counter = 0; 
	
  	if(listing.length < 1){ 
		docTable.setData(common.noRecord());
	}else{
		listing.forEach(function(entry){
	   		var row = $.UI.create("TableViewRow", {
	   			classes: ['hsize'],
			    touchEnabled: true,
			    specialty_id: entry.id,
			    specialty_name: entry.title,
			    backgroundSelectedColor: "#ECFFF9",
			});
			 
			var label_specialty = $.UI.create('Label',{
				classes : ['medium_font','wfill','hsize','themeColor', 'padding'],
				text: entry.title,
				textAlign: 'left',
			});
			row.add(label_specialty);
			update_specialty_to_form(row);
			data.push(row);	   
		});
		docTable.setData(data);  
	}
	$.specialty_container.add(docTable); 
}

function update_specialty_to_form(vw){
	vw.addEventListener('click', function(e){
		var specialty_id = parent({name: "specialty_id"}, e.source);
		var specialty_name = parent({name: "specialty_name"}, e.source);
		
	 	Ti.App.fireEvent('update_specialty',{specialty_id:specialty_id, specialty_name: specialty_name});
	 	Ti.App.fireEvent("appointment_index:moveNext");
	});
}

function refresh(){
	var checker = Alloy.createCollection('updateChecker');
	var isUpdate = checker.getCheckerById("2");
	var last_updated ="";
	 
	if(isUpdate != "" ){
		last_updated = isUpdate.updated;
	}
	
	API.callByPost({url:"getSpecialtylist", params: {last_updated: last_updated}}, function(responseText){
		var model = Alloy.createCollection("specialty");
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		model.saveArray(arr);
		checker.updateModule(5,"getSpecialtylist", res.last_updated);
		listing = model.getAvailableData();
		render_specialty_list();
	});
}

function init(){
	refresh();
}

init();
