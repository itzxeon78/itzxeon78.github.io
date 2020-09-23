/*----------------------------*/
/*		SESSION MANAGEMENT    */
/*----------------------------*/
function closeSession(callback){
	jQuery.getJSON( '/mhs/APIS/returnJSON.txt', 
		function(returnData, status){
			if(returnData.RETURN.success){
				callback(returnData.RETURN.success,"");
			}else{
				callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
			}
		}
	);
}

/*---------------------------------------*/
/*	 AUTHENTICATION AND PASSWORD CHANGE	 */
/*---------------------------------------*/
function getLoginStatus(callback){
	jQuery.getJSON('/mhs/APIS/returnLoginStatusJSON.txt', 
		function(returnData, status){
			if(returnData.RETURN.success){
				callback(returnData.RETURN.success,returnData.STATUS);
			}else{
				callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
			}
		}
	);	
}
////returnJSON structure contains a passwordJSON structure
function isPasswordDefault(callback){
	jQuery.getJSON( '/mhs/APIS/returnPasswordJSON.txt', 
		function(returnData, status){
			if(returnData.RETURN.success){
				callback(returnData.RETURN.success,returnData.PASSWORD);
			}else{
				callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
			}
		}
	);
}
function authentication(user, password, callback){
	jQuery.getJSON( '/mhs/APIS/returnJSON.txt', 
		function(returnData, status){
			if(returnData.RETURN.success){
				callback(returnData.RETURN.success,"");
			}else{
				callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
			}
		}
	);
}
function changePassword(user,oldPassword,newPassword, callback){
	jQuery.getJSON( '/mhs/APIS/returnJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,"");
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}

/*---------------------------*/
/*	 DEVICES CONFIGURATION 	 */
/*---------------------------*/
//returnJSON structure contains a devicesJSON structure with information about all devices
function listDevices(callback){
	jQuery.getJSON( '/mhs/APIS/returnDevicesJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.DEVICES);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}
 
//returnJSON structure contains a devicesJSON structure with information about all devices to paint networkMap
function modifyDevice(devicesJSON,callback){
	jQuery.getJSON( '/mhs/APIS/returnDevicesJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.DEVICES);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}

//returnJSON structure contains a devicesJSON structure with information about all devices to paint networkMap
function removeDevice(idDevice,callback){
	jQuery.getJSON( '/mhs/APIS/returnDevicesJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.DEVICES);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}
/*-------------------*/
/*		INTERNET   	 */
/*-------------------*/
//returnJSON structure contains an internetJSON structure
function getInternetInfo(callback){
	jQuery.getJSON( '/mhs/APIS/returnInternetJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.INTERNET);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}
//returnJSON structure contains a internetJSON structure
function setInternet(internetJSON, callback){
	jQuery.getJSON( '/mhs/APIS/returnWifiJSON.txt',
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.INTERNET);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
	);
}
/*-----------------------*/
/*		APPLICATIONS   	 */
/*-----------------------*/
//returnJSON structure contains an applicationsListJSON structure
function listApplications(callback){
	jQuery.getJSON( '/mhs/APIS/returnApplicationsListJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.APPLICATION_LIST);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}

//returnJSON structure contains an applicationsListJSON structure
function listFreeApplications(callback){
	jQuery.getJSON( '/mhs/APIS/returnApplicationsListJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.APPLICATION_LIST);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}
 
//returnJSON structure contains an applicationsListJSON structure
function listAssignedApplications(idDevice,callback){
	jQuery.getJSON( '/mhs/APIS/returnApplicationsListJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.APPLICATION_LIST);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}

//returnJSON structure contains an applicationsJSON structure
function infoApplications(callback){
	jQuery.getJSON( '/mhs/APIS/returnApplicationsJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.APPLICATIONS);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}
//returnJSON structure contains an applicationJSON structure
function newApplication(applicationJSON,callback){
	jQuery.getJSON( '/mhs/APIS/returnApplicationsJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.APPLICATIONS);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}

function deleteApplication(idApplication,callback){	
	jQuery.getJSON( '/mhs/APIS/returnApplicationsJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.APPLICATIONS);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}
 
//returnJSON structure contains an applicationJSON structure
function modifyApplication(applicationJSON,callback){	
	jQuery.getJSON( '/mhs/APIS/returnApplicationsJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.APPLICATIONS);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}

function modifyListAssignedApplications(idDevice,applicationsListJSON,callback){
	jQuery.getJSON( '/mhs/APIS/returnJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,"");
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}

/*-------------------*/
/*		FIREWALL   	 */
/*-------------------*/
// returnJSON structure contains a firewallJSON structure
function listFirewallLevels(callback){
	jQuery.getJSON( '/mhs/APIS/returnFirewallJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.FIREWALL);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}
 
//returnJSON structure contains a firewallJSON structure
function setFirewallLevel(idSelectedLevel,callback){
	jQuery.getJSON( '/mhs/APIS/returnFirewallJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.FIREWALL);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
} 

//returnJSON structure contains a interfacesJSON structure
function listInterfaces(callback){
	jQuery.getJSON( '/mhs/APIS/returnInterfacesJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.INTERFACES);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}

//returnJSON structure contains a ipJSON structure
function listIps(callback){
	jQuery.getJSON( '/mhs/APIS/returnIpJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.IPS);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}

//returnJSON structure contains a servicesJSON structure
function listServices(callback){
	jQuery.getJSON( '/mhs/APIS/returnServicesJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.SERVICES);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}
//returnJSON structure contains a firewallLevelJSON structure
function infoFirewallLevel(idLevel, callback){
	jQuery.getJSON( '/mhs/APIS/returnFirewallLevelJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.FIREWALL_LEVEL);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}

//returnJSON structure contains a firewallLevelJSON structure
function newFirewallLevel(firewallLevelJSON,callback){
	jQuery.getJSON( '/mhs/APIS/returnFirewallLevelJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.FIREWALL_LEVEL);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}
 
//returnJSON structure contains a ipJSON structure
function newIp(ip,callback){
	jQuery.getJSON( '/mhs/APIS/returnIpJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.IPS);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);	
}

//returnJSON structure contains a servicesJSON structure
function newService(nameService,port,callback){
	jQuery.getJSON( '/mhs/APIS/returnServicesJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.SERVICES);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);	
}

//returnJSON structure contains a firewallLevelJSON structure
function newFirewallRule(idLevel,firewallRuleJSON,callback){
	jQuery.getJSON( '/mhs/APIS/returnFirewallLevelJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.FIREWALL_LEVEL);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}

function deleteFirewallLevel(idLevel,callback){
	jQuery.getJSON( '/mhs/APIS/returnJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,"");
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}
 
//returnJSON structure contains a firewallLevelJSON structure
function deleteFirewallRule(idLevel,idRule,callback){
	jQuery.getJSON( '/mhs/APIS/returnFirewallLevelJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.FIREWALL_LEVEL);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}
 
//returnJSON structure contains a firewallLevelJSON structure
function modifyFirewallLevel(firewallLevelJSON,callback){
	jQuery.getJSON( '/mhs/APIS/returnFirewallLevelJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.FIREWALL_LEVEL);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}

//returnJSON structure contains a firewallLevelJSON structure
function modifyFirewallRule(firewallRuleJSON,idLevel,idRule,callback){
	jQuery.getJSON( '/mhs/APIS/returnFirewallLevelJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.FIREWALL_LEVEL);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}

/*---------------------------*/
/*		 WIFI AND DHCP   	 */
/*---------------------------*/
//returnJSON structure contains a wifiJSON structure
function getWifiInfo(callback){
	jQuery.getJSON( '/mhs/APIS/returnWifiJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
	);
}

//returnJSON structure
function setWifiConfiguration(wifiJSON, callback){
	var postData = eval ("(" + wifiJSON + ")");
	var wifistatus= postData.WIFI.status;
	if(wifistatus)
	{
	postData.WIFI.status=1;
	$.ajax({
	  	url: 'returnWifiJSON.asp',
	  	dataType: 'json',
		type:'post',
		cache: false,
	  	data: {
	  		submitValue: "Apply",
			ssidName: postData.WIFI.ssidName,
			wifistatus: postData.WIFI.status,
			wifiVisible: postData.WIFI.ssidVisibility,
			channelMode: postData.WIFI.channelMode,
			wifichannel: postData.WIFI.channel,
			securityMode: postData.WIFI.SECURITY.cipherAlgorithm,
			WEPKey: postData.WIFI.SECURITY.passwordWEP,
			WPAKey: postData.WIFI.SECURITY.passwordWPA,
			WPA2Key: postData.WIFI.SECURITY.passwordWPA2,
			DHCPStatus: postData.DHCP.status,
			PoolStart: postData.DHCP.poolStart,
			PoolEnd: postData.DHCP.poolEnd,
			LANIP: postData.LAN.ip,
			LANMASK: postData.LAN.mask
		}
	});
        }
        else
	{
		postData.WIFI.status=0;
		$.ajax({
	  	url: 'returnWifiJSON.asp',
	  	dataType: 'json',
		type:'post',
		cache: false,
	  	data: {
	  		submitValue: "Apply",
			wifistatus: postData.WIFI.status,
			DHCPStatus: postData.DHCP.status,
			PoolStart: postData.DHCP.poolStart,
			PoolEnd: postData.DHCP.poolEnd,
			LANIP: postData.LAN.ip,
			LANMASK: postData.LAN.mask
		}
	});
}
}

/*-------------------*/
/*		  USB   	 */
/*-------------------*/
//returnJSON structure contains a usbJSON structure
function getUSBInfo(serialNumber,callback){
	jQuery.getJSON( '/mhs/APIS/returnUsbJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.USB);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
	);
}
/*----------------------------*/
/*		  Welcome Splash  	  */
/*----------------------------*/
//returnJSON structure contains an welcomeInfoJSON structure
function urlWelcomeSplash(callback){
	jQuery.getJSON( '/mhs/APIS/returnWelcomeInfoJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.URL);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}