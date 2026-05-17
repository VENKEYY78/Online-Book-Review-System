from fastapi import APIRouter, HTTPException, status, Depends
from models.review_model import Reviews
from config.db import get_connection
from utils.jwt_handler import create_access_token, verify_token, oauth2_scheme

router = APIRouter()


@router.post("/review/{book_id}")
def add_new_review(book_id: int, review: Reviews, token: str = Depends(oauth2_scheme)):
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
                detail="Invalid Token or Token Expired",
            )
        username = payload.get("username")
        user_id = payload.get("user_id")
        cursor.execute(
            "INSERT INTO Reviews (book_id,user_id , rating, comment) VALUES (%s , %s ,%s ,%s) ",
            (book_id, user_id, review.rating, review.comment),
        )
        conn.commit()
        return {"Message": "Commented Successfully"}
    finally:
        cursor.close()
        conn.close()


@router.get("/get_all_reviews/{book_id}")
def get_all_reviews(book_id: int, token: str = Depends(oauth2_scheme)):
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

        cursor.execute(
            """
            SELECT 
            Reviews.comment,
            Reviews.rating,
            Reviews.created_at,
            users.registerPageUserName AS added_by_name
            FROM Reviews 
            JOIN users 
            ON Reviews.user_id = users.id
            WHERE
            Reviews.book_id = %s
            """,
            (book_id,),
        )
        All_reviews = cursor.fetchall()
        if not All_reviews:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No Reviews Found",
            )
        return {"Reviews_list": All_reviews}
    finally:
        cursor.close()
        conn.close()
