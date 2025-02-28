import nodemailer from "nodemailer";

export async function mailSend(mailData: any) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.NODEMAILER_USER,
            to: mailData.address,
            subject: mailData.subject,
            html: `<p>${mailData.body}</p>`,
        });

        return { message: "Email sent successfully"};

    } catch (error: any) {
        return { error: error.message };
    }
}
