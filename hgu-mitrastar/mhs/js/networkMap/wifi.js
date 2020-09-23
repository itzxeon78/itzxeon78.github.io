var securitypass = "";

var wifiwarningsactived = false;
var securitySelected = "";
var current_rules=0;

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

function activeDHCP(){
    $("#DHCPpool").show('blind', 500, function(){
    });
}

function deactiveDHCP(){
    $("#DHCPpool").hide('blind', 500, function(){
    });
}

function wifistatusmodified(check){
    if (check.checked) {
        setTimeout("activedWifi();", 0);
    }
    else {
        if (wifiwarningsactived) {
            showInfoDialog($("#wifi_alert1").html(), false, true, function(resp){
                if (resp == true) 
                    setTimeout('deactivedWifi();', 0);
                else {
                    $('#wifi_status').attr('checked', true).change();
                }
            });
        }
        else 
            setTimeout("deactivedWifi();", 0);
    }
}

function activedWifi(){
    $("#wifiConf").css('display', 'block');
    load_iphone_butons();
    $("#select_numcanal").selectbox();
    $("#wifi_sec").selectbox();
    $("#wifiConf").show('blind', 500, function(){
    });
    $("#wifi .wifi_ico").attr("color", "green");
}

function deactivedWifi(){
    $("#wifiConf").hide('blind', 500, function(){
    });
    $("#wifi .wifi_ico").attr("color", "grey");
}

function ssidmodemodified(check){
    if (check.checked) 
        setTimeout("$('#num_canal').hide(500);", 0);
    else 
        setTimeout("$('#num_canal').show(500);", 0);
}

