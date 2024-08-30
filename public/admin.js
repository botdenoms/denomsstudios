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

