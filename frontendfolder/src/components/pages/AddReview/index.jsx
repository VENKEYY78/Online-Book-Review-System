import { useState } from "react";

import api from "../../services/api";

import "./index.css"


const AddReview = ({book_id}) => {
    const [rating, setRating] = useState(5);
    const [comment, setReviewText] = useState("");
    const [addReviewErrMsg, setAddReviewErrMsg] = useState("")
    const [addReviewSussMsg , setAddReviewSussMsg] = useState("")


    const token = localStorage.getItem("token");

    const SubmitReviewDetails = async (e) => {
        e.preventDefault()


        const ReviewDetails = {
            rating,
            comment
        }
        try {
            const response = await api.post(`/review/${book_id}`, ReviewDetails,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data)
            setRating(5)
            setReviewText("")
            setAddReviewErrMsg("")
            setAddReviewSussMsg("Review Added Successfully")
        } catch (error) {
            const msg = error.response?.data?.detail || "Adding Review Failed Please. Try Again"
            setAddReviewErrMsg(msg)
        }
    }



    return (
        <>
            <div className="add-review-page-main-page-container">
                <form className="add-review-form-container" onSubmit={SubmitReviewDetails}>
                    <div className="rating-select-container">
                        <label htmlFor="rating-select">Your Rating:</label>
                            <select 
                                id="rating-select" 
                                value={rating} 
                                onChange={(e) => setRating(e.target.value)}
                                className="rating-dropdown"
                            >
                                <option value="5">⭐⭐⭐⭐⭐ (5 / 5)</option>
                                <option value="4">⭐⭐⭐⭐ (4 / 5)</option>
                                <option value="3">⭐⭐⭐ (3 / 5)</option>
                                <option value="2">⭐⭐ (2 / 5)</option>
                                <option value="1">⭐ (1 / 5)</option>
                            </select>
                    </div>
                    <div className="review-text-container">
                        <label htmlFor="review-textarea">Comments:</label>
                        <textarea 
                            id="review-textarea"
                            placeholder="Write your thoughts about this book..." 
                            value={comment}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="review-input"
                            rows="4"
                            required
                        />
                    </div>
                    <div className="add-review-submit-button-container">
                        <button className="add-review-submit-button" type="submit">Submit Review</button>
                    </div>
                    {addReviewErrMsg && (
                    <p className='review-error-message'>
                    {addReviewErrMsg}
                    </p>
                    )}
                    {addReviewSussMsg && (
                        <p className="add-review-suss-msg">
                            {addReviewSussMsg}
                        </p>
                    )}
                </form>
            </div>
        </>
    );
};

export default AddReview;








