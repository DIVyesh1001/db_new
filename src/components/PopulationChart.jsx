import { useEffect } from "react";

export default function PopulationChart() {
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
        title="Global Online Population Forecast 2023-28"
        aria-label="Grouped column chart"
        id="datawrapper-chart-H8yuh"
        src="https://datawrapper.dwcdn.net/H8yuh/1/"
        scrolling="no"
        style={{ width: "100%", border: "none" }}
        height="480"
        data-external="1"
      ></iframe>
    </div>
  );
}
