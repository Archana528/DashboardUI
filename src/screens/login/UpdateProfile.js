import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import extropyLogo from '../../assets/images/ExtropyDataLabsLogoFinal.png'

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  //const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    // if (emailRef.current.value !== currentUser.email) {
    //   promises.push(updateEmail(emailRef.current.value))
    // }
    // if (passwordRef.current.value) {
    //   promises.push(updatePassword(passwordRef.current.value))
    // }

    Promise.all(promises)
      .then(() => {
        navigate("/login")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <div>
        <img width={350} height={200} src={extropyLogo} />  
        <h2 class="text-center mb-4" style={{color:"#0E74BD"}}>PriceAware</h2> 
      </div>
      <Card>
        <Card.Body>
        <h4 className="text-center mb-4" style={{color:"#0E74BD"}}>Change Password</h4>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label style={{color:"#0E74BD"}}>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                disabled
                defaultValue={"john@test.com"}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label style={{color:"#0E74BD"}}>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm" className="pb-3">
              <Form.Label style={{color:"#0E74BD"}}>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/login">Cancel</Link>
      </div>
    </div>
  )
}