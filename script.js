var addtolist = document.querySelector('#addtolist');
var name_input = document.querySelector('#name');
var list = [];
var container = document.querySelector('#container');
var reset = document.querySelector('#reset');
var allotRandomly = document.querySelector('#allotRandomly');
var resultContainer = document.querySelector('#resultContainer');

if(!localStorage.roomies) localStorage.setItem('roomies',JSON.stringify([]))
else list = JSON.parse(localStorage.roomies);

var addItem = (item)=>{
    var nb = document.createElement('span');
    nb.classList.add('badge')
    nb.classList.add('text-bg-light')
    nb.classList.add('p-2')
    nb.style.margin = "2px"
    nb.id = item;
    nb.innerText = item;
    nb.onclick = (e)=>{
        container.removeChild(container.querySelector('#'+item));
        list = list.filter((i)=>{return i!=item});
        localStorage.setItem('roomies',JSON.stringify(list));
    }
    container.appendChild(nb)
}

var shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

list.map(item => addItem(item));

addtolist.addEventListener('click',e=>{
    list.push(name_input.value);
    console.log(list);
    localStorage.setItem('roomies',JSON.stringify(list));
    addItem(name_input.value);
    name_input.value = ""
})

reset.addEventListener('click', e=>{
    list = [];
    localStorage.setItem('roomies',JSON.stringify(list));
    while(container.hasChildNodes()) container.removeChild(container.lastChild);
})

allotRandomly.addEventListener('click',e=>{
    shuffle(list);
    while(resultContainer.hasChildNodes()) resultContainer.removeChild(resultContainer.lastChild);
    for(var i=0;i<list.length;i+=2){
        var nr = document.createElement('div');
        nr.classList.add('card');
        var cb = document.createElement('div');
        cb.classList.add('card-body');
        var h5 = document.createElement('h5');
        var p1 = document.createElement('p');
        var p2 = document.createElement('p');
        h5.innerText = 'Room '+(i/2+1);
        p1.innerText = list[i];
        p2.innerText = list[i+1];
        cb.appendChild(h5);
        cb.appendChild(p1);
        cb.appendChild(p2);
        nr.appendChild(cb);
        nr.style.width = "32%";
        nr.style.display = "inline-block";
        nr.style.margin = "5px";
        p1.style.margin="0";
        p2.style.margin="0";
        resultContainer.appendChild(nr);
    }
})