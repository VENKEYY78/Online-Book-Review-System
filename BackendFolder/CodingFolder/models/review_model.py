from pydantic import BaseModel, Field


class Reviews(BaseModel):
    rating: int = Field(...)
    comment: str = Field(...)
