import { useState } from "react";
import Layout from "../components/Layout";
import "./Help.css";

export default function Help() {
  const [openIndex, setOpenIndex] = useState(null);

  // Live chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "support", text: "Hi! How can we help you?" }
  ]);
  const [input, setInput] = useState("");

  // FAQ list
  const faqs = [
    { question: "How do I reset my password?", answer: "Go to settings > profile > new password." },
    { question: "How do I register for new courses?", answer: "Course registration is handled by the administration office. Please contact the academic coordinator or visit the student services desk." },
    { question: "How do I contact professors?", answer: "You can contact professors through the school email system or by visiting their office hours." },
    { question: "How can I get technical support for the platform?", answer: "For technical issues, please contact IT support at support@rennes-school.com." }
  ];

  // Send chat message
  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { from: "me", text: trimmed }]);
    setInput("");
    // Demo: automatic reply after 1 second
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "support", text: "Thanks! We'll get back to you shortly." }]);
    }, 1000);
  };

  return (
    <Layout>
      <div className="help-page">
        {/* FAQ section */}
        <div className="faq-section">
          <h2 className="faq-title">
            <span className="faq-icon">❓</span> Frequently Asked Questions
          </h2>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span><strong>{faq.question}</strong></span>
                <span className="faq-toggle">{openIndex === index ? "−" : "+"}</span>
              </div>
              {openIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        {/* Contact section */}
        <div className="contact-section">
          <h3>Contact Support</h3>
          <p>If you couldn’t find what you’re looking for, you can contact us:</p>
          <p><strong>Email:</strong> support@rennes-school.com</p>
          <p><strong>Phone:</strong> +33 xx 23 xx 67 xx</p>
          <button className="live-chat-btn" onClick={() => setChatOpen(true)}>
            Start Live Chat
          </button>
        </div>
      </div>

      {/* Live chat popup */}
      {chatOpen && (
        <div className="chat-overlay">
          <div className="chat-window">
            <div className="chat-header">
              <span>Live Chat</span>
              <button className="chat-close" onClick={() => setChatOpen(false)}>×</button>
            </div>

            <div className="chat-body">
              {messages.map((m, i) => (
                <div key={i} className={`chat-msg ${m.from}`}>
                  {m.from === "support" && <strong>Support: </strong>}
                  <span>{m.text}</span>
                </div>
              ))}
            </div>

            <div className="chat-footer">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button className="chat-send" onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