function wifivisibilitymodified(check){
    var message = $("#wifi_alert2").html();
    var iswarning = false;
    var isoptional = true;
    //if (check.checked) 	showInfoDialog(message, iswarning, isoptional);
    if (check.checked) {
    }
    else {
        if (wifiwarningsactived) {
            showInfoDialog(message, iswarning, isoptional, function(resp){
                if (resp != true) {
                    $('#wifi_visible').attr('checked', true).change();
                }
            });
        }
    }
    //showInfoDialog(message, iswarning, isoptional,callback);
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

function updateDhcp(){
    var ipLan1 = $("#wifiLan1").val();
    $("#poolStart").html("192.168." + ipLan1 + ".");
    $("#poolEnd").html("192.168." + ipLan1 + ".");
}

function wifiInfoReceived(success, data){
    renoveSession();
    
    if (!success) {
        //showWarning(_(data));
        showInfoDialog(_(data), true, false, function(){ //showwarning con callback
            closeDialog();
        }, null);
        
        return;
    }
    
    var status = data.WIFI.status;
    
    if (status == "0" || status == "false") 
        status = 0;
    if (status == "1" || status == "true") 
        status = 1;
    var ssidname = data.WIFI.ssidName;
    
    var visibility = data.WIFI.ssidVisibility;
    if (visibility == "0" || visibility == "false") 
        visibility = 0;
    if (visibility == "1" || visibility == "true") 
        visibility = 1;
    
    var channelMode = data.WIFI.channelMode;
    if (channelMode == "MANUAL") 
        channelMode = 0;
    else 
        channelMode = 1;
    var channel = data.WIFI.channel;
    
    var security = "None";
    
    if (data.WIFI.SECURITY != undefined) {
        security = data.WIFI.SECURITY.cipherAlgorithm;
        securitypassWPA = data.WIFI.SECURITY.passwordWPA;
        securitypassWPA2 = data.WIFI.SECURITY.passwordWPA2;
        securitypassWEP = data.WIFI.SECURITY.passwordWEP;
    }
    
    var dhcpstatus = false;
    var start = "33";
    var end = "255";
    var common = "";
    if (data.DHCP != undefined) {
        dhcpstatus = data.DHCP.status;
        if (dhcpstatus == "0" || dhcpstatus == "false") 
            dhcpstatus = 0;
        if (dhcpstatus == "1" || dhcpstatus == "true") 
            dhcpstatus = 1;
        
        start = data.DHCP.poolStart;
        if (start != null && start.length > 0) {
            var ip_parts = start.split(".");
            var n = ip_parts.length;
            if (n > 1) {
                start = ip_parts[n - 1]; //I take the last one
            }
            
        }
        end = data.DHCP.poolEnd;
        if (end != null && end.length > 0) {
            var ip_parts = end.split(".");
            var n = ip_parts.length;
            if (n > 1) 
                end = ip_parts[n - 1]; //I take the last one
        }
    }
    
    // UPDATING WIFI VALUES IN PAGE	
    if ($("#wifi_status").attr("checked") != status) 
        $("#wifi_status").attr("checked", status).change();
    
    if (!status) {
        $("#wifi .wifi_txt").attr("key", "MAP_WIFI_DISABLED");
    }
    else {
        if (security == "WPA2") 
            $("#wifi .wifi_txt").attr("key", "MAP_WIFI_WPA2");
        else 
            if (security == "WPA") 
                $("#wifi .wifi_txt").attr("key", "MAP_WIFI_WPA");
            else 
                if (security == "WEP") 
                    $("#wifi .wifi_txt").attr("key", "MAP_WIFI_WEP");
                else 
                    if (security == "None") 
                        $("#wifi .wifi_txt").attr("key", "MAP_WIFI_NONE");
    }
    reloadTextsDiv('wifi');
    
    if (ssidname != null) 
        $("#ssidname").attr("value", ssidname);
    if (visibility != undefined) 
        $("#wifi_visible").attr("checked", visibility).change();
    if (channelMode != undefined) 
        $("#ssid_mode").attr("checked", channelMode).change();
    if (channel != undefined) 
        $("#select_numcanal")[0].options[channel - 1].selected = true;
    if (security != undefined) {
        if (security == "WPA2") {
            securitySelected = "WPA2";
            $("#wifi_sec")[0].options[0].selected = true;
            securitypass = securitypassWPA2;
            $("#wifiPass").unbind('keypress');
            $("#wifiPass").unbind('keydown');
            $("#wifiPass").unbind('keyup');
            $("#wifiPass").keyup(function(event){
                updateWPAstrength(false);
            });
            updateWPAstrength(true);
        }
        else 
            if (security == "WPA") {
                securitySelected = "WPA";
                $("#wifi_sec")[0].options[1].selected = true;
                securitypass = securitypassWPA;
                $("#wifiPass").unbind('keypress');
                $("#wifiPass").unbind('keydown');
                $("#wifiPass").unbind('keyup');
                $("#wifiPass").keyup(function(event){
                    updateWPAstrength(false);
                });
                updateWPAstrength(true);
            }
            else 
                if (security == "WEP") {
                    securitySelected = "WEP";
                    $("#wifi_sec")[0].options[2].selected = true;
                    securitypass = securitypassWEP;
                    $("#wifiPass").unbind('keypress');
                    $("#wifiPass").unbind('keydown');
                    $("#wifiPass").unbind('keyup');
                    $("#wifiPass").keyup(function(event){
                        updateWEPstrength(false);
                    });
                    updateWEPstrength(true);
                }
                else {
                    securitySelected = "None";
                    $('#wifi_pass').hide();
                    $("#wifi_sec")[0].options[3].selected = true;
                }
    }
    if (securitypass != undefined) 
        $("#wifiPass").attr("value", securitypass);
    //LAN 
    if (data.LAN != undefined && data.LAN != null) {
    	//
        var ipLan = data.LAN.ip;
        var ipMask = data.LAN.mask;
        $("#wifiLanMask").html(ipMask);
        var ip = ipLan.split(".");
        common = ip[0] + "." + ip[1] + "." + ip[2] + ".";
        if (ip.length > 1) {
            $("#wifiLan0").html(ip[0] + "." + ip[1] + ".");
            $("#wifiLan1").val(ip[2]);
            $("#wifiLan2").val(ip[3]);
        }
    }
    //UPDATING DHCP VALUES IN PAGE
    if (dhcpstatus != undefined) {
        if ($("#dhcp_status").attr("checked") != dhcpstatus) 
            $("#dhcp_status").attr("checked", dhcpstatus).change();
    }
    if (start != undefined) 
        $("#pool_start").attr("value", start);
    if (end != undefined) 
        $("#pool_end").attr("value", end);
    if (common != undefined) {
        $("#poolStart").html(common);
        $("#poolEnd").html(common);
    }
   
    wifiwarningsactived = true;
}
var objectApp= new Object();
function prepareWifiJSON(){
    var key = new Object();
	key.sessionKey=$("#sessionKey").val();
    var wifi = new Object();
    wifi.status = 1;
	//wifi.macfltmode = "allow"; //Permitir
	
	if($("#mainSwitch").attr("checked"))
		wifi.macfltmode = "allow";
	else
		wifi.macfltmode = "disabled";

	
    if (wifi.status) 
	{
        wifi.ssidName = $("#ssidname").attr("value");
		
		wifi.ssidVisibility=$('input[name=wifi_visible]:checked').val();		
        wifi.enableWireless=$('input[name=wifi_status]:checked').val();
		/*
	    if ($("#wifi_visible")[0].options[0].selected == true) {	   
			wifi.ssidVisibility = 1;
		}else {
			wifi.ssidVisibility = 0;
		}
		*/
        wifi.channel = 1 * $("#select_numcanal")[0].value;
        
        var security = new Object();
        security.cipherAlgorithm = $("#wifi_sec")[0].value;
        if (security.cipherAlgorithm != "None") {
            if (security.cipherAlgorithm == "WPAPSK") {
                security.algVersion = "WPAPSK";
                security.passwordWPA2 = $("#wifiPass").attr("value");
                security.passwordWEP = securitypassWEP;     
				security.EncrypType = $("#TKIP_Selection")[0].value;
            }
            else if (security.cipherAlgorithm == "WPA2PSK") {
                security.algVersion = "WPA2PSK";
                security.passwordWPA2 = $("#wifiPass").attr("value");
                security.passwordWEP = securitypassWEP;     
				security.EncrypType = $("#TKIP_Selection")[0].value;
            }
			else if (security.cipherAlgorithm == "WPAPSKWPA2PSK") {
                security.algVersion = "WPAPSKWPA2PSK";
                security.passwordWPA2 = $("#wifiPass").attr("value");
                security.passwordWEP = securitypassWEP;     
				security.EncrypType = $("#TKIP_Selection")[0].value;
            }
			else if (security.cipherAlgorithm == "WEP-64Bits") {
                    security.algVersion = "WEP-64Bits";
                    security.passwordWEP = $("#wifiPass").attr("value");
                    security.passwordWPA2 = securitypassWPA2;
					security.EncrypType = "WEP";
            }
            else if (security.cipherAlgorithm == "WEP-128Bits") {
                security.passwordWEP = $("#wifiPass").attr("value");
                security.passwordWPA2 = securitypassWPA2;
                security.algVersion = "WEP-128Bits";
				security.EncrypType = "WEP";
            }
          	else if (security.cipherAlgorithm == "WPA") {
                security.passwordWEP = securitypassWEP;
                security.passwordWPA2 = securitypassWPA2;
                security.RADIUS_Server = $("#wpaipaddr").attr("value");
			    security.RADIUS_Port = $("#wpaserport").attr("value");
			    security.RADIUS_Key = $("#wpakey").attr("value");
                security.algVersion = "WPA";
				security.EncrypType = $("#TKIP_Selection")[0].value;
            }
          	else if (security.cipherAlgorithm == "WPA2") {
                security.passwordWEP = securitypassWEP;
                security.passwordWPA2 = securitypassWPA2;
                security.RADIUS_Server = $("#wpaipaddr").attr("value");
			    security.RADIUS_Port = $("#wpaserport").attr("value");
			    security.RADIUS_Key = $("#wpakey").attr("value");
				security.algVersion = "WPA2";
				security.EncrypType = $("#TKIP_Selection")[0].value;     
				if( $("#WPA_Compatible")[0].value == "Enable" ){
					security.cipherAlgorithm = "WPA1WPA2";
				}
            }
		}
        else {
            security.algVersion = "NONE";
			security.cipherAlgorithm = "OPEN";
			security.EncrypType = "NONE";

        }
        wifi.SECURITY = security;
    }

    var wps = new Object();
    //var wpsstatus = $("#wps_status").attr("value");
    if($("#wifi_sec")[0].value == "WEP-128Bits" || wifi.ssidVisibility == 1)
      wps.status = 'disabled';
	else
	  wps.status = 'enabled';	
	
   // wps.status = $("#wps_status").attr("checked");
   /* if (dhcp.status) {
        dhcp.poolStart = jQuery($("#DHCPpool .inicio_dir")[0]).html() + $("#pool_start").attr("value");
        dhcp.poolEnd = jQuery($("#DHCPpool .inicio_dir")[0]).html() + $("#pool_end").attr("value");
    }*/
    var lan = new Object();
    var ip = "" + $("#wifiLan0").html() + $("#wifiLan1").val() + "." + $("#wifiLan2").val();
    lan.ip = ip;
    lan.mask = $("#wifiLanMask").html()

	var rules = new Array();
	var i=0
	//var k=0;
	var k= ($("#rules_list #list_body > div[id!=ruleN]").length)-1;
	
	$("#rules_list #list_body > div[id!=ruleN]").each( function(index){
		var objetcRule = new Object();
		var thisrule = $(this);
				
		if (thisrule!=null && thisrule.length==1){
			//objetcRule.idRule   = thisrule.attr("idRule");
			objetcRule.wifiMac	= thisrule.find("input[type=text]").val();				
			
			//if(thisrule.find("#switch1").attr('checked')){
				objetcRule.action	= 1;
			//}else{
			//	objetcRule.action	= 0;
			//}			
			rules[k]= objetcRule;
			k--;
			//k++;
		}
	});
	
    var WifiJSON = new Object();
    WifiJSON.KEY = key;
    WifiJSON.WIFI = wifi;
    WifiJSON.WPS = wps;
    WifiJSON.LAN = lan;
	WifiJSON.RULES = rules;
    
    var WifiJSONstring = $.toJSON(WifiJSON);
    return WifiJSONstring;
}
	function UTF8CodeLength(string) 
		{
			var i, j=0
			
			for (i = 0; i < string.length; i++)
			{
				var c = string.charCodeAt(i);
		 
				if(c<0x7F)
				{
					j++;
				}
				else if(c<0x7FF)
				{
					j=j+2;
				}
				else if(c<0xFFFF)
				{
					j=j+3;
				}
				else if(c<0x1FFFFF)
				{
					j=j+4;
				}
				else if(c<0x3FFFFFF)
				{
					j=j+5;
				}
				else if(c<0x7FFFFFF)
				{
					j=j+6;
				}
			}
			return j;
		}

		function quotationCheck(value, limit_len) {
			var len = value.length;
			var c;
			var i, j = 0;
/* 
			for (i = 0; i < len; i++)
			{
				var c = value.charAt(i);
		 
				if ( c == ',' )
				{
					showWarning(_("WIFI_INVALID_SSID"));
					return true;
				}
			}
*/		
			
			j=UTF8CodeLength(value);
			
			if (j > limit_len-1)
			{
			return true;
			}	
			return false;
		}

function isValidHex(value)
{
	var ret = true;
	if((value.length % 2) != 0)
	{
		ret = false;
	}
	if(value.match(/[^a-fA-F0-9]+/))
	{
		ret = false;	
	}

	return ret;
}

function isValidASCII(value, showMessage)
{
	var checkChar = value.match(/.{2}/g);
	for (i = 0; i < (value.length / 2); i++)
	{
		var tmp = parseInt(checkChar[i],16);
		if( (tmp < 32) || (tmp > 126))
		{
			if(showMessage)
			{
				$('#content').text("El carácter introducido __"+ checkChar[i] +"__ no es válido para establecer tu clave wifi");
				$('#tab1').fadeIn();
			}
			return false;
		}
	}
	return true;
}


function invalidASCIIrange(value)
{
	for (i = 0; i < value.length; i++)
	{
		var tmp = value.charCodeAt(i);
		if( (tmp < 32) || (tmp > 126))
		{
			return true;
		}
	}
	return false;
}
function invalidSpaceUse(value)
{
	if(value.match("  ") != null)
	{
		return true;
	}
	if(value.indexOf(" ") == 0)
	{
		return true;
	}
	if(value.indexOf(" ") == value.length-1)
	{
		return true;
	}
	return false;
}

function wifiaccept(){
    wifiwarningsactived = false;
	var resultwpa = true;
    renoveSession();

	if ($("#wifi_status").checked == true) {
		var resultLong = checkPassLong();
	}

	if ($("#ssidname").attr("value").length == 0) {
		$('#content').text("SSID está vacío!");
		$('#tab1').fadeIn();
		return false;
	}
	if(quotationCheck($("#ssidname").attr("value"), 33)){
		$('#content').text("La longitud del nombre SSID no puede ser más de 32 bytes.");
		$('#tab1').fadeIn();
		return false;
	}
	
	if ($("#wifi_sec")[0].value == "WEP-64Bits")
	{
		if ($("#wifiPass").attr("value").length != 5 && $("#wifiPass").attr("value").length != 10)
		{
			$('#content').text("La clave debe tener 5 o 10 caracteres.");
			$('#tab1').fadeIn();
			return false;
		}
	}
	else if ($("#wifi_sec")[0].value == "WEP-128Bits")
	{
		if ($("#wifiPass").attr("value").length != 13 && $("#wifiPass").attr("value").length != 26)
		{
			//alert("La clave debe tener ya sea 13 o 26 caracteres.");
			$('#content').text("Longitud de clave incorrecta. Recuerda que puedes introducir 13 caracteres en codificacion ASCII (letras, números y caracteres especiales) o bien 26 caracteres en codificación Hexadecimal (0-9 y A-F)");
			$('#tab1').fadeIn();
			return false;
		}
		else if ($("#wifiPass").attr("value").length == 13 )
		{
		  if(invalidASCIIrange($("#wifiPass").attr("value")) || invalidSpaceUse($("#wifiPass").attr("value")))
		  {
				$('#content').text("Tu contraseña wifi contiene caracteres no válidos. Recuerda que no puedes introducir espacios inicio o final de la contraseña. Tampoco introducir varios espacios consecutivos.");
				$('#tab1').fadeIn();
				return false;
		  }
		  var password = $("#wifiPass").attr("value");
		  if(password.indexOf(" ") != -1)
		  {
				$('#content').text("Los espacios y guiones bajos , no se permiten.");
				$('#tab1').fadeIn();
				return false;
		  }
		}
		else if ($("#wifiPass").attr("value").length == 26 )
		{
			if(!isValidHex($("#wifiPass").attr("value")))
			{
				$('#content').text("Tu contraseña wifi contiene caracteres no válidos. Recuerda que no puedes introducir espacios inicio o final de la contraseña. Tampoco introducir varios espacios consecutivos.");
				$('#tab1').fadeIn();
				return false;
			}
		}
	}
	else if (($("#wifi_sec")[0].value == "WPA2PSK") || ($("#wifi_sec")[0].value == "WPAPSKWPA2PSK") )
	{
//		if ($("#wifiPass").attr("value").length < 8 || $("#wifiPass").attr("value").length > 64)
		if ($("#wifiPass").attr("value").length < 8 || $("#wifiPass").attr("value").length > 63)
		{	
			$('#content').text("WPA Pre-Shared Key debe estar entre 8 y 63 caracteres ASCII.");
			$('#tab1').fadeIn(); 
			return false;
		}
/*		
		else if ($("#wifiPass").attr("value").length == 64 )
		{
			if(!isValidHex($("#wifiPass").attr("value")))
			{
				$('#content').text("Error valor Pre-Shared Key Hex !");
				$('#tab1').fadeIn();
				return false;
			}
		}
*/		
		else
		{
		  if(invalidASCIIrange($("#wifiPass").attr("value")) || invalidSpaceUse($("#wifiPass").attr("value")))
		  {
			$('#content').text("Tu contraseña wifi contiene caracteres no válidos. Recuerda que no puedes introducir espacios inicio o final de la contraseña. Tampoco introducir varios espacios consecutivos.");
			$('#tab1').fadeIn();
			return false;
		  }
		}
	}

	var wpsstatus = $("#wps_status").attr("checked");	
	if (wpsstatus) {
		resultwpa = checkWPSStatus();
	}
	if (resultwpa == true) {	
		var wifiJSON = prepareWifiJSON();
		setWifiConfiguration(wifiJSON, function(success, error_desc){
			if (!success) 
				showWarning(_(error_desc));
			else {
				closeDialog();
			}
		});
    }
	
	loadingProcess();
	return true;
}

function wificancel(){
    //self.status="closing dialog";
    renoveSession();
   // getWifiInfo(updateWifiInNetworkmap);
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

function checkWPSStatus(){
	var securitymode = $("#wifi_sec")[0].value;
	var TKIPAES = $("#TKIP_Selection")[0].value;

    if (securitymode == 'WPA' || securitymode == 'WPA2' || securitymode == 'WPAPSK'
		|| securitymode == 'WEP-64Bits' || securitymode == 'WEP-128Bits') {
           showWarning(_("WIFI_WARNING8"));
           return false;
    }
    if ( securitymode == 'WPA2PSK' && TKIPAES == 'TKIP') {
           showWarning(_("WIFI_WARNING8"));
           return false;
    }

    return true;
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

function doHexCheck(digit) {
   var hexVals = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                           "A", "B", "C", "D", "E", "F", "a", "b", "c", "d", "e", "f");
   var len = hexVals.length;
   var i = 0;
   var ret = -1;

   for ( i = 0; i < len; i++ )
      if ( digit == hexVals[i] ) break;

   if ( i < len )
      ret = 1;

   return ret;
}

function updateWPAstrength(b){
    var value;
    if (b) 
        value = securitypass;
    else {	
        if( $('#wifiPass').is(':visible') ) {
                value = $("#wifiPass").attr("value");
        }else{
                value = $("#txthdnPassword").attr("value");
        }		
    }

	var wpapsklen=value.length;
	var i=0;

	if(value.indexOf(" ") == 0)
	{
		$('#content').text("WPA Pre-Shared Key debe estar entre 8 y 63 caracteres ASCII.");
		$('#tab1').fadeIn();
		return true;			
	}
	else if(value.indexOf(" ") == value.length-1)
	{
		$('#content').text("WPA Pre-Shared Key debe estar entre 8 y 63 caracteres ASCII.");
		$('#tab1').fadeIn();
		return true;				
	}	
   	if(wpapsklen < 8) {
		$('#content').text("WPA Pre-Shared Key debe estar entre 8 y 63 caracteres ASCII.");
		$('#tab1').fadeIn();
		return true;
	}else if(wpapsklen > 63) {
	    $('#content').text("WPA Pre-Shared Key debe estar entre 8 y 63 caracteres ASCII.");
		$('#tab1').fadeIn();
		return true;
	}
/*		
	}else if(wpapsklen == 64){
		for(i=0;i<wpapsklen;i++){
			var c=value.charAt(i);
			if(doHexCheck(c)<0){
				$('#content').text("Error valor Pre-Shared Key Hex !");
				$('#tab1').fadeIn();
				return true;
			}
		}
	}else if(wpapsklen > 64) {
        $('#content').text("WPA Pre-Shared Key debe estar entre 8 y 63 caracteres ASCII o 64 dígitos hexadecimales.");
		$('#tab1').fadeIn();
		return true;
	}
	else
	{
		for(i=0;i<wpapsklen;i++){
			var c=value.charAt(i);
			  if (c == ",")
			  {
			    //alert("Invalido Pre-Shared Key con caracter especial "+"\""+c+"\"");
                            $('#content').text("Invalido Pre-Shared Key con caracter especial "+"\""+c+"\"");
                            sub.click();
			    return true;
			  }
		}
	}
*/
	return false;

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



function updateRuleForm(rule){
	var value = rule.find("input[type=checkbox]").attr("checked");
	var from = rule.find(".fromField");
	var until = rule.find(".untilField");
	
	if (value){
		from.find("span").text(_("APPLICATIONS_RULES_NUMBER"));
		from.find("span").attr("key","APPLICATIONS_RULES_NUMBER");
		until.css('visibility', 'hidden');
		until.find("input").css('width', '31px');
				
	}else{
		from.find("span").text(_("APPLICATIONS_RULES_FROM"));
		from.find("span").attr("key","APPLICATIONS_RULES_FROM");
		until.css('visibility', 'visible');
		until.find("input").css('width', '40px');
	}
}

function updateScroll(){	
	setTimeout("loadScroll('#rules_list')",4);
}

function changeFlag(){
	flagChange = true;
}

function updateSelectEffects(){

	var rules = $("#rules_list>div");
	var N = rules.length;
	var lastone = null;
	var penultimateOne = null;
	
	//initial status
	rules.find(".jquery-selectbox-moreButton").unbind( "click",behaviourLastSelect);
	rules.find(".jquery-selectbox-moreButton").unbind( "click",behaviourPenultimateSelect);
	rules.find("select").unbind( "change");

	if (N>0) lastone=jQuery(rules[N-1]);
	if (N>1) penultimateOne=jQuery(rules[N-2]);
	if (N>=3){
		lastone.find(".jquery-selectbox-moreButton").bind( "click", behaviourLastSelect);
		penultimateOne.find(".jquery-selectbox-moreButton").bind( "click", behaviourPenultimateSelect);
		
		lastone.find("select").bind( "change", closeLastSelect);
		penultimateOne.find("select").bind( "change", closeLastSelect);
	}
}
