const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let id = params.id; 
let noOfIds = 0;
let DCR = 0;
const article = document.getElementById("article");
const PageTitle = document.getElementById("page-title");
const PageContent = document.getElementById("page-content");
const time = document.getElementById("time");

function GetDateAndTime(unix_time){
    var a = new Date(unix_time * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    return time;
  }

fetch('scripts/pages.json')
    .then(function(pages){
        return pages.json();
    })
    .then(function(x){
        noOfIds = x.length;
        DCR = x[id]["DCR"];
        if(id==0){
            document.getElementById("btn-prev").style.visibility = 'hidden';
        }
        else{
            document.getElementById("btn-prev").href = "/page.html" + "?id=" + (parseInt(id)-1).toString(10);
        }
        if(id==noOfIds-1){
            document.getElementById("btn-next").style.visibility = 'hidden';
        }
        else{
            document.getElementById("btn-next").href = "/page.html" + "?id=" + (parseInt(id)+1).toString(10);
        }
        time.innerHTML = GetDateAndTime(DCR);
    })
fetch('pages/'+id.toString(10)+'.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (page) {
        document.title = page["title"];
        PageTitle.innerHTML = page["title"];
        page["content"].forEach(para => {
            temp = document.createElement("p");
            temp.innerHTML = page["content"];
            PageContent.appendChild(temp);
        });
    })
    .catch (function (err) {
        PageTitle.innerHTML = "404:Page Not found";
        PageTitle.align = "center";
        PageContent.style.visibility = "hidden";
    console.log('error retrieving data for article ' + err);
});