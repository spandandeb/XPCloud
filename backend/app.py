from flask import Flask, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# MongoDB connection
client = MongoClient("mongodb+srv://spandandeb:123@cluster0.wu7te.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["books_db"]
collection = db["books"]

@app.route('/scrape', methods=['GET'])
def scrape():
    url = 'https://books.toscrape.com/'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    books = []
    for book in soup.select('article.product_pod'):
        title = book.h3.a['title']
        price = book.select_one('.price_color').text
        availability = book.select_one('.availability').text.strip()
        books.append({
            'title': title,
            'price': price,
            'availability': availability
        })

    if books:
        collection.insert_many(books)

    # Fetch the inserted books again to return (with _id converted to str)
    inserted_books = list(collection.find().sort('_id', -1).limit(len(books)))
    for book in inserted_books:
        book['_id'] = str(book['_id'])

    return jsonify(inserted_books)

@app.route('/books', methods=['GET'])
def get_books():
    books = list(collection.find())
    for book in books:
        book['_id'] = str(book['_id'])
    return jsonify(books)

if __name__ == '__main__':
    app.run(debug=True)
