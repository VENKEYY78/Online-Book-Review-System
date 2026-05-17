from pydantic import BaseModel, Field


class Books(BaseModel):
    title: str = Field(..., min_length=3)
    author: str = Field(..., min_length=3)
    genre: str = Field(..., min_length=3)
    description: str = Field(..., min_length=10)
