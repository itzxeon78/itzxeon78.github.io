var nameDevice;
var ipDevice;
var typeDevice;
var interfaceDevice;
var connectedDevice;
var idIconDevice;
var unknownDevice;
var idDev;

function overEffectDev(idDevice){
	$('#device'+idDevice).mouseover(function(){
		$(this).children('span').addClass('txt_hover');
		$(this).attr("isover", true );
	});
}
function outEffectDev(idDevice){
	$('#device'+idDevice).mouseout(function(){
		$(this).children('span').removeClass('txt_hover');
		$(this).attr("isover", false );
	});	
}
var allDevices=new Object();
function showDevices(success,devices){
	var htmlConComputer="", htmlConLaptop="", htmlConTV="", htmlConHifi="", htmlConMobile="",htmlConPhone="", htmlConGame="", htmlConHardDrive="", htmlConPrinter="";
	var htmlConOther="", htmlConUnknown="", htmlDisconComputer="", htmlDisconLaptop="", htmlDisconTV="", htmlDisconHifi="",htmlDisconPhone="";
	var htmlDisconMobile="", htmlDisconGame="", htmlDisconHardDrive="", htmlDisconPrinter="", htmlDisconOther="", htmlDisconUnknow="";
	if(success){
		allDevices=devices;
		var i=0;
		for(	;i<devices.length;i++){	
			var htmlDevice="";
			var dev = devices[i];
			
			htmlDevice=createDevice(dev.idDevice, dev.nameDevice, dev.serialNumber, dev.idIcon, dev.type, dev.interfaceType, dev.ipAddress, dev.mac, dev.connected, dev.unknown, dev.blacklisted);
			
			if(dev.connected){
				if(dev.type=="DesktopComputer"){
					htmlConComputer=htmlConComputer+htmlDevice;
				}if(dev.type=="Laptop"){
					htmlConLaptop=htmlConLaptop+htmlDevice;
				}else if(dev.type=="TVset"){
					htmlConTV=htmlConTV+htmlDevice;
				}else if(dev.type=="HiFi"){
					htmlConHifi=htmlConHifi+htmlDevice;
				}else if(dev.type=="CellPhone"){
					htmlConPhone=htmlConPhone+htmlDevice;
				}else if(dev.type=="MobileDevice"){
					htmlConMobile=htmlConMobile+htmlDevice;
				}else if(dev.type=="GameConsole"){
					htmlConGame=htmlConGame+htmlDevice;
				}else if(dev.type=="HardDrive"){
					htmlConHardDrive=htmlConHardDrive+htmlDevice;
				}else if(dev.type=="Printer"){
					htmlConPrinter=htmlConPrinter+htmlDevice;
				}else if(dev.type=="Other"){
					htmlConOther=htmlConOther+htmlDevice;
				}else if(dev.type=="Unknown"){
					htmlConUnknown=htmlConUnknown+htmlDevice;
				}
			}else{
				if(dev.type=="DesktopComputer"){
					htmlDisconComputer=htmlDisconComputer+htmlDevice;
				}if(dev.type=="Laptop"){
					htmlDisconLaptop=htmlDisconLaptop+htmlDevice;
				}else if(dev.type=="TVset"){
					htmlDisconTV=htmlDisconTV+htmlDevice;
				}else if(dev.type=="HiFi"){
					htmlDisconHifi=htmlDisconHifi+htmlDevice;
				}else if(dev.type=="CellPhone"){
					htmlDisconPhone=htmlDisconPhone+htmlDevice;
				}else if(dev.type=="MobileDevice"){
					htmlDisconMobile=htmlDisconMobile+htmlDevice;
				}else if(dev.type=="GameConsole"){
					htmlDisconGame=htmlDisconGame+htmlDevice;
				}else if(dev.type=="HardDrive"){
					htmlDisconHardDrive=htmlDisconHardDrive+htmlDevice;
				}else if(dev.type=="Printer"){
					htmlDisconPrinter=htmlDisconPrinter+htmlDevice;
				}else if(dev.type=="Other"){
					htmlDisconOther=htmlDisconOther+htmlDevice;
				}else if(dev.type=="Unknown"){
					htmlDisconUnknow=htmlDisconUnknow+htmlDevice;
				}
			}			
		} 	
		
		$("#home_content").html("");
		$("#home_content").append(htmlConComputer);
		$("#home_content").append(htmlConLaptop);
		$("#home_content").append(htmlConTV);
		$("#home_content").append(htmlConHifi);
		$("#home_content").append(htmlConPhone);
		$("#home_content").append(htmlConMobile);
		$("#home_content").append(htmlConGame);
		$("#home_content").append(htmlConHardDrive);
		$("#home_content").append(htmlConPrinter);	
		$("#home_content").append(htmlConOther);
		$("#home_content").append(htmlConUnknown);
		$("#home_content").append(htmlDisconComputer);
		$("#home_content").append(htmlDisconLaptop);
		$("#home_content").append(htmlDisconTV);
		$("#home_content").append(htmlDisconHifi);
		$("#home_content").append(htmlDisconPhone);
		$("#home_content").append(htmlDisconMobile);
		$("#home_content").append(htmlDisconGame);
		$("#home_content").append(htmlDisconHardDrive);
		$("#home_content").append(htmlDisconPrinter);
		$("#home_content").append(htmlDisconOther);
		$("#home_content").append(htmlDisconUnknow);
		
		var Nfiles = Math.ceil( devices.length / 4 )
		if	(	Nfiles > 2	){			
			$("#home_content").removeClass('fix_height');
			$("#home_content").addClass('height');	
			
		}else{						
			$("#home_content").addClass('fix_height');
			$("#home_content").removeClass('height');
		}	
		
		var rest = devices.length%4;
		if (rest==0 && Nfiles>0 ) rest=4;
				
		$("#home_content>div:lt("+(devices.length-rest)+")>div").css("margin-bottom", "30px");
		var lastones = $("#home_content>div:gt("+(devices.length-rest-1)+")>div");
		lastones.css("margin-bottom", "0px");
				
		loadScroll("#home_content");		
		
		var urlIcon="";
		var i=0;
		for (; i < devices.length; i++) {
			var dev = devices[i];
			overEffectDev(dev.idDevice);	
			outEffectDev(dev.idDevice);			
		}
	}else{
		showWarning(_(devices));
	}
} 

