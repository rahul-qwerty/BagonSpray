const SUPABASE_URL =
"https://gmfqgqobjklosxdiwyye.supabase.co";

const SUPABASE_KEY =
"sb_publishable_TUxUEqYrmF-OM5UAVn5CJQ_DEHHCwai";

const form =
document.getElementById("joinForm");

form.addEventListener(
"submit",
handleSubmit
);

async function handleSubmit(event) {

event.preventDefault();

const submitButton =
    form.querySelector(
        "button[type='submit']"
    );

const payload = {

    first_name:
        document
            .getElementById("firstName")
            .value
            .trim(),

    last_name:
        document
            .getElementById("lastName")
            .value
            .trim(),

    email:
        document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase(),

    whatsapp:
        document
            .getElementById("whatsapp")
            .value
            .trim()
};

try {

    submitButton.disabled = true;

    submitButton.innerText =
        "Submitting...";

    const response =
        await fetch(
            `${SUPABASE_URL}/rest/v1/members`,
            {
                method: "POST",

                headers: {
                    apikey:
                        SUPABASE_KEY,

                    Authorization:
                        `Bearer ${SUPABASE_KEY}`,

                    "Content-Type":
                        "application/json",

                    "Accept":
                        "application/json",

                    Prefer:
                        "return=minimal"
                },

                body:
                    JSON.stringify(
                        payload
                    )
            }
        );

    const responseText =
        await response.text();

    console.log(
        "Status:",
        response.status
    );

    console.log(
        "Response:",
        responseText
    );

    // Success OR duplicate email
    if (
        response.ok ||
        responseText.includes(
            "members_email_unique"
        )
    ) {

        form.reset();
    }

}
catch(error) {

    console.error(
        "Submission Error:",
        error
    );

}
finally {

    submitButton.disabled = false;

    submitButton.innerText =
        "Submit Report";
}

}
