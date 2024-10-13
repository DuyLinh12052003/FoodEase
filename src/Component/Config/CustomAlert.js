import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './CustomAlert.css'; // Đảm bảo rằng bạn đã import file CSS

const CustomAlert = ({ type, message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); // Tự động ẩn alert sau 4 giây
        }, 4000); // Thời gian tự động ẩn là 4 giây
        return () => clearTimeout(timer); // Dọn dẹp timer khi component bị unmount
    }, [onClose]);

    return (
        <div className={`custom-alert custom-alert-${type}`}>
            <div className="custom-alert-icon">
                {type === 'success' ? (
                    <i className="fa fa-check-circle" style={{ fontSize: '45px' }}></i>
                ) : (
                    <i className="fa fa-times-circle" style={{ fontSize: '45px' }}></i>
                )}
            </div>
            <div className="custom-alert-message">
                {message}
            </div>
            {/* Thanh progress bar luôn luôn hiển thị */}
            <div className="progress-bar"></div>
        </div>
    );
};

CustomAlert.propTypes = {
    type: PropTypes.oneOf(['success', 'error']).isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CustomAlert;
