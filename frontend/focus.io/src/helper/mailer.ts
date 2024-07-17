import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, emailType, userId }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
            user: "maddison53@ethereal.email",
            pass: "jn7jnAPss4f63QBp6D",
        },
    });

    try {
        const mailOptions = await transporter.sendMail({
            from: 'focus@io.com', 
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset password",
            text: "Hello world?",
            html: "<b>Hello world?</b>", 
        });

        const emailResponse = await transporter.sendMail(mailOptions)

        return emailResponse;

    } catch (error: Error) {
        throw new Error(error.message);
    }
}