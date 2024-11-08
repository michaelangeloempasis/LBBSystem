import React from 'react';
import Header from './Header';

function StudentDashboard() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="profile">
          <img src="/path/to/profile-picture.jpg" alt="Profile" />
          <h3>Rochelle Aseniero</h3>
          <p>Student Dashboard</p>
        </div>
        
        <div className="student-info">
          <p><strong>First Name:</strong> Rochelle</p>
          <p><strong>Middle Name:</strong> Azaron</p>
          <p><strong>Last Name:</strong> Aseniero</p>
          <p><strong>Phone:</strong> 09282249389</p>
          <p><strong>Email:</strong> rochelleaseniero1@gmail.com</p>
          <p><strong>Address:</strong> Zone 3, Cagayan, CDOC</p>
        </div>
        
        <nav className="dashboard">
          <button>View Borrowed Books</button>
          <button>Saved Books</button>
          <button>Notification</button>
          <button>Activity Log</button>
          <button>Settings</button>
        </nav>
      </div>
    </div>
  );
}

export default StudentDashboard;
