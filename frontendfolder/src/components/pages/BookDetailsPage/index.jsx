import { useState, useEffect } from 'react'; 

import { useNavigate } from 'react-router-dom';

import api from '../../services/api';

import { useParams } from 'react-router-dom';

import { IoIosHome } from "react-icons/io";

import { jwtDecode } from 'jwt-decode';

import AddReview from '../AddReview';

import ViewAllReviews from '../ViewAllReviews';

import './index.css'

const BookDetailsPage = () => {
    const [bookDetails, setBookDetails] = useState({});
    const [errorMsg, setErrorMsg] = useState("")
    const [showReviews, setShowReviews] = useState(true)

    const { book_id } = useParams()

    const token = localStorage.getItem("token")

    const Decode = jwtDecode(token)

    const navigate = useNavigate();




    useEffect(() => {
        api.get(`/view_book_details/book_id/${book_id}`, {
            headers: {
                Authorization : `Bearer ${token}`
           }
        })
            .then((response) => {
                setBookDetails(response.data)
            })
            .catch((error) => {
                console.log(error)
                setErrorMsg("Failed To Fetch Book Details")
        })
    }, [book_id])
    

    return (
        <>
           <div className='Book-Details-bg-container'>
                <div className='add-book-navbar-container'>                 
                    <div onClick={() => navigate("/")} className='add-book-home-icon-container'>
                    <IoIosHome id='home' className='home'/>
                    <label className='home-label' htmlFor='home'>Home</label>
                        
                    </div>       
                    <h1>Read Book Details</h1>
                    <h1>User : {Decode.username }</h1>
                </div>
                <div className='add-details-page-main-bg-container'>
                    <div className='book-details-page-cotainer'>   
                        <ul className='book-full-details'>
                            <p className="view-book-value"><strong className='view-strong'> Book ID : </strong>{bookDetails.id}</p>
                            <p className="view-book-value"><strong className='view-strong'>Book Title : </strong>{bookDetails.title}</p>
                            <p className="view-book-value"><strong className='view-strong'>Book Author : </strong>{bookDetails.author}</p>
                            <p className="view-book-value"><strong className='view-strong'>Book Genre : </strong>{bookDetails.genre}</p>
                            <p className="view-book-value"><strong className='view-strong'>Added Date : </strong>{bookDetails.added_at}</p>
                            <p className="view-book-value"><strong className='view-strong'>Added By : </strong>{bookDetails.added_by_name}</p>
                            <p className="view-book-value"><strong className='view-strong'>Book Rating : </strong>{bookDetails.average_rating}</p>
                            <p className="view-book-value"><strong className='view-strong'>Book Description : </strong>{bookDetails.description}</p>
                        </ul>    
                    </div>
                    <div className='add-book-review-container'>
                        <div className='reviews-buttons-container'>
                        <button className='add-review-button' onClick={() => setShowReviews(true)}  type='button'>Add Review</button>
                            <button className='view-all-reviews' onClick={() => setShowReviews(false)} >View All Reviews</button>
                        </div>
                        <div className='add-review-and-show-all-reviews-container'>
                        {
                            showReviews ? (
                                < AddReview book_id={ book_id }/>   
                            ) : (
                                <ViewAllReviews book_id={ book_id } /> 
                            )
                            }
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
};  

export default BookDetailsPage




















