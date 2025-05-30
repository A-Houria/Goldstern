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
    <div className="tracking-container">
      <h1>Track Your Vehicle Shipment</h1>
      <div className="search-section">
        <div className="search-inputs">
          <input
            type="text"
            value={vinInput}
            onChange={(e) => setVinInput(e.target.value)}
            placeholder="Enter VIN Number"
            className="search-field"
            onKeyPress={(e) => e.key === "Enter" && handleTrack()}
          />

          <button
            onClick={handleTrack}
            className="search-button"
            disabled={loading}>
            {loading ? "Loading Data..." : "Track"}
          </button>
        </div>
      </div>

      {loading && <div className="status-message loading">Loading data...</div>}
      {error && <div className="status-message error">Error: {error}</div>}

      {showResults && currentOrder && (
        <div className="order-details">
          <h2>Order Details</h2>
          <div className="details-grid">
            <div className="element">
              <strong>Car Model</strong> {currentOrder["Car Model"]}
            </div>
            <div className="element">
              <strong>VIN</strong> {currentOrder["VIN"]}
            </div>
            <div className="element">
              <strong>Invoice No.</strong> {currentOrder["Invoice No."]}
            </div>
            <div className="element">
              <strong>Buyer</strong> {currentOrder["Buyer"]}
            </div>
          </div>

          <div className="history-log">
            <h3>History Log</h3>
            <HistoryTimeline steps={getTrackingSteps(currentOrder)} />
          </div>
        </div>
      )}

      {showResults && !currentOrder && (
        <div className="status-message no-results">
          No order found with VIN: {searchedVin}
        </div>
      )}
    </div>
  );
}

const TrackingProgress = ({ steps }) => {
  const completedSteps = steps.filter((step) => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="tracking-progress">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`step ${step.completed ? "completed" : ""}`}>
          <div className="step-icon">{step.completed ? "✓" : index + 1}</div>
          <div className="step-text">
            {step.name}
            {step.date && <div className="step-date">{step.date}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

const HistoryTimeline = ({ steps }) => {
  return (
    <div className="timeline">
      {steps
        .filter((step) => step.completed || step.id === "order_received")
        .map((step, index) => (
          <div key={step.id} className="history-item">
            <div className="history-icon">{step.completed ? "✓" : "•"}</div>
            <div className="history-content">
              <strong>{step.name}</strong>
              {step.date && <div className="history-date">{step.date}</div>}
              {!step.date && step.id === "order_received" && (
                <div className="history-date">We've received your order</div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Tracking;
