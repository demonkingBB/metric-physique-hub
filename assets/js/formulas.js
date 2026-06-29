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
    },

    // 4. Golden Ratio (Shoulder-to-Waist)
    goldenRatio: function () {
        const s = parseFloat(document.getElementById('shoulders').value);
        const w = parseFloat(document.getElementById('waist').value);

        if (!s || !w) {
            alert("Please enter both shoulder and waist measurements.");
            return;
        }

        const currentRatio = (s / w).toFixed(3);
        const target = 1.618;
        const idealWaist = (s / target).toFixed(1);
        const idealShoulders = (w * target).toFixed(1);

        // Determine "Symmetry Score" (How close to 1.618 they are)
        const variance = Math.abs(currentRatio - target);
        let score = (100 - (variance * 50)).toFixed(1);
        if (score > 100) score = 100;
        if (score < 0) score = 0;

        const results = {
            ratio: currentRatio,
            score: score + "%",
            target: target,
            idealWaist: idealWaist,
            idealShoulders: idealShoulders
        };

        // UI Update using our shared helper
        this.displayResults(results, "Golden Ratio Analysis", { shoulders: s, waist: w });
    },

    // 5. FFMI (Fat-Free Mass Index)
    ffmi: function () {
        const lbs = parseFloat(document.getElementById('weight-lbs').value);
        const inches = parseFloat(document.getElementById('height-in').value);
        const bf = parseFloat(document.getElementById('body-fat').value);

        if (!lbs || !inches || !bf) {
            alert("Please fill in all fields (Weight, Height, and Body Fat %).");
            return;
        }

        // Conversions
        const kg = lbs * 0.453592;
        const meters = inches * 0.0254;

        // Step 1: Lean Body Mass (LBM)
        const lbmLbs = lbs * (1 - (bf / 100));
        const lbmKg = kg * (1 - (bf / 100));
        const fatMass = lbs - lbmLbs;

        // Step 2: Standard FFMI
        const ffmiVal = lbmKg / (meters * meters);

        // Step 3: Normalized FFMI (Adjusted for 1.8m height)
        const normalizedFFMI = ffmiVal + (6.1 * (1.8 - meters));

        // Step 4: Classification Logic
        let category = "Average";
        if (normalizedFFMI >= 25) category = "Elite (Natural Limit)";
        else if (normalizedFFMI >= 22) category = "Superior";
        else if (normalizedFFMI >= 20) category = "Excellent";
        else if (normalizedFFMI < 18) category = "Below Average";

        const results = {
            ffmi: ffmiVal.toFixed(2),
            normFFMI: normalizedFFMI.toFixed(2),
            classification: category,
            leanMass: lbmLbs.toFixed(1) + " lbs",
            fatMass: fatMass.toFixed(1) + " lbs"
        };

        // UI Update using shared helper
        this.displayResults(results, "FFMI Analysis", { weight: lbs, height: inches, bodyfat: bf });
    },

};