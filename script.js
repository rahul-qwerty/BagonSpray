const SUPABASE_URL = "https://gmfqgqobjklosxdiwyye.supabase.co";
const SUPABASE_KEY = "sb_publishable_TUxUEqYrmF-OM5UAVn5CJQ_DEHHCwai";

document
.getElementById("joinForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const payload = {

        first_name:
        firstName.value,

        last_name:
        lastName.value,

        email:
        email.value,

        whatsapp:
        whatsapp.value
    };

    const response =
    await fetch(
        `${SUPABASE_URL}/rest/v1/members`,
        {
            method:"POST",

            headers:{
                apikey:SUPABASE_KEY,
                Authorization:`Bearer ${SUPABASE_KEY}`,
                "Content-Type":"application/json",
                Prefer:"return=minimal"
            },

            body:JSON.stringify(payload)
        }
    );

    if(response.ok){
        message.innerText =
        "Successfully registered!";
    }
});
