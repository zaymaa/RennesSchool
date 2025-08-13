import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "./Dashboard.css";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("events");
  const [seeAllMode, setSeeAllMode] = useState(false);
  const [showInfoCard, setShowInfoCard] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  // Course list
  const courses = [
    { day: "Tue", date: "16", title: "Stellar Physics", location: ["Bat. B", "Salle 12"], time: "9:30 PM → 11:30 PM", duration: "2h." },
    { day: "Tue", date: "16", title: "Stellar Physics", location: ["Bat. B", "Salle 12"], time: "3 PM → 5 PM", duration: "2h." },
    { day: "Wed", date: "17", title: "Business Analytics", location: ["Bat. B", "Salle 12"], time: "9:30 PM → 11:30 PM", duration: "2h." },
    { day: "Wed", date: "17", title: "Change Management", location: ["Bat. B", "Salle 12"], time: "2 PM → 4 PM", duration: "2h." },
  ];

  // Events and News
  const events = [
    { src: "/event1.png", link: "https://www.rennes-sb.fr/ecole1/actu-decouvrez-rennes-school-of-business-journees-portes-ouvertes/" },
    { src: "/event2.png", link: "https://www.lemarathonvert.org/" },
    { src: "/event3.png", link: "https://www.rennes-sb.fr/ecole1/actu-junior-comex-etudiants-integrent-comex-de-rennes-sb/" },
  ];
  const news = [
    { src: "/club-lyon.PNG", title: "CLUB LYON", subtitle: "SUMMER DRINKS PARTY", link: "https://www.rennes-sb-alumni.com/en/agenda/club-de-lyon-croisiere-aperitivos-du-vaporetto-1463-1492" },
    { src: "/student-news.PNG", title: "RENNES SB RANKING", subtitle: "11TH PLACE IN LE POINT 2025", link: "https://www.rennes-sb.com/news-school/news-rennes-school-of-business-maintains-11th-place-le-point-2025-ranking/" },
  ];

  // Listen to screen width changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // On mobile, show only "Stellar Physics"
  const visibleCourses = isMobile ? courses.filter(c => c.title === "Stellar Physics") : courses;

  // Main dashboard grid layout
  const Grid = (
    <div className="dashboard-page-grid">
      {/* Left panel - next courses */}
      <div>
        <h2 className="panel-title">Next course</h2>
        <div className="next-course-panel">
          <div className="course-list">
            {visibleCourses.map((course, idx) => (
              <div key={idx}>
                {/* Show "Demain" only on desktop for second index */}
                {!isMobile && idx === 2 && <div className="demain-title">Demain</div>}
                <div className={`course-card color-${idx + 1}`}>
                  <div className={`course-date color-${idx + 1}`}>
                    <span className="day">{course.day}</span>
                    <span className="date">{course.date}</span>
                  </div>
                  <div className="course-info">
                    <h3>{course.title}</h3>
                    <div className="location-row">
                      {course.location.map((loc, i) => (
                        <span key={i} className="location-tag">{loc}</span>
                      ))}
                    </div>
                    <div className="time-row">
                      <div className="time-tag">{course.time}</div>
                    </div>
                  </div>
                  <div className="course-duration">{course.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle panel - events/news */}
      <div className="events-panel">
        <div className="events-header">
          <div className="tab-group">
            <div
              className={`tab ${activeTab === "events" ? "active" : ""}`}
              onClick={() => { setActiveTab("events"); setSeeAllMode(false); }}
            >
              Events
            </div>
            <div
              className={`tab ${activeTab === "news" ? "active" : ""}`}
              onClick={() => { setActiveTab("news"); setSeeAllMode(false); }}
            >
              News
            </div>
          </div>
          <a
            href="#"
            className="see-all"
            onClick={(e) => { e.preventDefault(); setSeeAllMode(!seeAllMode); }}
          >
            See All
          </a>
        </div>

        <div className={seeAllMode ? "see-all-list" : "event-list"}>
          {seeAllMode ? (
            <>
              {events.map((e, i) => (
                <a key={`event-${i}`} href={e.link} target="_blank" rel="noopener noreferrer" className="event-card click-effect">
                  <img src={e.src} alt={`Event ${i + 1}`} />
                </a>
              ))}
              {news.map((n, i) => (
                <a key={`news-${i}`} href={n.link} target="_blank" rel="noopener noreferrer" className="event-card news-card click-effect">
                  <img src={n.src} alt={`News ${i + 1}`} />
                  <div className="news-overlay">
                    <div className="news-title">{n.title}</div>
                    <div className="news-subtitle">{n.subtitle}</div>
                  </div>
                </a>
              ))}
            </>
          ) : activeTab === "events" ? (
            events.map((e, i) => (
              <a key={i} href={e.link} target="_blank" rel="noopener noreferrer" className="event-card click-effect">
                <img src={e.src} alt={`Event ${i + 1}`} />
              </a>
            ))
          ) : (
            news.map((n, i) => (
              <a key={i} href={n.link} target="_blank" rel="noopener noreferrer" className="event-card news-card click-effect">
                <img src={n.src} alt={`News ${i + 1}`} />
                <div className="news-overlay">
                  <div className="news-title">{n.title}</div>
                  <div className="news-subtitle">{n.subtitle}</div>
                </div>
              </a>
            ))
          )}
        </div>
      </div>

      {/* Right panel - info card */}
      {showInfoCard && (
        <div className="info-card">
          <button className="info-close-btn" onClick={() => setShowInfoCard(false)}>✕</button>
          <div className="info-card-header">Welcome to Rennes School of Business !</div>
          <div className="info-card-body">
            We are delighted to welcome you to this space dedicated to your academic and personal success...
          </div>
          <div className="info-card-buttons">
            <button
              className="info-btn"
              onClick={() => window.open("https://www.rennes-sb.com/your-school/campuses/rennes-campus/#", "_blank")}
            >
              Campus map
            </button>
            <button
              className="info-btn"
              onClick={() =>
                window.open(
                  "https://www.rennes-sb.fr/?utm_source=adwords&utm_medium=ppc&utm_campaign=MV_Search_FR_Decla_Ecole&utm_term=rennes%20school%20of%20management&hsa_acc=3137001639&hsa_cam=19752330173&hsa_grp=146127104386&hsa_ad=569239991203&hsa_src=g&hsa_tgt=kwd-2260024681898&hsa_kw=rennes%20school%20of%20management&hsa_mt=b&hsa_net=adwords&hsa_ver=3",
                  "_blank"
                )
              }
            >
              School services
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Layout>
      {/* Wrap content in container only on mobile */}
      {isMobile ? (
        <div className="content dashboard">
          {Grid}
        </div>
      ) : (
        Grid
      )}
    </Layout>
  );
}
