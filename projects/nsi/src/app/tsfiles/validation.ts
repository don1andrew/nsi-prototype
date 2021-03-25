export class Validation {
    static validate(formFields: any): boolean {
        return (formFields.code.length > 0) && (formFields.fullName.length > 0) &&
            (new Date(formFields.startDate + 'T00:00:00').getTime() <
                new Date(formFields.endDate + 'T00:00:00').getTime()) &&
            (!isNaN(new Date(formFields.codeDate + 'T00:00:00').getTime()));
    }
}