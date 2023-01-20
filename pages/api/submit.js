import mongoose from 'mongoose';
import { withHCaptcha } from 'next-hcaptcha'
import { connect } from '../../db/connect';
import Entry from "../../db/models";

const hcaptchaCheck = async (token) => {
    const verifyResp = await fetch(`https://hcaptcha.com/siteverify?secret=${process.env.SECRETKEY}&response=${token}`);
    const verifyJson = await verifyResp.json();
    return verifyJson.success
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            let token = req.query.token
            if (!token) throw "Please confirm you are a human..."
            let isVerified = await hcaptchaCheck(decodeURIComponent(token))
            if (!isVerified) {
                throw "Please prove you are a human (you may have to refresh the page)..."
            }
            await connect()
            const { id: AccessID, name: FullName, pref: Preference, phone: Phone } = req.body
            const result = await Entry.findOneAndUpdate(
                { AccessID },
                { AccessID, FullName, Preference, Date: new Date(), Phone },
                { upsert: true, runValidators: true })
            // console.info(result)
            console.log(AccessID, "has verified.")
            res.status(200).json({ success: true, msg: `Thank you, ${FullName}` })
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                let errs = Object.values(err.errors).map(({properties})=>properties.message)
                return res.status(400).json({ success: false, msg: errs.join(" ") });
            } else {
                res.status(500).json({ success: false, msg: `An error occurred: ${err.toString()}` })
                console.error(err)
            }
        }
    }
}