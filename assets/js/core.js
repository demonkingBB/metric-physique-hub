
/**
 * CORE.JS - Global Submission Engine (URL Parameter Export Flow)
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

    // 1. Safely encode the payload into a URL query parameter
    const encodedData = encodeURIComponent(JSON.stringify(currentPayload));
    const targetUrl = `${GOOGLE_SCRIPT_URL}?payload=${encodedData}`;

    // 2. Open a clean popup window directly to the Google URL
    const popupWidth = 500;
    const popupHeight = 450;
    const left = (window.innerWidth - popupWidth) / 2;
    const top = (window.innerHeight - popupHeight) / 2;
    
    window.open(
        targetUrl, 
        'MetricPhysiqueExport', 
        `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );

    // 3. Provide instant visual feedback on the main site
    statusEl.innerHTML = "✓ Export window launched! Complete authorization and saving in the popup.";
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
