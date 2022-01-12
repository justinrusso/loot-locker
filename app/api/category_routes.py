from flask import Blueprint, abort, request
from app.models import Category
from sqlalchemy import or_

category_routes = Blueprint("category", __name__)

@category_routes.route("/")
def categories():
    categories = Category.query.all()
    return {
        "categories": [category.to_dict() for category in categories]
    }
