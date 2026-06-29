/**
 * FORMULAS.JS - Centralized Math Logic
 * Each function is separated by a COMMA. No semicolons inside the Formulas object.
 */

const Formulas = {
    // 1. Steve Reeves Formula
    reeves: function () {
        const wrist = parseFloat(document.getElementById('wrist').value);
        const ankle = parseFloat(document.getElementById('ankle').value);

        if (!wrist || !ankle) {
            alert("Please enter both wrist and ankle measurements.");
            return;
        }

        const results = {
            arm: (wrist * 2.52).toFixed(1),
            calf: (ankle * 1.92).toFixed(1),
            neck: (wrist * 2.48).toFixed(1),
            chest: (wrist * 6.5).toFixed(1),
            waist: (wrist * 6.5 * 0.70).toFixed(1),
            thigh: (ankle * 1.75).toFixed(1)
        };

        this.displayResults(results, "Steve Reeves Formula", { wrist, ankle });
    }, // <--- COMMA REQUIRED

    // 2. McCallum Formula
    mccallum: function () {
        const chestInput = parseFloat(document.getElementById('chest-input').value);

        if (!chestInput) {
            alert("Please enter your chest measurement.");
            return;
        }

        const results = {
            neck: (chestInput * 0.37).toFixed(1),
            arm: (chestInput * 0.36).toFixed(1),
            forearm: (chestInput * 0.29).toFixed(1),
            waist: (chestInput * 0.70).toFixed(1),
            thigh: (chestInput * 0.53).toFixed(1),
            calf: (chestInput * 0.34).toFixed(1)
        };

        this.displayResults(results, "McCallum Formula", { chest: chestInput });
    }, // <--- COMMA REQUIRED

    // 3. Casey Butt's Maximum Potential
    caseyButt: function () {
        const h = parseFloat(document.getElementById('height').value);
        const w = parseFloat(document.getElementById('wrist').value);
        const a = parseFloat(document.getElementById('ankle').value);

        if (!h || !w || !a) {
            alert("Please provide Height, Wrist, and Ankle measurements.");
            return;
        }

        // Casey Butt's logic: Max Weight at ~10% BF
        const maxWeight = (Math.pow(h, 1.5) * ((Math.sqrt(w) / 22.667) + (Math.sqrt(a) / 17.0104))).toFixed(1);

        const results = {
            weight: maxWeight,
            chest: (1.6817 * w + 1.3759 * a + 0.3314 * h).toFixed(1),
            arm: (1.2033 * w + 0.1236 * h).toFixed(1),
            forearm: (0.9626 * w + 0.0989 * h).toFixed(1),
            neck: (1.1424 * w + 0.1236 * h).toFixed(1),
            thigh: (1.3868 * a + 0.1805 * h).toFixed(1),
            calf: (0.9298 * a + 0.1210 * h).toFixed(1)
        };

        this.displayResults(results, "Casey Butt Potential", { height: h, wrist: w, ankle: a });
    }, // <--- COMMA REQUIRED

    /**
     * SHARED HELPER FUNCTION
     * Used by all calculators to update UI and prepare the Post Office (core.js)
     */
    displayResults: function (results, calcName, inputs) {
        // 1. Update the numbers on the screen
        for (const key in results) {
            const el = document.getElementById('res-' + key);
            if (el) el.innerText = results[key];
        }

        // 2. Reveal the results section
        const section = document.getElementById('results-section');
        if (section) section.style.display = 'block';

        // 3. Save the package for the Post Office (core.js)
        // currentPayload is a global variable declared in core.js
        currentPayload = {
            calculator: calcName,
            timestamp: new Date().toLocaleString(),
            measurements: inputs,
            ideals: results
        };
    }
};