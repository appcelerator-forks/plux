var args = arguments[0] || {};
var auth = require("login");
var method = require("myClaim");

method.API_ClaimInfo("910128035500", "ASP");

Ti.UI.addEventListener("data_loaded", init);

function init(e){
	var tableData = [];
	var balanceData = [];
	val = e.data;
		tableData = [
			{
				 properties : {
				 	title: "Member Name",
				 	subtitle: String(val.name)
				 },
				 template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
			},
			{
				 properties : {
				 	title: "Member Number",
				 	subtitle: String(val.memno)
				 },
				 template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
			},
			{
				 properties : {
				 	title: "Benefit Type",
				 	subtitle: String(val.benefittype)
				 },
				 template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
			},
			{
				 properties : {
				 	title: "Relation",
				 	subtitle: String(val.relation)
				 },
				 template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
			},
			{
				 properties : {
				 	title: "Maximum amount per claim",
				 	subtitle: String(val.maxperclaim),
				 },
				 template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
			},
		];
		
		balanceData = [
			{
				 properties : {
				 	title: "Entitlement (Individual) Balance",
				 	subtitle: String(val.entidvbal),
				 },
				 template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
			},
			{
				 properties : {
				 	title: "Entitlement (Individual)",
				 	subtitle: String(val.entidv),
				 	accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
				 },
			},
			{
				 properties : {
				 	title: "Entitlement (Shared) Balance",
				 	subtitle: String(val.entshabal),
				 },
				 template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
			},
			{
				 properties : {
				 	title: "Entitlement (Shared)",
				 	subtitle: String(val.entsha),
				 	accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
				 },
			},
			{
				 properties : {
				 	title: "Visitation Entitlment (Individual) Balance",
				 	subtitle: String(val.vstidvbal),
				 },
				 template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
			},
			{
				 properties : {
				 	title: "Visitation Entitlment (Individual)",
				 	subtitle: String(val.vstidv),
				 	accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
				 },
			},
			{
				 properties : {
				 	title: "Visitation Entitlment (Shared) Balance",
				 	subtitle: String(val.vstshabal),
				 },
				 template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
			},
			{
				 properties : {
				 	title: "Visitation Entitlment (Shared)",
				 	subtitle: String(val.vstsha),
				 	accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
				 },
			}
		];
	$.info.setItems(tableData);
	$.balance.setItems(balanceData);
	Ti.UI.removeEventListener("data_loaded", init);
}