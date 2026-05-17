from fastapi import APIRouter, HTTPException, status
from models.user_model import users
from config.db import get_connection
from utils.jwt_handler import create_access_token
from utils.password_hashing import hash_password, verify_password

router = APIRouter()


@router.post("/register_user")
def register_user(user: users):
    conn = get_connection()
    if not conn:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database Connections Failed",
        )
    cursor = conn.cursor()
    try:
        # This one If currently registaring user if already exists or not
        cursor.execute(
            "SELECT * FROM users WHERE registerUserMailID = %s",
            (user.registerUserMailID,),
        )
        existing_user = cursor.fetchone()

        # If User Already Exists Raise Error
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists"
            )

        hass_password = hash_password(user.registerUserPassword)

        cursor.execute(
            "INSERT INTO users ( registerPageUserName,registerUserMailID,registerUserPassword ) VALUES (%s , %s , %s )",
            (
                user.registerPageUserName,
                user.registerUserMailID,
                hass_password,
            ),
        )
        conn.commit()
        user_id = cursor.lastrowid
        return {
            "message": "User Registered Successfully",
            "User Details": {
                "user_id": user_id,
                "username": user.registerPageUserName,
                "email": user.registerUserMailID,
            },
        }
    finally:
        cursor.close()
        conn.close()


@router.post("/login_user")
def login_user(user: users):
    conn = get_connection()
    if not conn:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database Connection Failed",
        )

    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "SELECT * FROM users WHERE registerUserMailID = %s",
            (user.registerUserMailID,),
        )
        db_user = cursor.fetchone()
        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid User Email ID ",
            )
        if not verify_password(
            user.registerUserPassword, db_user["registerUserPassword"]
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Password"
            )
        token = create_access_token(
            {
                "sub": user.registerUserMailID,
                "username": user.registerPageUserName,
                "user_id": db_user["id"],
            }
        )

        return {"token": token}
    finally:
        cursor.close()
        conn.close()
