import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [contacts, setContacts] = useState([]);
  
  // POINT THIS TO YOUR LOCAL API FOR TESTING
  // When we upload to the server later, we will change this path.
  const API_URL = "http://localhost/my-web-app/api/contacts.php";

  // Fetch data for the Dashboard on load
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(API_URL);
      // Ensure response data is an array before setting it
      if (Array.isArray(response.data)) {
        setContacts(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, message };

    try {
      const response = await axios.post(API_URL, formData);
      alert(response.data.message || "Saved!");
      // Clear form
      setName('');
      setEmail('');
      setMessage('');
      // Refresh Dashboard
      fetchContacts();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My CI/CD React App</h1>
      </header>

      <div className="container">
        {/* --- LEFT SIDE: LANDING PAGE FORM --- */}
        <div className="card">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Message:</label>
              <textarea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                required 
              />
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* --- RIGHT SIDE: DASHBOARD --- */}
        <div className="card">
          <h2>Admin Dashboard</h2>
          <p>Live data from MySQL Database</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length > 0 ? (
                  contacts.map((contact) => (
                    <tr key={contact.id}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.message}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No records found yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;