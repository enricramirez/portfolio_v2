"use strict";

$(window).on('beforeunload', function () {
    $(window).scrollTop(0);
});
$('body').css('background-color', "#FFF1E3");
$('*').addClass("light");

setTimeout(function () {
    $(".cursor-follower").removeClass("active");
}, 6000);

$('.count').each(function () {
    $(this).prop('Counter', 100).delay(1000).animate({
        Counter: 2
    }, {
        duration: 2000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});

let noise = CSSRulePlugin.getRule("body:before");
let tl_load = new TimelineMax()

tl_load.to(".text-load", 0.5, {
        y: 0,
        ease: Power2.easeOut
    })
    .to(".text-load", 0.5, {
        y: "-50",
        delay: 3.5,
        ease: Power2.easeIn
    })
    .to(".mask", 0, {
        display: "none"
    })
    .to(".text-load", 0, {
        display: "none"
    })
    .to(".load", 1, {
        height: "0",
        ease: Power2.easeIn
    })
    .to(".hidetitle", 0.5, {
        top: 0
    }, 5.15)
    .to("html,body", 0, {
        overflow: "scroll"
    })
    .to(noise, 0, {
        cssRule: {
            opacity: .4
        }
    });

let tl_home = new TimelineMax();

tl_home.fromTo("#img1", 1, {
        y: "0"
    }, {
        y: "-200px"
    }, 0)
    .fromTo("#img2", 1, {
        y: "0"
    }, {
        y: "-100px"
    }, 0)

var tl_text = new TimelineMax()
    .add(TweenMax.staggerTo(".hidetext", 0.8, {
        top: "0"
    }, 0.1))

var tl_work = new TimelineMax()
    .add(TweenMax.staggerTo("hr", 0.5, {
        width: "100%"
    }, 0.2))
    .add(TweenMax.staggerTo(".hidetext2", 1, {
        top: "4px"
    }, 0.2), 0)
    .add(TweenMax.staggerTo(".hidetext3", 1, {
        top: "0"
    }, 0.2), .8)

document.addEventListener("DOMContentLoaded", function (event) {
    let controller = new ScrollMagic.Controller();

    let escena = new ScrollMagic.Scene({
            triggerElement: "body",
            triggerHook: 0,
            duration: "200%"
        })
        .setTween(tl_home)
        .addTo(controller);

    let escena2 = new ScrollMagic.Scene({
            triggerElement: "#text",
            triggerHook: 0.6,
            reverse: false
        })
        .setTween(tl_text)
        .addTo(controller);

    let escena3 = new ScrollMagic.Scene({
            triggerElement: "#works",
            triggerHook: 0.6,
            reverse: false
        })
        .setTween(tl_work)
        .addTo(controller);
});


let bool_color = 0;

$('#change_color, #change_color_responsive').click(function () {
    if (bool_color == 0) {
        TweenMax.to("body", 0.5, {
            backgroundColor: "#535A52"
        })
        $('*').removeClass("light");
        $('*').addClass("green");
        TweenMax.to(".change_color", 0.5, {
            color: "#FFF1E3"
        })
        TweenMax.to(".round", 0.5, {
            backgroundColor: "#FFF1E3"
        })
        TweenMax.to(noise, 0, {
            cssRule: {
                opacity: 0.8
            }
        })
        bool_color = 1;
    } else
    if (bool_color == 1) {
        TweenMax.to("body", 0.5, {
            backgroundColor: "#FFF1E3"
        })
        $('*').removeClass("green");
        $('*').addClass("light");
        TweenMax.to(".change_color", 0.5, {
            color: "#535A52"
        })
        TweenMax.to(".round", 0.5, {
            backgroundColor: "#535A52"
        })
        TweenMax.to(noise, 0, {
            cssRule: {
                opacity: 0.4
            }
        })
        bool_color = 0;
    }
});

let grid_column = true;

$('#grid-column').click(function () {
    if (grid_column == true) {
        TweenMax.to(".grid-column", 0, {
            display: "block"
        })
        TweenMax.to(".color-grid", .2, {
            opacity: 0.2
        })
        grid_column = false;
    } else {
        TweenMax.to(".color-grid", .2, {
            opacity: 0
        })
        TweenMax.to(".grid-column", 0, {
            display: "none",
            delay: .2
        })
        grid_column = true;
    }
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



var follower = $(".cursor-follower")

var posX = 0,
    posY = 0;

var mouseX = 0,
    mouseY = 0;

TweenMax.to({}, 0.016, {
    repeat: -1,
    onRepeat: function () {
        posX += (mouseX - posX) / 6;
        posY += (mouseY - posY) / 6;

        TweenMax.set(follower, {
            css: {
                left: posX - 12,
                top: posY - 12
            }
        });
    }
});

$(document).on("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
$("a, #works, .change_color, .round, .enric, #img1, #img2").on("mouseenter", function () {
    follower.addClass("active");
});
$("a, #works, .change_color, .round, .enric, #img1, #img2").on("mouseleave", function () {
    follower.removeClass("active");
});
