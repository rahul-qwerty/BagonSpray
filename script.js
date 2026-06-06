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

    if (
        !payload.first_name ||
        !payload.last_name ||
        !payload.email ||
        !payload.whatsapp
    ) {
        showMessage(
            "Please fill all fields",
            "error"
        );
        return;
    }

    try {

        submitButton.disabled = true;
        submitButton.innerText = "Submitting...";

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/members`,
            {
                method: "POST",

                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization:
                        `Bearer ${SUPABASE_KEY}`,
                    "Content-Type":
                        "application/json",
                    Prefer:
                        "return=representation"
                },

                body:
                    JSON.stringify(payload)
            }
        );

        const result =
            await response.json();

        if (!response.ok) {

            console.error(result);

            throw new Error(
                result.message ||
                "Failed to submit"
            );
        }

        console.log(
            "Inserted record:",
            result
        );

        showMessage(
            "Successfully registered!",
            "success"
        );

        form.reset();

    } catch (error) {

        console.error(error);

        showMessage(
            error.message,
            "error"
        );

    } finally {

        submitButton.disabled = false;
        submitButton.innerText =
            "Join BagonSpray";
    }
}

function showMessage(
    text,
    type
) {

    message.innerText = text;

    message.style.marginTop = "15px";

    message.style.color =
        type === "success"
        ? "#22c55e"
        : "#ef4444";
}
