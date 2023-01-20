export const isValidID = (id) =>
    /^(([A-z]){2}([0-9]){4})$/.test(id) // ab1234 regex pattern
export const isValidPhoneNumber = (phone) =>
    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone) // phone number pattern
