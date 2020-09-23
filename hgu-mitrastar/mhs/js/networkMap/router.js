var securitypass = "";
var securitypassWPA2 = "";
var securitypassWPA = "";
var securitypassWEP = "";
var routerwarningsactived = false;
var securitySelected = "";

function dhcpstatusmodified(check){
    if (check.checked) 
        setTimeout("activeDHCP();", 0);
    else {
        if (wifiwarningsactived) {
            showInfoDialog($("#wifi_alert4").html(), false, true, function(resp){
                if (resp == true) {
                    setTimeout("deactiveDHCP();", 0);
                }
                else {
                    $('#dhcp_status').attr('checked', true).change();
                }
            });
        }
        else 
            setTimeout("deactiveDHCP();", 0);
    }
}

function routerstatusmodified(selectedIndex){
    if (selectedIndex == 0) {
        setTimeout("activedRouter();", 0);
    }
    else {
        if (routerwarningsactived) {
            showInfoDialog($("#wifi_alert1").html(), false, true, function(resp){
                if (resp == true) 
                    setTimeout('deactivedRouter();', 0);
                else {
                    $('#RN_Mode_Text').attr('checked', true).change();
                }
            });
        }
        else 
            setTimeout("deactivedRouter();", 0);
    }
}

function activedRouter(){
    $("#encapconf").css('display', 'block');
    load_iphone_butons();
    $("#encapconf").show('blind', 500, function(){
    });
}

function deactivedRouter(){
    $("#encapconf").hide('blind', 500, function(){
    });
}


function wifisecuritymodified(select){
    if (!(select.value == "WPA2" || select.value == "WPA")) {
        if (wifiwarningsactived) {
            showWarningOptional($("#wifi_alert3").html(), function(resp){
                if (resp == true) {
                }
                else {
                    if (securitySelected == "WPA2") {
                        $("#wifi_sec")[0].options[0].selected = true; //I set WPA2
                        $("#wifi_sec").parents('.jquery-selectbox').unselectbox();
                        $("#wifi_sec").selectbox();
                    }
                    else 
                        if (securitySelected = "WPA") {
                            $("#wifi_sec")[0].options[1].selected = true; //I set WPA
                            $("#wifi_sec").parents('.jquery-selectbox').unselectbox();
                            $("#wifi_sec").selectbox();
                        }
                }
                // if finaly WEP is selected, password change
                if ($("#wifi_sec")[0].options[2].selected == true) {
                    securitySelected = "WEP";
                    securitypass = securitypassWEP;
                    $("#wifiPass").attr("value", securitypass);
                    $("#wifiPass").unbind('keyup');
                    $("#wifiPass").keyup(function(event){
                        updateWEPstrength(false);
                    });
                    $("#wifiPass").keyup();
                }
                // if finaly no-security is selected, password line is hidden
                if ($("#wifi_sec")[0].options[3].selected == true) {
                    securitySelected = "None";
                    $("#wifi_pass").hide(500);
                }
            });
        }
    }
    if ($("#wifi_sec")[0].options[0].selected == true) {
        securitySelected = "WPA2";
        securitypass = securitypassWPA2;
        $("#wifiPass").attr("value", securitypass);
    }
    if ($("#wifi_sec")[0].options[1].selected == true) {
        securitySelected = "WPA";
        securitypass = securitypassWPA;
        $("#wifiPass").attr("value", securitypass);
    }
    $('#wifiPass').unbind("keypress");
    $('#wifiPass').unbind("keydown");
    $('#wifiPass').unbind("keyup");
    if (select.value == "WPA" || select.value == "WPA2") {
        $("#wifiPass").keyup(function(event){
            updateWPAstrength(false);
        });
        $("#wifiPass").keyup();
    }
    if (select.value == "WEP") {
        $("#wifiPass").keyup(function(event){
            updateWEPstrength(false);
        });
        $("#wifiPass").keyup();
    }
    //if (select.value=="None") $("#wifi .wifi_ico").attr("color","red");
    //if WPA, WPA2 or WEP, password line is shown
    if ($("#wifi_sec")[0].options[3].selected != true && ($("#wifi_pass").css("display") == "none")) 
        $("#wifi_pass").show(500);
}



function preparerouterJSON(){
	var mode = $("#RN_Mode_Text").attr("value");
	var router = new Object();
	if(mode=="Router"){
		var encap = $("#RN_EncapMode_R").attr("value");
		if(encap=="ENET ENCAP"){
			router.ISP="0";
			router.ENCAP = "1483 Bridged IP VC-Mux";
		}else if(encap=="PPPoE"){
			router.ISP="2";
			router.ENCAP = "PPPoE VC-Mux";
		}
	}else if (mode=="Bridge"){
		router.ISP="3";
		router.ENCAP = "1483 Bridged Only VC-Mux";
	}
 
    var RouterJSON = new Object();
    RouterJSON.ROUTER = router;
    
    var RouterJSONstring = $.toJSON(RouterJSON);
    return RouterJSONstring;
}

function routeraccept(){
    routerwarningsactived = false;
    renoveSession();

    var ROUTERJSON = preparerouterJSON();
    setrouterConfiguration(ROUTERJSON, function(success, error_desc){
        if (!success) 
            showWarning(_(error_desc));
        else {
            closeDialog();
        }
    });    
}

