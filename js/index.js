let nav_lists = [
    {
        name:"Home",
        url:"#head"
    }
]

let navList = document.querySelector('.head__nav-list')
for(let i=0;i<nav_lists.length;i++){
    navList.innerHTML+= `<li>
    <a href="${nav_lists[i].url}">
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



// search music
function searchMusic(filter){
    console.log("working")
    let allproject = document.querySelector(".head__search-list ul")
    let s_project = allproject.querySelectorAll("li")
    for(let i=0;i<s_project.length;i++){
        let s_name = s_project[i].querySelector("h3")
        if(s_name){
            let s_value = s_name.innerHTML;
            if(s_value.toUpperCase().indexOf(filter) > -1){
                s_project[i].style.display=""
            }else{
                s_project[i].style.display="none"
            }
        }
    }
}
