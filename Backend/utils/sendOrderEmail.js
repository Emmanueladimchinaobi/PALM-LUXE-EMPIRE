const dotenv = require("dotenv");
dotenv.config();

const { Resend } = require("resend");

console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);
console.log("OWNER_EMAIL:", process.env.OWNER_EMAIL);

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOrderEmail = async (order) => {
    console.log("📨 Sending email for order:", order.customerName);

    try {
        const items = order.items.map(item =>
            `• ${item.name}
   Quantity: ${item.quantity}
   Price: ₦${item.price.toLocaleString()}`
        ).join("\n\n");

        const result = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: process.env.OWNER_EMAIL,
            subject: "🌸 New Palm Luxe Empire Order",
            text: `
NEW PALM LUXE EMPIRE ORDER

Customer:
${order.customerName}

Phone:
${order.phone}

Address:
${order.address}

----------------------------------

ITEMS

${items}

----------------------------------

Total:
₦${(order.totalAmount || 0).toLocaleString()}

Payment Method:
${order.paymentMethod}

Payment Status:
${order.paymentStatus || "Pending"}

Order Status:
${order.orderStatus || "Pending"}

----------------------------------

Order Time:
${new Date(order.createdAt || Date.now()).toLocaleString()}
`
        });

        console.log(result);

    } catch (error) {
        console.error(error);
    }
};

module.exports = sendOrderEmail;