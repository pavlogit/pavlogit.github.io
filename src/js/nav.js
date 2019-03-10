//прилипание шапки при прокрутке
window.onscroll = function() {
  var scrolled = document.documentElement.scrollTop;
  var nav = document.querySelector('.site-header');
  if (scrolled > 35) {
    nav.style.margin = '0 -35px 0 -35px';
  }
  else if (scrolled < 35) {
    nav.style.margin = '35px -35px 0 -35px';
  }
}

//навигация
var topMenu = $(".nav"),
    topMenuHeight = topMenu.outerHeight()+15,
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

//прокрута
$(window).scroll(function(){
   // позиция контейнера 
   var fromTop = $(this).scrollTop()+topMenuHeight;

   // id контейнера
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // id элемента навигации
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   // установка удаление класса 
   menuItems
     .parent().removeClass("active")
     .end().filter("[href='#"+id+"']").parent().addClass("active");
})

