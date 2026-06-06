const SUPABASE_URL = "https://gmfqgqobjklosxdiwyye.supabase.co";
const SUPABASE_KEY = "sb_publishable_TUxUEqYrmF-OM5UAVn5CJQ_DEHHCwai";

const form = document.getElementById("joinForm");
const message = document.getElementById("message");

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {

    event.preventDefault();

    const submitButton =
        form.querySelector("button[type='submit']");

    const payload = {
        first_name: document
            .getElementById("firstName")
            .value
            .trim(),

        last_name: document
            .getElementById("lastName")
            .value
            .trim(),

        email: document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase(),

        whatsapp: document
            .getElementById("whatsapp")
            .value
            .trim()
    };

    console.log("Payload:", payload);

    try {

        submitButton.disabled = true;
        submitButton.innerText = "Submitting...";

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/members`,
            {
                method: "POST",
                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Prefer": "return=representation"
                },
                body: JSON.stringify(payload)
            }
        );

        const responseText =
            await response.text();

        console.log(
            "HTTP Status:",
            response.status
        );

        console.log(
            "Raw Response:",
            responseText
        );

        let result = {};

        try {
            result = JSON.parse(responseText);
        } catch (e) {
            result = {
                raw: responseText
            };
        }

        if (!response.ok) {

            throw new Error(
                result.message ||
                responseText ||
                "Unknown error"
            );
        }

        console.log(
            "Inserted Record:",
            result
        );

        message.style.color =
            "#22c55e";

        message.innerText =
            "Successfully registered!";

        form.reset();

    }
    catch (error) {

        console.error(
            "Submission Error:",
            error
        );

        message.style.color =
            "#ef4444";

        message.innerText =
            error.message;

    }
    finally {

        submitButton.disabled = false;

        submitButton.innerText =
            "Join BagonSpray";
    }
}
