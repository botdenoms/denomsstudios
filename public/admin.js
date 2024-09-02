// 
function switchTab(index) {
    var tabsP = document.getElementById("tabs")
    if (tabsP.children.item(index).className.includes("active")) {
        return
    }
    for (const child of tabsP.children) {
        child.className = 'tb'
    }
    tabsP.children.item(index).className += " active"
}

function timelineForm(){
    var form = document.getElementById("tlform")
    var btn = document.getElementById("tlformbt")
    
    if (form.className.includes("hd")) {
        form.className = ""
        btn.className += " hd"
    }
}