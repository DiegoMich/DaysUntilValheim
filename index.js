document.addEventListener('DOMContentLoaded', ()=> {
    // Set remaining days
    const days = Math.ceil((new Date("2025-06-21").getTime() - (new Date()).getTime()) / (1000 * 3600 * 24)) + 1;
    document.querySelector('h1').textContent = document.querySelector('h1').textContent + days;

    // Resize body
    //document.querySelector('body').style.height = window.innerHeight;
})
