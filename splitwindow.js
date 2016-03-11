splitwindow = {
 //____________________________________________________________________________
 // Special function to enable multi-line text constants to be defined.
 // https://gist.github.com/tai2/c63f973dd7f8b3607c0e
 HERE:function(f) { return f.toString().split('\n').slice(1,-1).join('\n'); },

 //____________________________________________________________________________
 // create default empty data dictionary.
 data:{userN:'', bodyN:'', userS:'', bodyS:''},

 //____________________________________________________________________________
 // enable client to populate data dictionary.
 init:function(data) { this.data = data; },

 //____________________________________________________________________________
 getScroll:function(pane) {
   var elmnt = document.getElementById(pane);
   sessionStorage.setItem('top.'  + pane, elmnt.scrollTop );
   sessionStorage.setItem('left.' + pane, elmnt.scrollLeft);
 },

 //____________________________________________________________________________
 setScroll:function(pane) {
   var elmnt = document.getElementById(pane);
   elmnt.scrollTop  = parseInt(sessionStorage.getItem('top.'  + pane));
   elmnt.scrollLeft = parseInt(sessionStorage.getItem('left.' + pane));
 },

 //____________________________________________________________________________
 // define function to execute when load/resize operations are called.
 resize:function() {
  // declare local variables.
  var style, userN, userS, paneN, paneS;
  var w  = window.innerWidth, h = window.innerHeight;
  var h0 = '0px', h1 = h/2 + 'px', h2 = h + 'px';
  var w0 = '0px', w1 = w/2 + 'px', w2 = w + 'px';

  splitwindow.getScroll('paneN');
  splitwindow.getScroll('paneS');

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
  userN  = '<header  id="userN">' + this.data.userN + '</header>';
  userS  = '<header  id="userS">' + this.data.userS + '</header>';
  paneN += '<article id="paneN">' + userN + this.data.bodyN + '</article>';
  paneS += '<article id="paneS">' + userS + this.data.bodyS + '</article>';

  // write content to fill body tag.
  document.getElementById("splitwindow").innerHTML = style + paneN + paneS;
  window.onresize = this.resize;

  splitwindow.setScroll('paneN');
  splitwindow.setScroll('paneS');
 },
 //____________________________________________________________________________
};
// Make markdown function visible.
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  module.exports = splitwindow;
else {
  window.splitwindow = splitwindow;
}