function createDevice(id, name, serialNumber, idIcon, kind, interfaceType, ipDir, mac, connected, unknown, blacklisted){
	if(interfaceType=="USB"){
		if(name==null || name==""){
			name=interfaceType;
		}
	}else{
		if(unknown || name==null || name==""){
			name=ipDir;	
		}
	}

	var htmlDisp="";
	htmlDisp=htmlDisp+"<div id='contentDevice"+id+"' idDevice='" +id+ "'><div id='device"+id+"' class='device hand' connected='"+connected+"' unknown='"+unknown+"' interface='"+interfaceType+"' deviceType='"+kind+"' ";
	
	if(kind=="Printer" && interfaceType=="USB"){
		htmlDisp=htmlDisp+"onclick='loadPrinterDialog();'";
	}else if(kind=="HardDrive" && interfaceType=="USB"){
		htmlDisp=htmlDisp+"onclick='loadUSBDialog(\""+serialNumber+"\");'";
	}else{
		htmlDisp=htmlDisp+"onclick=\"loadDevice(\'/cgi-bin/mhs/html/conf_device.html\',_('CONF_DEV_TITLE'),450,\'"+name+"\',\'"+kind+"\',\'"+ipDir+"\',\'"+connected+"\',\'"+interfaceType+"\',\'"+idIcon+"\',\'"+unknown+"\',\'"+id+"\');\"";
	}		
	htmlDisp=htmlDisp+">";
	
	htmlDisp=htmlDisp+"<div class='device_ico'></div>";
	htmlDisp=htmlDisp+"<div class='device_interface'></div>";
	
	if(connected){		
		htmlDisp=htmlDisp+"<span class='device_txt_connected'>"+name+"</span>";
	}else{			
		htmlDisp=htmlDisp+"<span class='device_txt_disconnect'>"+name+"</span>"; 
	}
	htmlDisp=htmlDisp+"</div></div>";
	
	return htmlDisp;
}


