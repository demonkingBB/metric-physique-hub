
/**
 * CORE.JS - Global Submission Engine
 */

let currentPayload = null; // Memory for the last calculation

async function submitToDatabase() {
    const statusEl = document.getElementById('status-msg');

    if (!currentPayload) {
        alert("Please calculate your results first.");
        return;
    }

    statusEl.innerText = "Syncing with Google Sheets...";
    statusEl.className = "status-msg status-visible";

    // --- METHOD A: GOOGLE APPS SCRIPT (ACTIVE) ---
    const GOOGLE_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';

    try {
        await fetch(GOOGLE_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentPayload)
        });

        statusEl.innerText = "✓ Success: Data synced to your Google Sheet.";
        statusEl.style.color = "var(--gold-primary)";
    } catch (e) {
        console.error("Submission Error", e);
        statusEl.innerText = "Error syncing data. Please check your connection.";
        statusEl.style.color = "#FF5252";
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
}