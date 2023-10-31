import React, { useState, useRef } from 'react';
import emailjs from "@emailjs/browser";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [done, setDone] = useState(false);
  const [notDone, setNotDone] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setDone(false);
    setNotDone(false);
  }

  const sendEmail = (e) => {
    e.preventDefault();
  
    if (done) {
      // Don't submit the form again if it's already done
      return;
    }
  
    if (!formData.from_name || !formData.reply_to || !formData.message) {
      setNotDone(true);
    } else {
      emailjs
        .sendForm(
          "service_f3b1hha",
          "template_0pdhqnk",
          form.current,
          "80q0aWi_f7PToPYO8"
        )
        .then(
          (result) => {
            console.log(result.text);
            setDone(true);
          },
          (error) => {
            console.log(error.text);
          } // <-- Corrected the closing parenthesis here
        );
    }
  };
  

  return (
    <Container style={{ paddingTop: '50px' }}>
      <Row>
        <Col md={6} className="c-left">
          <h1>Get in Touch</h1>
          <h1 className="yellow">Contact me</h1>
        </Col>
        <Col md={6} className="c-right">
          {done ? (
            <div className="done">
              Thanks for contacting me and be sure I have received your mail.
              If you are testing this functionality, then I am confirming this
              thing is working perfectly fine. If you have any serious query,
              then I will reply. Also, if you need me, you can contact me on
              Linkedin.
            </div>
          ) : (
            <form ref={form} onSubmit={sendEmail}>
              <input
                type="text"
                name="from_name"
                className="user"
                placeholder="Name"
                onChange={handleChange}
              />
              <input
                type="email"
                name="reply_to"
                className="user"
                placeholder="Email"
                onChange={handleChange}
              />
              <textarea
                name="message"
                className="user"
                placeholder="Message"
                onChange={handleChange}
              />
              {notDone && (
                <span className='not-done'>
                  Please, fill in all the input fields
                </span>
              )}
              <Button type="submit" className="button" disabled={done}>
                Send
              </Button>
            </form>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
