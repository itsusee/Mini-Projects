const updateTimer = (endDate, elementId, endMessage) => {
    const element = document.getElementById(elementId);
    const update = () => {
        const now = Date.now();
        const distance = endDate - now;

        if (distance < 0) {
            clearInterval(timer);
            element.textContent = endMessage;
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        element.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const timer = setInterval(update, 1000);
    update();
};

const seniorEndDate = new Date("May 31, 2024 15:00:00").getTime();
const gradDate = new Date("Jun 6, 2024 08:35:00").getTime();
const otherEndDate = new Date("Jun 25, 2024 15:00:00").getTime();

updateTimer(seniorEndDate, "seniorTime", "SCHOOL FOR SENIORS HAS ENDED!");
updateTimer(gradDate, "gradTime", "SENIOR GRADULATION HAS STARTED!");
updateTimer(otherEndDate, "otherTime", "SCHOOL FOR OTHER GRADES HAS ENDED!");