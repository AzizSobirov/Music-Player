let audio = new Audio()
let audioPlayed = false
let loop = false
let fv = false
let musicsIndex = 0
let player = document.querySelector(".head-player");

function loadMusic(i){
    audio.src = musics[i].src;
    player.innerHTML=`
<div class="music">
    <img src="${musics[i].image}">
</div>
<span class="artist">
    <h4>${musics[i].name}</h4>
    <h4>${musics[i].title}</h4>
</span>
<div class="range">
    <h4 id="curTime">00:00</h4>
    <input type="range" id="range" min="0" value="0">
    <h4 id="durTime">00:00</h4>
</div>
<div class="controller">
    <h2 onclick="repeat()" id="repeat_btn"><i class="far fa-repeat"></i></h2>
    <h2 onclick="backward()"><i class="fad fa-backward"></i></h2>
    <h2 onclick="playMusic()" id="play_btn"><i class="far fa-play"></i></h2>
    <h2 onclick="forward()"><i class="fad fa-forward"></i></h2>
    <h2 onclick="favourite(${i})" id="fv_btn"><i class="far fa-heart"></i></h2>
</div>
`

// chnage music currentTime with Range Controller
let range = document.getElementById("range")
range.addEventListener("change",function(){
    audio.currentTime = range.value
})
// range time update
audio.addEventListener("timeupdate",function(){
    // range value == audio current Time
    range.value = audio.currentTime
    // audio time
if(audio.duration){
    range.max= audio.duration
    // current time of audio
    let curmin = Math.floor(audio.currentTime / 60)
    let cursec = Math.floor(audio.currentTime - curmin * 60)
    if(curmin < 10){curmin= "0" + curmin}
    if(cursec < 10){cursec= "0" + cursec}
    document.getElementById("curTime").innerHTML= `${curmin}:${cursec}`

    // duration of audio
    let durmin = Math.floor(audio.duration / 60);
    let dursec = Math.floor(audio.duration - durmin * 60);
    if(durmin < 10){durmin= "0" + durmin}
    if(dursec < 10){dursec= "0" + dursec}
    document.getElementById("durTime").innerHTML= `${durmin}:${dursec}`

    // auto prev music
    auto_Prev()
}
})
}loadMusic(musicsIndex)

// auto prev on
function auto_Prev(){
    if(audio.currentTime == audio.duration){
        musicsIndex = (musicsIndex + 1) % musics.length
        loadMusic(musicsIndex)
        audioPlayed ? play() : pause()
    }
}
// repeat audio
function repeat(){
    let repeat_btn = document.getElementById("repeat_btn")
    if(!loop){
        loop = true
        audio.loop = true
        repeat_btn.style.background="#E8990D"
        repeat_btn.style.color="#fff"
        
    }else{
        loop = false
        audio.loop = false
        repeat_btn.style.background="transparent"
        repeat_btn.style.color="#E8990D"
    }
}


// backward 
function backward(){
    musicsIndex = (musicsIndex - 1 + musics.length) % musics.length
    loadMusic(musicsIndex)
    audioPlayed ? play() : pause()
}
// forward
function forward(){
    musicsIndex = (musicsIndex + 1) % musics.length
    loadMusic(musicsIndex)
    audioPlayed ? play() : pause()
}

// play music
function playMusic(){
    audioPlayed ? pause() : play()   
}

// play
function play(){
    let play_btn = document.getElementById("play_btn")
    let play_btn_i = play_btn.querySelector("i")        
    // if true audio is playing
    audioPlayed = true
    play_btn_i.className="far fa-pause"
    play_btn_i.style.transform="translateX(0px)"
    play_btn.style.background="#E8990D"
    play_btn.style.color="#fff"
    audio.play()  
    let artist_img = document.querySelector(".music img")
    artist_img.style.animationPlayState ='running';

}
// pause
function pause(){
    let play_btn = document.getElementById("play_btn")
    let play_btn_i = play_btn.querySelector("i")       
    // else audio is paused
    audioPlayed = false
    play_btn_i.className="far fa-play"
    play_btn_i.style.transform="translateX(2px)"
    play_btn.style.background="transparent"
    play_btn.style.color="#E8990D"
    audio.pause()
    let artist_img = document.querySelector(".music img")
    artist_img.style.animationPlayState ='paused'; 
}

// add favourite music
function favourite(i){
    let fv_btn = document.getElementById("fv_btn")
    let fv_musics = document.getElementById("favouriteMusics")

    if(!fv){
        fv = true
        console.log("Added " + musics[i].name )
        fv_musics.innerHTML+=
        `<li><h3><i class="far fa-music"></i></h3><h4>${musics[i].name} - ${musics[i].title} </h4></li>`
        fv_btn.style.background="#E8990D"
        fv_btn.style.color="#fff"
        
    }else{
        fv = false
        console.log("Removed " + musics[i].name )
        fv_btn.style.background="transparent"
        fv_btn.style.color="#E8990D"
    }
}


// musics
function searchBarMusics(){
    for(let m=0;m<musics.length;m++){
            document.querySelector(".head__search-list ul").innerHTML+= `
            <li onclick="selectedMusic(${m})"><h3><i class="far fa-music"></i></h3><h4>${musics[m].name}</h4></li>`
    }
}searchBarMusics()

// 
function selectedMusic(s_Music){
    loadMusic(s_Music)
    searchNav()
    play()
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