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

    // 6. Symmetry Score (Left vs. Right Balance)
    symmetryScore: function () {
        const parts = ['Arm', 'Thigh', 'Calf'];
        let totalVariance = 0;
        const results = {};
        const inputs = {};

        parts.forEach(part => {
            const left = parseFloat(document.getElementById('left' + part).value);
            const right = parseFloat(document.getElementById('right' + part).value);
            if (left && right) {
                inputs['left' + part] = left;
                inputs['right' + part] = right;
                const variance = Math.abs(left - right);
                const partScore = (100 - (variance / Math.max(left, right) * 100)).toFixed(1);
                results[part.toLowerCase() + 'Score'] = partScore + "%";
                totalVariance += parseFloat(partScore);
            }
        });

        const overall = (totalVariance / parts.length).toFixed(1);
        results['overall'] = overall + "%";

        this.displayResults(results, "Symmetry Score", inputs);
    },

    // 7. LBM & Fat Mass (Advanced Composition)
    lbmFatMass: function () {
        const weight = parseFloat(document.getElementById('comp-weight').value);
        const bf = parseFloat(document.getElementById('comp-bf').value);

        if (!weight || !bf) return alert("Please fill in all fields.");

        const fatMass = (weight * (bf / 100)).toFixed(1);
        const lbm = (weight - fatMass).toFixed(1);
        const ratio = (lbm / fatMass).toFixed(2);

        const results = {
            lbm: lbm + " lbs",
            fatMass: fatMass + " lbs",
            muscleToFatRatio: ratio + ":1"
        };

        this.displayResults(results, "LBM & Fat Mass", { weight, bodyfat: bf });
    },

    // 8. Calorie Surplus (Bulking Calculator)
    calorieSurplus: function () {
        const weight = parseFloat(document.getElementById('bulk-weight').value);
        const height = parseFloat(document.getElementById('bulk-height').value);
        const age = parseFloat(document.getElementById('bulk-age').value);
        const gender = document.getElementById('bulk-gender').value;
        const activity = parseFloat(document.getElementById('bulk-activity').value);
        const goal = document.getElementById('bulk-goal').value; // 'lean' or 'aggressive'

        if (!weight || !height || !age) return alert("Please fill in all fields.");

        // BMR (Mifflin-St Jeor)
        let bmr = (10 * (weight * 0.4535)) + (6.25 * (height * 2.54)) - (5 * age);
        bmr = (gender === 'male') ? bmr + 5 : bmr - 161;

        const tdee = bmr * activity;
        const surplus = (goal === 'lean') ? 250 : 500;
        const target = (tdee + surplus).toFixed(0);

        const results = {
            maintenance: tdee.toFixed(0),
            surplusTarget: target,
            protein: (weight * 1).toFixed(0) + "g",
            fats: (weight * 0.35).toFixed(0) + "g"
        };

        this.displayResults(results, "Calorie Surplus Bulk", { weight, goal });
    },
    // 9. BMR & TDEE (Combined)
    bmrTdee: function () {
        const w = parseFloat(document.getElementById('weight').value);
        const h = parseFloat(document.getElementById('height').value);
        const a = parseFloat(document.getElementById('age').value);
        const g = document.getElementById('gender').value;
        const act = parseFloat(document.getElementById('activity').value);

        if (!w || !h || !a) return alert("Please fill in all fields.");

        // Mifflin-St Jeor Equation
        let bmr = (10 * (w * 0.453592)) + (6.25 * (h * 2.54)) - (5 * a);
        bmr = (g === 'male') ? bmr + 5 : bmr - 161;

        const tdee = (bmr * act).toFixed(0);

        const results = {
            bmr: bmr.toFixed(0) + " kcal",
            tdee: tdee + " kcal"
        };

        this.displayResults(results, "BMR-TDEE Analysis", { weight: w, activity: act });
    },

    // 10. 1-Rep Max (Epley Formula)
    oneRepMax: function () {
        const weight = parseFloat(document.getElementById('lift-weight').value);
        const reps = parseFloat(document.getElementById('lift-reps').value);

        if (!weight || !reps) return alert("Please enter weight and reps.");

        // Epley Formula
        const m = (weight * (1 + (reps / 30))).toFixed(1);

        const results = {
            max: m + " lbs",
            ninety: (m * 0.9).toFixed(1) + " lbs",
            eighty: (m * 0.8).toFixed(1) + " lbs",
            seventy: (m * 0.7).toFixed(1) + " lbs"
        };

        this.displayResults(results, "1-Rep Max Estimate", { weight, reps });
    },

    // 11. Macro Calculator (Muscle Gain Focus)
    macroCalc: function () {
        const tdeeInput = parseFloat(document.getElementById('target-calories').value);
        if (!tdeeInput) return alert("Please enter your target calories.");

        // Standard 40/30/30 Distribution for Growth
        const results = {
            protein: ((tdeeInput * 0.30) / 4).toFixed(0) + "g",
            carbs: ((tdeeInput * 0.40) / 4).toFixed(0) + "g",
            fats: ((tdeeInput * 0.30) / 9).toFixed(0) + "g"
        };

        this.displayResults(results, "Macro Distribution", { target_kcal: tdeeInput });
    },

    // 12. Protein Needs (Hypertrophy Focused)
    proteinNeeds: function () {
        const weight = parseFloat(document.getElementById('prot-weight').value);
        const bf = parseFloat(document.getElementById('prot-bf').value) || 0;

        if (!weight) return alert("Please enter your weight.");

        let lbm = weight;
        if (bf > 0) {
            lbm = weight * (1 - (bf / 100));
        }

        // Research-backed ranges (grams per day)
        // Maintenance: 0.8g/lb of total weight
        // Growth: 1.0g/lb of total weight OR 1.2g/lb of LBM
        // Max Retention: 1.2g/lb of total weight (for deep cutting)

        const results = {
            maintenance: (weight * 0.8).toFixed(0) + "g",
            muscleGrowth: (weight * 1.0).toFixed(0) + "g",
            eliteHypertrophy: (lbm * 1.2).toFixed(0) + "g",
            leanMass: lbm.toFixed(1) + " lbs"
        };

        this.displayResults(results, "Protein Needs Analysis", { weight, bodyfat: bf });
    },

    // 13. Navy Body Fat Method
    bodyFatNavy: function () {
        const g = document.getElementById('gender').value;
        const h = parseFloat(document.getElementById('height').value);
        const w = parseFloat(document.getElementById('waist').value);
        const n = parseFloat(document.getElementById('neck').value);
        const hip = parseFloat(document.getElementById('hips').value) || 0;

        if (!h || !w || !n) return alert("Please fill in all required fields.");

        let bf = 0;
        if (g === 'male') {
            // Navy Formula (Male): 86.010*log10(waist-neck) - 70.041*log10(height) + 36.76
            bf = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
        } else {
            // Navy Formula (Female): 163.205*log10(waist+hips-neck) - 97.684*log10(height) - 78.387
            if (!hip) return alert("Hips measurement is required for females.");
            bf = 163.205 * Math.log10(w + hip - n) - 97.684 * Math.log10(h) - 78.387;
        }

        const results = {
            bodyfat: bf.toFixed(1) + "%",
            leanMass: "Calculated", // Optional: could add weight to calc actual lbs
            status: bf < 15 ? "Lean" : (bf < 25 ? "Fit" : "Average")
        };

        this.displayResults(results, "Navy Body Fat Analysis", { height: h, waist: w, gender: g });
    },

    // 14. BMI Calculator
    bmi: function () {
        const w = parseFloat(document.getElementById('weight').value);
        const h = parseFloat(document.getElementById('height').value);
        if (!w || !h) return alert("Please fill in Weight and Height.");

        const bmiVal = (703 * w / (h * h)).toFixed(1);

        let cat = "Normal";
        if (bmiVal >= 30) cat = "Obese";
        else if (bmiVal >= 25) cat = "Overweight";
        else if (bmiVal < 18.5) cat = "Underweight";

        const results = {
            bmi: bmiVal,
            category: cat
        };

        this.displayResults(results, "BMI Analysis", { weight: w, height: h });
    },

};