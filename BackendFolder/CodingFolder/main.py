from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth_routes import router as user_routes
from middleware.logging_middleware import log_requests
from routes.book_routes import router as book_routes
from routes.review_routes import router as review_routes
from starlette.middleware.base import BaseHTTPMiddleware

app = FastAPI(debug=True)

origins = [
    "https://online-book-review-system.vercel.app",
    "https://online-book-review-system-3zwp.vercel.app",
    "https://online-book-review-system-mmsp.vercel.app",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.add_middleware(BaseHTTPMiddleware, dispatch=log_requests)


app.include_router(user_routes)
app.include_router(book_routes)
app.include_router(review_routes)
