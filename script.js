// ==========================================
// ❤️ Love Counter
// ==========================================

// Fixed relationship start date
const startDate = new Date(2026, 5, 22); // June = 5 (months start from 0)

// Get HTML elements
const dayNumber = document.getElementById("dayNumber");
const yearCount = document.getElementById("yearCount");
const monthCount = document.getElementById("monthCount");
const dayCount = document.getElementById("dayCount");
const nextMilestone = document.getElementById("nextMilestone");
const daysLeft = document.getElementById("daysLeft");

// ----------------------------
// Calculate everything
// ----------------------------
function updateCounter() {

    const today = new Date();

    // ------------------------
    // Total Days
    // ------------------------
    const totalDays = Math.floor(
        (today - startDate) / (1000 * 60 * 60 * 24)
    );

    dayNumber.textContent = totalDays;

    // ------------------------
    // Years / Months / Days
    // ------------------------

    let years = today.getFullYear() - startDate.getFullYear();
    let months = today.getMonth() - startDate.getMonth();
    let days = today.getDate() - startDate.getDate();

    if (days < 0) {

        months--;

        const previousMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        );

        days += previousMonth.getDate();

    }

    if (months < 0) {

        years--;

        months += 12;

    }

    yearCount.textContent = years;
    monthCount.textContent = months;
    dayCount.textContent = days;

    // ------------------------
    // Next Milestone
    // ------------------------

    const milestones = [
        50,
        100,
        365,
        500,
        730,
        1000,
        1500,
        2000,
        3000,
        5000,
        10000
    ];

    let target = milestones.find(m => m > totalDays);

    if (!target) {

        target = Math.ceil(totalDays / 1000) * 1000;

    }

    nextMilestone.textContent = `${target} Days`;

    daysLeft.textContent =
        `${target - totalDays} Days Left`;

}

// Run immediately
updateCounter();

// Refresh every minute
setInterval(updateCounter, 60000);
if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("sw.js")
        .then(() => {

            console.log("Service Worker Registered");

        });

}