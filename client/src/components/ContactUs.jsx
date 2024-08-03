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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_USER_ID')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (error) => {
        console.log('FAILED...', error);
      });

    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const isHebrew = language === 'he';

  return (
    <div className={`${styles['contact-container']} ${isHebrew ? styles['contact-rtl'] : styles['contact-ltr']}`}>
      <Helmet>
        <title>{isHebrew ? 'צור קשר' : 'Contact Us'}</title>
        <meta name="description" content={isHebrew ? 'לשאלות, פרטים ומידע נוסף פנו אלינו' : 'For questions, details, and more information, please contact us'} />
        <meta name="keywords" content={isHebrew ? 'צור קשר, פרטים, מידע' : 'contact, details, information'} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph tags */}
        <meta property="og:title" content={isHebrew ? 'צור קשר' : 'Contact Us'} />
        <meta property="og:description" content={isHebrew ? 'לשאלות, פרטים ומידע נוסף פנו אלינו' : 'For questions, details, and more information, please contact us'} />
        <meta property="og:image" content={logoEN} />
        <meta property="og:url" content="https://artchayat.netlify.app/contact" />
        <meta property="og:type" content="website" />
      </Helmet>
      <h2>{isHebrew ? 'לשאלות, פרטים ומידע נוסף בבקשה פנו ע"י -' : 'For questions, details, and more information, please contact us by -'}</h2>
      <p>{isHebrew ? 'טלפון:' : 'Phone:'}</p>
      <p>{isHebrew ? '053-8311215 - מיכל בוקריס' : '053-8311215 - Michal Bukris'}</p>
      <p>{isHebrew ? '052-6652571 - ריקי חייט' : '052-6652571 - Riki Khayat'}</p>
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
        <button type="submit" className={styles['contact-submit-button']}>{isHebrew ? 'שלח' : 'Submit'}</button>
      </form>
    </div>
  );
}

export default ContactUs;
