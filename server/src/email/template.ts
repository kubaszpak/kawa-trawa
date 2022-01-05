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
        const confirmUrl = `localhost:3000/auth/confirmRegistration?token=${registrationToken}`;

        return {
            text: `Hello ${firstName} ${lastName}!\n\nTo confirm your registration click on the link below.\n${confirmUrl}`,
            html: `<p>Hello<b> ${firstName} ${lastName}!</b></p><p>To confirm your registration click on the link below.</p><p><a href=\"${confirmUrl}\">Confirm registration!</a></p>`
        };
    }
}


export const confirmRegistrationEmailTemplate = new ConfirmRegistrationEmailTemplate();

export const registerEmailTemplate = new RegisterEmailTemplate();
