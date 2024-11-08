// SignUpPage.js
import React from 'react';
import Header from './Header';

function SignUpPage() {
  return (
    <div>
      <Header />
      <div className="container signup-page">
        <div className="back-button" onClick={() => window.history.back()}>
          &lt; Back to login
        </div>
        <h2>Sign Up</h2>
        <form>
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Middle Name" />
          <input type="text" placeholder="Last Name" required />
          <input type="text" placeholder="Address" required />
          <input type="tel" placeholder="Phone #" required />
          <input type="email" placeholder="Email" required />
          <select>
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
