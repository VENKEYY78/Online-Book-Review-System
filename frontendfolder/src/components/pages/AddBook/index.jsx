import { useState } from 'react';

import api from '../../services/api';

import './index.css'



const AddBook = () => {
    
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [genre, setGenre] = useState("")
    const [description, setDescription] = useState("")
    const [addBookErrMsgORSuss , setAddBookErrMsgORSuss] = useState("")
    

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const onChangeAuthor = (e) => {
        setAuthor(e.target.value);
    };

    const onChangeGenre = (e) => {
        setGenre(e.target.value);
    };

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };


    const SubmitAddBookDetails = async (e) => {
        e.preventDefault();
        const AddBookDetails = {
            title,
            author,
            genre,
            description,
        }
        console.log(AddBookDetails)

        try {
            const response = await api.post("/add_new_book", AddBookDetails)
            setTitle("");
            setAuthor("");
            setGenre("");
            setDescription("");
            setAddBookErrMsgORSuss("Book Added Successfully")
        } catch (error) {
            const msg = error.response.data.detail[0].msg || "Failed to Add Book Please Try Again"
        }
    }





    return (
        <>
            <div className='add-book-page-main-bg-container'>
                <h1>Add Your Favourite Book</h1>
                <form className='add-book-form-container' onSubmit={SubmitAddBookDetails}>
                    <div className='book-title-input-container'>
                        <label className='title-label' htmlFor='title'>Enter Book Title</label>
                        <input 
                            type='text'
                            placeholder='Book Title'
                            className='title-input'
                            id='title'
                            value={title}
                            onChange={onChangeTitle}
                        />
                    </div>

                    <div className='book-author-input-container'>
                        <label className='author-label' htmlFor='author'>Enter Author Name</label>
                        <input
                            type='text'
                            placeholder='Book Author'
                            className='anuthr-input'
                            id="author"
                            value={author}
                            onChange={onChangeAuthor}
                        />
                    </div>

                    <div className='book-genre-input-container'>
                    <label className='genre-label' htmlFor='genre'>Enter Genre </label>
                        <input
                            type='text'
                            placeholder='Book Genre'
                            className='genre-input'
                            id="genre"
                            value={genre}
                            onChange={onChangeGenre}
                        />
                    </div>
                    <div className='book-description-container'>
    <label className='description-label' htmlFor='dexcription'>Enter Description</label>
    <textarea
        placeholder='Write Book Description'
        className='description-input'
        id="dexcription"
        value={description}
        onChange={onChangeDescription}
        rows="5"
    />
</div>

                    <div className='adding-book-button-container'>
                        <p className='add-book-err-msg'>{addBookErrMsgORSuss}</p>
                        <button className='add-book-button' type='submit'>Add Book</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddBook





















