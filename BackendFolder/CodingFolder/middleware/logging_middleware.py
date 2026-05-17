import time
from urllib.request import Request


async def log_requests(request: Request, call_next):

    staet_time = time.time()

    print("REQUEST PATH:", request.url.path)

    response = await call_next(request)

    end_time = time.time()

    time_taken = end_time - staet_time

    print("TIME TAKEN:", time_taken, "seconds")

    return response
