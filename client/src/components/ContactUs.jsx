import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../css/ContactUs.css'; // Import the CSS file

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
    <div className={`contact-container ${isHebrew ? 'rtl' : 'ltr'}`}>
      <h2>{isHebrew ? 'לשאלות, פרטים ומידע נוסף בבקשה פנו ע"י -' : 'For questions, details, and more information, please contact us by -'}</h2>
      <p>{isHebrew ? 'טלפון:' : 'Phone:'}</p>
      <p>{isHebrew ? '053-8311215 - מיכל בוקריס' : '053-8311215 - Michal Bukris'}</p>
      <p>{isHebrew ? '052-6652571 - ריקי חייט' : '052-6652571 - Riki Khayat'}</p>
      <p>{isHebrew ? 'או מלאו את הטופס ונדאג ליצור אתכם קשר בהקדם.' : 'Or fill out the form and we will get back to you as soon as possible.'}</p>
      
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>{isHebrew ? 'שם*' : 'Name*'}</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>{isHebrew ? 'אימייל*' : 'Email*'}</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>{isHebrew ? 'טלפון*' : 'Phone*'}</label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>{isHebrew ? 'הודעה*' : 'Message*'}</label>
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="submit-button">{isHebrew ? 'שלח' : 'Submit'}</button>
      </form>
    </div>
  );
}

export default ContactUs;
