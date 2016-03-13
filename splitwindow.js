splitwindow = {
 //____________________________________________________________________________
 // Special function to enable multi-line text constants to be defined.
 // https://gist.github.com/tai2/c63f973dd7f8b3607c0e
 HERE:function(f) { return f.toString().split('\n').slice(1,-1).join('\n'); },

 //____________________________________________________________________________
 // create default empty data dictionary.
 pane:{
   North:{id:'North', render:true, },
   South:{id:'South', render:true, }
 },

 //____________________________________________________________________________
 getScroll:function(render, pane) {
   var item = document.getElementById(pane);
   var named = (render ? 'render' : 'markup') + pane + '.';
   var x = item.scrollLeft, y = item.scrollTop;
   console.log('get: ' + named + '(' + x + ',' + y + ')');
   sessionStorage.setItem('Y' + named, y);
   sessionStorage.setItem('X' + named, x);
 },

 //____________________________________________________________________________
 setScroll:function(render, pane) {
   var item = document.getElementById(pane);
   var named = (render ? 'render' : 'markup') + pane + '.';
   var y = parseInt(sessionStorage.getItem('Y' + named));
   var x = parseInt(sessionStorage.getItem('X' + named));
   item.scrollTop  = y;
   item.scrollLeft = x;
   console.log('set: ' + named + '(' + x + ',' + y + ')');
 },

 //____________________________________________________________________________
 // define function to execute when load/resize operations are called.
 resize:function() {
  // declare local variables.
  var style, userN, userS, paneN, paneS;
  var w  = window.innerWidth, h = window.innerHeight;
  var h0 = '0px', h1 = h/2 + 'px', h2 = h + 'px';
  var w0 = '0px', w1 = w/2 + 'px', w2 = w + 'px';
  var North = this.pane.North, South = this.pane.South;

  // prepare generic styles used by all.
  style  = 'body { font-family:"Times New Roman",serif; font-size:10px; }';
  style += 'body { background-color:red; overflow:hidden; }';
  style += 'article { overflow-y: scroll; }';
  style += 'pre  { margin:0; }';
  style += 'a.link { background-color: white; }';
  style += 'table { color: white; }';
  style += '#userN { position:fixed; right:20px; color:#FF0; }';
  style += '#userS { position:fixed; right:20px; color:#770; }';
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
  var idN = (North.render ? 'render' : 'markup') + ' ' + North.id;
  var idS = (South.render ? 'render' : 'markup') + ' ' + South.id;
  userN  = '<header  id="userN">' + idN + '</header>';
  userS  = '<header  id="userS">' + idS + '</header>';
  paneN += '<article id="paneN">' + userN + North.body + '</article>';
  paneS += '<article id="paneS">' + userS + South.body + '</article>';

  // write content to fill body tag.
  document.getElementById("splitwindow").innerHTML = style + paneN + paneS;
  window.onresize = this.resize;

  splitwindow.setScroll(North.render, 'paneN');
  splitwindow.setScroll(South.render, 'paneS');
 },
 //____________________________________________________________________________
};

// Make markdown function visible.
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  module.exports = splitwindow;
else {
  window.splitwindow = splitwindow;
}
