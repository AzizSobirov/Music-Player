let nav_lists = [
    {
        name:"Home",
        url:"head"
    },{
        name:"About",
        url:"about"
    }
]

let navList = document.querySelector('.head__nav-list')
for(let i=0;i<nav_lists.length;i++){
    navList.innerHTML+= `<li>
    <a href="#${nav_lists[i].url}">
    <p>${nav_lists[i].name}</p>
    <i class="far fa-angle-right"></i>
    </a>
</li>`
}

function navOpen(){
document.querySelector(".head__nav-list").classList.toggle('show')
document.querySelector(".head__nav-close").classList.toggle('show')
}

// search nav
function searchNav(){
    document.querySelector(".head__search").classList.toggle('show')
    document.querySelector(".head__search-close").classList.toggle('show')
}



