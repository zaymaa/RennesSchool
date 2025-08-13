import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const items = [
  { to: "/", label: "Dashboard", icon: "/icons/dashboard.png", end: true },
  { to: "/schedule", label: "Schedule", icon: "/icons/schedule.png" },
  { to: "/studies", label: "Studies", icon: "/icons/studies.png" },
  { to: "/help", label: "Help", icon: "/icons/help.png" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sb-logo">
        <img src="/logo2.png" alt="Rennes Logo" />
      </div>

      <nav className="sb-nav">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            className={({ isActive }) =>
              "sb-link" + (isActive ? " active" : "")
            }
          >
            <img className="sb-icon" src={it.icon} alt={it.label} />
            <span className="sb-text">{it.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sb-bottom">
        <NavLink to="/logout" className="sb-link">
          <img className="sb-icon" src="/icons/logout.png" alt="Logout" />
          <span className="sb-text">Logout</span>
        </NavLink>
      </div>
    </aside>
  );
}
