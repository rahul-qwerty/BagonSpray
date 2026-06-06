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
        "Please fill all fields.",
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
                "apikey": SUPABASE_KEY,
                "Authorization":
                    `Bearer ${SUPABASE_KEY}`,
                "Content-Type":
                    "application/json",
                "Accept":
                    "application/json",
                "Prefer":
                    "return=representation"
            },

            body:
                JSON.stringify(payload)
        }
    );

    const responseText =
        await response.text();

    console.log(
        "HTTP Status:",
        response.status
    );

    console.log(
        "Supabase Response:",
        responseText
    );

    let result = {};

    try {
        result =
            JSON.parse(responseText);
    }
    catch {
        result = {
            raw: responseText
        };
    }

    if (!response.ok) {

        const errorMessage =
            JSON.stringify(result);

        if (
            errorMessage.includes(
                "members_email_unique"
            )
        ) {

            showMessage(
                "Looks like you've already joined the movement.",
                "warning"
            );

            return;
        }

        throw new Error(
            result.message ||
            "Unable to submit registration."
        );
    }

    showMessage(
        "🎉 Successfully registered!",
        "success"
    );

    form.reset();

}
catch (error) {

    console.error(
        "Submission Error:",
        error
    );

    if (
        error.message.includes(
            "Failed to fetch"
        )
    ) {

        showMessage(
            "Network error. Please check your internet connection.",
            "error"
        );

        return;
    }

    showMessage(
        error.message ||
        "Something went wrong. Please try again.",
        "error"
    );
}
finally {

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
message.style.fontWeight = "600";

switch(type) {

    case "success":
        message.style.color =
            "#22c55e";
        break;

    case "warning":
        message.style.color =
            "#f59e0b";
        break;

    default:
        message.style.color =
            "#ef4444";
}

            }