function loadDevice(page, title, width, name, kind, ip, connected, interfaceType, idIcon, unknown, id){		
	nameDevice=name;
	typeDevice =kind;
	ipDevice=ip;	
	connectedDevice = connected;
	interfaceDevice = interfaceType;
	idIconDevice=idIcon;
	unknownDevice=unknown;
	idDev=id;
	
	if (1){	
		loadDialog(page, title, width, function(){		
			$("select#selectType option[value=\'"+kind+"\']").attr("selected", "selected");
			$("select#selectType").selectbox();		
			$('select#selectType').change(function(){				
				loadIconDev($('select#selectType').val());
			});		
		});		
	}else{
		loadDialogLogin("/cgi-bin/mhs/html/logIn.html",_("LOGIN_TITLE"),448,"devices");
	}
		
}
function loadModalDevice(success,varReturn){
	if (success){
		logIn();
		loadDevice("/cgi-bin/mhs/html/conf_device.html", _('CONF_DEV_TITLE'), 450, nameDevice, typeDevice, ipDevice, connectedDevice, interfaceDevice,idIconDevice,unknownDevice,idDev);
	}else{
		showWarning(_(varReturn))
	}
}


function loadLAN_v4(){
	if(1){
		loadDialog("/cgi-bin/mhs/html/networkMap/lan_v4.html",_("NETWORKMAP_LOCAL"),450, function (){
			$("#select_numcanal").selectbox();
			$("#wifi_sec").selectbox();
			load_some_iphone_butons($("#dhcpv6_status,#dhcpv4_status"));
		});
	}else{
		loadDialogLogin("/cgi-bin/mhs/html/logIn.html",_("LOGIN_TITLE"),448,"lanv4");
	}
}

function loadModalLANv4(success,varReturn){
	if (success){
		logIn();
		loadLAN_v4();
	}else{
		showWarning(_(varReturn));
	}
}
function loadLAN_v6(){
	if(1){
		loadDialog("/cgi-bin/mhs/html/networkMap/lan_v6.html",_("LANv6_TITLE"),450, function (){
			$("#select_numcanal").selectbox();
			$("#wifi_sec").selectbox();
			load_some_iphone_butons($("#wifi_status,#dhcp_status"));
		});
	}else{
		loadDialogLogin("/cgi-bin/mhs/html/logIn.html",_("LOGIN_TITLE"),448,"lanv6");
	}
}

function loadModalLANv6(success,varReturn){
	if (success){
		logIn();
		loadLAN_v6();
	}else{
		showWarning(_(varReturn));
	}
}

function load_aviso(){
	if(1){
		loadDialog("/cgi-bin/mhs/html/networkMap/Aviso.html",_("AVISO_TITLE"),450, function (){
			$("#select_numcanal").selectbox();
			$("#wifi_sec").selectbox();
			load_some_iphone_butons($("#wifi_status,#dhcp_status"));
		});
	}else{
		loadDialogLogin("/cgi-bin/mhs/html/logIn.html",_("LOGIN_TITLE"),448,"aviso");
	}
}

function loadModalaviso(success,varReturn){
	if (success){
		logIn();
		load_aviso();
	}else{
		showWarning(_(varReturn));
	}
}

