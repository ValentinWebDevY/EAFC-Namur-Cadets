import {LANG} from "./lang.js";
import {Data_Helper} from "./data_helper.js";

let api_helper = new Data_Helper();

// variables
// get my select with lang options and select options
let select_lang = document.getElementById('underline_select');
let trad_options = document.querySelectorAll("#select_lang option");

// check if there is params in my url -> lang="fr"
let url_params = new URLSearchParams(window.location.search)
let param_lang = url_params.get('lang');

// get burger menu and links
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

// get type enseignement items
let all_types_buttons = document.querySelectorAll(".js-target-types");
let first_button = document.getElementById("sup-btn");
let title = document.getElementById("types-title");
let description = document.getElementById("description");
let img = document.getElementById("types-img");
let button_call_to_action = document.getElementById("types-btn");

// get overlay and filter component
let filter_btn = document.getElementById("filter-btn");
let filter_overlay_div = document.getElementById("overlay-filter");
let close_overlay = document.getElementById("close-overlay");
let checkboxes = document.querySelectorAll('input[type="checkbox"]');
let all_formations = document.getElementsByClassName("formation");

// get formation elements
let nav_links = document.getElementsByClassName("formation-link");

// get my anchor btn
let anchor_btn = document.getElementById("to-the-top-btn");

/* ===== trad logic ===== */

// set lang to fr if there's no params
if (!param_lang) {
    param_lang = 'fr';
}
trad(param_lang);

for (let option of trad_options) {
    if (option.value === param_lang) {
        option.setAttribute('selected', true);
    }
}

select_lang.addEventListener('change', (event) => {
    trad(event.target.value)
})

// trad function
function trad(code) {
    // get all my elements
    let traductible_elements = document.getElementsByClassName('trad');

    for (let elem of traductible_elements) {
        elem.innerText = LANG[code][elem.dataset.textkey];
    }
}

/* ===== burger menu logic ===== */
const mobileMenu = () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

hamburger.addEventListener("click", mobileMenu);

navLink.forEach((link) => link.addEventListener("click", mobileMenu));

/* ===== types enseignement logic ===== */
let currently_active_button = first_button;

all_types_buttons.forEach((button) => {
    button.addEventListener("click", async (event) => {
        // get the position i need to search in my data
        let pos_in_array = button.getAttribute("data-posarray");
        let type_data = await api_helper.getDataByTypeEnseignement();

        if (currently_active_button) {
            currently_active_button.classList.remove("active-btn");
            button.classList.remove("active-btn");
        }

        button.classList.add("active-btn");
        currently_active_button = button;

        title.innerHTML = type_data.type_enseignement[pos_in_array].title;
        img.src = type_data.type_enseignement[pos_in_array].img;
        description.innerHTML = type_data.type_enseignement[pos_in_array].descr;
        button_call_to_action.style.backgroundColor = type_data.type_enseignement[pos_in_array].color;

    })
})

/* ===== overlay and filter logic ===== */

// show overlay on filter click
if (filter_btn) {
    filter_btn.addEventListener("click", (event) => {
        // disable submit form
        event.preventDefault();
        filter_overlay_div.classList.toggle("active-overlay");
    })
}

// close overlay
if (close_overlay) {
    close_overlay.addEventListener("click", () => {
        filter_overlay_div.classList.remove("active-overlay")
    })
}

// event for each checkbox
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        // array with checked categories
        const checked_categories = [];

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                checked_categories.push(checkbox.dataset.cat);
            }
        });

        // for each formation
        Array.from(all_formations).forEach((formation) => {

            // if length = 0 or if my array contains some categories who matches formation.classList
            if (checked_categories.length === 0 || checked_categories.some(cat => formation.classList.contains(cat))) {
                // show my elements
                formation.classList.remove("hide_content");
            } else {
                // hide elements
                formation.classList.add("hide_content");
            }
        });
    });
});

/* ===== formation logic ===== */
let all_content = document.querySelector(".formation-content");

if (all_content) {
    let divs_content = Array.from(all_content.querySelectorAll('div'));

    // event for each link
    Array.from(nav_links).forEach((link) => {
        link.addEventListener("click", (event) => {
            let link_id = event.target.id;
            let content_to_display = document.querySelector(`.${link_id}`);
            let current_link_active = document.querySelector('.active-formation-link');
            current_link_active.classList.toggle('active-formation-link');
            link.classList.toggle('active-formation-link');

            // hide or show content
            divs_content.forEach((div) => {
                div.classList.add("hide_content");
            })
            content_to_display.classList.remove("hide_content");

        })
    })
}

/* ===== anchor btn logic ===== */
window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        anchor_btn.classList.remove("hide_content");
    } else {
        anchor_btn.classList.add("hide_content");
    }
})