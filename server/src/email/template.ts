export abstract class EmailTemplate {
    abstract render(data: any): { text: string, html: string };
}

class RegisterEmailTemplate extends EmailTemplate {
    render(data: any): { text: string, html: string } {
        return {
            text: `Hello ${data.firstName} ${data.lastName}`,
            html: `<p><b>Hello</b> ${data.firstName} ${data.lastName}</p>`
        };
    }
}

class ConfirmRegistrationEmailTemplate extends EmailTemplate {
    render(data: any): { text: string, html: string } {

        const { user: { firstName, lastName }, registrationToken } = data;
        const confirmUrl = process.env.SERVER_HOST  + `/auth/confirmRegistration?token=${registrationToken}`;

        return {
            text: `Hello ${firstName} ${lastName}!\n\nTo confirm your registration click on the link below.\n${confirmUrl}`,
            html: `<p>Hello<b> ${firstName} ${lastName}!</b></p><p>To confirm your registration click on the link below.</p><p><a href=\"${confirmUrl}\">Confirm registration!</a></p>`
        };
    }
}

class ResetPasswordEmailTemplate extends EmailTemplate {
    render(data: any): { text: string, html: string } {

        const { user: { firstName, lastName }, resetToken } = data;
        const confirmUrl = process.env.SERVER_HOST  + `/auth/confirmRegistration/${resetToken}`;

        return {
            text: `Hello ${firstName} ${lastName}!\n\nTo confirm your password reset click on the link below.\n${confirmUrl}\nIgnore this message if you haven't initiated password reset.`,
            html: `<p>Hello<b> ${firstName} ${lastName}!</b></p><p>To confirm your password reset click on the link below.</p><p><a href=\"${confirmUrl}\">Confirm registration!</a></p><p>Ignore this message if you haven't initiated password reset.</p>`
        };
    }
}

export const confirmRegistrationEmailTemplate = new ConfirmRegistrationEmailTemplate();

export const registerEmailTemplate = new RegisterEmailTemplate();

export const resetPasswordEmailTemplate = new ResetPasswordEmailTemplate();
