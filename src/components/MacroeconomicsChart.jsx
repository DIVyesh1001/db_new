import { useEffect } from "react";

// Generic Datawrapper iframe wrapper for macro charts.
// Pass different `title`, `ariaLabel`, `chartId` and `src` for each chart box.
export default function MacroeconomicsChart({
  title = "Macroeconomic Indicator",
  ariaLabel = "Chart",
  chartId = "datawrapper-chart-macro",
  src = "https://datawrapper.dwcdn.net/tkoLe/2/",
}) {
  useEffect(() => {
    function handleMessage(event) {
      if (event.data["datawrapper-height"] !== undefined) {
        const iframes = document.querySelectorAll("iframe");
        for (const key in event.data["datawrapper-height"]) {
          for (const iframe of iframes) {
            if (iframe.contentWindow === event.source) {
              iframe.style.height = event.data["datawrapper-height"][key] + "px";
            }
          }
        }
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div style={{ width: "50%" }}>
      <iframe
        title={title}
        aria-label={ariaLabel}
        id={chartId}
        src={src}
        scrolling="no"
        frameBorder="0"
        style={{ width: "100%", border: "none" }}
        height="480"
        data-external="1"
      ></iframe>
    </div>
  );
}


