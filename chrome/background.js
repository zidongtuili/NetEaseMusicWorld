chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'loading') {
    chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
      const header = {
        name: 'X-Real-IP',
        value: '211.161.244.70'
      }
      details.requestHeaders.push(header)
      return {requestHeaders: details.requestHeaders}
    }, {urls: ['*://music.163.com/*']}, ['blocking', 'requestHeaders'])
  
	var settings = {
	    'domain': "m10.music.126.net",
	    'ip': "ws.acgvideo.com",
	    'enabled': true
	}, requestFilter = {urls: ["<all_urls>"]},
	    onBeforeRequestHandler = function(details) {
		if (settings.enabled && (details.url.indexOf(settings.domain) > -1)) {
		    return { redirectUrl: details.url.replace(settings.domain, settings.ip) };
		}
	    },
	    onBeforeSendHeadersHandler = function(details) {
		if (settings.enabled && (details.url.indexOf(settings.ip) > -1)) {
		    details.requestHeaders.push({ name: "Host", value: settings.domain });
		    return {requestHeaders: details.requestHeaders};
		}
	    };
	chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestHandler,   {urls: ['*://'+settings.domain+'/*']}, ["blocking"]);
	chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeadersHandler,{urls:['*://'+settings.ip+'/*']}, ["blocking", "requestHeaders"]);
    }
});


