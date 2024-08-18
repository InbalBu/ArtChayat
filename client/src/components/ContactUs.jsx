import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import emailjs from 'emailjs-com';
import styles from '../css/ContactUs.module.css'; // Import the CSS module
import logoEN from '../images/logoEN.png';

function ContactUs({ language }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // State to track success/failure
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    emailjs.send('service_nya61d8', 'template_f160kop', formData, 'Gj73Mpv5pgaQD134m')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('success');
      }, (error) => {
        console.log('FAILED...', error);
        setStatus('failure');
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const isHebrew = language === 'he';

  return (
    <div className={`${styles['contact-container']} ${isHebrew ? styles['contact-rtl'] : styles['contact-ltr']}`}>
      <Helmet>
        <title>{isHebrew ? 'צור קשר' : 'Contact Us'}</title>
        <meta name="description" content={isHebrew ? 'לייעוץ אומנותי ופרטים נוספים:' : 'For artistic advice and additional details:'} />
        <meta name="keywords" content={isHebrew ? 'צור קשר, פרטים, מידע' : 'contact, details, information'} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph tags */}
        <meta property="og:title" content={isHebrew ? 'צור קשר' : 'Contact Us'} />
        <meta property="og:description" content={isHebrew ? 'לייעוץ אומנותי ופרטים נוספים:' : 'For artistic advice and additional details:'} />
        <meta property="og:image" content={logoEN} />
        <meta property="og:url" content="https://artchayat.netlify.app/contact" />
        <meta property="og:type" content="website" />
      </Helmet>
      <h2>{isHebrew ? 'לייעוץ אומנותי ופרטים נוספים:' : 'For artistic advice and additional details:'}</h2>
      <p>{isHebrew ? 'טלפון:' : 'Phone:'}</p>
      <p>{isHebrew ? '053-8311215 - מיכל בוקריס' : '053-8311215 - Michal Bukris'}</p>
      <p>{isHebrew ? '052-6652571 - ריקי חייט' : '052-6652571 - Riki Chayat'}</p>
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

      {/* Success and Failure Messages */}
      {status === 'success' && (
        <p className={styles['contact-success']}>
          {isHebrew ? 'ההודעה נשלחה בהצלחה!' : 'Your message was sent successfully!'}
        </p>
      )}
      {status === 'failure' && (
        <p className={styles['contact-error']}>
          {isHebrew ? 'אירעה שגיאה בשליחת ההודעה, נסה שנית.' : 'There was an error sending your message, please try again.'}
        </p>
      )}
    </div>
  );
}

export default ContactUs;
