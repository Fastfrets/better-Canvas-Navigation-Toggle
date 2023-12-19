"use strict";
// uncommon variable naming; to avoid conflicts/overloading.
const B_C = document.querySelector('body');
const L_S = document.getElementById("left-side");
// C_M_T is the ASU main canvas navigation button. This is needed only to changes its aria properties & title.
const C_M_T = document.getElementById("courseMenuToggle");
// id "wrapper" is the <div> that the new buttons parent <div> is placed into.
const W_P = document.getElementById("wrapper");
// id "sticky-container" is the <div> that divDivider is placed into.
const S_C = document.getElementById("sticky-container");

//locally scoped element constructor variables.
let divDivider = document.createElement('div');
let btnParentDiv = document.createElement('div');
let btn = document.createElement('button');
let i = document.createElement('i');
 
// executes script only if L_S HTML Element is not found.
window.onload = function() {
    if (document.body.contains(L_S)) {
        create_HTML_Elements()
        checkScrollY_andSet_btn_and_divDivider_display()
    } else {
        console.log("\nExtension: \"Better Canvas Navigation Toggle\", failed to find HTML Element with ID of \"left-side\". \nScript was not executed! ")
    }
};

//then appends btn <button> as the firstchild.
//Also deligates the properties & assigns class' to "btn" & "divDivider".
function create_HTML_Elements() {
    W_P.insertBefore(btnParentDiv, W_P.children[1]);
    //self-injected class <<<that uses !important tag>>>
    btnParentDiv.classList.add("btnParentDiv_CanvasNavToggle");
    //predefined class' used from ASU's site (next 3 lines below).
    btnParentDiv.classList.add("ic-app-course-menu");
    btnParentDiv.classList.add("ic-sticky-on");
    //class makes this element react as a column, inline with the other childNodes of main.
    btnParentDiv.classList.remove("ic-Layout-wrapper");
    btnParentDiv.classList.add("ic-sticky-frame");
    btnParentDiv.appendChild(btn);
    // btn properties.
    btn.title = "canvas navigation";
    btn.type = "button";
    btn.ariaHidden = true;
    //self-injected class.
    btn.classList.add("courseMenuToggleBTN_ForAfterScroll");
    //predefined class' used from ASU's site.
    btn.classList.add("Button");
    btn.classList.add("Button--link");
    //onclick event.
    btn.addEventListener('click', onClickHamburger);
    //<i> element put inside the btn (this allows the use of the ASU "icon-hamburger" class)
    btn.appendChild(i);
    i.ariaHidden = true;
    //predefined classes used from ASU's site.
    i.classList.add("icon-hamburger");
    //Appends and deligates the divDivider; (which creates empty spacing [20px] inside the course navigation list for the new button),
    // NOTE! this is not the same HTML location that btnParentDiv is in (S_C instead of W_P).
    S_C.insertBefore(divDivider, S_C.firstChild);
    divDivider.classList.add("divDividerClass");
};

// sets ptnParentDiv & divDivider to display = none;
function allTopLevelElements_setDisplayNone() {
    btn.style.display = 'none';
    divDivider.style.display = 'none';
};

// sets ptnParentDiv & divDivider to display = block;
function allTopLevelElements_setDisplayBlock() {
    btn.style.display = 'block';
    divDivider.style.display = 'block';
};

//Checks after page load if scrolled past 92px, then sets btn display to = block if true.
function checkScrollY_andSet_btn_and_divDivider_display() {
    //(scrollY > 92) is the pixel right below the page header.
    if (window.scrollY > 92 && window.innerWidth > 767) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
};

// onClick changes the bodys class, & updates the .title & .ariaLable of courseMenuToggle (C_M_T), finally it sets left-side (L_S) display to 'block' or 'none'.
function onClickHamburger() {
    // closes if open.
    if (B_C.className.includes("course-menu-expanded")) {
        B_C.classList.remove("course-menu-expanded");
        C_M_T.title = "Show Courses Navigation Menu";
        C_M_T.ariaLabel = "Show Courses Navigation Menu";
        L_S.style.display = 'none';
    }
    // opens if closed.
    else {
            B_C.classList.add("course-menu-expanded");
            C_M_T.title = "Hide Course Navigation Menu";
            C_M_T.ariaLabel = "Hide Course Navigation Menu";
            L_S.style.display = 'block';
        }
};

window.addEventListener('scroll', function(){
    checkScrollY_andSet_btn_and_divDivider_display();
}, true);

window.addEventListener('resize', function() {
    if (window.innerWidth < 768) {
        allTopLevelElements_setDisplayNone();
    } else {
        allTopLevelElements_setDisplayBlock();
        checkScrollY_andSet_btn_and_divDivider_display()
    }
})
//FIXME
//script should not load at url address: "asu.instructure.com/courses/" (nothing at end). needs change to manifest.json
//mobile webpage has a extra hamburgermenu in the top right!?
//FIXME
//Check all comments 
//change functions to camel case.
//*://*/*assignments/*