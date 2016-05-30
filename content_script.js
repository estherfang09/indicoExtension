chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("Why how");
    if (request.method === "getSelection") {
    	if (window.getSelection().toString() != ''){
    		console.log("HEY" + window.getSelection().toString());

      		sendResponse({data: window.getSelection().toString()});
      	} else {
      		console.log("Why" + document.all[0].innerText);
      		sendResponse({data: document.all[0].innerText});
      	}
      }
    else {
      sendResponse({}); // snub them.
  }
});


