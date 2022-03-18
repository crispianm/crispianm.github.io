OSMLULC.Ui = (function Ui() {
	console.log("Init UI");
	
	//init sidebar left
	$('#sidebar-left').sidebar({
		'transition' : 'overlay',
		'dimPage' : false,
		'closable' : false
	});
	
	//toggleLegend handler
	function toggleLegendHandler (event) {
		$('#sidebar-left').sidebar('toggle');
	}
	
	//register events
	
	
	$('#sidebar-left').on('click', toggleLegendHandler);
	
	//init pie as active
	
	$("#pie").data("isActive",true);
	
    $("#pieicon").on("click", function(){
    	

	if ($("#pie").data("isActive")) {
		$("#pie").data("isActive", false)
		OSMLULC.Stats.deactivate();
	} else {
		$("#pie").data("isActive", true);
		OSMLULC.Stats.activate();
		// OSMLULC.Stats.updatePieChartBBox(OSMLULC.Controller.map
		// 		.getExtentLonLat().toString());

	}
	;	

    $("#pie-parent").fadeToggle();                
	});
})(); 