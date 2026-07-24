const dotenv = require("dotenv");
dotenv.config();

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOrderEmail = async () => {
    try {
        const result = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: process.env.OWNER_EMAIL,
            subject: "Palm Luxe Test Email",
            text: "If you received this email, Resend is working!"
        });

        console.log("SUCCESS:", result);
    } catch (error) {
        console.error("RESEND ERROR:", error);
    }
};

module.exports = sendOrderEmail;