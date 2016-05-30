$(function(tab){
  chrome.tabs.getSelected(null, function(tab) {

    chrome.tabs.sendMessage(tab.id, {method: "getSelection"}, function(response){
     sendServiceRequest(response.data);
   });
  })
  var el = document.getElementById("graph"); // get canvas
  console.log(el);
  var options = {
    percent:  el.getAttribute('data-percent') || 25,
    size: el.getAttribute('data-size') || 220,
    lineWidth: el.getAttribute('data-line') || 15,
    rotate: el.getAttribute('data-rotate') || 0
  }

  var canvas = document.createElement('canvas');
  var span = document.createElement('span');
  span.textContent = options.percent + '%';

  if (typeof(G_vmlCanvasManager) !== 'undefined') {
    G_vmlCanvasManager.initElement(canvas);
  }

  var ctx = canvas.getContext('2d');
  canvas.width = canvas.height = options.size;

  el.appendChild(span);
  el.appendChild(canvas);

ctx.translate(options.size / 2, options.size / 2); // change center
ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

//imd = ctx.getImageData(0, 0, 240, 240);
var radius = (options.size - options.lineWidth) / 2;

var drawCircle = function(color, lineWidth, percent) {
  percent = Math.min(Math.max(0, percent || 1), 1);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
  ctx.strokeStyle = color;
        ctx.lineCap = 'round'; // butt, round or square
        ctx.lineWidth = lineWidth
        ctx.stroke();
      };

      drawCircle('#efefef', options.lineWidth, 100 / 100);
      var i = 0; var int = setInterval(function(){ i++; drawCircle('#555555', options.lineWidth, i / 100); span.textContent=i+"%"; if(i>=100) { clearInterval(int); } },100);
    });

var apiKey = "f52f3bcce1f70fa713775b1f5846ed8e";
function sendServiceRequest(info){
  $.ajax({
    url:'https://apiv2.indico.io/apis/multiapi/batch?key=f52f3bcce1f70fa713775b1f5846ed8e&apis=sentimenthq,texttags,language,keywords,personality,emotion,people,places',
    type: 'POST',
    tryCount: 0,
    retryLimit: 30,
    data:JSON.stringify({'data': info}),
    success: processData,
    error: function(xhr, status, errorThrown){
      console.log(status);
      if (status == 'timeout'){
        this.tryCount++;
        if (this.tryCount <= this.retryLimit){
          $.ajax(this);
          return;
        }
      }
    }     
  });
}

/* The callback function for the ajax request */
function processData(data){
  extractSentiment(data);
  extractLang(data);
  extractData(data,"keywords", 3);
  extractData(data,"texttags", 5);
  extractData(data,"personality",3);
  extractData(data,"personality",3);
  $("#graph").css("display","none");
  $("#result").css("display","block");

}
/*Function to extract Language from indico API */
function extractLang(article){
  var res = JSON.parse(article)["results"];
  var keywords = res["language"]["results"][0];
  console.log(keywords);
  var sortable = [];
  for (var keyword in keywords){
    sortable.push([keyword, keywords[keyword]])
  }
  sortable.sort(function(a,b) {return b[1] - a[1]})
  $("#language").append("<td>" + sortable[0][0] + "</td>");
  
}


/* Function to extract sentiment from indico API*/
function extractSentiment(article){
  console.log("why" + article);
  var res = JSON.parse(article)["results"];
  var sentiment = res["sentimenthq"]["results"][0];
  if (sentiment >= 0.5){
   $("#sentiment").append("Positive");
 } else {
  $("#sentiment").append("Negative");
}
}

function extractData(article, key, threadshold){
  var res = JSON.parse(article)["results"];
  var keywords = res[key]["results"][0];
  console.log(keywords);
  var sortable = [];
  for (var keyword in keywords){
    sortable.push([keyword, keywords[keyword]])
  }
  sortable.sort(function(a,b) {return b[1] - a[1]})
  var count = 0;
  for (var item in sortable){
    count += 1;
    console.log(sortable[item][1]);
    $("#"+key).append("<td width='15px' font-style='italic'>" + sortable[item][0] + "</td>");
    if (count > threadshold){
      break;
    }
  }
}