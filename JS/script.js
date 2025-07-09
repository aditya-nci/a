// Typing animation
var typed = new Typed(".typing", {
    strings: ["Data Analyst", "Data Engineer", ".NET Developer", "SSIS Developer", "Data Scientist"],
    typeSpeed: 100,
    BackSpeed: 60,
    loop: true
});

// Aside
const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function() {
        // Get the currently active section before removing classes
        let currentActiveIndex = -1;
        for (let k = 0; k < totalSection; k++) {
            if (allSection[k].classList.contains("active")) {
                currentActiveIndex = k;
                break;
            }
        }
        
        // Remove active class from all nav items
        for (let j = 0; j < totalNavList; j++) {
            navList[j].querySelector("a").classList.remove("active");
        }
        
        // Add active class to clicked nav item
        this.classList.add("active");
        
        // Show the target section
        showSection(this);
        
        // Add back-section class to the previously active section
        removeBackSection();
        if (currentActiveIndex >= 0) {
            allSection[currentActiveIndex].classList.add("back-section");
        }
        
        if (window.innerWidth < 1200) {
            asideSectionTogglerBTn();
        }
    });
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}

function showSection(element) {
    // Remove active class from all sections
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    
    // Get the target section and add active class
    const target = element.getAttribute("href").split("#")[1];
    const targetSection = document.querySelector("#" + target);
    
    if (targetSection) {
        targetSection.classList.add("active");
    }
}

function updateNav(element) {
    // Remove active class from all nav items
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
    }
    
    // Get the target section id
    const target = element.getAttribute("href").split("#")[1];
    
    // Find and activate the corresponding nav item
    for (let i = 0; i < totalNavList; i++) {
        const navTarget = navList[i].querySelector("a").getAttribute("href").split("#")[1];
        if (target === navTarget) {
            navList[i].querySelector("a").classList.add("active");
            break;
        }
    }
}

document.querySelector(".hire-me").addEventListener("click", function() {
    // Get the currently active section before switching
    let currentActiveIndex = -1;
    for (let i = 0; i < totalSection; i++) {
        if (allSection[i].classList.contains("active")) {
            currentActiveIndex = i;
            break;
        }
    }
    
    // Show the contact section
    showSection(this);
    updateNav(this);
    
    // Add back-section class to the previously active section
    removeBackSection();
    if (currentActiveIndex >= 0) {
        allSection[currentActiveIndex].classList.add("back-section");
    }
});

// Add event listener for Contact Me button
document.querySelector(".home-info .btn").addEventListener("click", function() {
    // Get the currently active section before switching
    let currentActiveIndex = -1;
    for (let i = 0; i < totalSection; i++) {
        if (allSection[i].classList.contains("active")) {
            currentActiveIndex = i;
            break;
        }
    }
    
    // Show the contact section
    showSection(this);
    updateNav(this);
    
    // Add back-section class to the previously active section
    removeBackSection();
    if (currentActiveIndex >= 0) {
        allSection[currentActiveIndex].classList.add("back-section");
    }
    
    if (window.innerWidth < 1200) {
        asideSectionTogglerBTn();
    }
});

const navTogglerBTn = document.querySelector(".nav-toggler"),
      aside = document.querySelector(".aside");

navTogglerBTn.addEventListener("click", () => {
    asideSectionTogglerBTn();
});

function asideSectionTogglerBTn() {
    aside.classList.toggle("open");
    navTogglerBTn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}
