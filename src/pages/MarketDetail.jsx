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
      <div className="max-w-6xl mx-auto mt-8 mb-8 ml-8 mr-8">
        <ul className="flex gap-12">
          {TABS.map(t => (
            <li key={t.key}>
              <button
                onClick={() => setTab(t.key)}
                className={`text-lg ${tab === t.key ? "font-extrabold" : "font-medium"}`}
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <main className="max-w-6xl mx-auto mb-12 ml-8 mr-8">

        {tab === "executive" && (
          <div>
            <div className="chart-box">
              <img src={CHART1} alt="Chart 1" className="chart-img" />
              <div className="chart-label">Chart 1</div>
            </div>

            <ul className="list-disc pl-8 text-2xl mb-8">
              <li>Text</li>
            </ul>

            <div className="chart-box">
              <img src={CHART2} alt="Chart 2" className="chart-img" />
              <div className="chart-label">Chart 2</div>
            </div>

            <ul className="list-disc pl-8 text-2xl mt-8">
              <li>Text</li>
            </ul>
          </div>
        )}

        {tab === "method" && (
          <div className="method-box">
            <p>
              Datum Forecast uses statistical models, time series analysis and structured
              forecasting frameworks. Estimates incorporate market drivers, economic
              indicators, competitive dynamics and behavioural shifts.
            </p>
          </div>
        )}

        {tab === "defs" && (
          <div className="text-xl space-y-6">
            <p>
              Online population: total individuals with internet access who use it regularly
              (minimum once per month).
            </p>
            <img src={CHART1} className="chart-img" />
            <img src={CHART2} className="chart-img" />
            <img src={CHART3} className="chart-img" />
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

      </main>

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
