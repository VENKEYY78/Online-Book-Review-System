import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';


import api from "../../services/api"

import { ImBook } from "react-icons/im"; 

import { IoBook } from "react-icons/io5";  

import { FaStar } from "react-icons/fa6";

import './index.css'

const HomePage = () => {
    const [booksList, setBooksList] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const token = localStorage.getItem("token");


    const LogoutUser = () => {
        localStorage.removeItem("token")
        navigate("/login_user")
    }
  
    
    useEffect(() => {
        api.get("/get_all_books", {        
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setBooksList(response.data.Books_List)
            })
            .catch((error) => {
                setErrorMsg(error.response.data.detail)
                
        })
        
    } , [])

    return (
        <>
            <div className='online-book-home-page-main-bg-container'>
                <div className='online-book-home-page-navbar-container'>
                    <img
                        src='https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg'
                        className='home-page-navbar-image'
                        alt='Online Book Review System Logo'
                    />
                    <h1 className='online-book-home-page-heading'>Choose Your Favourite Book</h1>
                    <div className='navbar-buttons-container'>
                        <button className="Add-button" onClick={() => navigate("/add_new_book")}>
                            Add Book
                        </button>
                        <button className="logout-button"   onClick={LogoutUser}>
                            Logout
                        </button>
                    </div>
                </div>
                <div className='online-book-home-page-books-list-container'>
                {errorMsg && <p className='no-books-in-database'>{errorMsg}</p>}
                    <ul className='books-list-cards-container'>
                        {booksList && booksList.map(eachbook => (
                            <li className='each-book-card' key={eachbook.id}>
                                <ImBook className='book-icon' />
                                <p className='book-value'><strong>Book Title:</strong> {eachbook.title}</p>
                                <p className='book-value'><strong>Book Author:</strong> {eachbook.author}</p>
                                <p className='book-value'><strong>Book Genre:</strong> {eachbook.genre}</p>
                                <p className='book-value'><strong>Book Added By:</strong> {eachbook.added_by_name}</p>
                                <p className='book-value'><strong>Average Rating:</strong> <FaStar className='star'/> {eachbook.average_rating}</p>
                                <p className='book-value'><strong>Book Added At:</strong> {eachbook.added_at}</p>
                                <button className='view-book-details-button'
                                    onClick={() => navigate(`/view_book_details/book_id/${eachbook.id}`)}
                                >
                                    <IoBook className='open-book-icon' />
                                    View Book
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};
export default HomePage;


