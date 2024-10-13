import React from 'react';

const OrderReturnFormPopUp = ({ openOrderReturnForm , isOpenReturnForm ,register, handleSubmit , reset,handleOrderReturn}) => {
    return (
		<>
			{ 
				isOpenReturnForm && (
				<div className="overlay">
				<div className="popup">
					<div className="body">
						<form onSubmit={handleSubmit(handleOrderReturn)} className="feedback-card">
							<h2>Please let us know your Reason</h2>
							<textarea
							className="comment-box"
							placeholder="Add a Reason..."
							style={{ width: '100%', height: '120px',fontSize : '20px' }}
							{...register('reason')}
							></textarea>
							<div className="status-container">
							<label>Status:</label>
							<input 
							className="status-input"
							 value="pending" readOnly 
							 {...register('status')}
							 />
							</div>
							<button type="submit" className="submit-btn">Submit</button>
							<button  className="btn btn-primary" onClick={(e) => {e.preventDefault();openOrderReturnForm();}}>Cloes</button>
						</form>
					</div>
				</div>
			</div>
			)
		}
		</>
    );
};

export default OrderReturnFormPopUp;