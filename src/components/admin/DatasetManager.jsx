import React, { useState, useEffect } from 'react';
import { fileService } from '../../services/fileService';
import './DatasetManager.css';

const DatasetManager = () => {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDatasets = async () => {
    try {
      setLoading(true);
      const response = await fileService.listFiles();
      setDatasets(response.datasets || []);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load datasets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this dataset?')) {
      return;
    }

    try {
      await fileService.deleteFile(id);
      setDatasets(datasets.filter((d) => d.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete dataset');
    }
  };

  if (loading) {
    return <div className="loading-message">Loading datasets...</div>;
  }

  return (
    <div className="dataset-manager-card">
      <div className="dataset-manager-header">
        <h2>Manage Datasets</h2>
        <button onClick={fetchDatasets} className="refresh-button">
          Refresh
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {datasets.length === 0 ? (
        <p className="empty-message">No datasets uploaded yet.</p>
      ) : (
        <div className="datasets-table-wrapper">
          <table className="datasets-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>File Name</th>
                <th>Type</th>
                <th>Sheets</th>
                <th>Uploaded By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {datasets.map((dataset) => (
                <tr key={dataset.id}>
                  <td>{dataset.name}</td>
                  <td>{dataset.fileName}</td>
                  <td className="file-type-cell">{dataset.fileType.toUpperCase()}</td>
                  <td>{dataset.sheets.length > 0 ? dataset.sheets.join(', ') : '-'}</td>
                  <td>{dataset.uploadedBy}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(dataset.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DatasetManager;

