import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { datasetService } from '../services/datasetService';
import ExcelViewer from '../components/ExcelViewer';
import './DatasetDetail.css';

// Chart images - replace with actual chart URLs if available
const CHART1 = 'https://i.ibb.co/k6cVJPm1/Blinkit-aata-updated.png';
const CHART2 = 'https://i.ibb.co/xSFFxbm4/Blinkit-Ashirvaad-article-graph.png';
const CHART3 = 'https://i.ibb.co/Cp50HJCt/blinkit-atta-cat.png';

const DatasetDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tab, setTab] = useState('executive');
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDataset = async () => {
      try {
        setLoading(true);
        const response = await datasetService.getDatasetById(id);
        setDataset(response.dataset);
        setError('');
        // Set default sheet if available
        if (response.dataset.sheets && response.dataset.sheets.length > 0) {
          setSelectedSheet(response.dataset.sheets[0]);
        } else {
          setSelectedSheet(null);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dataset');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDataset();
    }
  }, [id]);

  const handleSheetClick = (sheetName) => {
    setSelectedSheet(sheetName);
  };

  const tabs = [
    { key: 'executive', label: 'Executive Summary' },
    { key: 'method', label: 'Methodology' },
    { key: 'defs', label: 'Definitions' },
    { key: 'data', label: 'Data' },
  ];

  if (loading) {
    return (
      <div className="dataset-detail-loading">
        <div className="loading-text">Loading dataset...</div>
      </div>
    );
  }

  if (error || !dataset) {
    return (
      <div className="dataset-detail-error">
        <div className="error-container">
          <div className="error-message">{error || 'Dataset not found'}</div>
          <button onClick={() => navigate(-1)} className="back-button">
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dataset-detail">
      <header className="dataset-header">
        <div className="dataset-header-content">
          <div>
            <h1>{dataset.name}</h1>
            <p className="dataset-description">
              {dataset.description || 'No description available'}
            </p>
          </div>
        </div>

        <nav className="dataset-tabs">
          <ul>
            {tabs.map((t) => (
              <li key={t.key}>
                <button
                  onClick={() => setTab(t.key)}
                  className={tab === t.key ? 'active' : ''}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="dataset-main">
        <section className="dataset-content">
          {tab === 'executive' && (
            <div className="executive-content">
              <div className="chart-container">
                <img src={CHART1} alt="Chart 1" className="chart-image" />
                <div className="chart-label">Chart 1</div>
              </div>
              <ul className="executive-list">
                <li>Key insights and summary data</li>
              </ul>

              <div className="chart-container">
                <img src={CHART2} alt="Chart 2" className="chart-image" />
                <div className="chart-label">Chart 2</div>
              </div>

              <ul className="executive-list">
                <li>Additional analysis and findings</li>
              </ul>
            </div>
          )}

          {tab === 'method' && (
            <div className="methodology-content">
              <p>
                Datum Forecast is a comprehensive, data-driven solution that offers invaluable
                insights into the factors shaping various industries. By providing a quantitative
                framework for assessing market drivers and inhibitors, it empowers clients to make
                well-informed investment decisions and develop strategic plans that capitalize on
                growth opportunities while mitigating potential risks.
                <br />
                <br />
                To forecast upcoming market trends and opportunities, our market sizing and
                forecasting team makes use of statistical models, time series analysis, and other
                forecasting approaches.
                <br />
                <br />
                To create precise estimates, we take into account elements like historical data,
                market drivers, economic indicators, consumer behaviour, and the competitive
                environment.
                <br />
                <br />
                Our forecasting and trend analysis enable businesses to anticipate market shifts,
                adapt their strategies, and stay ahead of the competition.
                <br />
                <br />
                Our dedicated team produces over 50 forecasts annually, enabling a comprehensive
                understanding of global market trends.
              </p>
            </div>
          )}

          {tab === 'defs' && (
            <div className="definitions-content">
              <p>
                Online population. Total number of individuals or users who have access to the
                internet and regularly use it for various purposes, such as communication,
                information gathering, entertainment, shopping, and more (at least once in a month)
              </p>
              <div className="definitions-charts">
                <img src={CHART1} alt="Chart 1" className="chart-image" />
                <img src={CHART2} alt="Chart 2" className="chart-image" />
                <img src={CHART3} alt="Chart 3" className="chart-image" />
              </div>
            </div>
          )}

          {tab === 'data' && (
            <div className="data-content">
              <div className="sheets-table">
                <table>
                  <tbody>
                    {dataset.sheets && dataset.sheets.length > 0 ? (
                      dataset.sheets.map((sheetName, i) => (
                        <tr key={i}>
                          <td>
                            <button
                              className={`sheet-button ${
                                selectedSheet === sheetName ? 'active' : ''
                              }`}
                              onClick={() => handleSheetClick(sheetName)}
                            >
                              {sheetName}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>
                          <button
                            className={`sheet-button ${selectedSheet === null ? 'active' : ''}`}
                            onClick={() => handleSheetClick(null)}
                          >
                            View Data
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="excel-viewer-container">
                <ExcelViewer datasetId={id} sheetName={selectedSheet} />
              </div>
            </div>
          )}
        </section>

        <div className="dataset-actions">
          <button onClick={() => navigate('/dashboard')} className="back-button">
            Back to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
};

export default DatasetDetail;

