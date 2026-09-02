import { useEffect, useState } from "react";
import "./App.css";

import heroArt from "./assets/hero-art.jpeg";
import artistImage from "./assets/artist.jpeg";

import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";


function App() {

  const [showContact, setShowContact] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);


  // =========================================
  // GET PRODUCTS FROM BACKEND
  // =========================================

  useEffect(() => {

    fetch("https://pranu-art-website-iutl.vercel.app/api/products")

      .then((response) => response.json())

      .then((data) => {

        console.log("Products received:", data);

        setProducts(data);

      })

      .catch((error) => {

        console.error(
          "Error fetching products:",
          error
        );

      });

  }, []);


  // =========================================
  // OPEN CONTACT / PURCHASE FORM
  // =========================================

  function openBuyForm(product) {

    setSelectedProduct(product);

    setShowContact(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }


  function openContactForm() {

    setSelectedProduct(null);

    setShowContact(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }


  // =========================================
  // GO BACK HOME
  // =========================================

  function goHome() {

    setShowContact(false);

    setSelectedProduct(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }


  // =========================================
  // SHOW CONTACT FORM
  // =========================================

  if (showContact) {

    return (
      <ContactForm
        product={selectedProduct}
        onBack={goHome}
      />
    );

  }


  return (
    <>

      {/* =========================================
          NAVIGATION
      ========================================= */}

      <nav className="navbar">

        <div
          className="logo"
          onClick={goHome}
        >
          Pranu Art Gallery
        </div>


        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#collection">
            Collection
          </a>

          <a href="#about">
            About
          </a>

          <a href="#contact">
            Contact
          </a>

        </div>

      </nav>


      {/* =========================================
          SOCIAL SIDEBAR
      ========================================= */}

      <div className="social-sidebar">

        <a
          href="https://instagram.com/yourusername"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>


        <a
          href="https://facebook.com/yourusername"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
        >
          <FaFacebookF />
        </a>


        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
        >
          <FaWhatsapp />
        </a>

      </div>


      {/* =========================================
          HERO
      ========================================= */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-content">

          <p>
            ORIGINAL ARTWORK
          </p>


          <h1>

            Art that tells
            <br />
            your story.

          </h1>


          <span>

            Discover beautiful paintings and portraits
            created to bring emotion and character
            to your space.

          </span>


          <a href="#collection">

            Explore Collection

          </a>

        </div>


        <div className="hero-image">

          <img
            src={heroArt}
            alt="Featured artwork"
          />

        </div>

      </section>


      {/* =========================================
          COLLECTION
      ========================================= */}

      <section
        className="collection"
        id="collection"
      >

        <div className="collection-heading">

          <p>
            FEATURED COLLECTION
          </p>


          <h2>
            Paintings & Portraits
          </h2>

        </div>


        <div className="products">

          {products.map((product) => (

            <div
              className="product-card"
              key={product.id}
            >

              {/* PRODUCT IMAGE */}

              <div className="product-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

              </div>


              {/* PRODUCT NAME */}

              <h3>
                {product.name}
              </h3>


              {/* PRODUCT PRICE */}

              <p>
                ₹
                {Number(product.price).toLocaleString(
                  "en-IN"
                )}
              </p>


              {/* AMAZON BUTTON */}

              <a
                href={product.amazonUrl}
                target="_blank"
                rel="noreferrer"
                className="buy-button"
              >
                Buy on Amazon
              </a>

            </div>

          ))}

        </div>

      </section>


      {/* =========================================
          ABOUT ARTIST
      ========================================= */}

      <section
        className="about-artist"
        id="about"
      >

        <div className="artist-image">

          <img
            src={artistImage}
            alt="Artist"
          />

        </div>


        <div className="artist-content">

          <p className="section-label">
            ABOUT THE ARTIST
          </p>


          <h2>

            Every painting
            <br />
            begins with a story.

          </h2>


          <p className="artist-description">

            Art is more than something beautiful
            to look at. It is a feeling, a memory,
            and a moment captured on canvas.

          </p>


          <p className="artist-description">

            Each artwork is created with patience,
            imagination and a deep love for the
            little details that make every person
            and every moment unique.

          </p>


          <div className="artist-highlights">

            <div>

              <strong>
                01
              </strong>

              <span>
                Original Artwork
              </span>

            </div>


            <div>

              <strong>
                02
              </strong>

              <span>
                Handcrafted
              </span>

            </div>


            <div>

              <strong>
                03
              </strong>

              <span>
                Custom Portraits
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CONTACT
      ========================================= */}

      <section
        className="contact-section"
        id="contact"
      >

        <div className="contact-content">

          <p className="section-label">
            GET IN TOUCH
          </p>


          <h2>

            Have an artwork
            <br />
            in mind?

          </h2>


          <p>

            Looking for an original painting,
            custom portrait, or something
            special for your space?

          </p>

        </div>


        <div className="contact-box">

          <h3>

            Let's create something
            <br />
            meaningful.

          </h3>


          <button
            onClick={openContactForm}
          >
            Contact Us
          </button>

        </div>

      </section>


      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="footer">


        {/* BRAND */}

        <div className="footer-brand">

          <h2>
            Pranu Art Gallery
          </h2>


          <p>

            Original paintings and portraits
            created with passion and care.

          </p>

        </div>


        {/* FOOTER LINKS */}

        <div className="footer-links">


          {/* EXPLORE */}

          <div className="footer-column">

            <h4>
              EXPLORE
            </h4>


            <a href="#home">
              Home
            </a>


            <a href="#collection">
              Collection
            </a>


            <a href="#about">
              About
            </a>


            <a href="#contact">
              Contact
            </a>

          </div>


          {/* CONNECT */}

          <div className="footer-column">

            <h4>
              CONNECT
            </h4>


            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>


            <a href="tel:+919876543210">

              +91 98765 43210

            </a>


            <a href="mailto:hello@artora.com">

              hello@artora.com

            </a>

          </div>


          {/* ADDRESS */}

          <div className="footer-column">

            <h4>
              ADDRESS
            </h4>


            <span>
              Artora Studio
            </span>


            <span>
              Hyderabad, Telangana
            </span>


            <span>
              India
            </span>

          </div>


          {/* SHOP */}

          <div className="footer-column">

            <h4>
              SHOP
            </h4>


            <a href="#collection">

              Featured Collection

            </a>


            <a
              href="#collection"
            >
              Shop on Amazon
            </a>

          </div>

        </div>


        {/* FOOTER BOTTOM */}

        <div className="footer-bottom">

          <span>

            © 2026 Pranu Art Gallery.
            All rights reserved.

          </span>


          <span>

            Made with love for art.

          </span>

        </div>

      </footer>

    </>
  );
}


/* =========================================
   CONTACT / BUY FORM
========================================= */

function ContactForm({
  product,
  onBack
}) {

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",
    message: "",

  });


  const [submitted, setSubmitted] = useState(false);


  // =========================================
  // FORM INPUT CHANGE
  // =========================================

  function handleChange(event) {

    const {
      name,
      value
    } = event.target;


    setFormData({

      ...formData,

      [name]: value,

    });

  }


  // =========================================
  // FORM SUBMIT
  // =========================================

  function handleSubmit(event) {

    event.preventDefault();


    const orderData = {

      ...formData,

      product: product
        ? product.name
        : "General Enquiry",

      productId: product
        ? product.id
        : null,

      price: product
        ? product.price
        : null,

    };


    console.log(
      "FORM DATA READY FOR BACKEND:"
    );

    console.log(orderData);


    /*
      LATER WE CAN CONNECT THIS TO
      YOUR NODE.JS BACKEND.

      Example:

      fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
    */


    setSubmitted(true);

  }


  // =========================================
  // SUCCESS MESSAGE
  // =========================================

  if (submitted) {

    return (

      <div className="form-page">

        <div className="success-message">

          <p className="section-label">
            THANK YOU
          </p>


          <h1>

            Your enquiry has
            <br />
            been received.

          </h1>


          <p>

            We have received your details.
            We will get back to you shortly.

          </p>


          <button
            onClick={onBack}
          >
            Back to Home
          </button>

        </div>

      </div>

    );

  }


  // =========================================
  // CONTACT FORM
  // =========================================

  return (

    <div className="form-page">


      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to website
      </button>


      <div className="form-layout">


        {/* LEFT SIDE */}

        <div className="form-intro">

          <p className="section-label">

            {product
              ? "PURCHASE ENQUIRY"
              : "CONTACT US"}

          </p>


          <h1>

            {product ? (

              <>

                Interested in
                <br />
                this artwork?

              </>

            ) : (

              <>

                Let's talk
                <br />
                about art.

              </>

            )}

          </h1>


          <p>

            Fill in the form and tell us a
            little about what you're looking for.
            We'll get back to you shortly.

          </p>


          {/* SELECTED PRODUCT */}

          {product && (

            <div className="selected-product">

              <img
                src={product.image}
                alt={product.name}
              />


              <div>

                <p>
                  Selected Artwork
                </p>


                <h3>
                  {product.name}
                </h3>


                <span>

                  ₹
                  {Number(
                    product.price
                  ).toLocaleString("en-IN")}

                </span>

              </div>

            </div>

          )}

        </div>


        {/* FORM */}

        <div className="form-card">

          <h2>

            {product
              ? "Purchase Enquiry"
              : "Contact Us"}

          </h2>


          <form onSubmit={handleSubmit}>


            <label>
              Full Name
            </label>


            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />


            <label>
              Email Address
            </label>


            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />


            <label>
              Phone Number
            </label>


            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />


            <label>
              Message
            </label>


            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={
                product
                  ? "Tell us anything you'd like to know about this artwork..."
                  : "How can we help you?"
              }
              rows="5"
            />


            <button
              type="submit"
              className="submit-button"
            >

              {product
                ? "Send Purchase Enquiry"
                : "Send Message"}

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}


export default App;