document.addEventListener('DOMContentLoaded',function(){

    // SHOW NAV in iPAD
    var showNav = document.querySelector('i.hidden'),
        closeNav = document.querySelector('.navBar > li:nth-child(7)'),
        Nav = document.querySelector('.navBar');

    // console.log(closeNav);
    showNav.addEventListener('click', function () {
        Nav.classList.remove('non-active');
        Nav.classList.toggle('active');
    })
    closeNav.addEventListener('click', function () {
        console.log('ok');
        Nav.classList.remove('active');
        Nav.classList.toggle('non-active');
    })

    // COLOR PICK 
    var colorList = document.querySelectorAll('.color__list > li'),
        colorName = document.querySelector('.color__name h3');
    // console.log(color);
    for (let i = 0; i < colorList.length; i++) {
        colorList[i].addEventListener('click',function () {
            var colorType = colorList[i].getAttribute('data-color');
            for (let k = 0; k < colorList.length; k++) {
                colorList[k].classList.remove('active');
            }
            colorList[i].classList.toggle('active');
            colorName.innerHTML = colorType;
        })
    }

    // RULE PICK
    var paperList = document.querySelectorAll('.rule__list > li'),
        pageName = document.querySelector('.rule__name h3');
    for (let i = 0; i < paperList.length; i++) {
        paperList[i].addEventListener('click', function () {
            var paperType = paperList[i].getAttribute('data-pageType');
            for (let k = 0; k < paperList.length; k++) {
                paperList[k].classList.remove('active');
            }
            paperList[i].classList.toggle('active');
            pageName.innerHTML = paperType;
        })
    }

    // Number select
    var select_number = document.querySelectorAll('.inputNumber .button'),
        number_input = document.querySelector('#number-products'),
        prices = 24,
        prices_input = document.querySelector('.prices__money .big'),
        discounted = false;
  
        var price_click = function () {
            var btn_type = this.getAttribute('data-btnType');
            if (btn_type == "add") {
                number_input.value = parseInt(number_input.value) + 1;

            } else {
                if (number_input.value > 0) {
                    number_input.value = parseInt(number_input.value) - 1;
                } else {
                    number_input.value = 0;
                }
            }
            
            if ((number_input.value >= 5) && !discounted) {
                discounted = true;
                var pricesInput_number = prices_input.innerHTML;
                prices_input.classList.add('discount');

                pricesInput_number = pricesInput_number - (pricesInput_number*(25/100));

                prices_input.innerHTML = pricesInput_number;
            }   else if ((number_input.value < 5) && discounted){
                discounted = false;
                prices_input.innerHTML = prices;
                prices_input.classList.remove('discount');
            }
        }

    for (let i = 0; i < select_number.length; i++) {
        select_number[i].addEventListener('click',price_click)
    }




    // SLIDE
    var next_btn = document.querySelector('.item-img .button .right'),
        prev_btn = document.querySelector('.item-img .button .left'),
        big_slide = document.querySelectorAll('.big-list > li'),
        small_slide = document.querySelectorAll('.small-list > li'),
        cur_active = document.querySelector('.big-list > li.active'),
        cur_active2 = document.querySelector('.small-list > li.active'),
        cur_pos =0,
        status_animation = "stop";
        

    // CLICK SMALL SLIDE
    for (let i = 0; i < small_slide.length; i++) {
        small_slide[i].addEventListener('click', function () {
            if (i > cur_pos) {
                var wait_animation = 0;
                if (status_animation == "move") {
                    return false;
                }
                status_animation = "move";
                small_slide[cur_pos].classList.remove('active');
                var wait_hidden =  function () {
                    this.classList.remove('hide');
                    this.classList.remove('active');
                    wait_animation = wait_animation +1;
                    if (wait_animation == 2) {
                        status_animation = "stop";
                    }
                }
                big_slide[cur_pos].addEventListener("webkitAnimationEnd",wait_hidden);
                big_slide[i].addEventListener("webkitAnimationEnd", function () {
                    big_slide[i].classList.remove('show');
                    big_slide[i].classList.add('active');
                    wait_animation = wait_animation +1;
                    if (wait_animation == 2) {
                        status_animation = "stop";
                    }
                })
                big_slide[cur_pos].classList.add('hide');
                big_slide[i].classList.add('show');
                small_slide[i].classList.add('active'); 
                cur_pos = i;
                return cur_pos; // trả cur_pos về để các function click khác xác định active để vận hành
            } 
            else if (i < cur_pos) {
                var wait_animation = 0;
                if (status_animation == "move") {
                    return false;
                }
                status_animation = "move";
                small_slide[cur_pos].classList.remove('active');
                big_slide[cur_pos].addEventListener("webkitAnimationEnd", function () {
                    this.classList.remove('hide1');
                    this.classList.remove('active');
                    wait_animation = wait_animation +1;
                    if (wait_animation == 2) {
                        status_animation = "stop";
                    }
                })
                big_slide[i].addEventListener("webkitAnimationEnd", function () {
                    big_slide[i].classList.remove('show1');
                    big_slide[i].classList.add('active');
                    wait_animation = wait_animation +1;
                    if (wait_animation == 2) {
                        status_animation = "stop";
                    }
                })
                big_slide[cur_pos].classList.add('hide1');
                big_slide[i].classList.add('show1');
                this.classList.add('active'); //small slide
                cur_pos = i;
                return cur_pos; // trả cur_pos về để các function click khác xác định active để vận hành
            } 
        })
    }

// NEXT BUTTON
    var clicknext = function () {
        var wait_animation = 0;

        if (status_animation == "move") {
            return false;
        }

        status_animation = "move";
            // remove all active 
            // for (let i = 0; i < big_slide.length; i++) {
            //     big_slide[i].classList.remove('active');
            // }
            for (let i = 0; i < small_slide.length; i++) {
                small_slide[i].classList.remove('active');
            }
        var cur_act = big_slide[cur_pos];
            // cur_act.classList.remove('active');
        if (cur_pos < big_slide.length-1) {

            cur_pos = cur_pos + 1 ;
        }   else {
            cur_pos = 0;
        }

        var next_act = big_slide[cur_pos];

        var wait_hidden = function () {
            this.classList.remove('active');
            this.classList.remove('hide');

            wait_animation++;
            if (wait_animation == 2) {
                status_animation = "stop";
            }

        }
        cur_act.addEventListener("webkitAnimationEnd", wait_hidden);
        var wait_show = function () {
            this.classList.remove('show');
            this.classList.add('active');

            wait_animation++;
            if (wait_animation == 2) {
                status_animation = "stop";
            }
        }
        // webkitAnimationEnd is syntax for chrome safari opera

        next_act.addEventListener("webkitAnimationEnd",wait_show);



            cur_act.classList.add('hide');
            // cur_act.classList.remove('active');
            next_act.classList.add('show');
            small_slide[cur_pos].classList.add('active'); //big and small slide have the same lenght 
    }
    next_btn.addEventListener('click', clicknext);
// PREV BUTTON
    var clickprev = function () {
        var wait_animation = 0;

        if (status_animation == "move") {
            return false;
        }
        status_animation = "move";

            // remove all active 
            for (let i = 0; i < small_slide.length; i++) {
                small_slide[i].classList.remove('active');
            }

        var cur_act = big_slide[cur_pos];
        if (cur_pos > 0) {
            cur_pos = cur_pos - 1 ;
        } else {
            cur_pos = big_slide.length - 1;
        }
        var prev_act = big_slide[cur_pos];

        var wait_hidden = function () {
            this.classList.remove('active');
            this.classList.remove('hide1');
            
            wait_animation++;
            if (wait_animation == 2) {
                status_animation = "stop";
            }
        }
        cur_act.addEventListener("webkitAnimationEnd", wait_hidden);
        var wait_show = function () {
            this.classList.remove('show1');
            this.classList.add('active');

            wait_animation++;
            if (wait_animation == 2) {
                status_animation = "stop";
            }
        }
        // webkitAnimationEnd is syntax for chrome safari opera

        prev_act.addEventListener("webkitAnimationEnd",wait_show);

            cur_act.classList.add('hide1');
            // cur_act.classList.remove('active');
            prev_act.classList.add('show1');
            small_slide[cur_pos].classList.add('active');
    }
    prev_btn.addEventListener('click', clickprev);


},false)