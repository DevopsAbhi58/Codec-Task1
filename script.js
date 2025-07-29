document.addEventListener("DOMContentLoaded", () => {
    const doctorSelect = document.getElementById("doctor");
    const form = document.getElementById("appointmentForm");
    const messageDiv = document.getElementById("message");

  

    
    doctors.forEach(doc => {
        const option = document.createElement("option");
        option.value = doc._id;
        option.textContent = doc.name;
        doctorSelect.appendChild(option);
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const doctorId = doctorSelect.value;
        const date = document.getElementById("date").value;
        const reason = document.getElementById("reason").value;


        const appointmentData = { doctorId, patientId, date, reason };

        try {
            const res = await fetch("/api/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(appointmentData)
            });

            const result = await res.json();

            if (res.ok) {
                messageDiv.textContent = "✅ Appointment booked successfully!";
                form.reset();
            } else {
                messageDiv.textContent = "❌ Error: " + (result.error || "Could not book appointment.");
            }
        } catch (err) {
            messageDiv.textContent = "❌ Server error. Please try again.";
            console.error(err);
        }
    });
});
