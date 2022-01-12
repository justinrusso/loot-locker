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


@category_routes.route("/<int:category_id>")
def items_in_category(category_id):
    category = Category.query.get(category_id)

    if not category:
        return abort(404)

    return category.get_items()
