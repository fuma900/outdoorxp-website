var cataloghi = $('.cataloghi');
var listini   = $('.listini');

$.parse.get('Documents', {
  where: {
    user: user.objectId
  }
}, function(r) {
  console.log(r);
  var list = {
    'cataloghi': [],
    'listini': []
  };
  if (r.results.length > 0) {
    $.each(r.results, function(k,v){
      var html = '<p><a href="'+ v.file +'" target="_blank">' + v.name + '</a></p>';
      if (v.catalogue === true) {
        list.cataloghi.push(html);
      } else if (v.catalogue === false) {
        list.listini.push(html);
      }
    });
    (list.cataloghi.length>0)?cataloghi.html(list.cataloghi):{};
    (list.listini.length>0)?listini.html(list.listini):{};
    console.log(list);
  } 
});

