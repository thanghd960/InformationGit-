chrome.browserAction.setBadgeText({text: "perf"});	

// Execute the inject.js in a tab and call a method,
// passing the result to a callback function.
function injectedMethod (tab, method, callback) {
  chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function(){
    chrome.tabs.sendMessage(tab.id, { method: method }, callback);
  });
}

function getFPT (tab) {

  // When we get a result back from the getFPT
  // method, alert the data
  injectedMethod(tab, 'getFPT', function (response) {
    chrome.browserAction.setBadgeText({text: response.data + ""});  
    return true;
  });

}

// When the browser action is clicked, call the
// getFPT function for that page.
chrome.browserAction.onClicked.addListener(getFPT);


// update fpt onload
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    getFPT(tab);
  }
})

// update fpt on tab change
chrome.tabs.onActivated.addListener(function(activeInfo) {
  // how to fetch tab url using activeInfo.tabid
  chrome.tabs.get(activeInfo.tabId, function(tab){
     getFPT(tab);
  });
}); 


