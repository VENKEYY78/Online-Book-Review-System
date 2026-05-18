from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth_routes import router as user_routes
from middleware.logging_middleware import log_requests
from routes.book_routes import router as book_routes
from routes.review_routes import router as review_routes

app = FastAPI(debug=True)

origins = ["https://online-book-review-system.vercel.app"]

app.middleware("http")(log_requests)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_routes)
app.include_router(book_routes)
app.include_router(review_routes)


@app.get("/")
def home():
    return {"message": "Backend Running"}
