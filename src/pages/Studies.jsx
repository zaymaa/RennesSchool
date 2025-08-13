import Layout from "../components/Layout";
import "./Studies.css";
import { useState } from "react";

export default function Studies() {
    const [activeTab, setActiveTab] = useState("favorites"); // Tracks selected tab (Favorites, Saved, Notes)

    const [selectedAnswer, setSelectedAnswer] = useState(null); // Selected quiz answer
    const correctAnswer = "Leonardo da Vinci"; // Correct quiz answer

    const handleAnswerClick = (answer) => {
        if (!selectedAnswer) {
            setSelectedAnswer(answer);
        }
    };

    const studyResources = [
        { title: "Stellar Physics" },
        { title: "Business Analytics" },
        { title: "Change Management" }
    ];

    // Opens Google or YouTube search for the selected course
    const handleSearch = (courseTitle, type) => {
        let query = courseTitle;
        if (type === "books") {
            query += " books";
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
        } else if (type === "videos") {
            query += " videos";
            window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, "_blank");
        } else if (type === "articles") {
            query += " articles";
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
        }
    };

    return (
        <Layout>
            <div className="studies-page">
                {/* Left panel: search and tabs */}
                <div className="left-panel">
                    <div className="search-panel">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search courses, articles, videos..."
                            />
                            <button className="search-icon-btn">
                                <img src="/search.png" alt="Search" />
                            </button>
                        </div>

                        <div className="search-buttons">
                            <button
                                className={`search-btn ${activeTab === "favorites" ? "active" : ""}`}
                                onClick={() => setActiveTab("favorites")}
                            >
                                <img src="/heart.png" alt="Favorites" />
                                <span>Favorites</span>
                            </button>
                            <button
                                className={`search-btn ${activeTab === "saved" ? "active" : ""}`}
                                onClick={() => setActiveTab("saved")}
                            >
                                <img src="/bookmark.png" alt="Saved" />
                                <span>Saved</span>
                            </button>
                            <button
                                className={`search-btn ${activeTab === "notes" ? "active" : ""}`}
                                onClick={() => setActiveTab("notes")}
                            >
                                <img src="/clipboard.png" alt="Notes" />
                                <span>Notes</span>
                            </button>
                        </div>
                    </div>

                    {/* Displays content based on selected tab */}
                    <div className="favorites-section">
                        {activeTab === "favorites" && (
                            <>
                                <h3>Favorites</h3>
                                <p>No favorites yet.</p>
                            </>
                        )}
                        {activeTab === "saved" && (
                            <>
                                <h3>Saved</h3>
                                <p>No saved items yet.</p>
                            </>
                        )}
                        {activeTab === "notes" && (
                            <>
                                <h3>Notes</h3>
                                <p>No notes yet.</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Middle panel: study resources */}
                <div className="middle-panel">
                    <div className="resource-header">
                        <h3>Study Resources</h3>
                        <p>Access books, videos, and articles for your enrolled courses</p>
                    </div>

                    <div className="resource-grid">
                        {studyResources.map((course, index) => (
                            <div key={index} className="resource-card">
                                <h4>{course.title}</h4>
                                <button
                                    className="resource-btn"
                                    onClick={() => handleSearch(course.title, "books")}
                                >
                                    <img src="/book.png" alt="Books" /> Books
                                </button>
                                <button
                                    className="resource-btn"
                                    onClick={() => handleSearch(course.title, "videos")}
                                >
                                    <img src="/youtube.png" alt="Videos" /> Videos
                                </button>
                                <button
                                    className="resource-btn"
                                    onClick={() => handleSearch(course.title, "articles")}
                                >
                                    <img src="/global-search.png" alt="Articles" /> Articles
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right panel: quiz and daily inspiration */}
                <div className="right-panel">
                    {/* Quick Quiz section */}
                    <div className="quiz-box">
                        <div className="quiz-header">
                            <h4>Quick Quiz</h4>
                            <button className="close-btn">&times;</button>
                        </div>
                        <p>Who painted the Mona Lisa?</p>

                        {["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso"].map(
                            (option) => (
                                <button
                                    key={option}
                                    className={`quiz-option ${
                                        selectedAnswer
                                            ? option === correctAnswer
                                                ? "correct"
                                                : selectedAnswer === option
                                                ? "wrong"
                                                : ""
                                            : ""
                                    }`}
                                    onClick={() => handleAnswerClick(option)}
                                    disabled={!!selectedAnswer}
                                >
                                    {option}
                                </button>
                            )
                        )}

                        <img
                            src="/questionwall.png"
                            className="quiz-bg"
                            alt="Quiz background"
                        />
                    </div>

                    {/* Daily Inspiration section */}
                    <div className="inspiration-box">
                        <div className="quiz-header">
                            <h4>Daily Inspiration</h4>
                            <button className="close-btn">&times;</button>
                        </div>
                        <p>Push yourself, because no one else is going to do it for you.</p>
                        <p className="podcast-line">
                            <img src="/mic.png" alt="Mic Icon" className="podcast-icon" />
                            <strong>Podcast:</strong>{" "}
                            <a
                                href="https://www.tenpercent.com/podcast"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ten Percent Happier with Dan Harris
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
