export abstract class EmailTemplate {
    abstract render(data: any): { text: string, html: string };
}

class RegisterEmailTemplate extends EmailTemplate {
    render(data: any): { text: string, html: string } {
        return {
            text: `Hello ${data.firstName} ${data.lastName}`, html: `<p><b>Hello</b> ${data.firstName} ${data.lastName}</p>`
        };
    }
}

export const registerEmailTemplate = new RegisterEmailTemplate();
