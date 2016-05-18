
   chrome.contextMenus.create({
      "title": "Sentiment anlysis",
      "contexts": [ "page" ,"selection"],
      "onclick": function (info, e){
      	sentimentAnalysis(info.selectionText);
   }
})
  