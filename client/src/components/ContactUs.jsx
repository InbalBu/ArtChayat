import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import emailjs from 'emailjs-com';
import styles from '../css/ContactUs.module.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Importing icons
import logoEN from '../images/logoEN.png';
import { Oval } from 'react-loader-spinner'; // Importing Oval loader
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

function ContactUs({ language }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // Success/Failure status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false); // For showing the modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const timeout = setTimeout(() => {
      setIsSubmitting(false);
      setShowModal(true);
      setStatus('failure');
    }, 10000);

    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      formData,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
      .then((response) => {
        clearTimeout(timeout);
        setStatus('success');
        setShowModal(true);
      })
      .catch((error) => {
        clearTimeout(timeout);
        setStatus('failure');
        setShowModal(true);
        console.error("EmailJS Error:", error);
        console.error("Error Details:", error.response || error.message || error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const closeModal = () => {
    setShowModal(false);
    setStatus('');
  };

  const isHebrew = language === 'he';

  const pageUrl = language === 'he'
    ? "https://artchayat.netlify.app/he/contact"
    : "https://artchayat.netlify.app/en/contact";

  return (
    <HelmetProvider>
      <div className={`${styles['contact-container']} ${isHebrew ? styles['contact-rtl'] : styles['contact-ltr']}`}>
        <Helmet>
          <title>{language === 'he' ? 'ArtChayat - צור קשר | ארט חייט' : 'Contact Us | ArtChayat - ארט חייט'}</title>
          <meta name="description" content={isHebrew ? 'לייעוץ אומנותי ופרטים נוספים:' : 'For artistic advice and additional details:'} />
          <meta name="keywords" content={isHebrew ? 'צור קשר, פרטים, מידע' : 'contact, details, information'} />
          <meta name="robots" content="index, follow" />

          {/* Open Graph tags */}
          <meta property="og:title" content={isHebrew ? 'ArtChayat - צור קשר | ארט חייט' : 'Contact Us | ArtChayat - ארט חייט'} />
          <meta property="og:description" content={isHebrew ? 'לייעוץ אומנותי ופרטים נוספים:' : 'For artistic advice and additional details:'} />
          <meta property="og:image" content={logoEN} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:type" content="website" />

          {/* Canonical URL */}
          <link rel="canonical" href={pageUrl} />

          {/* Hreflang alternate links */}
          <link rel="alternate" href="https://artchayat.netlify.app/he/contact" hreflang="he" />
          <link rel="alternate" href="https://artchayat.netlify.app/en/contact" hreflang="en" />
        </Helmet>
        <h2>{isHebrew ? 'לייעוץ אומנותי ופרטים נוספים:' : 'For artistic advice and additional details:'}</h2>
        <p>{isHebrew ? 'טלפון:' : 'Phone:'}</p>
        <p>
  {isHebrew ? 'מיכל בוקריס - ' : 'Michal Bukris - '}
  <a
    href="https://api.whatsapp.com/send/?phone=972538311215&type=phone_number&app_absent=0"
    target="_blank"
    rel="noopener noreferrer"
    style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
  >
    {isHebrew ? '053-8311215' : '053-8311215'}
    <FontAwesomeIcon 
      icon={faWhatsapp} 
      style={{ marginRight: '10px', marginLeft: '10px', color: '#25D366' }} 
    />
  </a>
</p>
<p>
  {isHebrew ? 'ריקי חייט - ' : 'Riki Chayat - '}
  <a
    href="https://api.whatsapp.com/send/?phone=972526652571&type=phone_number&app_absent=0"
    target="_blank"
    rel="noopener noreferrer"
    style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
  >
    {isHebrew ? '052-6652571' : '052-6652571'}
    <FontAwesomeIcon 
      icon={faWhatsapp} 
      style={{ marginRight: '10px', marginLeft: '10px', color: '#25D366' }} 
    />
  </a>
</p>
        <p>{isHebrew ? 'או מלאו את הטופס ונדאג ליצור אתכם קשר בהקדם.' : 'Or fill out the form and we will get back to you as soon as possible.'}</p>
        <form onSubmit={handleSubmit} className={styles['contact-form']}>
          <div className={styles['contact-form-group']}>
            <label>{isHebrew ? 'שם*' : 'Name*'}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className={styles['contact-form-group']}>
            <label>{isHebrew ? 'אימייל*' : 'Email*'}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className={styles['contact-form-group']}>
            <label>{isHebrew ? 'טלפון*' : 'Phone*'}</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className={styles['contact-form-group']}>
            <label>{isHebrew ? 'הודעה*' : 'Message*'}</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className={styles['contact-submit-button']}
            disabled={isSubmitting}
          >
            {isHebrew ? 'שלח' : 'Submit'}
          </button>
        </form>

        {/* Loader */}
        {isSubmitting && (
          <div className={styles['loading-container']}>
            <Oval
              height={80}
              width={80}
              color="#00BFFF"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#f0f0f0"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        )}

        {/* Modal for Success and Failure Messages */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <button className={styles.closeModal} onClick={closeModal}>
                &times;
              </button>
              {status === 'success' ? (
                <div className={styles.modalSuccess}>
                  <FaCheckCircle size={40} color="green" />
                  <p>{isHebrew ? 'ההודעה נשלחה בהצלחה!' : 'Your message was sent successfully!'}</p>
                </div>
              ) : (
                <div className={styles.modalError}>
                  <FaTimesCircle size={40} color="red" />
                  <p>{isHebrew ? 'אירעה שגיאה בשליחת ההודעה, נסה שנית.' : 'There was an error sending your message, please try again.'}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </HelmetProvider>
  );
}

export default ContactUs;
