var apiKey = "f52f3bcce1f70fa713775b1f5846ed8e";
chrome.contextMenus.onClicked.addListener(function(info,tab){
  var text = info.selectionText;
      console.log(text);
    $.post(
      'https://apiv2.indico.io/sentiment/batch?key=f52f3bcce1f70fa713775b1f5846ed8e',
      JSON.stringify({
      'data': text
    })
    ).then(function(res) { console.log("w" + res) });
    $.post(
      'https://apiv2.indico.io/language?key=f52f3bcce1f70fa713775b1f5846ed8e',
      JSON.stringify({
      'data': text
    })
).then(function(res) { console.log(res) });

})