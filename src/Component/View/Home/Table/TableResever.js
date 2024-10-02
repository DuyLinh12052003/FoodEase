// import React, { useState } from "react";
// import "./TableReservation.css";

// const TableReservation = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [guests, setGuests] = useState("");
//   const [message, setMessage] = useState("");
//   const [errors, setErrors] = useState({}); // State để lưu thông báo lỗi

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = {};

//     // Validation cho từng trường
//     if (!name) validationErrors.name = "Tên không được để trống.";

//     if (!email) {
//       validationErrors.email = "Email không được để trống.";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       validationErrors.email = "Email không hợp lệ.";
//     }

//     if (!phone) {
//       validationErrors.phone = "Số điện thoại không được để trống.";
//     } else if (!/^(0[0-9]{9})$/.test(phone)) {
//       validationErrors.phone =
//         "Số điện thoại phải bắt đầu bằng 0 và có đúng 10 chữ số.";
//     }

//     if (!date) validationErrors.date = "Ngày không được để trống.";
//     if (!time) validationErrors.time = "Giờ không được để trống.";
//     if (!guests) validationErrors.guests = "Số khách không được để trống.";

//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       // Nếu không có lỗi, thực hiện gửi form
//       setMessage("Đặt bàn thành công!");
//       // Thực hiện các hành động khác nếu cần
//     } else {
//       setMessage("");
//     }
//   };

//   return (
//     <div className="reservation-container">
//       <h2>Reservation</h2>
//       <h1>Book a table</h1>
//       <form onSubmit={handleSubmit} className="reservation-form">
//         <div className="form-row">
//           <div className="form-group">
//             <label>Name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//             {errors.name && (
//               <span className="error-message">{errors.name}</span>
//             )}
//           </div>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             {errors.email && (
//               <span className="error-message">{errors.email}</span>
//             )}
//           </div>
//           <div className="form-group">
//             <label>Phone:</label>
//             <input
//               type="tel"
//               value={phone}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 if (/^[0-9]*$/.test(value)) {
//                   // Kiểm tra chỉ cho phép số
//                   setPhone(value);
//                 }
//               }}
//               required
//             />

//             {errors.phone && (
//               <span className="error-message">{errors.phone}</span>
//             )}
//           </div>
//         </div>
//         <div className="form-row">
//           <div className="form-group">
//             <label>Date:</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               required
//             />
//             {errors.date && (
//               <span className="error-message">{errors.date}</span>
//             )}
//           </div>
//           <div className="form-group">
//             <label>Time:</label>
//             <select
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               required
//             >
//               <option value="">Select time</option>
//               {Array.from({ length: 24 }, (_, index) => {
//                 const hour = index < 10 ? `0${index}:00` : `${index}:00`;
//                 return (
//                   <option key={index} value={hour}>
//                     {hour}
//                   </option>
//                 );
//               })}
//             </select>
//             {errors.time && (
//               <span className="error-message">{errors.time}</span>
//             )}
//           </div>
//           <div className="form-group">
//             <label>People:</label>
//             <select
//               value={guests}
//               onChange={(e) => setGuests(e.target.value)}
//               required
//             >
//               <option value="">Select number of people</option> {/* Tùy chọn mặc định */}
//               {Array.from({ length: 6 }, (_, index) => {
//                 const numberOfGuests = index + 1;
//                 return (
//                   <option key={numberOfGuests} value={numberOfGuests}>
//                     {numberOfGuests} {numberOfGuests > 1 ? "People" : "People"}
//                   </option>
//                 );
//               })}
//             </select>
//             {errors.guests && (
//               <span className="error-message">{errors.guests}</span>
//             )}
//           </div>
//         </div>
//         <button type="submit" className="submit-button">
//           Đặt Bàn
//         </button>
//         {message && <p className="success-message">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default TableReservation;