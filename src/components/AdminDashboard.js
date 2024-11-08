import React from 'react';
import Header from './Header';

function AdminDashboard() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="profile">
          <img src="/path/to/profile-picture.jpg" alt="Profile" />
          <h3>Stacey Chua</h3>
          <p>Admin Dashboard</p>
        </div>
        
        <div className="admin-info">
          <p><strong>First Name:</strong> Stacey</p>
          <p><strong>Middle Name:</strong> [Middle Name]</p>
          <p><strong>Last Name:</strong> Chua</p>
          <p><strong>Phone:</strong> [Admin Phone Number]</p>
          <p><strong>Email:</strong> [Admin Email]</p>
          <p><strong>Address:</strong> [Admin Address]</p>
        </div>
        
        <nav className="dashboard">
          <button>View Borrowed Books</button>
          <button>View Student's Record</button>
          <button>Notification</button>
          <button>Activity Log</button>
          <button>Settings</button>
        </nav>
      </div>
    </div>
  );
}

export default AdminDashboard;
