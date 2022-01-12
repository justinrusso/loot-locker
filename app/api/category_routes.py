from flask import Blueprint, abort, request
from app.models import Category
from sqlalchemy import or_

category_routes = Blueprint("category", __name__)

@category_routes.route("/<int:category_id>")
def items_in_category(category_id):
    category = Category.query.get(category_id)

    if not category:
        return abort(404)

    return category.get_items()
