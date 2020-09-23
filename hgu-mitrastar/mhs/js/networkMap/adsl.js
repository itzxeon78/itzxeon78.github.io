function setAdslData(){
	var internetJSON=createinternetPPPJSON();
	setInternet(internetJSON,internetCallback);
}

function createinternetPPPJSON(){
	var object = new Object();

       object.sessionKey=gblsessionKey;
	if($('#route_mode_status').attr('checked'))
	{
		object.modeflag=1;
		object.username=$('#adslUser').val();
		object.password=$('#adslPass').val();
		object.isp=2;
		object.encap="PPPoE VC-Mux";
		object.natenable="Enable";
	}
	else if($('#bridge_mode_status').attr('checked'))
	{
		object.modeflag=2;
		object.isp=3;
		object.encap="1483 Bridged Only VC-Mux";
		object.natenable="Disabled";
	}
	else{
		return;
	}

	
	//object.type=$('#adslType').html();
	/*
	object.username=$('#adslUser').val();
	object.password=$('#adslPass').val();
	object.ipaddr=$('#adslIp').val();
	object.netmask=$('#adslNetmask').val();
	object.gateway=$('#adslGateway').val();
	object.natvalue=$('#nat_status').attr('checked');
	object.dynamic=$('#static_status').attr('checked');
	*/
	var jsonText = $.toJSON(object,"\t");
	jsonText="{\"INTERNET\": {\"PPP\":"+jsonText+"}}";
	return jsonText;
}
function internetCallback(success, respInternet){
  	if(success){
		//getInternetInfo(updatePPPstatus);
  	}else{
		showWarning(_(respInternet));
		return;
  	}
	$.openLoadingMask(1);
	setTimeout(function(){$.closeLoadingMask(1);}, 25000);
	$('#dialog').dialog("close");
}

function adslDataReceived(success,internet){
	var visibility=1;
	if (visibility != undefined) 
        $("#nat_status").attr("checked", visibility).change();
	if(success){
		var adsltype=internet.PPP.type;
		var adsluser=internet.PPP.username; 
		var adslpassword=internet.PPP.password;
		paintAdslData(adsltype,adsluser,adslpassword);
	}else{
		showWarning(_(internet));
	}
}

function paintAdslData(adsltype,adslUser,adslPassword){
	$('#adslType').html(adsltype);
	$('#adslUser').val(adslUser);
	$('#adslUser').attr("disabled", false);
	$('#adslPass').val(adslPassword);
	$('#adslPass').attr("disabled", false);
}

function staticStatusModified(check){
    if (check.checked) {
        setTimeout("activeStatic();", 0);
    }
    else {
  //      showInfoDialog($("#adsl_alert1").html(), false, true, function(resp){
  //          if (resp == true) {
                setTimeout("deactiveStatic();", 0);
  //          }
  //          else {
  //              $('#static_status').attr('checked', true).change();
  //          }
  //      });
    }
}

function activeStatic(){
    $("#StaticSet").show('blind', 500, function(){
    });
}

function deactiveStatic(){
    $("#StaticSet").hide('blind', 500, function(){
    });
}