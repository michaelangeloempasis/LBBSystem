import React from 'react';
import Header from './Header';

function LoginPage() {
  return (
    <div>
      <Header />
      <div className="container login-page">
        <h2>Log In</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign In</button>
        </form>
        <a href="/signup">Sign up</a> | <a href="/forgot-password">Forgot password?</a>
      </div>
    </div>
  );
}

export default LoginPage;
