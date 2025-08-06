import Style from "../../styles/Tracking/Tracking.module.css";

import { useState, useEffect } from "react";

function Tracking() {
  const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQrcxZN4BaGXZ14SiTGu9QKAvmquwgfOUdzFl5GZ3ayaOSPxYMdQMroXp6QgeWl7E4jPeYZXEi4mY-s/pub?output=csv";
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vinInput, setVinInput] = useState("");
  const [searchedVin, setSearchedVin] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(SHEET_URL);
        const csvData = await response.text();
        const parsedData = parseCSV(csvData);
        setOrderData(parsedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseCSV = (csv) => {
    const lines = csv.split("\n");
    const headers = lines[0].split(",");
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i]) continue;

      const obj = {};
      const currentline = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = currentline[j] ? currentline[j].trim() : "";
      }

      if (obj["Car Model"] || obj["VIN"] || obj["Invoice No."]) {
        result.push(obj);
      }
    }

    return result;
  };

  const handleTrack = () => {
    if (vinInput.trim()) {
      setSearchedVin(vinInput);
      setShowResults(true);
    }
  };

  const findOrder = () => {
    if (!orderData || !searchedVin) return null;
    return orderData.find(
      (order) =>
        order["VIN"] && order["VIN"].toLowerCase() === searchedVin.toLowerCase()
    );
  };

  const getTrackingSteps = (order) => {
    if (!order) return [];

    return [
      {
        id: "order_received",
        name: "Order Received",
        completed: true,
        date: "",
        active: true,
      },
      {
        id: "booked",
        name: "Booked",
        completed: order.Booked === "TRUE",
        date: order["Booked Date"] || "",
        active: order.Booked === "TRUE",
      },
      {
        id: "port",
        name: "At Port",
        completed: order.Port === "TRUE",
        date: order["Port Date"] || "",
        active: order.Port === "TRUE",
      },
      {
        id: "shipped",
        name: "Shipped",
        completed: order.Shipped === "TRUE",
        date: order["Shipped Date"] || "",
        active: order.Shipped === "TRUE",
      },
      {
        id: "delivered",
        name: "Delivered",
        completed: false,
        date: "",
        active: false,
      },
    ];
  };

  const currentOrder = findOrder();

  return (
    <div className={Style.trackingContainer}>
      <h1>Track Your Vehicle Shipment</h1>
      <div className={Style.searchSection}>
        <div className={Style.searchInputs}>
          <input
            type="text"
            value={vinInput}
            onChange={(e) => setVinInput(e.target.value)}
            placeholder="Enter VIN Number"
            className={Style.searchField}
          />

          <button
            onClick={handleTrack}
            className={Style.searchButton}
            disabled={loading}
          >
            {loading ? "Loading Data..." : "Track"}
          </button>
        </div>
      </div>

      {loading && (
        <div className={`${Style.statusMessage} ${Style.loading}`}>
          Loading data...
        </div>
      )}
      {error && (
        <div className={`${Style.statusMessage} ${Style.error}`}>
          Error: {error}
        </div>
      )}

      {showResults && currentOrder && (
        <div className={Style.orderDetails}>
          <h2>Order Details</h2>
          <div className={Style.detailsGrid}>
            <div className={Style.element}>
              <strong>Car Model</strong> {currentOrder["Car Model"]}
            </div>
            <div className={Style.element}>
              <strong>VIN</strong> {currentOrder["VIN"]}
            </div>
            <div className={Style.element}>
              <strong>Invoice No.</strong> {currentOrder["Invoice No."]}
            </div>
            <div className={Style.element}>
              <strong>Buyer</strong> {currentOrder["Buyer"]}
            </div>
          </div>

          <div className={Style.historyLog}>
            <h3>History Log</h3>
            <HistoryTimeline steps={getTrackingSteps(currentOrder)} />
          </div>
        </div>
      )}

      {showResults && !currentOrder && (
        <div className={`${Style.statusMessage} ${Style.noResults}`}>
          No order found with VIN: {searchedVin}
        </div>
      )}
    </div>
  );
}

const HistoryTimeline = ({ steps }) => {
  return (
    <div className={Style.timeline}>
      {steps
        .filter((step) => step.completed || step.id === "order_received")
        .map((step, index) => (
          <div key={step.id} className={Style.historyItem}>
            <div className={Style.historyIcon}>
              {step.completed ? "✓" : "•"}
            </div>
            <div className={Style.historyContent}>
              <strong>{step.name}</strong>
              {step.date && (
                <div className={Style.historyDate}>{step.date}</div>
              )}
              {!step.date && step.id === "order_received" && (
                <div className={Style.historyDate}>
                  We've received your order
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Tracking;
