// Typing  animation
var typed = new Typed(".typing",{
    strings:["Data Analyst","Data Engineer",".NET Developer", "SSIS Developer","Data Scientist"],
    typeSpeed:100,
    BackSpeed:60,
    loop:true
})
// Aside
const nav = document.querySelector(".nav"),
        navList = nav.querySelectorAll("li"),
        totalNavList = navList.length,
        allSection = document.querySelectorAll(".section"),
        totalSection = allSection.length;
        for(let i=0; i<totalNavList; i++)
        {
            const a = navList[i].querySelector("a");
            a.addEventListener("click",function () 
            {
                removeBackSection();
                for(let j=0; j<totalNavList; j++)
                {
                    if(navList[j].querySelector("a").classList.contains("active"))
                    {
                        addBackSection(j);
                    }
                    navList[j].querySelector("a").classList.remove("active");
                }
                this.classList.add("active")
                showSection(this);
                if (window.innerWidth < 1200)
                {
                    asideSectionTogglerBTn();
                }
            })   
        }
        function removeBackSection()
        {
            for(let i=0; i<totalSection; i++)
                {
                    allSection[i].classList.remove("back-section"); 
                }
        }
        function addBackSection(num)
        {
            allSection[num].classList.add("back-section");
        }
        function showSection(element)
        {
            for(let i=0; i<totalSection; i++)
            {
                allSection[i].classList.remove("active"); 
            }
            const traget = element.getAttribute("href").split("#")[1];
            document.querySelector("#"+traget).classList.add("active")
        }
        function updateNav(element)
        {
            for (let i=0; i<totalNavList; i++)
            {
                navList[i].querySelector("a").classList.remove("active");
                const traget = element.getAttribute("href").split("#")[1];  
                if(traget === navList[i].querySelector("a").getAttribute("href").split("#")[1])
                {
                navList[i].querySelector("a").classList.add("active");

                }
            }
        }
        document.querySelector(".hire-me").addEventListener("click",function()
        {
            const sectionIndex = this.getAttribute("data-section-index");
            showSection(this);
            updateNav(this);
            removeBackSection();
            addBackSection(sectionIndex); 
        })
        const navTogglerBTn = document.querySelector(".nav-toggler"),
            aside = document.querySelector(".aside");
            navTogglerBTn.addEventListener("click",() => {
                asideSectionTogglerBTn();
            })
            function asideSectionTogglerBTn()
            {
                aside.classList.toggle("open");
                navTogglerBTn.classList.toggle("open");
                for (let i=0; i<totalSection; i++)
                {
                    allSection[i].classList.toggle("open");
                }
            }
