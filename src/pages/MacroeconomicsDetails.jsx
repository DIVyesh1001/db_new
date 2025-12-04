import React, { useState } from 'react';
import './MarketDetail.css';
import MacroeconomicsChart from '../components/MacroeconomicsChart';

const TABS = [
  { key: 'executive', label: 'Executive Summary' },
  { key: 'method', label: 'Methodology' },
  { key: 'defs', label: 'Definitions' },
];

const HEADINGS = [
  {
    key: 'gdp',
    label: 'I. Real GDP Growth',
    executive: {
      introTitle: 'Growth Momentum Holds Through FY25',
      introText:
        'India remains one of the fastest-growing large economies, supported by formalisation, steady government capex, and resilient urban demand. FY25 growth moderates from post-Covid highs but stays comfortably above the global average.',
      charts: [
        {
          title: 'Real GDP Growth Normalises, But Remains Above Global Average',
          text:
            'Growth moderates to a sustainable trajectory with urban consumption, financial services and construction offsetting external softness.',
          chartProps: {
            title: 'Real GDP Growth – YoY',
            ariaLabel: 'Line chart showing real GDP growth',
            chartId: 'datawrapper-chart-gdp-growth',
            src: 'https://datawrapper.dwcdn.net/H8yuh/1/',
          },
        },
        {
          title: 'Domestic Demand Provides the Growth Floor',
          text:
            'Private consumption and government capex continue to drive more than 80% of incremental GDP through FY25, even as exports stay choppy.',
          chartProps: {
            title: 'Demand Mix – YoY Contribution',
            ariaLabel: 'Stacked chart showing GDP demand mix',
            chartId: 'datawrapper-chart-demand-mix',
            src: 'https://datawrapper.dwcdn.net/tkoLe/2/',
          },
        },
      ],
    },
    methodology:
      'Real GDP outlooks are triangulated using MOSPI national accounts, RBI high-frequency trackers, GST collections and proprietary consumption indices. Forecasts apply a top-down output gap model combined with bottom-up drivers across investment, consumption, government spending and net exports.',
    definitions: [
      'Real GDP: Gross Domestic Product adjusted for inflation, expressed at constant prices.',
      'Output Gap: Difference between actual and potential GDP, guiding monetary stance.',
    ],
  },
  {
    key: 'global',
    label: 'II. Global & National Economic Overview',
    executive: {
      introTitle: 'Global Disinflation, Divergent Growth',
      introText:
        'Global growth slows but avoids a hard landing, with the US and India staying resilient while Europe and China remain under pressure. Capital flows into India track policy continuity and macro stability.',
      charts: [
        {
          title: 'India Maintains Growth Premium vs Global Peers',
          text:
            'India’s growth spread vs OECD economies widens through FY25, supporting inward investment and portfolio allocations.',
          chartProps: {
            title: 'Growth Differential vs Global Peers',
            ariaLabel: 'Line chart showing growth differentials',
            chartId: 'datawrapper-chart-growth-diff',
            src: 'https://datawrapper.dwcdn.net/H8yuh/2/',
          },
        },
        {
          title: 'External Sector Stable Despite Volatile Exports',
          text:
            'Services exports, remittances and moderated oil prices keep the current account contained even as goods exports soften.',
          chartProps: {
            title: 'Current Account & FX Reserves',
            ariaLabel: 'Area chart showing external balances',
            chartId: 'datawrapper-chart-external',
            src: 'https://datawrapper.dwcdn.net/KMrhB/2/',
          },
        },
      ],
    },
    methodology:
      'Global comparisons leverage IMF WEO datasets, WTO trade flows, and Datum’s cross-country tracker. Domestic macro prints are aligned to RBI, MOSPI and DEA releases, while scenario analysis factors in oil, FX and rate sensitivities.',
    definitions: [
      'Current Account Deficit (CAD): Difference between total value of imports and exports of goods, services and transfers.',
      'FX Reserves: Foreign currency assets held by the central bank to manage external stability.',
    ],
  },
  {
    key: 'confidence',
    label: 'III. Consumer Confidence & Spending Power',
    executive: {
      introTitle: 'Confidence Divergence: Urban Strong, Rural Gradual',
      introText:
        'Urban confidence is supported by premiumisation, employment in services and formal credit access. Rural optimism lags due to uneven farm income and higher food inflation.',
      charts: [
        {
          title: 'Consumer Sentiment Index Holds Above Pre-COVID',
          text:
            'Metros continue to index higher than national average, sustaining discretionary categories such as electronics, beauty and travel.',
          chartProps: {
            title: 'Consumer Confidence Index',
            ariaLabel: 'Line chart showing consumer confidence',
            chartId: 'datawrapper-chart-confidence',
            src: 'https://datawrapper.dwcdn.net/H8yuh/3/',
          },
        },
        {
          title: 'UPI & Digital Payments Extend Formal Spend Trails',
          text:
            'Digital rails deepen formal spending behaviour and help capture more of the cash economy into traceable consumption.',
          chartProps: {
            title: 'Digital Payments – Monthly Volume',
            ariaLabel: 'Column chart showing UPI volumes',
            chartId: 'datawrapper-chart-upi',
            src: 'https://datawrapper.dwcdn.net/tkoLe/3/',
          },
        },
      ],
    },
    methodology:
      'Sentiment readings aggregate RBI’s CSI survey, CMIE household data and Datum’s proprietary retail panels. Spending power is assessed via digital payments, credit bureau data and category-level sales trackers.',
    definitions: [
      'Consumer Confidence Index: Measures households’ perceptions of current and future economic conditions.',
      'Digital Payments Volume: Total transaction count processed through real-time payment networks like UPI.',
    ],
  },
  {
    key: 'labor',
    label: 'IV. Labor Market & Income Trends',
    executive: {
      introTitle: 'Employment Recovery Led by Services & Construction',
      introText:
        'Payroll additions in formal services, GCCs and infrastructure projects drive income growth in urban and peri-urban clusters, while rural labour markets recover gradually.',
      charts: [
        {
          title: 'Net Payroll Additions Stay Positive',
          text:
            'EPFO and corporate filings show steady job creation, especially in IT services, BFSI, logistics and project-based construction.',
          chartProps: {
            title: 'Employment & Job Additions',
            ariaLabel: 'Column chart showing employment and job additions',
            chartId: 'datawrapper-chart-employment',
            src: 'https://datawrapper.dwcdn.net/H8yuh/1/',
          },
        },
        {
          title: 'Income Distribution Shifts Toward Formal Sector',
          text:
            'Share of incomes from formal wages and salary continues to rise as compliance, digital payroll and tax incentives expand coverage.',
          chartProps: {
            title: 'Income Mix – Formal vs Informal',
            ariaLabel: 'Stacked chart showing income mix',
            chartId: 'datawrapper-chart-income-mix',
            src: 'https://datawrapper.dwcdn.net/tkoLe/4/',
          },
        },
      ],
    },
    methodology:
      'Labour metrics blend EPFO, CMIE, PLFS and corporate disclosures. Datum’s white-collar tracker monitors GCC hiring, while project databases capture blue-collar demand linked to infrastructure and manufacturing.',
    definitions: [
      'Labour Force Participation Rate (LFPR): Share of working-age population that is working or actively looking for work.',
      'Payroll Additions: Net increase in formal employment captured through provident fund enrollments.',
    ],
  },
  {
    key: 'prices',
    label: 'V. Price Pressures and Cost Environment',
    executive: {
      introTitle: 'Inflation Eases, But Food & Fuel Remain Volatile',
      introText:
        'Headline CPI moderates versus FY22 peaks, yet food, fuel and imported input costs remain swing factors for margins and rural spending.',
      charts: [
        {
          title: 'Inflation Cools, But Food & Fuel Remain Watchpoints',
          text:
            'Core inflation decelerates, while food inflation spikes intermittently due to weather and supply shocks.',
          chartProps: {
            title: 'CPI Inflation Trend',
            ariaLabel: 'Line chart showing CPI inflation trend',
            chartId: 'datawrapper-chart-inflation',
            src: 'https://datawrapper.dwcdn.net/KMrhB/2/',
          },
        },
        {
          title: 'Input Costs & Commodity Basket',
          text:
            'Industrial commodities and freight costs stay range-bound, offering margin relief to manufacturers and retailers.',
          chartProps: {
            title: 'Commodity Cost Basket',
            ariaLabel: 'Area chart showing commodity costs',
            chartId: 'datawrapper-chart-commodities',
            src: 'https://datawrapper.dwcdn.net/H8yuh/4/',
          },
        },
      ],
    },
    methodology:
      'Inflation analysis references CPI, WPI, FAO food price indices and Datum’s cost basket for consumer sectors. Margin sensitivity is modelled using category-level gross margin structures and currency assumptions.',
    definitions: [
      'CPI (Consumer Price Index): Basket-based index tracking retail inflation.',
      'Core Inflation: CPI excluding volatile food and fuel components, indicating underlying price trends.',
    ],
  },
];