function loadWAN(){
	if(1){
		loadDialog("/cgi-bin/mhs/html/networkMap/adsl.html",_("NETWORKMAP_TOLINE"),450, function (){
			$("#select_numcanal").selectbox();
			$("#wifi_sec").selectbox();
			load_some_iphone_butons($("#static_status,#nat_status"));
		});
	}else{
		loadDialogLogin("/cgi-bin/mhs/html/logIn.html",_("LOGIN_TITLE"),448,"wan");
	}
}
function loadModalWAN(success,varReturn){
	if (success){
		logIn();
		loadWAN();
	}else{
		showWarning(_(varReturn));
	}
}
function load_router(){
	if(1){
		loadDialog("/cgi-bin/mhs/html/networkMap/router.html",_("ADSL_TITLE"),450, function (){
			$("#select_numcanal").selectbox();
			$("#wifi_sec").selectbox();
			load_some_iphone_butons($("#wifi_status,#dhcp_status"));
		});
	}else{
		loadDialogLogin("/cgi-bin/mhs/html/logIn.html",_("LOGIN_TITLE"),448,"router");
	}
}

function loadModalBackup(success,varReturn){
	if (success){
		logIn();
		load_backup();
	}else{
		showWarning(_(varReturn));
	}
}
function load_backup(){
	if(1){
		loadDialog("/cgi-bin/mhs/html/networkMap/backupRestore.html",_("BACKUPRESTORE_TITLE"),450, function (){
			$("#select_numcanal").selectbox();
			$("#wifi_sec").selectbox();
			load_some_iphone_butons($("#wifi_status,#dhcp_status"));
		});
	}else{
		loadDialogLogin("/cgi-bin/mhs/html/logIn.html",_("LOGIN_TITLE"),448,"backup");
	}
}

function loadModalfwupload(success,varReturn){
	if (success){
		logIn();
		load_fwupload();
	}else{
		showWarning(_(varReturn));
	}
}
function load_fwupload(){
	if(1){
		loadDialog("/cgi-bin/mhs/html/networkMap/firmwareUpgrade.html",_("FIRMUPGRADE_TITLE"),450, function (){
			$("#select_numcanal").selectbox();
			$("#wifi_sec").selectbox();
			load_some_iphone_butons($("#wifi_status,#dhcp_status"));
		});
	}else{
		loadDialogLogin("/cgi-bin/mhs/html/logIn.html",_("LOGIN_TITLE"),448,"fwupload");
	}
}
function loadModalRouter(success,varReturn){
	if (success){
		logIn();
		load_router();
	}else{
		showWarning(_(varReturn));
	}
}
function loadWifi(){
	if(1){
		loadDialog("/cgi-bin/mhs/html/networkMap/wifi.html",_("WIFI_TITLE"),450, function (){
			$("#select_numcanal").selectbox();
			$("#wifi_sec").selectbox();
			load_some_iphone_butons($("#wifi_status,#dhcp_status"));
		});
	}else{
		loadDialogLogin("/cgi-bin/mhs/html/logIn.html",_("LOGIN_TITLE"),448,"wifi");
	}
}
function loadModalWifi(success,varReturn){
	if (success){
		logIn();
		loadWifi();
	}else{
		showWarning(_(varReturn));
	}
}
function loadAdsl(){
	if(1){
		loadDialog("/cgi-bin/mhs/html/networkMap/adsl.html",_("ADSL_TITLE"),450, function (){
		});
	}else{
		loadDialogLogin("/cgi-bin/mhs/html/logIn.html",_("LOGIN_TITLE"),448,"adsl");
	}
}
function loadModalAdsl(success,varReturn){
	if (success){
		logIn();
		loadAdsl();
	}else{
		showWarning(_(varReturn));
	}
}
function loadUSBDialog(serialNumber){
	var os=getOS();
	var url="";var wid=450;
	if (os=='win' || os=='mac') { url='conf_disk';}
	else if (os=='linux') { url='conf_disk_lin';wid=450;}
	loadDialog("html/"+url+".html",_('CONF_DISK_TITLE'),wid,function (){
		collectData(serialNumber);	
	});
}

function loadPrinterDialog() { 
	var os=getOS();
	var url="";var wid=450;
	if (os=='win') { url='conf_printer_win'; }
	else if (os=='mac') { url='conf_printer_mac'; wid=650; }
	else if (os=='linux') { url='conf_printer_lin';wid=450;}
	loadDialog("html/"+url+".html",_('CONF_PRINT_TITLE'),wid,function(){ printerReady(); });
}


