import React, { useEffect, useState } from 'react';
import { datasetService } from '../services/datasetService';
import './ExcelViewer.css';

const ExcelViewer = ({ datasetId, sheetName }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!datasetId) {
      setData([]);
      return;
    }

    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await datasetService.getDatasetData(datasetId, sheetName);
        if (!cancelled) {
          setData(response.dataset.data || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || 'Failed to load data');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [datasetId, sheetName]);

  if (loading) {
    return <div className="excel-viewer-loading">Loading data...</div>;
  }

  if (error) {
    return <div className="excel-viewer-error">Error: {error}</div>;
  }

  if (!loading && !error && data.length === 0) {
    return (
      <div className="excel-viewer-empty">
        No data to display. Click on a sheet name above to load data.
      </div>
    );
  }

  if (!loading && !error && data.length > 0) {
    const headers = Object.keys(data[0]);

    return (
      <div className="excel-viewer">
        <div className="excel-viewer-table-wrapper">
          <table className="excel-viewer-table">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {headers.map((header, j) => (
                    <td key={j}>{String(row[header] || '')}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
};

export default ExcelViewer;

