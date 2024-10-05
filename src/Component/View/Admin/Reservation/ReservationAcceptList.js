import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; // Import useForm
import "./ReservationList.css";

const ReservationAcceptList = () => {
  const { register, handleSubmit, setValue } = useForm(); // Khởi tạo useForm
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/reservations"
        );
        console.log(response.data);
        setReservations(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      console.log("Updating status for ID:", id, "to", newStatus);
      const response = await axios.patch(
        `http://localhost:8080/api/reservations/${id}/status`,
        { status: newStatus }
      );
      console.log(response.data); // Kiểm tra dữ liệu trả về
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.reservationId === id
            ? { ...reservation, status: response.data.status }
            : reservation
        )
      );
      setMessage(`Status updated to ${newStatus}`); // Thông báo thành công
    } catch (error) {
      console.error(
        "Error updating reservation status",
        error.response || error
      );
      setMessage(
        "Failed to update status: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="col-12 tm-block-col">
      <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
        <h2 className="tm-block-title">Reservation Accepted List</h2>
        <table className="table-ReservationList">
          <thead>
            <tr>
              <th scope="col">NO.</th>
              <th scope="col">STATUS</th>
              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">PHONE</th>
              <th scope="col">DATE</th>
              <th scope="col">TIME</th>
              <th scope="col">PERSON</th>
              <th scope="col">TABLE</th>
              <th scope="col">CONTROL</th>
            </tr>
          </thead>
          <tbody>
            {reservations
              .filter((reservation) => reservation.status == "Accepted") // Lọc các reservation đã được accepted
              .slice()
              .sort((a, b) => b.reservationId - a.reservationId) // Sắp xếp theo reservationId mới nhất lên trên
              .map((reservation, index) => (
                <tr key={reservation.reservationId}>
                  <th scope="row">
                    <b>#{index + 1}</b> {/* Sử dụng chỉ số của mảng làm NO. */}
                  </th>
                  <td>
                    <div
                      className={`tm-status-circle ${
                        reservation.status.toLowerCase() === "accepted"
                          ? "accepted"
                          : reservation.status.toLowerCase()
                      }`}
                    ></div>{" "}
                    {reservation.status}
                  </td>

                  <td>
                    <b>{reservation.name}</b>
                  </td>
                  <td>
                    <b>{reservation.email}</b>
                  </td>
                  <td>
                    <b>{reservation.phone}</b>
                  </td>
                  <td>{reservation.reservationDate}</td>
                  <td>{reservation.reservationTime}</td>
                  <td>
                    {reservation.guests}{" "}
                    {reservation.guests === 1 ? "Person" : "Persons"}
                  </td>
                  <td>{reservation.tableName || "N/A"}</td>

                  <td>
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          reservation.reservationId,
                          "Accepted"
                        )
                      }
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          reservation.reservationId,
                          "Cancelled"
                        )
                      }
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
};

export default ReservationAcceptList;
