splitwindow = {

 // Special function to enable multi-line text constants to be defined.
 hereDoc:function(f){return f.toString().replace(/.*\/\*([^\*]*).\/.*/,'$1');},

 // create default empty data dictionary.
 data:{userN:'', bodyN:'', userS:'', bodyS:''},

 // enable client to populate data dictionary.
 init:function(data) { this.data = data; },

 // define function to execute when load/resize operations are called.
 resize:function() {
  // declare local variables.
  var style, userN, userS, paneN, paneS;
  var w  = window.innerWidth, h = window.innerHeight;
  var h0 = '0px', h1 = h/2 + 'px', h2 = h + 'px';
  var w0 = '0px', w1 = w/2 + 'px', w2 = w + 'px';

  // prepare generic styles used by all.
  style  = 'body { font-family:"Times New Roman",serif; font-size:10px; }';
  style += 'body { background-color:red; overflow:hidden; }';
  style += 'div  { margin:0px,0px,0px,0px; padding:0px,0px,0px,0px; }';
  style += 'div  { overflow-y:scroll; border-collapse:collapse; width:100%; }';
  style += 'pre  { margin:0; }';
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
  style   = '<style type="text/css">'+ style +'</style>';

  // prepare divs for North and South pane components.
  userN   = '<header id="userN" align="center">'  + this.data.userN + '</header>';
  userS   = '<header id="userS" align="center">'  + this.data.userS + '</header>';
  paneN   = '<div id="paneN">' + userN + this.data.bodyN + '</div>';
  paneS   = '<div id="paneS">' + userS + this.data.bodyS + '</div>';

  // write content to fill body tag.
  document.getElementById("splitwindow").innerHTML = style + paneN + paneS;
  window.onresize = splitwindow.resize;
 },

};
