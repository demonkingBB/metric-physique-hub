
/**
 * CORE.JS - Global Submission Engine
 */

let currentPayload = null; // Memory for the last calculation

async function submitToDatabase() {
    const statusEl = document.getElementById('status-msg');
    const GOOGLE_URL = 'https://script.google.com/macros/s/AKfycbxZ0xzGp_2d_RIO0yy8gaz6IjlEWRkQcKmeI9aYyTD2CMShtS4NjBElhU_HhIODxqX_RA/exec'; // Ensure this ends in /exec

    if (!currentPayload) {
        alert("Please calculate results first.");
        return;
    }

    statusEl.innerHTML = "Syncing with Google Drive...<br><small>First time? Ensure you have linked your account below.</small>";
    statusEl.className = "status-msg status-visible";

    try {
        // We use 'no-cors' mode. 
        // NOTE: In 'no-cors', we cannot read the response body, 
        // but the data WILL reach Google if authorized.
        await fetch(GOOGLE_URL, {
            method: 'POST',
            mode: 'no-cors', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentPayload)
        });

        // Since we can't see the response in no-cors, we assume success 
        // but provide a link in case it didn't actually save.
        statusEl.innerHTML = "✓ Sync Attempted! <br> <a href='" + GOOGLE_URL + "' target='_blank' style='color: var(--gold-primary); text-decoration: underline;'>Click here once to authorize</a> if your sheet was not created.";
        statusEl.style.color = "var(--gold-primary)";

    } catch (e) {
        console.error("Error", e);
        statusEl.innerHTML = "Connection Error. <a href='" + GOOGLE_URL + "' target='_blank' style='color: #FF5252;'>Click here to Link Google Drive</a>";
    }
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
