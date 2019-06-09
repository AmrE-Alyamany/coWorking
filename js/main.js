(function($) {
    "use strict";


    // Initiate the wowjs animation library
    new WOW().init();

    // Initiate superfish on nav menu
    $('.nav-menu').superfish({
        animation: {
            opacity: 'show'
        },
        speed: 400
    });

    // Mobile Navigation
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({
            id: 'mobile-nav'
        });
        $mobile_nav.find('> ul').attr({
            'class': '',
            'id': ''
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function(e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("fa-chevron-up fa-chevron-down");
        });

        $(document).on('click', '#mobile-nav-toggle', function(e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').toggle();
        });

        $(document).click(function(e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    // Smooth scroll for the menu and links with .classes
    $('.nav-menu a, #mobile-nav a').on('click', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                var top_space = 0;

                if ($('#header').length) {
                    top_space = $('#header').outerHeight();

                    if (!$('#header').hasClass('header-fixed')) {
                        top_space = top_space - 20;
                    }
                }

                $('html, body').animate({
                    scrollTop: target.offset().top - top_space
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.nav-menu').length) {
                    $('.nav-menu .menu-active').removeClass('menu-active');
                    $(this).closest('li').addClass('menu-active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
                return false;
            }
        }
    });

    // Header scroll class
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    // Intro carousel
    $('.carousel').carousel({
        interval: 2000
    });
})(jQuery);
/***********************************************************************














// function autocomplete(inp, arr) {
//             /*the autocomplete function takes two arguments,
//             the text field element and an array of possible autocompleted values:*/
//             var currentFocus;
//             /*execute a function when someone writes in the text field:*/
//             inp.addEventListener("input", function(e) {
//                 var a, b, i, val = this.value;
//                 /*close any already open lists of autocompleted values*/
//                 closeAllLists();
//                 if (!val) {
//                     return false;
//                 }
//                 currentFocus = -1;
//                 /*create a DIV element that will contain the items (values):*/
//                 a = document.createElement("DIV");
//                 a.setAttribute("id", this.id + "autocomplete-list");
//                 a.setAttribute("class", "autocomplete-items");
//                 /*append the DIV element as a child of the autocomplete container:*/
//                 this.parentNode.appendChild(a);
//                 /*for each item in the array...*/
//                 for (i = 0; i < arr.length; i++) {
//                     /*check if the item starts with the same letters as the text field value:*/
//                     if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//                         /*create a DIV element for each matching element:*/
//                         b = document.createElement("DIV");
//                         /*make the matching letters bold:*/
//                         b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
//                         b.innerHTML += arr[i].substr(val.length);
//                         /*insert a input field that will hold the current array item's value:*/
//                         b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
//                         /*execute a function when someone clicks on the item value (DIV element):*/
//                         b.addEventListener("click", function(e) {
//                             /*insert the value for the autocomplete text field:*/
//                             inp.value = this.getElementsByTagName("input")[0].value;
//                             /*close the list of autocompleted values,
//                             (or any other open lists of autocompleted values:*/
//                             closeAllLists();
//                         });
//                         a.appendChild(b);
//                     }
//                 }
//             });
//             /*execute a function presses a key on the keyboard:*/
//             inp.addEventListener("keydown", function(e) {
//                 var x = document.getElementById(this.id + "autocomplete-list");
//                 if (x) x = x.getElementsByTagName("div");
//                 if (e.keyCode == 40) {
//                     /*If the arrow DOWN key is pressed,
//                     increase the currentFocus variable:*/
//                     currentFocus++;
//                     /*and and make the current item more visible:*/
//                     addActive(x);
//                 } else if (e.keyCode == 38) { //up
//                     /*If the arrow UP key is pressed,
//                     decrease the currentFocus variable:*/
//                     currentFocus--;
//                     /*and and make the current item more visible:*/
//                     addActive(x);
//                 } else if (e.keyCode == 13) {
//                     /*If the ENTER key is pressed, prevent the form from being submitted,*/
//                     e.preventDefault();
//                     if (currentFocus > -1) {
//                         /*and simulate a click on the "active" item:*/
//                         if (x) x[currentFocus].click();
//                     }
//                 }
//             });

//             function addActive(x) {
//                 /*a function to classify an item as "active":*/
//                 if (!x) return false;
//                 /*start by removing the "active" class on all items:*/
//                 removeActive(x);
//                 if (currentFocus >= x.length) currentFocus = 0;
//                 if (currentFocus < 0) currentFocus = (x.length - 1);
//                 /*add class "autocomplete-active":*/
//                 x[currentFocus].classList.add("autocomplete-active");
//             }

//             function removeActive(x) {
//                 /*a function to remove the "active" class from all autocomplete items:*/
//                 for (var i = 0; i < x.length; i++) {
//                     x[i].classList.remove("autocomplete-active");
//                 }
//             }

//             function closeAllLists(elmnt) {
//                 /*close all autocomplete lists in the document,
//                 except the one passed as an argument:*/
//                 var x = document.getElementsByClassName("autocomplete-items");
//                 for (var i = 0; i < x.length; i++) {
//                     if (elmnt != x[i] && elmnt != inp) {
//                         x[i].parentNode.removeChild(x[i]);
//                     }
//                 }
//             }
//             /*execute a function when someone clicks in the document:*/
//             document.addEventListener("click", function(e) {
//                 closeAllLists(e.target);
//             });
//         }

//         /*An array containing all the country names in the world:*/
//         var countries = ["Cairo", "Giza", "alexandria", "Ismailia"];

//         /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
//         autocomplete(document.getElementById("myInput"), countries);













 
// function FormValidation() {
//     //First Name Validation 
//     var x = "";
//     //call the all ids
//     var fn = document.getElementById('firstname').value;
//     var ln = document.getElementById('lname').value;
//     var em = document.getElementById('email').value;
//     var mo = document.getElementById('mobile').value;
//     var pa = document.getElementById('password').value;
//     var cop_ass = document.getElementById('Con_password').value;
//     var ct = document.getElementById('city').value;
//     var zc = document.getElementById('zip_code').value;

//     /*************************** Fun_of_Fname**********************/
//     if (fn == x) {
//         document.getElementById('line1').style.backgroundColor = "red";
//         return false;
//     } else {
//         document.getElementById('line1').style.backgroundColor = "green";
//     }
//     /*************************** Fun_of_lname**********************/
//     if (ln == x) {
//         document.getElementById('line2').style.backgroundColor = "red";
//         return false;
//     } else {
//         document.getElementById('line2').style.backgroundColor = "green";
//     }
//     /*************************** Fun_of_email**********************/
//     if (em == x) {
//         document.getElementById('line8').style.backgroundColor = "red";
//         return false;
//     } else {
//         document.getElementById('line8').style.backgroundColor = "green";
//     }
//     /*************************** Fun_of_mobil**********************/

//     if (mo == x) {
//         document.getElementById('line3').style.backgroundColor = "red";
//         return false;
//     } else {
//         document.getElementById('line3').style.borderColor = "green";

//     }
//     /*************************** Fun_of_password**********************/

//     if (pa == x) {
//         document.getElementById('line4').style.backgroundColor = "red";
//         return false;
//     } else {
//         document.getElementById('line4').style.borderColor = "green";
//     }

//     /*************************** Fun_of_Con_password**********************/
//     if (cop_ass == x) {
//         document.getElementById('line5').style.backgroundColor = "red";
//         return false;
//     } else {
//         document.getElementById('line5').style.borderColor = "green";
//     }

//     /*************************** Fun_of_city**********************/


//     if (ct == x) {
//         document.getElementById('line6').style.backgroundColor = "red";
//         return false;
//     } else {
//         document.getElementById('line6').style.borderColor = "green";
//     }
//     /*************************** Fun_of_zip_code**********************/
//     if (zc == "") {
//         document.getElementById('line7').style.backgroundColor = "red";
//         return false;

//     } else {
//         document.getElementById('line7').style.borderColor = "green";
//     }




//     /******************************************************************/
//     if (/^[0-9]+$/.test(document.getElementById("firstname").value)) {
//         alert("First Name Contains Numbers!");
//         document.getElementById('firstname').style.borderColor = "red";
//         return false;
//     } else {
//         document.getElementById('firstname').style.borderColor = "green";
//     }
//     if (fn.length <= 2) {
//         alert('Your Name is To Short');
//         document.getElementById('firstname').style.borderColor = "red";
//         return false;
//     } else {
//         document.getElementById('firstname').style.borderColor = "green";
//     }
// }


// //show password
// $(document).ready(function() {
//     $("#pw").focus(function() {
//         this.type = "text";
//     }).blur(function() {
//         this.type = "password";
//     });
// });

// //Placeholder fixed for Internet Explorer
// $(function() {
//     var input = document.createElement("input");
//     if (('placeholder' in input) == false) {
//         $('[placeholder]').focus(function() {
//             var i = $(this);
//             if (i.val() == i.attr('placeholder')) {
//                 i.val('').removeClass('placeholder');
//                 if (i.hasClass('password')) {
//                     i.removeClass('password');
//                     this.type = 'password';
//                 }
//             }
//         }).blur(function() {
//             var i = $(this);
//             if (i.val() == '' || i.val() == i.attr('placeholder')) {
//                 if (this.type == 'password') {
//                     i.addClass('password');
//                     this.type = 'text';
//                 }
//                 i.addClass('placeholder').val(i.attr('placeholder'));
//             }
//         }).blur().parents('form').submit(function() {
//             $(this).find('[placeholder]').each(function() {
//                 var i = $(this);
//                 if (i.val() == i.attr('placeholder'))
//                     i.val('');
//             });
//         });
//     }
// });