import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MarketDetail.css';
import DatasetDetail from './DatasetDetail';

const CHART1 = "https://www.datumintell.in/content/images/2024/04/Screenshot-2024-04-18-at-10.30.36-AM.png";
const CHART2 = "https://www.datumintell.in/content/images/2024/04/Screenshot-2024-04-18-at-10.53.47-AM.png";
const CHART3 = "https://www.datumintell.in/content/images/2024/04/Screenshot-2024-04-18-at-11.12.40-AM.png";
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
        <h1>Global Online {marketTitle} Forecast 2023-28</h1>
        <p>Key Findings of Datum’s Global Online Population Forecast 2023 -28  • Source: Datum Intelligence</p>
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
        <h1>Global Online Population to Reach 6.6 Billion by 2028</h1>
        <p className="description">
          The global online {marketTitle.toLowerCase()} is expected to reach 6.6 billion by 2028, representing a significant increase from the current 5.7 billion internet users worldwide. This growth will be fueled by several factors, including improved internet infrastructure, affordable data plans, and widespread adoption of smartphones in developing countries.
          As the digital landscape expands, the internet will continue to play a crucial role in shaping various aspects of daily life, including communication, entertainment, education, and commerce. This projection underscores the importance of digital inclusion and highlights the immense potential for businesses and organizations to tap into the rapidly growing online market.
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
                <div className="chart-text">
                  {/* <ul className="bullet-large">
                  </ul> */}
                  <h1>Global Online Population to Reach 6.6 Billion by 2028</h1>
                  <span>The global online population is expected to reach 6.6 billion by 2028, representing a significant increase from the current 5.7 billion internet users worldwide. This growth will be fueled by several factors, including improved internet infrastructure, affordable data plans, and widespread adoption of smartphones in developing countries.
                        As the digital landscape expands, the internet will continue to play a crucial role in shaping various aspects of daily life, including communication, entertainment, education, and commerce. This projection underscores the importance of digital inclusion and highlights the immense potential for businesses and organizations to tap into the rapidly growing online market.</span>
                </div>
                <img src={CHART1} alt="Chart 1" className="chart-img" />
              </div>

              <div className="chart-box">
                <div className="chart-text">
                  {/* <ul className="bullet-large">
                  </ul> */}
                  <h1>Asia Pacific Accounts for More Than 50% Online Users</h1>
                  <span>Asia Pacific, a region with rapid digital adoption and a thriving technology sector, is home to more than half of the world's internet users. With over 2.9 billion people online, the region accounts for more than 50% of the global online population, solidifying its position as a major player in the digital landscape.
                    This massive online population has driven Asia Pacific to become one of the fastest-growing digital markets. The region is a leader in cashless transactions, thanks to the widespread adoption of digital payment methods such as e-commerce, mobile payments, and social commerce.</span>
                </div>
                <img src={CHART2} alt="Chart 2" className="chart-img" />
              </div>
              <div className="chart-box">
                <div className="chart-text">
                  {/* <ul className="bullet-large">
                  </ul> */}
                  <h1>Asia and MEA Leads Will Account for 85% of New Online Users</h1>
                  <span>Over the coming years, a staggering 937 million new internet users are projected to join the online world, with Asia and the Middle East and Africa (MEA) accounting for an impressive 85% of this growth. This significant expansion in internet adoption will bring millions of people online for the first time, driving digital innovation and economic development in these regions.</span>
                </div>
                <img src={CHART3} alt="Chart 3" className="chart-img" />
              </div>
            </div>
          )}

          {tab === "method" && (
            <div className="method-box">
              <p>
                Datum Forecast is a comprehensive, data-driven solution that offers invaluable insights into the factors shaping various industries. By providing a quantitative framework for assessing market drivers and inhibitors, it empowers clients to make well-informed investment decisions and develop strategic plans that capitalize on growth opportunities while mitigating potential risks. <br />
                To forecast upcoming market trends and opportunities, our market sizing and forecasting team makes use of statistical models, time series analysis, and other forecasting approaches. <br />
                To create precise estimates, we take into account elements like historical data, market drivers, economic indicators, consumer behaviour, and the competitive environment. <br />
                Our forecasting and trend analysis enable businesses to anticipate market shifts, adapt their strategies, and stay ahead of the competition. <br />
                Our dedicated team produces over 30 forecasts annually, enabling a comprehensive understanding of global market trends. <br />
                Source: Datum Global Online Population Forecast 2023-28
              </p>
            </div>
          )}

          {tab === "defs" && (
            <div className="text-xl space-y-6">
              <p>
                Online population. Total number of individuals or users who have access to the internet and regularly use it for various purposes, such as communication, information gathering, entertainment, shopping, and more (at least once in a month)
              </p>
              {/* <img src={CHART1} className="chart-img" />
            <img src={CHART2} className="chart-img" />
            <img src={CHART3} className="chart-img" /> */}
            </div>
          )}

          {tab === "data" && (
            <div className="text-xl">
              {/* <table className="w-full border border-black border-collapse mb-6">
                <tbody></tbody>
              </table> */}
              <DatasetDetail/>
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
