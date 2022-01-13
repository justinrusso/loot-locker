from flask import Blueprint, abort, request
from app.models import Item, Category
from sqlalchemy import or_, desc, asc
from sqlalchemy.sql.expression import func

item_routes = Blueprint("items", __name__)


@item_routes.route("/")
def items():
    key = request.args.get("key")
    category_id = request.args.get("category")
    filters = []
    if category_id:
        filters.append(Item.category_id == category_id)
    if key:
        filters.append(Item.name.ilike(f"%{key}%"))
    items = Item.query.filter(*filters).all()
    return {"items": [item.to_dict() for item in items]}


@item_routes.route("/<int:item_id>")
def item(item_id):
    item = Item.query.get(item_id)

    if not item:
        return abort(404)

    return item.to_dict()


@item_routes.route("/new")
def new_items():
    items = Item.query.order_by(desc(Item.created_at)).limit(5).all()

    return {item.id:item.to_dict() for item in items}


@item_routes.route("/picks")
def pick_items():
    items = Item.query.order_by(func.random()).limit(6).all()

    return {item.id:item.to_dict() for item in items}
