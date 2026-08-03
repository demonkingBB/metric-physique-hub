
/**
 * CORE.JS - Global Submission Engine (Console Inspector)
 */

/**
 * CORE.JS - Global Submission Engine (Final Production Flow)
 */

let currentPayload = null; // Memory for the last calculation

function submitToDatabase() {
    const statusEl = document.getElementById('status-msg');
    
    if (!currentPayload) {
        alert("Please calculate your results first.");
        return;
    }

    // PASTE YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL HERE
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxZ0xzGp_2d_RIO0yy8gaz6IjlEWRkQcKmeI9aYyTD2CMShtS4NjBElhU_HhIODxqX_RA/exec';

    // 1. Pack your calculation data into the URL query parameters
    const encodedData = encodeURIComponent(JSON.stringify(currentPayload));
    const targetUrl = `${GOOGLE_SCRIPT_URL}?payload=${encodedData}`;

    // 2. Open the window to execute the Google Script with the data attached
    window.open(targetUrl, '_blank');

    // 3. Update status on the main site
    statusEl.innerHTML = "✓ Export tab launched! Complete saving in the new Google tab.";
    statusEl.className = "status-msg status-visible";
    statusEl.style.color = "var(--gold-primary)";
}