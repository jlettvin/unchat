splitwindow = {

 // Special function to enable multi-line text constants to be defined.
 hereDoc:function(f){return f.toString().replace(/.*\/\*([^\*]*).\/.*/,'$1');},

 // create default empty data dictionary.
 data:{userN:'', bodyN:'', userS:'', bodyS:''},

 // enable client to populate data dictionary.
 init:function(data) { this.data = data; },

 xy: {x:0,y:0},
 getScroll:function() {
  // http://webcodingeasy.com/Javascript/Get-scroll-position-of-webpage--crossbrowser
  var from = false;
  if (typeof( window.pageYOffset ) == 'number')
  { //Netscape compliant
    this.xy = {x:window.pageXOffset, y: window.pageYOffset};
  } else if (document.body &&
    (document.body.scrollLeft || document.body.scrollTop))
  { //DOM compliant
    from = document.body;
  } else if (document.documentElement && 
    (document.documentElement.scrollLeft || document.documentElement.scrollTop))
  { //IE6 standards compliant mode
    from = document.documentElement;
  }
  if (from) this.xy = {x:from.scrollLeft, y:from.scrollTop};
  //console.log(this.xy);
 },

 // define function to execute when load/resize operations are called.
 resize:function() {
  // declare local variables.
  var style, userN, userS, paneN, paneS;
  var w  = window.innerWidth, h = window.innerHeight;
  //this.getScroll();
  var h0 = '0px', h1 = h/2 + 'px', h2 = h + 'px';
  var w0 = '0px', w1 = w/2 + 'px', w2 = w + 'px';

  // prepare generic styles used by all.
  style  = 'body { font-family:"Times New Roman",serif; font-size:10px; }';
  style += 'body { background-color:red; overflow:hidden; }';
  style += 'article { overflow-y: scroll; }';
  style += 'pre  { margin:0; }';
  style += 'a.link { background-color: white; }';
  style += 'table { color: white; }';
  style += '#userN { position:absolute; right:0; color:#FF0; }';
  style += '#userS { position:absolute; right:0; color:#770; }';
  // prepare style for North frame.
  style += '#paneN{';
  style +=    'position:' +        'absolute; ' +            'color:white; ';
  style +=    'border:'   + 'solid black 1px; ' + 'background-color:black; ';
  style +=    'width:'+w2+';height:'+h1+';top:'+h0+';bottom:'+h1+';';
  style +=    'left:0;right:0;';
  style += '}';
  // prepare style for South frame.
  style += '#paneS{';
  style +=    'position:' +        'absolute; ' +            'color:black; ';
  style +=    'border:'   + 'solid white 1px; ' + 'background-color:white; ';
  style +=    'width:'+w2+';height:'+h1+';top:'+h1+';bottom:'+h2+';';
  style +=    'left:0;right:0;';
  style += '}';
  // assemble complete style tag.
  style  = '<style type="text/css">'+ style +'</style>';

  // prepare divs for North and South pane components.
  userN  = '<header  id="userN">' + this.data.userN + '</header>';
  userS  = '<header  id="userS">' + this.data.userS + '</header>';
  paneN += '<article id="paneN">' + userN + this.data.bodyN + '</article>';
  paneS += '<article id="paneS">' + userS + this.data.bodyS + '</article>';

  // write content to fill body tag.
  document.getElementById("splitwindow").innerHTML = style + paneN + paneS;
  window.onresize = splitwindow.resize;
  //window.scrollTo(this.xy.x, this.xy.y);
 },

};
// Make markdown function visible.
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  module.exports = splitwindow;
else {
  window.splitwindow = splitwindow;
}
