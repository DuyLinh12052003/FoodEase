import React, { useState } from "react";
import "./TableReservation.css";

const TableReservation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({}); // State để lưu thông báo lỗi

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validation cho từng trường
    if (!name) validationErrors.name = "Name cannot be blank.";

    if (!email) {
      validationErrors.email = "Email cannot be blank.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email.";
    }

    if (!phone) {
      validationErrors.phone = "Phone number cannot be left blank.";
    } else if (!/^(0[0-9]{9})$/.test(phone)) {
      validationErrors.phone =
        "Phone number must start with 0 and have exactly 10 digits.";
    }

    if (!date) validationErrors.date = "Date cannot be blank.";
    if (!time) validationErrors.time = "Hours cannot be left blank.";
    if (!guests)
      validationErrors.guests = "Number of people cannot be left blank.";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Nếu không có lỗi, thực hiện gửi form
      setMessage("Booking successful!");
      // Thực hiện các hành động khác nếu cần
    } else {
      setMessage("");
    }
  };

  return (
    <div className="reservation-wrapper">
      <div className="reservation-container">
        <h2>Reservation</h2>
        <h1>Book a table</h1>
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-row">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[0-9]*$/.test(value)) {
                    // Kiểm tra chỉ cho phép số
                    setPhone(value);
                  }
                }}
                required
              />

              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              {errors.date && (
                <span className="error-message">{errors.date}</span>
              )}
            </div>
            <div className="form-group">
              <label>Time:</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              >
                <option value="">Select time</option>
                {Array.from({ length: 24 }, (_, index) => {
                  const hour = index < 10 ? `0${index}:00` : `${index}:00`;
                  return (
                    <option key={index} value={hour}>
                      {hour}
                    </option>
                  );
                })}
              </select>
              {errors.time && (
                <span className="error-message">{errors.time}</span>
              )}
            </div>
            <div className="form-group">
              <label>People:</label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                required
              >
                <option value="">How many persons?</option>{" "}
                {/* Tùy chọn mặc định */}
                {Array.from({ length: 6 }, (_, index) => {
                  const numberOfGuests = index + 1;
                  return (
                    <option key={numberOfGuests} value={numberOfGuests}>
                      {numberOfGuests}{" "}
                      {numberOfGuests > 1 ? "Persons" : "Person"}
                    </option>
                  );
                })}
              </select>
              {errors.guests && (
                <span className="error-message">{errors.guests}</span>
              )}
            </div>
          </div>
          <div className="submit-button-wrapper">
            <button type="submit" className="submit-button">
              Book a table
            </button>
          </div>

          {message && <p className="success-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default TableReservation;
