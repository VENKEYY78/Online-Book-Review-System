from fastapi import APIRouter, HTTPException, status, Depends
from models.book_model import Books
from config.db import get_connection
from utils.jwt_handler import create_access_token, verify_token, oauth2_scheme

router = APIRouter()


@router.post("/add_new_book")
def add_new_book(book: Books, token: str = Depends(oauth2_scheme)):
    conn = get_connection()
    if not conn:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database Connection Failed",
        )
    cursor = conn.cursor()
    try:
        payload = verify_token(token)
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Token or Toekn Expired",
            )
        cursor.execute(
            "INSERT INTO Books (title , author , genre , description) VALUES (%s,%s,%s,%s,%s)",
            (book.title, book.author, book.genre, book.description),
        )
        book_id = cursor.lastrowid
        conn.commit()
        return {
            "Messege": "Book Added Successfully",
            "Book_Details": {
                "Book_id": book_id,
                "Book_title": book.title,
                "Book_author": book.author,
                "Book_description": book.description,
            },
        }
    finally:
        cursor.close()
        conn.close()


@router.get("/get_all_books")
def get_all_books_from_db(token: str = Depends(oauth2_scheme)):
    conn = get_connection()
    if not conn:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database Connection Failed",
        )
    cursor = conn.cursor(dictionary=True)
    try:
        payload = verify_token(token)
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Token or Token Expired",
            )
        cursor.execute("""
                SELECT 
                Books.id, 
                Books.title, 
                Books.author, 
                Books.genre, 
                Books.added_at, 
                users.registerPageUserName AS added_by_name,
                AVG(reviews.rating) as average_rating

            FROM Books 

            JOIN users
            ON Books.added_by = users.id
            LEFT JOIN Reviews
            ON Books.id = Reviews.book_id
            GROUP BY Books.id
            """)
        Books_list = cursor.fetchall()
        if not Books_list:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No Books Found In Database Please Add a Book",
            )
        return {"Message": "Books List Fetched Successfully", "Books_List": Books_list}
    finally:
        cursor.close()
        conn.close()


@router.get("/view_book_details/book_id/{book_id}")
def show_book_full_details(book_id: int, token: str = Depends(oauth2_scheme)):
    conn = get_connection()

    if not conn:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database Connection Failed",
        )

    cursor = conn.cursor(dictionary=True)

    try:
        payload = verify_token(token)

        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Token or Token Expired",
            )

        # this is for book full details
        cursor.execute(
            """
            SELECT 
                Books.id,
                Books.title,
                Books.author,
                Books.genre,
                Books.description,
                Books.added_at,
                users.registerPageUserName AS added_by_name,
                AVG(Reviews.rating) AS average_rating

            FROM Books

            JOIN users
            ON Books.added_by = users.id

            LEFT JOIN Reviews
            ON Books.id = Reviews.book_id

            WHERE Books.id = %s

            GROUP BY Books.id
            """,
            (book_id,),
        )

        book = cursor.fetchone()

        if not book:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Book Not Found",
            )

        # this for reviews
        cursor.execute(
            """
            SELECT
                Reviews.rating,
                Reviews.comment,
                Reviews.created_at,
                users.registerPageUserName AS reviewer_name

            FROM Reviews

            JOIN users
            ON Reviews.user_id = users.id

            WHERE Reviews.book_id = %s
            """,
            (book_id,),
        )

        reviews = cursor.fetchall()

        # Add reviews inside book response
        book["reviews"] = reviews

        return book

    finally:
        cursor.close()
        conn.close()
