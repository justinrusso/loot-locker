from flask import Blueprint, abort, request
from app.models import Item, Category
from sqlalchemy import or_

item_routes = Blueprint("items", __name__)


@item_routes.route("/")
def items():
    key = request.args.get("key")
    if key:
        items = Item.query.filter(Item.name.ilike(f"%{key}%")).all()
    else:
        items = Item.query.all()
    return {"items": [item.to_dict() for item in items]}


@item_routes.route("/<int:item_id>")
def item(item_id):
    item = Item.query.get(item_id)

    if not item:
        return abort(404)

    return item.to_dict()


@item_routes.route("/categories/<int:category_id>")
def items_in_category(category_id):
    key = request.args.get("key")
    category = Category.query.get(category_id)

    if not category:
        return abort(404)

    if key:
        items = Item.query.filter(Item.category_id == category_id).filter(Item.name.ilike(f"%{key}%")).all()
    else:
        items = category.items
    return {"items": [item.to_dict() for item in items]}