function loadApplications(){
	if(1){
		loadDialog("/cgi-bin/mhs/html/networkMap/applications.html",_("APPLICATIONS_TITLE"),790, function (){
			load_some_iphone_butons($("#rules_list input[type=checkbox]"));
			$("select").selectbox();
		});
	}else{
		loadDialogLogin("/cgi-bin/mhs/html/logIn.html",_("LOGIN_TITLE"),448,"applications");
	}
}

function loadApplications_v6(){
	if(1){
		loadDialog("/cgi-bin/mhs/html/networkMap/applications_v6.html",_("APPLICATIONS_TITLE"),790, function (){
			load_some_iphone_butons($("#rules_list input[type=checkbox]"));
			$("select").selectbox();
		});
	}else{
		loadDialogLogin("/cgi-bin/mhs/html/logIn.html",_("LOGIN_TITLE"),448,"applications");
	}
}

function loadModalApplications(success,varReturn){
	if (success){
		logIn();
		loadApplications()
	}else{
		showWarning(_(varReturn));
	}
}
function loadPassword(){
	if(1){
		loadDialog("/cgi-bin/mhs/html/changePassword.html",_("HEAD_PASSWORD"),450, function (){});
	}else{
		loadDialogLogin("/cgi-bin/mhs/html/logIn.html",_("LOGIN_TITLE"),448,"password");
	}
}
function loadModalPassword(success,varReturn){
	if (success){
		logIn();
		loadPassword();
	}else{
		showWarning(_(varReturn));
	}
}
function loadThreeG(){
	loadDialog("/cgi-bin/mhs/html/networkMap/threeG.html",_("THREEG_TITLE"),450, function (){
		load_some_iphone_butons($("#threeg_status"));
	});	
}

function showInternetStatus(success,internet){
	//alert(internet.physicalStatus);
	if(success){
		if(internet.physicalStatus=="up"){
			$('#iconInternet').attr("INTERNET_STATUS","INTERNET_OK");
			$('#internetAlert').html(_("COMMON_EMPTY"));
			$('#internetAlert').attr("key","COMMON_EMPTY");
			$(".divInternet").css("cursor","auto");
			$('#internet').unbind('click');
			$('#adsl').attr("adslactive",true);
			//effectHover('adsl', 'adsl_ico');	//adsl not used as link just now
		}else{
			$('#iconInternet').attr("INTERNET_STATUS","NO_INTERNET");
			$('#internetAlert').html(_("MAP_NO_INT_ACCESS"));
			$('#internetAlert').attr("key","MAP_NO_INT_ACCESS");
			$(".divInternet").css("cursor","pointer");
		
			
			$('#adsl').attr("adslactive",false);
			$('#internet').unbind('click');
			$('#internet').click(function() {
				loadDialog("/cgi-bin/mhs/html/networkMap/internet_error.html",_("INTERNET_ERROR_TITLE"),450,function() { errorReady();});
			});
			//Efects Hover
			$('#internet').unbind("mouseover");
			$('#internet').mouseover(function(){
				$('#iconInternet').attr("INTERNET_STATUS","ICON_OVER");
				$(this).children('.internet_txt').children('span').addClass('txt_hover');
			});
			$('#internet').unbind("mouseout");
			$('#internet').mouseout(function(){
				$('#iconInternet').attr("INTERNET_STATUS","NO_INTERNET");
				$(this).children('.internet_txt').children('span').removeClass('txt_hover');
			});
			//loadDialog("html/networkMap/internet_error.html",_("INTERNET_ERROR_TITLE"),450,function() { errorReady();});
		}

	}else{
		showWarning(_(internet));
	}
}

function getOS() {
	var navInfo = window.navigator.appVersion.toLowerCase();
	var os = 'win';
	if(navInfo.indexOf('win') != -1){os = 'win';}
	else if(navInfo.indexOf('mac') != -1){os = 'mac';}
	else if((navInfo.indexOf('linux') != -1)  || (navInfo.indexOf('x11') != -1) ){os = 'linux';}
	return os;
} 

