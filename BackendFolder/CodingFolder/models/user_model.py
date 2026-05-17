from pydantic import BaseModel, Field, EmailStr

"""
users
-----
id
username
email
hashed_password
created_at

"""


class users(BaseModel):
    registerPageUserName: str = Field(..., min_length=3)
    registerUserMailID: EmailStr = Field(...)
    registerUserPassword: str = Field(..., min_length=5)
