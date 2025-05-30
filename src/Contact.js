import { useState } from "react";

const Contact = () => {
  return (
    <div className="contact">
      <div className="cont">
        <div className="main">
          <div className="text">
            <h1>Contact US</h1>
            <div className="line"></div>
            <p>Reach out to us for any inquiry</p>
            <form className="form">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
              <input type="email" placeholder="Email" />
              <textarea
                name="message"
                id="message"
                placeholder="Message"></textarea>
              <input className="btn" type="button" value="Submit" />
            </form>
          </div>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.8626251711094!2d30.952414111132747!3d30.040798774820875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145859dff6b9c047%3A0x452cc613a0ce1844!2zR29sZHN0ZXJuIC0g2KzZiNmE2K_YtNiq2LHZhg!5e0!3m2!1sen!2sde!4v1748620027312!5m2!1sen!2sde"
              width="600"
              height="450"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <div className="icons">
          <div className="card">
            <img src="./Icons/location.png" alt="Location" />
            <div className="details">
              <h1>Location</h1>
              <p>
                Goldstern: Makan Mall, Waslet Dahshur Rd, Second Al Sheikh
                Zayed, Giza Governorate.
              </p>
            </div>
          </div>
          <div className="card">
            <img src="./Icons/email.png" alt="Email" />
            <div className="details">
              <h1>Email</h1>
              <p>Sales@goldsternonline.de</p>
            </div>
          </div>
          <div className="card">
            <img src="./Icons/phone.png" alt="Phone" />
            <div className="details">
              <h1>Phone</h1>
              <p>
                <span>
                  <img src="./Icons/call.png" alt="Phone" />
                </span>
                +20 12 3456 7891
              </p>
              <p>
                <span>
                  <img src="./Icons/whatsapp.png" alt="Whatsapp" />
                </span>
                +20 12 3456 7891
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
