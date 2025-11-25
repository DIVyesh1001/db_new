import React, { useState, useEffect } from 'react';
import { subscriptionService } from '../../services/subscriptionService';
import './SubscriptionManagement.css';

const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await subscriptionService.getAllSubscriptions();
      setSubscriptions(response.subscriptions || []);
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
      alert('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.company && sub.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateSubscription = async () => {
    if (!editingSubscription) return;

    try {
      await subscriptionService.updateSubscription(editingSubscription.id, {
        status: editingSubscription.status,
        notes: editingSubscription.notes,
      });
      setEditingSubscription(null);
      fetchSubscriptions();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update subscription');
    }
  };

  const handleDeleteSubscription = async () => {
    if (!deleteConfirm) return;

    try {
      await subscriptionService.deleteSubscription(deleteConfirm.id);
      setDeleteConfirm(null);
      fetchSubscriptions();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete subscription');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'contacted':
        return 'status-contacted';
      case 'converted':
        return 'status-converted';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  return (
    <div className="subscription-management">
      <div className="subscription-header">
        <h2>Subscription Requests</h2>
        <div className="subscription-filters">
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
            <option value="rejected">Rejected</option>
          </select>
          <button onClick={fetchSubscriptions} className="refresh-button">
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-message">Loading subscriptions...</div>
      ) : filteredSubscriptions.length === 0 ? (
        <div className="empty-message">No subscription requests found</div>
      ) : (
        <div className="subscriptions-table-wrapper">
          <table className="subscriptions-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Message</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((sub) => (
                <tr key={sub.id}>
                  <td>{sub.name}</td>
                  <td>
                    <a href={`mailto:${sub.email}`}>{sub.email}</a>
                  </td>
                  <td>{sub.phone || '-'}</td>
                  <td>{sub.company || '-'}</td>
                  <td className="message-cell">
                    {sub.message ? (
                      <span title={sub.message}>
                        {sub.message.length > 50
                          ? `${sub.message.substring(0, 50)}...`
                          : sub.message}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(sub.status)}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() =>
                          setEditingSubscription({
                            id: sub.id,
                            name: sub.name,
                            email: sub.email,
                            status: sub.status,
                            notes: sub.notes || '',
                          })
                        }
                        className="action-button edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          setDeleteConfirm({
                            id: sub.id,
                            name: sub.name,
                            email: sub.email,
                          })
                        }
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

      {editingSubscription && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Subscription Request</h3>
            <div className="modal-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={editingSubscription.name} disabled />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={editingSubscription.email} disabled />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={editingSubscription.status}
                  onChange={(e) =>
                    setEditingSubscription({
                      ...editingSubscription,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={editingSubscription.notes}
                  onChange={(e) =>
                    setEditingSubscription({
                      ...editingSubscription,
                      notes: e.target.value,
                    })
                  }
                  rows="4"
                  placeholder="Add notes about this subscription request..."
                />
              </div>
              <div className="modal-actions">
                <button
                  onClick={() => setEditingSubscription(null)}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button onClick={handleUpdateSubscription} className="save-button">
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
            <h3 className="delete-title">Delete Subscription Request</h3>
            <p>
              Are you sure you want to delete the subscription request from{' '}
              <strong>{deleteConfirm.name}</strong> ({deleteConfirm.email})? This action
              cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button onClick={handleDeleteSubscription} className="delete-confirm-button">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagement;

