"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormType = "enquiry" | "review";

export default function EnquiryForm() {
  const [formType, setFormType] = useState<FormType>("enquiry");
  const [rating, setRating] = useState<number>(5);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xkjgjgjd", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setRating(5);
      } else {
        const data = await response.json().catch(() => null);
        setStatus("error");
        setErrorMessage(
          data?.errors?.[0]?.message ||
            data?.error ||
            "Unable to submit at this moment. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section id="enquiry" className="enquiry-section">
      <div className="enquiry-container">
        <motion.div
          className="enquiry-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="enquiry-eyebrow">Client Services & Feedback</p>
          <h2 className="enquiry-heading">Let’s hear from you.</h2>
          <p className="enquiry-sub">
            Have a question, suggestion, or something to share? We’d love to hear it.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              className="enquiry-success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="enquiry-success-text">
                Thank you. Your message has been received.
              </p>
              <button
                type="button"
                className="enquiry-reset-btn"
                onClick={() => {
                  setStatus("idle");
                  setFormType("enquiry");
                }}
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="enquiry-form"
              onSubmit={handleSubmit}
              action="https://formspree.io/f/xkjgjgjd"
              method="POST"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Spam prevention honeypot */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: "none" }}
                aria-hidden="true"
              />

              {/* Option Selector: Enquiry vs Review */}
              <div className="enquiry-type-wrap">
                <div className="enquiry-type-selector" role="radiogroup" aria-label="Submission category">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={formType === "enquiry"}
                    className={`enquiry-type-btn ${formType === "enquiry" ? "active" : ""}`}
                    onClick={() => setFormType("enquiry")}
                  >
                    Enquiry
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={formType === "review"}
                    className={`enquiry-type-btn ${formType === "review" ? "active" : ""}`}
                    onClick={() => setFormType("review")}
                  >
                    Review
                  </button>
                </div>
                <input type="hidden" name="type" value={formType === "enquiry" ? "Enquiry" : "Review"} />
              </div>

              {/* Review Star Rating (Optional subtle rating when Review is chosen) */}
              {formType === "review" && (
                <motion.div
                  className="enquiry-rating-wrap"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <label className="enquiry-label">
                    Rating <span className="enquiry-optional">({rating} of 5 stars)</span>
                  </label>
                  <div className="enquiry-stars-selector" role="radiogroup" aria-label="Star rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`enquiry-star-btn ${star <= rating ? "active" : ""}`}
                        onClick={() => setRating(star)}
                        aria-label={`${star} star${star > 1 ? "s" : ""}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="rating" value={`${rating} stars`} />
                </motion.div>
              )}

              <div className="enquiry-grid">
                <div className="enquiry-field">
                  <label htmlFor="enquiry-name" className="enquiry-label">
                    Name <span className="enquiry-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="enquiry-name"
                    name="name"
                    required
                    placeholder="Your full name"
                    className="enquiry-input"
                    autoComplete="name"
                  />
                </div>

                <div className="enquiry-field">
                  <label htmlFor="enquiry-email" className="enquiry-label">
                    Email <span className="enquiry-required">*</span>
                  </label>
                  <input
                    type="email"
                    id="enquiry-email"
                    name="email"
                    required
                    placeholder="name@domain.com"
                    className="enquiry-input"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="enquiry-field">
                <label htmlFor="enquiry-phone" className="enquiry-label">
                  Phone <span className="enquiry-optional">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="enquiry-phone"
                  name="phone"
                  placeholder="+91 00000 00000"
                  className="enquiry-input"
                  autoComplete="tel"
                />
              </div>

              <div className="enquiry-field">
                <label htmlFor="enquiry-message" className="enquiry-label">
                  {formType === "review" ? "Your Review" : "Your Enquiry"}{" "}
                  <span className="enquiry-required">*</span>
                </label>
                <textarea
                  id="enquiry-message"
                  name="message"
                  required
                  rows={5}
                  placeholder={
                    formType === "review"
                      ? "Share your experience with our fabric quality, child's comfort, or customer service..."
                      : "Tell us what you're looking for, question about sizing, custom orders, or availability..."
                  }
                  className="enquiry-textarea"
                />
              </div>

              {status === "error" && (
                <p className="enquiry-error" role="alert">
                  {errorMessage}
                </p>
              )}

              <div className="enquiry-actions">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="enquiry-submit-btn"
                >
                  <span>
                    {status === "submitting"
                      ? "Sending..."
                      : formType === "review"
                      ? "Submit Review"
                      : "Submit Enquiry"}
                  </span>
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
