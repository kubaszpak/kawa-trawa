import { createTransport, Transporter } from 'nodemailer';
import { EmailTemplate } from "./template"

let mailTransport: Transporter;

export const setupEmail = async () => {
    const smtpConfig = {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    };

    mailTransport = createTransport(smtpConfig);
    const success = await mailTransport.verify();
    if (!success) {
        throw new Error('Failed setup the email service.');
    }
};

export const sendEmail = async (
    subject: string,
    template: EmailTemplate,
    recipients: string[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any
) => {
    const { text, html } = template.render(data);

    await mailTransport.sendMail({
        from: "noreply@kawaitrawa.com",
        to: recipients,
        subject: subject,
        text: text,
        html: html,
        encoding: 'utf-8',
    });
};
