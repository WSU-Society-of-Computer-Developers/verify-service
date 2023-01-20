import { Schema, model, models } from "mongoose";
import { isValidID, isValidPhoneNumber } from "../utils";

// schemas
const entrySchema = new Schema({
    AccessID: {
        type: String,
        required: true,
        validate: {
            validator: isValidID,
            message: () => "Please enter a valid Access ID. Example: 'ab1234'"
        }
    },
    FullName: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        required: true
    },
    Phone: {
        type: String,
        required: true,
        validate: {
            validator: isValidPhoneNumber,
            message: () => "Please enter a valid phone number. Example: '313 237 2850'" 
        }
    },
    Preference: String
})

// models
const Entry = models.participation || model("participation", entrySchema, "participation")

export default Entry;
