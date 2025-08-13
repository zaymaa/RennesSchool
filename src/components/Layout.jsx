import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <main>
        <Topbar />
        <div className="content">{children}</div>
      </main>
    </div>
  );
}
