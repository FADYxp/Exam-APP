"use server";

export default async function VerifyCode(
    values: CodeVerify
) {
    const response = await fetch(`${process.env.API}/auth/confirm-email-verification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: values.email,
            code: values.code,
        }),
    });
    const payload = await response.json();

    return payload;
}
