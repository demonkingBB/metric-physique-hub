
/**
 * CORE.JS - Global Submission Engine (Console Inspector)
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

    // 1. Pack and encode the payload
    const jsonString = JSON.stringify(currentPayload);
    console.log("RAW PAYLOAD TO EXPORT:", jsonString); // <--- CHECK F12 CONSOLE FOR THIS

    const encodedData = encodeURIComponent(jsonString);
    const targetUrl = `${GOOGLE_SCRIPT_URL}?payload=${encodedData}`;
    
    console.log("FINAL TARGET URL:", targetUrl); // <--- CHECK F12 CONSOLE FOR THIS

    // 2. Open the popup window
    window.open(targetUrl, '_blank');

    // 3. Update status
    statusEl.innerHTML = "✓ Export tab launched! Check your browser F12 console to inspect the URL.";
    statusEl.className = "status-msg status-visible";
    statusEl.style.color = "var(--gold-primary)";
}