import { useState, useEffect, useRef } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { isValidID, isValidPhoneNumber } from "../utils";
import Header from '../comps/Header';

const defaultHeader = { color: "white", msg: "Please confirm your participation" }

export default function Home() {
  const [token, setToken] = useState(null);
  const [header, setHeader] = useState(defaultHeader);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const captchaRef = useRef(null);
  // captcha ^
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }
  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    captchaRef.current.execute();
  };
  useEffect(() => {

    if (token)
      console.log(`hCaptcha Token: ${token}`);

  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requiredFields = ["name", "id", "phone"]
    let providedFields = Object.keys(inputs)
    let providedInputs = Object.values(inputs)
    setLoading(true)
    try {
      if (!requiredFields.every((field) => providedFields.includes(field)) || !providedInputs.every((val) => val)) {
        // checks if all required fields are provided
        throw "Please fill out ALL pieces of information below!"
      }
      if (!isValidID(inputs?.id || "")) {
        throw "Invalid Access ID. Example: 'ab1234'"
      }
      if (!isValidPhoneNumber(inputs?.phone || '')) {
        throw "Invalid phone number. Example: '313 237 2850'"
      }
      if (token) {
        // let body = inputs
        // lol i prob should sanitize the inputs before throwing them at the server
        const res = await fetch(`/api/submit?token=${encodeURIComponent(token)}`, { method: "POST", body: new URLSearchParams(inputs) })
        const data = await res.json()
        if (data?.success) {
          setHeader({ msg: data.msg, color: "green" })
        } else {
          throw data.msg
        }
      }
    } catch (err) {
      setHeader({ color: "red", msg: String(err).toString() })
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className={styles.container}>
      <Header />

      <main className="container">
        <div align="center" style={{ marginTop: 20 }}> {/* LOGOS */}
          <Image src="https://scd.cs.wayne.edu/scd_logo.png" alt="SCD Logo" width={100} height={100} />
          <Image src="/spartahack.png" alt="SpartaHack Logo" width={100} height={100} />
        </div>
        <h2 className={styles.title} style={{ color: header.color }}>
          {isLoading ? <div id="loading" /> : header.msg}
        </h2>
        {header.msg == defaultHeader.msg && <p className={styles.description}>by entering the following:</p>}
        <label htmlFor="terms">
          <input type="checkbox" checked={hasAgreed} onChange={() => setHasAgreed(!hasAgreed)} id="terms" name="terms" />
          <b>I agree</b> that I will be attending the <a target="_blank" rel="noreferrer" href='https://spartahack.com'>SpartaHack 8</a> Hackathon at Michigan State University (Lansing, MI) on January 28th and 29th, 2023.
          More information will be forwarded to your email before the event including teams and transportation.
        </label>
        {hasAgreed && <form onSubmit={handleSubmit} className={styles.description}>
          <input type="text" name="name" value={inputs.name || ""}
            onChange={handleChange} placeholder='Full Name' />
          <input type="text" name="id" value={inputs.id || ""}
            onChange={handleChange} placeholder='WSU Access ID' />
          <br />
          <input type="text" name="phone" value={inputs.phone || ""}
            onChange={handleChange} placeholder='Phone number' />
          <br />
          <textarea type="text" name="pref" value={inputs.pref || ""}
            rows="5" cols="35"
            onChange={handleChange}
            placeholder='Enter Team Preferences. Example: I want to be matched with [my friend] OR Match me with people of my skill level OR N/A' />
          <br />

          <HCaptcha
            sitekey={process.env.NEXT_PUBLIC_SITEKEY}
            onLoad={onLoad}
            onVerify={setToken}
            onError={() => setHeader({ color: "yellow", msg: "Failed to verify. Please try again" })}
            ref={captchaRef} />
          {token && <input aria-busy={isLoading} disabled={isLoading} style={{ marginTop: 20 }} type="submit" />}
        </form>}

      </main>

      <footer className={styles.footer}>
        <a className={styles.link} target="_blank" rel='noreferrer' href="https://scd.cs.wayne.edu/#/">
          <span className={styles.logo}>
            © {new Date().getFullYear()} SCD
          </span>
        </a>
      </footer>
    </div>
  )
}
