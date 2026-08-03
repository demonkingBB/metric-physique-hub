

/**
 * CORE.JS - Global Submission Engine (postMessage Bridge)
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

    // Open a clean popup window (No query parameters to get stripped by Google Auth)
    const popupWidth = 500;
    const popupHeight = 450;
    const left = (window.innerWidth - popupWidth) / 2;
    const top = (window.innerHeight - popupHeight) / 2;
    
    const popup = window.open(
        GOOGLE_SCRIPT_URL, 
        'MetricPhysiqueExport', 
        `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`
    );

    // Listen for the popup's request for data, then hand it the payload
    const messageListener = function(event) {
        if (event.data && event.data.type === 'REQUEST_PAYLOAD') {
            popup.postMessage({ type: 'PAYLOAD_DATA', payload: currentPayload }, '*');
            window.removeEventListener('message', messageListener); // Clean up
        }
    };
    window.addEventListener('message', messageListener);

    // Provide instant feedback on the main site
    statusEl.innerHTML = "✓ Export window launched! Authorize and save inside the popup.";
    statusEl.className = "status-msg status-visible";
    statusEl.style.color = "var(--gold-primary)";
}

    // --- METHOD B: SUPABASE & EMAIL (STEALTH MODE - INACTIVE) ---
    /*
    // To activate in the future:
    // 1. Uncomment the block below
    // 2. Add the UI button to the HTML
    
    console.log("Method B Payload prepared but inactive:", currentPayload);
    // const { data, error } = await _supabaseClient.from('reports').insert([currentPayload]);
    // if(!error) { statusEl.innerText = "Report emailed successfully!"; }
    */