const CATEGORIES = ['GDP & Growth', 'Inflation', 'Employment'];

const MacroeconomicsDetails = () => {
  const [activeHeading, setActiveHeading] = useState(HEADINGS[0].key);
  const [tab, setTab] = useState('executive');

  const currentHeading =
    HEADINGS.find((heading) => heading.key === activeHeading) || HEADINGS[0];

  const handleHeadingChange = (key) => {
    setActiveHeading(key);
    setTab('executive');
  };

  return (
    <div className="market-detail">
      {/* Title */}
      <section className="title-block">
        <h1>India Macroeconomics Indicator Report 2019-2025</h1>
        <p>
          Key trends across GDP, inflation, employment & private consumption • Source: Datum
          Intelligence
        </p>
      </section>

      {/* KPIs */}
      <section className="section">
        <div className="kpi-grid">
          {[
            ['₹XXX tn', 'India GDP (FY25E, real terms)'],
            ['X.X%', 'Real GDP CAGR (FY20–25E)'],
            ['X.X%', 'CPI Inflation (FY25E)'],
            ['XX mn', 'Net Job Additions (FY20–25E)'],
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
        <h1>Domestic Demand Remains the Core Growth Engine Through FY25</h1>
        <p className="description">
          India’s macro story over FY20–25 is anchored in resilient domestic demand, led by
          formalisation, urban consumption, and steady government capex. Despite global growth
          volatility, India is expected to remain among the fastest-growing large economies, with
          consumption, infrastructure build-out, and services exports acting as key pillars. In
          parallel, inflation has normalised from post-Covid peaks but remains a critical watchpoint
          for rural recovery and discretionary categories.
        </p>
      </section>

      {/* Drivers & Challenges */}
      <section className="section two-col">
        <div className="list-box">
          <h3>Macro Tailwinds</h3>
          <ul>
            <li>Government-led capex and infrastructure pipeline</li>
            <li>Formalisation of consumption & tax base (GST, UPI, digital rails)</li>
            <li>Favourable demographics and rising urban affluence</li>
            <li>Services exports and GCC build-out supporting white-collar jobs</li>
          </ul>
        </div>

        <div className="list-box">
          <h3>Macro Headwinds</h3>
          <ul>
            <li>Global rate cycle, risk-off flows & currency volatility</li>
            <li>Food inflation spikes impacting rural real incomes</li>
            <li>Uneven capex recovery in private sector</li>
            <li>High youth unemployment in select cohorts</li>
          </ul>
        </div>
      </section>

      {/* Insights */}
      <section className="section">
        <div className="insights-box">
          <p>
            <strong>Analyst View</strong>
          </p>
          <p>Urban, premium and formal channels continue to grow ahead of headline GDP.</p>
          <p>Inflation volatility is the key swing factor for rural FMCG and discretionary demand.</p>
          <p>
            States with faster urbanisation and manufacturing clusters are likely to see outsized
            income growth.
          </p>
        </div>
      </section>

      {/* Headings + Tabs */}
      <section className="section">
        <div className="tab-header-container">
          <ul className="tab-list heading-tabs">
            {HEADINGS.map((heading) => (
              <li key={heading.key}>
                <button
                  onClick={() => handleHeadingChange(heading.key)}
                  className={`tab-btn ${activeHeading === heading.key ? 'active' : ''}`}
                >
                  {heading.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="tab-header-container">
          <ul className="tab-list">
            {TABS.map((t) => (
              <li key={t.key}>
                <button
                  onClick={() => setTab(t.key)}
                  className={`tab-btn ${tab === t.key ? 'active' : ''}`}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="tab-content-container">
          {tab === 'executive' && currentHeading?.executive && (
            <div>
              <h1>{currentHeading.executive.introTitle}</h1>
              <p className="description">{currentHeading.executive.introText}</p>

              {currentHeading.executive.charts?.map((chart, index) => (
                <div className="chart-box" key={`${currentHeading.key}-chart-${index}`}>
                  <div className="chart-text">
                    <h1>{chart.title}</h1>
                    <span>{chart.text}</span>
                  </div>
                  {chart.chartProps?.type === 'image' ? (
                    <img
                      src={chart.chartProps.src}
                      alt={chart.chartProps.alt || chart.title}
                      className="chart-img"
                    />
                  ) : (
                    <MacroeconomicsChart {...chart.chartProps} />
                  )}
                </div>
              ))}
            </div>
          )}

          {tab === 'method' && (
            <div className="method-box">
              <p>{currentHeading.methodology}</p>
            </div>
          )}

          {tab === 'defs' && (
            <div className="text-xl space-y-6">
              {currentHeading.definitions.map((definition, index) => (
                <p key={`${currentHeading.key}-definition-${index}`}>{definition}</p>
              ))}
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
        <h3>Related Macroeconomic & Strategy Reports</h3>
        <div className="reports-grid">
          <div className="card report-card">India Macro Playbook FY25 →</div>
          <div className="card report-card">Urban Consumption Outlook →</div>
          <div className="card report-card">Rural Recovery Tracker →</div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <h2>Unlock Full Macroeconomic Data, Dashboards & Scenario Tools</h2>
        <button>Subscribe to Datum Premium</button>
      </section>
    </div>
  );
};

export default MacroeconomicsDetails;