function routercancel(){
    //self.status="closing dialog";
    renoveSession();
   // getLANv4Info(updateWifiInNetworkmap);
}

function checkIpLan(){
    var ipPart1 = $("#wifiLan1").val();
    var ipPart2 = $("#wifiLan2").val();
    if (!(isNumeric(ipPart1) && (ipPart1 > -1) && (ipPart1 < 256))) {
        showWarning(_("WIFI_ERROR_LAN_IP"));
        return false;
    }
    if (!(isNumeric(ipPart2) && (ipPart2 > 0) && (ipPart2 < 255))) {
        showWarning(_("WIFI_ERROR_LAN_IP"));
        return false;
    }
    return true;
}

function checkPassLong(){
    var pass = $("#wifiPass").attr("value");
    if ($("#wifi_sec").val() == 'WPA') {
        if (pass.length >= 8) 
            return true;
        else {
            showWarning(_("WIFI_WARNING5"));
            return false;
        }
    }
    else 
        if ($("#wifi_sec").val() == 'WEP') {
            var i = pass.length;
            if (i == 5 || i == 13) 
                return true;
            else {
                showWarning(_("WIFI_WARNING6"));
                return false;
            }
        }
        else {
            return true;
        }
}

function testWifiFields(){
    var dhcp = new Object();
    if ($("#dhcp_status").attr("checked") == true) {
        var poolStart = $("#pool_start").attr("value");
        var poolEnd = $("#pool_end").attr("value");        
        if (!(isNumeric(poolStart) && (poolStart > 0) && (poolStart < 256))) {
            showWarning(_("WIFI_ERROR_POOL1"));
            return false;
        }
        if (!(isNumeric(poolEnd) && (poolEnd > 0) && (poolEnd < 256))) {
            showWarning(_("WIFI_ERROR_POOL2"));
            return false;
        }
        if ((1 * poolStart) > (1 * poolEnd)) {
            showWarning(_("WIFI_ERROR_POOL3"));
            return false;
        }
        var ipPart = $("#wifiLan2").val();
        ipPart = ipPart * 1;
        if ((ipPart >= poolStart) && (ipPart <= poolEnd)) {
        	if (CONFIG.LanConfEnabled) showWarning(_("WIFI_ERROR_POOL4"));
        	else showWarning(_("WIFI_ERROR_POOL5"));
        	return false;
        }
    }
    return true;
}

function checkAscii(event){
    if (document.all) { // Internet Explorer
        if (((event.keyCode < 32) || (event.keyCode > 126)) &&
        (event.keyCode != 8) &&
        (event.keyCode != 46)) {
            event.returnValue = false;
            return false;
        }
    }
    else 
        if (document.getElementById) { // Mozilla
            if (((event.which < 32) || (event.which > 126)) &&
            (event.which != 8) &&
            (event.which != 46) &&
            (event.which != 0)) {
                event.preventDefault();
                return false;
            }
        }
    return true;
}

function checkKey(event){
    if (checkAscii(event)) {
        if ($("#wifi_sec").val() == "WPA") 
            setTimeout("updateWPAstrength(false)", 10);
        
        if ($("#wifi_sec").val() == "WEP") 
            setTimeout("updateWEPstrength(false)", 10);
        
    }
}

function updateWPAstrength(b){
    var value;
    if (b) 
        value = securitypass;
    else 
        value = $("#wifiPass").attr("value");
    var n = 0;
    if (value != null) 
        n = value.length;
    if (n < 0) 
        n = 0;
    var L = 0;
    if (n == 0) 
        L = 0;
    else 
        if (n < 8) 
            L = 1;
        else 
            if (n == 8) 
                L = 3;
            else 
                if (n == 9) 
                    L = 4;
                else 
                    if (n >= 10) 
                        L = 5;
    $(".dialog_security_img").css("background-position", "0 " + (L * -10) + "px");
    $("#pass_level_value").attr("key", "WIFI_SEC_PASS_STRENGTH_" + L);
    reloadTextsDiv("wifi_pass");
}

function updateWEPstrength(b){ //alert(b);
    var value;
    if (b) 
        value = securitypass;
    else 
        value = $("#wifiPass").attr("value");
    //alert(value);
    //console.log(value);
    var n = 0;
    if (value != null) 
        n = value.length;
    if (n < 0) 
        n = 0;
    var L = 0;
    if (n == 0) 
        L = 0;
    else 
        if (n < 5) 
            L = 1;
        else 
            if (n >= 5 && n < 13) 
                L = 2;
            else 
                if (n >= 13) 
                    L = 3;
    
    $(".dialog_security_img").css("background-position", "0 " + (L * -10) + "px");
    $("#pass_level_value").attr("key", "WIFI_SEC_PASS_STRENGTH_" + L);
    reloadTextsDiv("wifi_pass");
}

function goToOriginalConfig(){
    showWarningOptional($("#wifi_alert7").html(), function(resp){
        if (resp == true) {
            window.open(CONFIG.VENDORCONFIGURATION.Link);
        }
    });
}
