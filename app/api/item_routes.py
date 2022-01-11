from flask import Blueprint, abort, request
from app.models import Item
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
