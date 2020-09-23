var securitypass = "";
var securitypassWPA2 = "";
var securitypassWPA = "";
var securitypassWEP = "";
var lanv4warningsactived = false;
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

function activeDHCP(){
    $("#DHCPpool").show('blind', 500, function(){
    });
}

function deactiveDHCP(){
    $("#DHCPpool").hide('blind', 500, function(){
    });
}

function lanv4statusmodified(check){
    if (check.checked) {
        setTimeout("activedLANv4();", 0);
    }
    else {
        if (lanv4warningsactived) {
            showInfoDialog($("#wifi_alert1").html(), false, true, function(resp){
                if (resp == true) 
                    setTimeout('deactivedLANv4();', 0);
                else {
                    $('#wifi_status').attr('checked', true).change();
                }
            });
        }
        else 
            setTimeout("deactivedLANv4();", 0);
    }
}

function activedLANv4(){
    $("#lanv4Conf").css('display', 'block');
    //load_iphone_butons();
    $("#lanv4Conf").show('blind', 500, function(){
    });
    $("#wifi .wifi_ico").attr("color", "green");
}

function deactivedLANv4(){
    $("#lanv4Conf").hide('blind', 500, function(){
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

function getIPv4DHCPPoolCount(){
	var startIP=$("#StartIpv4").attr("value");
	var endIP=$("#EndIpv4").attr("value");
		
	sIPsplit = startIP.split(".");
	eIPsplit = endIP.split(".");
	
	poolaccount=eIPsplit[3] - sIPsplit[3];
	
	return poolaccount;
}


function prepareLANJSON(){
    var key = new Object();
	key.sessionKey=gblsessionKey;
    var lanv4 = new Object();
	var lanv6 = new Object();
	lanv4.IPAddr = $("#uiViewIPAddrv4").attr("value");
	lanv4.Mask = $("#uiViewNetMaskv4").attr("value");
	lanv6.IPAddr = $("#uiViewIPAddrv6").attr("value");
	lanv6.Mask = $("#uiViewNetMaskv6").attr("value");
	var dhcpv4 = new Object();
    dhcpv4.status = $("#dhcpv4_status").attr("checked");
	var dhcpv6 = new Object();
    dhcpv6.status = $("#dhcpv6_status").attr("checked");
	dhcpv6.auto   = $("#auto_configuration").attr("checked");
	if (dhcpv4.status) {
        dhcpv4.poolStart = $("#StartIpv4").attr("value");
		dhcpv4.PoolSize = getIPv4DHCPPoolCount();		
    }
	if (dhcpv6.status) {
        dhcpv6.poolStart = $("#StartIpv6").attr("value");
		dhcpv6.PoolSize = $("#PoolSizev6").attr("value");
    }
	if (dhcpv6.auto) {
        dhcpv6.poolStart = "::33";
		dhcpv6.PoolSize =  "::254";
		dhcpv6.auto = "1" ;
    }else{
		dhcpv6.auto = "0" ;
	}
    var dnsv4 = new Object();
	dnsv4.PrimaryDns = $("#PrimaryDnsv4").attr("value");
	dnsv4.SecondDns = $("#SecondDnsv4").attr("value");
    var dnsv6 = new Object();
	dnsv6.PrimaryDns = $("#PrimaryDnsv6").attr("value");
	dnsv6.SecondDns = $("#SecondDnsv6").attr("value");
 
 
    var LANJSON = new Object();
    LANJSON.KEY = key;
    LANJSON.LANV4 = lanv4;
    LANJSON.DHCPV4 = dhcpv4;
    LANJSON.DNSV4 = dnsv4;
    LANJSON.LANV6 = lanv6;
    LANJSON.DHCPV6 = dhcpv6;
    LANJSON.DNSV6 = dnsv6;
    
    var LANJSONstring = $.toJSON(LANJSON);
    return LANJSONstring;
}

function checkIPFormat(address)
{
	var IP = address;
	IP = IP.replace(/ /g, "");
	address = IP;
	IPsplit = IP.split(".");
	if(IPsplit.length != 4 )
	{
		return (false);
	}
	for(i = 0; i < 4; i++)
		if((isNaN(IPsplit[i])) || (IPsplit[i] == 'undefined') || (IPsplit[i] == "")) 
		{
			return (false);
		} 
		else
		{
			if((parseInt(IPsplit[i], 10) > 255) || (parseInt(IPsplit[i], 10) < 0)) 
			{
				return (false);
			}
		}
		
	int_add0=parseInt(IPsplit[0], 10);
	int_add3=parseInt(IPsplit[3], 10);			
	if(int_add0 == 0 || int_add0 == 127 || int_add0 > 223 || int_add3 ==0 || int_add3 ==255)
	{
		return (false);
	}		
	return (true);
}

function SubnetCheck(mask)
{	
	if ( !((mask == "0.0.0.0")||
	(mask == "128.0.0.0")||
	(mask == "192.0.0.0")||
	(mask == "224.0.0.0")||
	(mask == "240.0.0.0")||
	(mask == "248.0.0.0")||
	(mask == "252.0.0.0")||
	(mask == "254.0.0.0")||
	(mask == "255.0.0.0")||
	(mask == "255.128.0.0")||
	(mask == "255.192.0.0")||
	(mask == "255.224.0.0")||
	(mask == "255.240.0.0")||
	(mask == "255.248.0.0")||
	(mask == "255.252.0.0")||
	(mask == "255.254.0.0")||
	(mask == "255.255.0.0")||
	(mask == "255.255.128.0")||
	(mask == "255.255.192.0")||
	(mask == "255.255.224.0")||
	(mask == "255.255.240.0")||
	(mask == "255.255.248.0")||
	(mask == "255.255.252.0")||
	(mask == "255.255.254.0")||
	(mask == "255.255.255.0")||
	(mask == "255.255.255.128")||
	(mask == "255.255.255.192")||
	(mask == "255.255.255.224")||
	(mask == "255.255.255.240")||
	(mask == "255.255.255.248")||
	(mask == "255.255.255.252")||
	(mask == "255.255.255.254")||
	(mask == "255.255.255.255")) )
	{
		return (false);
	}    
	return (true);
}
function trim(s)
{
    var l=0; var r=s.length -1;
    while(l < s.length && s[l] == ' ')
    {     l++; }
    while(r > l && s[r] == ' ')
    {     r-=1;     }
    return s.substring(l, r+1);
} 

function inValidIPv6Addr(Address1)
{
	var regExp = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
	
	var Address = trim(Address1);
	var address = Address.match(regExp);
	if(address == null){		
 		return true;
	}	
	return false;
}
function checkIPv6AddressFormat(uiViewIPv6Addr)
{
	var ret = false;
	ret = inValidIPv6Addr(uiViewIPv6Addr);
	if(ret == true)
	{
		return false;
	}
	return true;
}

function checkIPandIPv6IPFormat(LANJSON){
	var postData = eval ("(" + LANJSON + ")");
			
	if(SubnetCheck(postData.LANV4.Mask)==false || checkIPFormat(postData.LANV4.IPAddr)==false)
	{
      	showWarning(_("INVALID_IPV4_ADDRESS_MSG"));
        return false;
     }
	if(postData.DHCPV4.status){
		if(checkIPFormat(postData.DNSV4.PrimaryDns)==false || checkIPFormat(postData.DNSV4.SecondDns)==false
			|| checkIPFormat(postData.DHCPV4.poolStart)==false){
      	showWarning(_("INVALID_IPV4_ADDRESS_MSG"));
        return false;
     }
	}
	
	if(checkIPv6AddressFormat(postData.DNSV6.PrimaryDns)==false || checkIPv6AddressFormat(postData.DNSV6.SecondDns)==false){
      	showWarning(_("INVALID_IPV6_ADDRESS_MSG"));
        return false;
     }
	return true;
}


function lanaccept(){
    lanv4warningsactived = false;
    renoveSession();

    var LANJSON = prepareLANJSON();

	if(checkIPandIPv6IPFormat(LANJSON)==false)
		return;

    setLANConfiguration(LANJSON, function(success, error_desc){
        if (!success) 
            showWarning(_(error_desc));
        else {
            closeDialog();
        }
    });   
    
}

function lancancel(){
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
