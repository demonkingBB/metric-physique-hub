
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

    statusEl.innerText = "Syncing with your Google Drive...";
    statusEl.className = "status-msg status-visible";

    // --- METHOD A: GOOGLE APPS SCRIPT (ACTIVE) ---
    // PASTE YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL HERE
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxZ0xzGp_2d_RIO0yy8gaz6IjlEWRkQcKmeI9aYyTD2CMShtS4NjBElhU_HhIODxqX_RA/exec'; // <--- UPDATE THIS LINE
    
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            // mode: 'no-cors' is typically NOT needed for direct Web App calls with `fetch`
            // and can sometimes obscure error messages. Let's try without it first.
            // If you encounter CORS issues, we can try adding it back, but it might limit error details.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentPayload)
        });
        
        // Google Apps Script Web Apps usually return 200 OK even on script errors
        // So we check the text content for our custom success message
        const responseText = await response.text();
        if (responseText.includes("Success")) {
            statusEl.innerText = "✓ Success: Data synced to your Google Drive!";
            statusEl.style.color = "var(--gold-primary)";
        } else {
            throw new Error(responseText); // Propagate script errors
        }
        
    } catch (e) {
        console.error("Submission Error", e);
        statusEl.innerText = "Error syncing data: " + e.message + ". Check console for details.";
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