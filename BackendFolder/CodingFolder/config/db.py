import mysql.connector  # pip install mysql-connector-python
from mysql.connector import Error


def get_connection():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Jvenkatesh78@",
            database="online_book_review_system_db",
            port=3306,
        )
        if conn.is_connected():
            print("Online Book Review System Database Connected")
            return conn
    except Error as e:
        print("Database Connection Faild :", e)
        return None


"""
 host="brc3t8q0i2myq7krlq76-mysql.services.clever-cloud.com", 
            user="ugfx930ldgsynyqc",
            password="6yTluLwHHjEOtTyczL6V",
            database="brc3t8q0i2myq7krlq76",
            port=3306,
"""
