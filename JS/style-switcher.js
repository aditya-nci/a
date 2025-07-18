// toggle Style Switcher
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})
//  hide style Switcher on scroll
window.addEventListener("scroll",() =>{
    
    if(document.querySelector(".style-switcher").classList.contains("open"))
    {
        document.querySelector(".style-switcher").classList.remove("open");
    }
})
// Theme colors
const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color)
{
    // Store the selected color in localStorage
    localStorage.setItem('selectedColor', color);
    
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title"))
        {
            style.removeAttribute("disabled");
        }
        else
        {
            style.setAttribute("disabled","true");
        }
    })
}
// theme light and dark mode
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");

    // Store dark mode preference
    localStorage.setItem('darkMode', document.body.classList.contains("dark"));
})
window.addEventListener("load", () => {
    // Check if dark mode preference exists
    const darkModePref = localStorage.getItem('darkMode');
    if (darkModePref === 'true') {
        document.body.classList.add("dark");
        dayNight.querySelector("i").classList.add("fa-sun");
    } else {
        // Default to light mode
        document.body.classList.remove("dark");
        dayNight.querySelector("i").classList.add("fa-moon");
    }
    
    // Apply previously selected color or default to color-3
    const savedColor = localStorage.getItem('selectedColor') || 'color-3';
    setActiveStyle(savedColor);
})
