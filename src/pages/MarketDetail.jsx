import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MarketDetail.css';

const CHART1 = "https://i.ibb.co/k6cVJPm1/Blinkit-aata-updated.png";
const CHART2 = "https://i.ibb.co/xSFFxbm4/Blinkit-Ashirvaad-article-graph.png";
const CHART3 = "https://i.ibb.co/Cp50HJCt/blinkit-atta-cat.png";
const TABS = [
  { key: "executive", label: "Executive Summary" },
  { key: "method", label: "Methodology" },
  { key: "defs", label: "Definitions" },
  { key: "data", label: "Data" },
];

const CATEGORIES = ['Skincare', 'Haircare', 'Makeup'];

const MarketDetail = () => {
  const { marketName } = useParams();
  const navigate = useNavigate();

  const [tab, setTab] = useState("executive");

  const marketTitle = marketName
    ? marketName
      .split("-")
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(" ")
    : "Market";

  return (
    <div className="market-detail">

      {/* Title */}
      <section className="title-block">
        <h1>{marketTitle} & Personal Care in India</h1>
        <p>Updated: October 2025 • Source: Datum Intelligence</p>
      </section>

      {/* KPIs */}
      <section className="section">
        <div className="kpi-grid">
          {[
            ["₹XX bn", "Total Market Size"],
            ["+XX%", "YoY Growth"],
            ["XX%", "Online Penetration"],
            ["XX%", "5Y CAGR"],
          ].map(([value, label], i) => (
            <div className="card" key={i}>
              <h3>{value}</h3>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <p className="description">
          India’s {marketTitle.toLowerCase()} and personal care market continues to expand
          steadily, driven by premiumisation, broader online adoption, and rising consumption
          across metros and Tier 2–3 cities.
        </p>
      </section>

      {/* Drivers & Challenges */}
      <section className="section two-col">
        <div className="list-box">
          <h3>Market Drivers</h3>
          <ul>
            <li>Premiumisation trends</li>
            <li>Gen-Z adoption & social commerce</li>
            <li>Q-commerce trial & replenishment</li>
            <li>Accelerated online discovery</li>
          </ul>
        </div>

        <div className="list-box">
          <h3>Market Challenges</h3>
          <ul>
            <li>High acquisition costs</li>
            <li>Discounting pressure</li>
            <li>Category fragmentation</li>
            <li>Volatile offline productivity</li>
          </ul>
        </div>
      </section>

      {/* Insights */}
      <section className="section">
        <div className="insights-box">
          <p><strong>Analyst Insights</strong></p>
          <p>Premiumisation accelerates fastest in metros.</p>
          <p>Q-commerce drives trial in Tier-2/3 cities.</p>
          <p>D2C brands benefit from deeper assortments and stronger fundamentals.</p>
        </div>
      </section>

      {/* Tabs */}
      <section className="section">
  <div className="tab-header-container">

          <ul className="tab-list">

            {TABS.map(t => (
              <li key={t.key}>
                <button
                  onClick={() => setTab(t.key)}
                  className={`tab-btn ${tab === t.key ? "active" : ""}`}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Content */}
        <div className="tab-content-container">


          {tab === "executive" && (
            <div>
              <div className="chart-box">
                <img src={CHART1} alt="Chart 1" className="chart-img" />
                <div className="chart-label">Chart 1</div>
              </div>

              <ul className="bullet-large">

                <li>Text</li>
              </ul>

              <div className="chart-box">
                <img src={CHART2} alt="Chart 2" className="chart-img" />
                <div className="chart-label">Chart 2</div>
              </div>

              <ul className="bullet-large mt-8">

                <li>Text</li>
              </ul>
            </div>
          )}

          {tab === "method" && (
            <div className="method-box">
              <p>
                Datum Forecast is a comprehensive, data-driven solution that offers invaluable insights into the factors shaping various industries. By providing a quantitative framework for assessing market drivers and inhibitors, it empowers clients to make well-informed investment decisions and develop strategic plans that capitalize on growth opportunities while mitigating potential risks. <br />
                To forecast upcoming market trends and opportunities, our market sizing and forecasting team makes use of statistical models, time series analysis, and other forecasting approaches. <br />
                To create precise estimates, we take into account elements like historical data, market drivers, economic indicators, consumer behaviour, and the competitive environment. <br />
                Our forecasting and trend analysis enable businesses to anticipate market shifts, adapt their strategies, and stay ahead of the competition. <br />
                Our dedicated team produces over 50 forecasts annually, enabling a comprehensive understanding of global market trends.
              </p>
            </div>
          )}

          {tab === "defs" && (
            <div className="text-xl space-y-6">
              <p>
                Online population: total individuals with internet access who use it regularly
                (minimum once per month).
              </p>
              {/* <img src={CHART1} className="chart-img" />
            <img src={CHART2} className="chart-img" />
            <img src={CHART3} className="chart-img" /> */}
            </div>
          )}

          {tab === "data" && (
            <div className="text-xl">
              <table className="w-full border border-black border-collapse mb-6">
                <tbody></tbody>
              </table>
              <div className="mt-4"></div>
            </div>
          )}

        </div>
      </section>
      {/* Categories */}
      <section className="section categories">
        {CATEGORIES.map((cat, i) => (
          <div key={i} className="category-tile">
            {cat} →
          </div>
        ))}
      </section>

      {/* Related Reports */}
      <section className="section">
        <h3>Related Reports</h3>
        <div className="reports-grid">
          <div className="card report-card">Beauty Market Report →</div>
          <div className="card report-card">Q-Commerce Beauty Tracker →</div>
          <div className="card report-card">Consumer Insights 2025 →</div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <h2>Unlock Full Market Data, Dashboards & Reports</h2>
        <button>Subscribe to Datum Premium</button>
      </section>

    </div>
  );
};

export default MarketDetail;
