var htmlparser = require("htmlparser2");

function getTextFromContant(textParse){
   if(!textParse) return;
   var stringText = "";
   var parser = new htmlparser.Parser({
    ontext: function(text){
        stringText += text;
    }
   
}, {decodeEntities: true});
  var step = 300;
  var s = 0;
  var n = 400; 
  while(stringText.length < step){ 
    parser.write(textParse.substring(s,n));
    s += n;
    n += step;    
  }
parser.end();

  return stringText.substring(0,300)+" ....";
}


module.exports = getTextFromContant;