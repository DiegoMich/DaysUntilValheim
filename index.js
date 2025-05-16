document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    const progressMarker = document.getElementById('progress-marker');
    const progressWrapper = document.querySelector('.progress-wrapper');

    // Function to update the marker position
    const updateMarkerPosition = () => {
        const days = progressBar.value; // Current progress value
        const progressWidth = progressWrapper.offsetWidth; // Width of the progress bar
        const markerPosition = (days / progressBar.max) * progressWidth; // Calculate marker position
        progressMarker.style.left = `${markerPosition}px`; // Update marker position
    };

    // Set remaining days
    const days = Math.ceil((new Date("2025-06-21").getTime() - (new Date()).getTime()) / (1000 * 3600 * 24));
    document.querySelector('h1').textContent = document.querySelector('h1').textContent + days;

    // Update progress bar value (remaining autumn days)
    progressBar.value = 90 - days;

    // Initial marker position
    updateMarkerPosition();

    // Update marker position on window resize
    window.addEventListener('resize', updateMarkerPosition);
});
