import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "./Schedule.css";

export default function Schedule() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  // Detect screen size changes to adjust view
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const START_HOUR = 9; // Calendar start time
  const ROW_H = 48; // Row height in pixels

  const daysOrder = [
    { label: "Mon", num: 15, jsDay: 1 },
    { label: "Tue", num: 16, jsDay: 2 },
    { label: "Wed", num: 17, jsDay: 3 },
    { label: "Thu", num: 18, jsDay: 4 },
    { label: "Fri", num: 19, jsDay: 5 },
    { label: "Sat", num: 19, jsDay: 6 },
  ];

  // Show all days on desktop, only Tuesday on mobile
  const visibleDays = isMobile ? daysOrder.filter((d) => d.jsDay === 2) : daysOrder;

  // Convert time (HH:MM) to vertical pixel position
  const pxFromTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const minutes = (hour - START_HOUR) * 60 + minute;
    return (minutes / 60) * ROW_H;
  };

  // Calculate card height from start and end time
  const heightFrom = (start, end) => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const hours = (eh + em / 60) - (sh + sm / 60);
    return hours * ROW_H;
  };

  // Small component for metadata chips (e.g., location)
  const MetaChip = ({ icon, text }) => (
    <span className="meta-chip">
      <img
        src={icon}
        alt=""
        style={{ width: "14px", height: "14px", marginRight: "4px", verticalAlign: "middle" }}
      />
      {text}
    </span>
  );

  // Small component for showing card start/end time
  const CardTime = ({ start, end }) => (
    <div className="card-time">
      <img
        src="/clock.png"
        alt=""
        style={{ width: "14px", height: "14px", marginRight: "6px", verticalAlign: "middle" }}
      />
      {start} → {end}
    </div>
  );

  return (
    <Layout>
      <div className="calendar-wrapper">
        {/* Calendar top bar: month, today button, view options */}
        <div className="calendar-bar">
          <div className="calendar-left">
            <span className="calendar-month">July 2025</span>
            <button id="todayView" className="today-btn">Today</button>
          </div>

          <div className="calendar-right">
            <div className="view-switch">
              <button className="view-btn">Day</button>
              <button className="view-btn active">Week</button>
              <button className="view-btn">Month</button>
            </div>
            <div className="date-range">15 Jul - 19 Jul 2025</div>
          </div>
        </div>

        {/* Week day headers */}
        <div className="week-header">
          {visibleDays.map((d, idx) => (
            <div
              className={`week-day ${d.jsDay === 2 ? "selected" : (!isMobile && idx === 1 ? "selected" : "")}`}
              key={d.jsDay}
            >
              <div className="name">{d.label}</div>
              <div className="num">{d.num}</div>
            </div>
          ))}
        </div>

        {/* Calendar main body */}
        <div className="calendar-body">
          {/* Time column on the left */}
          <div className="time-column">
            {["9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM"].map((time, index) => (
              <div className="times-row" key={index}>
                <span className="time-label">{time}</span>
                <div className="time-line"></div>
              </div>
            ))}
          </div>

          {/* Noon indicator line */}
          <div className="noon-line" style={{ top: pxFromTime("12:00") + 70 }}>
            <span className="noon-dot"></span>
          </div>

          {/* Event cards */}
          <div className="events-layer">
            {visibleDays.map((d) => (
              <div className="day-col" data-day={d.jsDay} key={d.jsDay}>
                {/* Tuesday events */}
                {d.jsDay === 2 && (
                  <>
                    <div
                      className="calendar-card"
                      style={{ top: pxFromTime("09:30"), height: heightFrom("09:30", "11:30") }}
                    >
                      <div className="card-top">
                        <span className="card-title">Stellar Physics</span>
                        <span className="card-duration">2h.</span>
                      </div>
                      <div className="card-meta">
                        <MetaChip icon="/map-pin.png" text="Bat. B" />
                        <span className="meta-chip">Salle 12</span>
                      </div>
                      <CardTime start="9:30 AM" end="11:30 AM" />
                    </div>

                    <div
                      className="calendar-card cancelled"
                      style={{ top: pxFromTime("13:00"), height: heightFrom("13:00", "15:00") }}
                    >
                      <div className="card-top">
                        <span className="card-title">Stellar Physics</span>
                        <span className="cancel-label">Cancelled</span>
                      </div>
                      <div className="card-meta">
                        <MetaChip icon="/map-pin.png" text="Bat. B" />
                        <span className="meta-chip">Salle 12</span>
                      </div>
                      <CardTime start="1:00 PM" end="3:00 PM" />
                    </div>

                    <div
                      className="calendar-card"
                      style={{ top: pxFromTime("16:00"), height: heightFrom("16:00", "17:00") }}
                    >
                      <div className="card-top">
                        <span className="card-title">General Relativity</span>
                        <span className="card-duration">1h.</span>
                      </div>
                      <div className="card-meta">
                        <MetaChip icon="/map-pin.png" text="Bat. A" />
                        <span className="meta-chip">Salle 1</span>
                      </div>
                      <CardTime start="6:00 PM" end="7:00 PM" />
                    </div>
                  </>
                )}

                {/* Wednesday events */}
                {d.jsDay === 3 && (
                  <>
                    <div
                      className="calendar-card"
                      style={{ top: pxFromTime("09:30"), height: heightFrom("09:30", "11:30") }}
                    >
                      <div className="card-top">
                        <span className="card-title">Business Analytics</span>
                        <span className="card-duration">2h.</span>
                      </div>
                      <div className="card-meta">
                        <MetaChip icon="/map-pin.png" text="Bat. B" />
                        <span className="meta-chip">Salle 12</span>
                      </div>
                      <CardTime start="9:30 AM" end="11:30 AM" />
                    </div>

                    <div
                      className="calendar-card"
                      style={{ top: pxFromTime("14:00"), height: heightFrom("14:00", "16:00") }}
                    >
                      <div className="card-top">
                        <span className="card-title">Change Management</span>
                        <span className="card-duration">2h.</span>
                      </div>
                      <div className="card-meta">
                        <MetaChip icon="/map-pin.png" text="Bat. B" />
                        <span className="meta-chip">Salle 12</span>
                      </div>
                      <CardTime start="2:00 PM" end="4:00 PM" />
                    </div>
                  </>
                )}

                {/* Friday events */}
                {d.jsDay === 5 && (
                  <div
                    className="calendar-card"
                    style={{ top: pxFromTime("09:30"), height: heightFrom("09:30", "11:30") }}
                  >
                    <div className="card-top">
                      <span className="card-title">Stellar Physics</span>
                      <span className="card-duration">2h.</span>
                    </div>
                    <div className="card-meta">
                      <MetaChip icon="/map-pin.png" text="Bat. B" />
                      <span className="meta-chip">Salle 12</span>
                    </div>
                    <CardTime start="9:30 AM" end="11:30 AM" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