function updateDevicesBag(success,devices){
	if(success){
		var originalLength = $("#home_content").children().length;
		
		allDevices=devices;
		//$("#home_content").html("");
		
		
		$("#home_content").children().addClass("updatePending");
		var i=0;
		for(	;i<devices.length;i++){	
			
			var dev = devices[i];
			var id = dev.idDevice;

			var device= $("#home_content").children("[idDevice="+id+"]");
			var htmlDevice=createDevice(dev.idDevice, dev.nameDevice, dev.serialNumber, dev.idIcon, dev.type, dev.interfaceType, dev.ipAddress, dev.mac, dev.connected, dev.unknown, dev.blacklisted);
		
			if (device.length>0)
			{	//device already exists
				
				
				//if (i!=3){
					device = jQuery(device[0]);
					device.replaceWith(htmlDevice);
				//} 
				
				//var capadev= jQuery(device.children()[0]);
				//capadev.children("span").html(dev.nameDevice);
			}
			else{
				//this is a new device
				$("#home_content").prepend(htmlDevice);
				
				device = $("#home_content").children("[idDevice="+id+"]");
				device = jQuery(dev[0]);
			}
				
			//setting hover effects			
			overEffectDev(dev.idDevice);	
			outEffectDev(dev.idDevice);	
		}
		
		var toremove  = $("#home_content").children(".updatePending");
		toremove.remove("*");
		
		//ordering
//		var orderedTypes = new Array("DesktopComputer","Laptop", "TVset", "HiFi", "CellPhone", "MobileDevice", "GameConsole", "HardDrive", "Printer", "Other", "Unknown");

		
		var Nfiles = Math.ceil( devices.length / 4 )
		if	(	Nfiles > 2	){			
			$("#home_content").removeClass('fix_height');
			$("#home_content").addClass('height');	
			
		}else{						
			$("#home_content").addClass('fix_height');
			$("#home_content").removeClass('height');
		}	
		
			
		var rest = devices.length%4;
		if (rest==0 && Nfiles>0 ) rest=4;
		
		//fixing margins
		$("#home_content>div:lt("+(devices.length-rest)+")>div").css("margin-bottom", "30px");
		var lastones = $("#home_content>div:gt("+(devices.length-rest-1)+")>div");
		lastones.css("margin-bottom", "0px");
		//$("#home_content").css("height", (66*Nfiles+30*(Nfiles-1))	);

		//if ((devices.length > 8) && (	Nfiles != Math.ceil( originalLength / 4 ) )) {
		if (	Nfiles != Math.ceil( originalLength / 4 )) {
		//if (devices.length > 8) {
			loadScroll("#home_content");
		}
	
	}else{
		showWarning(_(devices));
	}
} 

function updateWifiInNetworkmap(success, data){
	
	if (!success){
		showWarning(_(data));
		return;
	}
	
	var status = data.WIFI.status;
	if (status == "0" || status == "false") status = 0;
	if (status == "1" || status == "true")	status = 1;
	
	var security = "NON";
	var securitypass = "";
	if (data.WIFI.SECURITY != undefined) {
		security = data.WIFI.SECURITY.cipherAlgorithm;
		securitypass = data.WIFI.SECURITY.password;
	}
	
	if (status){
		$("#wifi .wifi_ico").attr("color", "green");
		if (security == "WPA2") 
			$("#wifi .wifi_txt").attr("key", "MAP_WIFI_WPA2");
		else if (security == "WPA") 
			$("#wifi .wifi_txt").attr("key", "MAP_WIFI_WPA");
		else if(security == "WEP")
			$("#wifi .wifi_txt").attr("key", "MAP_WIFI_WEP");
		else if(security == "None")
			$("#wifi .wifi_txt").attr("key", "MAP_WIFI_NONE");	
	}else{
		$("#wifi .wifi_ico").attr("color", "grey");
		$("#wifi .wifi_txt").attr("key", "MAP_WIFI_DISABLED");
	}
	reloadTextsDiv('wifi');
	
	
}
