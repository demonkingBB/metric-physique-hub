
/**
 * CORE.JS - Global Submission Engine (Full Tab Export Flow)
 */

let currentPayload = null; // Memory for the last calculation

function submitToDatabase() {
    const statusEl = document.getElementById('status-msg');
    
    if (!currentPayload) {
        alert("Please calculate your results first.");
        return;
    }

    // PASTE YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL HERE
    const GOOGLE_SCRIPT_URL = 'YOUR_DEPLOYED_GOOGLE_SCRIPT_WEB_APP_URL_HERE';

    // Open as a full new tab instead of a restricted popup box 
    // This allows Google's login and authorization screens to render properly.
    window.open(GOOGLE_SCRIPT_URL, '_blank');

    // Provide instant feedback on the main site
    statusEl.innerHTML = "✓ Export tab opened! Complete authorization and saving in the new tab.";
    statusEl.className = "status-msg status-visible";
    statusEl.style.color = "var(--gold-primary)";
}