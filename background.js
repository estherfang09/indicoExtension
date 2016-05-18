var apiKey = "f52f3bcce1f70fa713775b1f5846ed8e";
chrome.contextMenus.onClicked.addListener(function(info,tab){
  var text = info.selectionText;
      console.log(text);
    $.post(
    'https://apiv2.indico.io/apis/multiapi/batch?key=f52f3bcce1f70fa713775b1f5846ed8e&apis=sentimenthq,texttags,language,keywords',
     JSON.stringify({'data': text
    })
    ).then(function(res) { console.log("w" + res) });
   

})