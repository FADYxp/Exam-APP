"use server";

export default async function VerifyEmail(
    values: EmailVerify
) {
    const response = await fetch(`${process.env.API}/auth/send-email-verification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: values.email,
        }),
    });
    const payload = await response.json();

    return payload;
}
