var args = arguments[0] || {};

$.menu.addEventListener('itemclick', function(e){
	var item = e.section.getItemAt(e.itemIndex); 
	nav.navigateWithArgs("hra_detail", {mod: item.properties.mod});
});