import { useState } from "react"

import axios from "api/index"
import { useErrors } from "helpers/useErrors"

import Card from "components/Card"
import Error from "components/Error"
import Heading1 from "components/Heading1"
import TextArea from "components/TextArea"
import InputText from "components/InputText"
import InputLabel from "components/InputLabel"
import PrimaryButton from "components/PrimaryButton"

const ContactUs = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [serverErrors, setServerErrors] = useState<string[]>([])

  async function sendEnquiry() {
    try {
      setServerErrors([])
      setLoading(true)

      const resp = await axios.post("/customer_enquiries", {
        name,
        email,
        message
      })

      alert(resp.data.message)

      setName("")
      setEmail("")
      setMessage("")
    } catch (err) {
      const errors = useErrors(err)
      setServerErrors(errors)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mx-auto mb-28 mt-44 w-2/5">
      <Heading1 className="text-center" id="contact-us">
        Contact Us
      </Heading1>

      <div
        className="mx-auto mt-4 border-b-4 border-b-blue-800"
        style={{ width: "8%" }}
      ></div>

      <form className="mt-5" method="POST">
        {serverErrors.length !== 0 && (
          <Error className="mb-3" errors={serverErrors} />
        )}

        <div>
          <InputLabel htmlFor="name">Name</InputLabel>

          <InputText
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mt-6">
          <InputLabel htmlFor="email">Email</InputLabel>

          <InputText
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-6">
          <InputLabel htmlFor="message">Message</InputLabel>

          <TextArea
            rows={5}
            id="message"
            name="message"
            placeholder="Enter your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <PrimaryButton className="mt-8" loading={loading} onClick={sendEnquiry}>
          Send Message
        </PrimaryButton>
      </form>
    </Card>
  )
}

export default ContactUs
