document.addEventListener('DOMContentLoaded',function(){
    var next_btn = document.querySelector('.item-img .button .right'),//get slide button next=right
    prev_btn = document.querySelector('.item-img .button .left'),//get prev=left
    big_slide = document.querySelectorAll('.big-list > li'), //get big slide
    small_slide = document.querySelectorAll('.small-list > li'), //get small slide                      // VAR FOR SLIDE
    cur_pos =0,     // current active position (initial = 0 , first slide)
    status_animation = "stop"; //var for prevent spamming click ,stop = no animation is occure

// SMALL SLIDE
    for (let i = 0; i < small_slide.length; i++) { //check for click event in small slide array item    
        small_slide[i].addEventListener('click',function () {
            var wait_animation = 0;             //prevent spamclick (check in big slide at line 69 )
            if (status_animation == "move") {
                return false;
            }
            status_animation = "move";
            if (i > cur_pos) { // i > cur_pos mean click to the element stay in the right side of the current active slide
                small_slide[cur_pos].classList.remove('active'); //remove active in the current active (small)
                big_slide[cur_pos].addEventListener('webkitAnimationEnd', function () { //wait for animation in big slide end (check in big slide at line 69 )
                    console.log(this);
                    this.classList.remove('hide');
                    this.classList.remove('active');
                    wait_animation = wait_animation +1;
                    if (wait_animation == 2) {
                        status_animation = "stop";
                    }
                })
                big_slide[i].addEventListener("webkitAnimationEnd", function () {
                    this.classList.remove('show');
                    this.classList.add('active');
                    wait_animation = wait_animation +1;
                    if (wait_animation == 2) {
                        status_animation = "stop";
                    }
                })              
                big_slide[cur_pos].classList.add('hide');
                big_slide[i].classList.add('show');
                small_slide[i].classList.add('active');              
            } else if (i < cur_pos) {
                small_slide[cur_pos].classList.remove('active');
                big_slide[cur_pos].addEventListener('webkitAnimationEnd', function () {
                    this.classList.remove('hide1');//this = big_slide[cur_pos] or the element bound with add eventlistener 
                    this.classList.remove('active');// using big_slide[cur_pos] in this line is not work because JS run code from top to bottom , so this function is only call when the animation end , which after the last line (63) done which happen to set the cur_pos = i (read comment at line 63 to know why) so when this function is call , it can't use the cur_pos(which is now set = i) anymore , so with using "this" - we mean the cur_pos we use to add hide class 
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
                small_slide[i].classList.add('active');             
            } else {
                status_animation = "stop";
            }
            cur_pos = i; // set the cur_pos = to location of list item clicked (because in this function we are not changing the cur_pos at all , unlike the bigslide function , so if we not have this line the next time we click the cur_pos will still be in)
        });
    }
    // BIG SLIDE
    function direction(which_one) { // direciton function (which is called in line 121,122) , which_one = left or right 
        var wait_animation = 0;//another var for prevent spamming click , max = 2 for 2 animation show and hide . will increase by 1 when each animation done
        if (status_animation == "move") { // stop executing direction function when animation is happening
            return false; 
        }
        status_animation = "move"; // stop function executing
        small_slide[cur_pos].classList.remove('active');//style for small slide (which have the same length with big slide so can use same cur_pos var , need to have active class in the same index of slide )
        var cur_act = big_slide[cur_pos];//passing the current active position for cur_act
        if (which_one == 'right') {//if click in button next (right)
            if (cur_pos < big_slide.length - 1) {//bigslide length max = 3 (1 2 3), cur_pos max = 2 (0 1 2) 
                cur_pos = cur_pos + 1;//keep increase cur_pos when clicking until cur_pos > 2 
            } else {cur_pos=0;}//if cur_pos > 2 then set it back to 0
        }   else if (which_one == 'left') {//if click in button prev (left)
            if (cur_pos > 0) {//same with next button , but here decrease the cur_pos when it reach 0
                cur_pos = cur_pos - 1;
            } else {cur_pos = big_slide.length - 1} // if cur_pos < 0 then set it back to 2 (length(3) - 1)
        }
        var next_act = big_slide[cur_pos];//passing the next active position for next_act with new processed cur_pos
        var wait_hidden = function () {//called in line 108(watch line 110 down first)
            if (which_one == 'right') {
                cur_act.classList.remove('hide');//remove hide when it has finish its animation
                cur_act.classList.remove('active');//also remove active so it will dissapear competely
            }   else if (which_one == 'left') {
                cur_act.classList.remove('hide1');//same but different class
                cur_act.classList.remove('active');
            }
            wait_animation = wait_animation +1;
            if (wait_animation == 2) {status_animation = "stop";}
        }
        var wait_show = function () {//called in line 109
            if (which_one == 'right') {
                next_act.classList.remove('show');//same with wait_hidden
                next_act.classList.add('active');// has to add active for it to display
            }   else if (which_one == 'left') {
                next_act.classList.remove('show1');
                next_act.classList.add('active');
            }
            wait_animation = wait_animation +1;
            if (wait_animation == 2) {status_animation = "stop";}
        }
        cur_act.addEventListener('webkitAnimationEnd',wait_hidden);//add event listen for when the animation end ,then call wait_something
        next_act.addEventListener('webkitAnimationEnd',wait_show);
        if (which_one == 'right') {
            cur_act.classList.add('hide');//add the hide class for the cur_act for it dissapears
            next_act.classList.add('show');//add the show class for the next_act for it showup
            small_slide[cur_pos].classList.add('active');//style for small slide, same index slide with big slide
        }   else if (which_one == 'left') {
            cur_act.classList.add('hide1');//hide1 for prev button
            next_act.classList.add('show1');//show1
            small_slide[cur_pos].classList.add('active');//style for small slide, same index slide with big slide
        }

    }
    next_btn.addEventListener('click',function () { direction('right') });//add event listen for 2 button which call function direction and pass the direction for it (left and right)
    prev_btn.addEventListener('click',function () { direction('left') });

    // SHOW NAV BAR in iPAD or smaller screen
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
    
},false)


