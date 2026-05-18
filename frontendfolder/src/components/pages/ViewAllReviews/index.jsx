import { useState , useEffect } from "react";

import { MdRateReview } from "react-icons/md";

import api from "../../services/api";

import { FaStar } from "react-icons/fa6";

import { ImOpt } from "react-icons/im";

import "./index.css"



const ViewAllReview = ({book_id}) => {
    const [allReviewsList, setAllReviewList] = useState([])
    const [errorMsg, setErrorMsg] = useState("")
    
    const token = localStorage.getItem("token");

    useEffect(() => {
        api.get(`/get_all_reviews/${book_id}`, {
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
            .then((response) => {
            setAllReviewList(response.data.Reviews_list)
            })
            .catch((error) => {
                console.log(error)
                setErrorMsg(error.response.data.detail)
        })
    } , [])

    
    return (
        <>
            <div className="show-all-reviews-bg-main-bg-container">
                <ul className="all-reviews-card-container">
                    {allReviewsList && allReviewsList.map(eachreview => (
                        <li className="each-review-card" key={eachreview.id}>
                            <MdRateReview className="review-icon"/>
                            <p className="review-value" ><strong>Name :</strong>{eachreview.added_by_name}</p>
                            <p className="review-value" ><strong>Date :</strong> {eachreview.created_at}</p>
                            <p className="review-value" ><strong>Rating : <FaStar /></strong>  {eachreview.rating} </p>
                            <p className="review-value" ><strong>Review :</strong>  {eachreview.comment}</p>
                            <hr className="horizontal-line"/>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ViewAllReview;