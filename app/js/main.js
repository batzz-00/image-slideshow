import $ from 'jquery'
import slider from './slider.js'
import './../sass/style.sass'
$(".slider").each(function(){
    var s = new slider($(this));
    $(this).find("a").each(function() {
        s.add($(this));
    }   );
})

