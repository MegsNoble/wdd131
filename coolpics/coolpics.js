function adjustMenuVisibility() {
    var screenWidth = window.innerWidth;
    var navItems = document.querySelector('nav ul');
    if (screenWidth < 1000) {
        if (navItems.style.display === 'flex' || navItems.style.display === '') {
            navItems.style.display = 'none';
        }
    } else {
        navItems.style.display = 'flex';
    }
}
document.getElementById('menu').addEventListener('click', function() {
    var navItems = document.querySelector('nav ul');
    if (navItems.style.display === 'none' || navItems.style.display === '') {
        navItems.style.display = 'flex';
    } else {
        navItems.style.display = 'none';
    }
});
function viewerTemplate(pic, alt) {
    return `<div class="viewer" style="display:none;">
      <span class="close-viewer">X</span>
      <img src="${pic}" alt="${alt}">
    </div>`;
}
function viewHandler(event) {
    if (event.target.tagName === "IMG") {
        var clicked = event.target;
        var imgSrc = clicked.src;
        var baseName = imgSrc.substring(0, imgSrc.lastIndexOf("-"));
        var newSrc = `${baseName}-full.jpeg`;
        var largeImg = viewerTemplate(newSrc, clicked.alt);

        document.body.insertAdjacentHTML("afterbegin", largeImg);
        document.querySelector(".viewer").style.display = 'flex';
        document.querySelector(".close-viewer").addEventListener('click', closeViewer);
    }
}
document.querySelector('.gallery').addEventListener('click', viewHandler);
function closeViewer() {
    const viewer = document.querySelector('.viewer');
    if (viewer) {
        viewer.remove();
    }
}
window.addEventListener('resize', adjustMenuVisibility);
adjustMenuVisibility();