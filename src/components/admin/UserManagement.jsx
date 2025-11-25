import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { userService } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import './UserManagement.css';

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
  });
  const [createError, setCreateError] = useState('');
  const [createSuccess, setCreateSuccess] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers();
      setUsers(response.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreateError('');
    setCreateSuccess('');

    try {
      const response = await authService.register(
        formData.email,
        formData.password,
        formData.role
      );
      setCreateSuccess(`User "${response.user.email}" created successfully`);
      setFormData({ email: '', password: '', role: 'user' });
      fetchUsers();
    } catch (err) {
      setCreateError(err.response?.data?.message || 'Failed to create user');
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    try {
      await userService.updateUser(editingUser.id, {
        role: editingUser.role,
        active: editingUser.active,
      });
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user');
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteConfirm) return;

    try {
      await userService.deleteUser(deleteConfirm.id);
      setDeleteConfirm(null);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleToggleActive = async (user) => {
    try {
      await userService.updateUser(user._id, { active: !user.active });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user');
    }
  };

  return (
    <div className="user-management">
      <div className="create-user-card">
        <h2>Create New User</h2>

        {createError && <div className="error-message">{createError}</div>}
        {createSuccess && <div className="success-message">{createSuccess}</div>}

        <form onSubmit={handleCreateUser} className="create-user-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="user@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
                placeholder="Min 6 characters"
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Create User
          </button>
        </form>
      </div>

      <div className="user-list-card">
        <div className="user-list-header">
          <h2>User List</h2>
          <div className="user-list-actions">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button onClick={fetchUsers} className="refresh-button">
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-message">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="empty-message">No users found</div>
        ) : (
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className={!user.active ? 'inactive-user' : ''}
                  >
                    <td>
                      <div>{user.email}</div>
                      {user._id === currentUser?._id && (
                        <div className="current-user-badge">(You)</div>
                      )}
                    </td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${user.active ? 'active' : 'inactive'}`}>
                        {user.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleToggleActive(user)}
                          disabled={user._id === currentUser?._id}
                          className="action-button toggle-button"
                        >
                          {user.active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() =>
                            setEditingUser({
                              id: user._id,
                              email: user.email,
                              role: user.role,
                              active: user.active,
                            })
                          }
                          className="action-button edit-button"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            setDeleteConfirm({
                              id: user._id,
                              email: user.email,
                            })
                          }
                          disabled={user._id === currentUser?._id}
                          className="action-button delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editingUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit User</h3>
            <div className="modal-form">
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={editingUser.email} disabled />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value })
                  }
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={editingUser.active ? 'active' : 'inactive'}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      active: e.target.value === 'active',
                    })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-actions">
                <button
                  onClick={() => setEditingUser(null)}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button onClick={handleUpdateUser} className="save-button">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="delete-title">Delete User</h3>
            <p>
              Are you sure you want to delete user <strong>{deleteConfirm.email}</strong>?
              This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button onClick={handleDeleteUser} className="delete-confirm-button">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

