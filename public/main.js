// document.body.onload = initJs

function toggle() {
    let advc = document.getElementsByClassName('advnc')
    console.log()
    for (let index = 0; index < advc.length; index++) {
        if (advc.item(index).className.includes('hd')){
            advc[index].className = advc.item(index).className.replace('hd', '')
        }else{
            advc[index].className = advc.item(index).className + "hd"
        }
    }
}

async function search() {
    let inp = document.getElementById('s')
    let nbtn = document.getElementById('nbt')
    let fbtn = document.getElementById('fbt')
    let ebtn = document.getElementById('ebt')
    var words = inp.value
    if (words.length < 1) {
        alert("Please enter a search word to search")
        return
    }

    nbtn.className = 'tbtn'
    fbtn.className = 'tbtn'
    ebtn.className = 'tbtn'
    let itms = document.getElementById('items')
    while (itms.firstChild) {
        itms.removeChild(itms.firstChild)
    }

    let ldr = document.getElementById('loader')
    ldr.className = ''

    var resp = await fetch(`http://localhost:5000/releases?s=${words}`)
    const finds = await resp.json()

    for (let index = 0; index < finds.length; index++) {
        var p = document.createElement('a')
        p.setAttribute('class', "item")
        p.setAttribute('href', `/release?id=${finds[index].Id}`)
        var img = document.createElement('img')
        img.setAttribute('src', finds[index].Thumbnail)
        img.setAttribute('alt', "thumsml")
        var s1 = document.createElement('span')
        s1.setAttribute('class', "tlwrd")
        s1.innerText = finds[index].Title
        var s2 = document.createElement('span')
        s2.setAttribute('class', "ctwrd")
        s2.innerText = finds[index].Category
        var pr = document.createElement('p')
        pr.innerText = finds[index].Synopsis
        var s3 = document.createElement('span')
        s3.setAttribute('class', "dtwrd")
        s3.innerText = finds[index].Date
        p.appendChild(img)
        p.appendChild(s1)
        p.appendChild(s2)
        p.appendChild(pr)
        p.appendChild(s3)
    
        itms.appendChild(p)
    }

    ldr.className = 'hd' 
}

async function newRequest() {
    let itms = document.getElementById('items')
    let nbtn = document.getElementById('nbt')
    let fbtn = document.getElementById('fbt')
    let ebtn = document.getElementById('ebt')
    while (itms.firstChild) {
        itms.removeChild(itms.firstChild)
    }

    let ldr = document.getElementById('loader')
    ldr.className = ''
    nbtn.className = 'tbtn active'
    fbtn.className = 'tbtn'
    ebtn.className = 'tbtn'

    var resp = await fetch(`http://localhost:5000/releases?n=${true}`)
    const finds = await resp.json()

    for (let index = 0; index < finds.length; index++) {
        var p = document.createElement('a')
        p.setAttribute('class', "item")
        p.setAttribute('href', `/release?id=${finds[index].Id}`)
        var img = document.createElement('img')
        img.setAttribute('src', finds[index].Thumbnail)
        img.setAttribute('alt', "thumsml")
        var s1 = document.createElement('span')
        s1.setAttribute('class', "tlwrd")
        s1.innerText = finds[index].Title
        var s2 = document.createElement('span')
        s2.setAttribute('class', "ctwrd")
        s2.innerText = finds[index].Category
        var pr = document.createElement('p')
        pr.innerText = finds[index].Synopsis
        var s3 = document.createElement('span')
        s3.setAttribute('class', "dtwrd")
        s3.innerText = finds[index].Date
        p.appendChild(img)
        p.appendChild(s1)
        p.appendChild(s2)
        p.appendChild(pr)
        p.appendChild(s3)
    
        itms.appendChild(p)
    }

    ldr.className = 'hd' 
}

async function futureRequest() {
    let itms = document.getElementById('items')
    let nbtn = document.getElementById('nbt')
    let fbtn = document.getElementById('fbt')
    let ebtn = document.getElementById('ebt')
    while (itms.firstChild) {
        itms.removeChild(itms.firstChild)
    }

    let ldr = document.getElementById('loader')
    ldr.className = ''
    fbtn.className = 'tbtn active'
    nbtn.className = 'tbtn'
    ebtn.className = 'tbtn'

    var resp = await fetch(`http://localhost:5000/releases?f=${true}`)
    const finds = await resp.json()

    for (let index = 0; index < finds.length; index++) {
        var p = document.createElement('a')
        p.setAttribute('class', "item")
        p.setAttribute('href', `/release?id=${finds[index].Id}`)
        var img = document.createElement('img')
        img.setAttribute('src', finds[index].Thumbnail)
        img.setAttribute('alt', "thumsml")
        var s1 = document.createElement('span')
        s1.setAttribute('class', "tlwrd")
        s1.innerText = finds[index].Title
        var s2 = document.createElement('span')
        s2.setAttribute('class', "ctwrd")
        s2.innerText = finds[index].Category
        var pr = document.createElement('p')
        pr.innerText = finds[index].Synopsis
        var s3 = document.createElement('span')
        s3.setAttribute('class', "dtwrd")
        s3.innerText = finds[index].Date
        p.appendChild(img)
        p.appendChild(s1)
        p.appendChild(s2)
        p.appendChild(pr)
        p.appendChild(s3)
    
        itms.appendChild(p)
    }

    ldr.className = 'hd' 

}

async function oldRequest() {
    let itms = document.getElementById('items')
    let nbtn = document.getElementById('nbt')
    let fbtn = document.getElementById('fbt')
    let ebtn = document.getElementById('ebt')
    while (itms.firstChild) {
        itms.removeChild(itms.firstChild)
    }

    let ldr = document.getElementById('loader')
    ldr.className = ''
    ebtn.className = 'tbtn active'
    fbtn.className = 'tbtn'
    nbtn.className = 'tbtn'

    var resp = await fetch(`http://localhost:5000/releases?e=${true}`)
    const finds = await resp.json()

    for (let index = 0; index < finds.length; index++) {
        var p = document.createElement('a')
        p.setAttribute('class', "item")
        p.setAttribute('href', `/release?id=${finds[index].Id}`)
        var img = document.createElement('img')
        img.setAttribute('src', finds[index].Thumbnail)
        img.setAttribute('alt', "thumsml")
        var s1 = document.createElement('span')
        s1.setAttribute('class', "tlwrd")
        s1.innerText = finds[index].Title
        var s2 = document.createElement('span')
        s2.setAttribute('class', "ctwrd")
        s2.innerText = finds[index].Category
        var pr = document.createElement('p')
        pr.innerText = finds[index].Synopsis
        var s3 = document.createElement('span')
        s3.setAttribute('class', "dtwrd")
        s3.innerText = finds[index].Date
        p.appendChild(img)
        p.appendChild(s1)
        p.appendChild(s2)
        p.appendChild(pr)
        p.appendChild(s3)
    
        itms.appendChild(p)
    }

    ldr.className = 'hd' 
}

function initJs() {
    console.log("init")
}