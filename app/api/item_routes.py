from flask import Blueprint, abort
from app.models import Item
from sqlalchemy import or_

item_routes = Blueprint("items", __name__)


@item_routes.route("/<search_key>")
def items(search_key):

    if search_key:
        items = Item.query.filter(
            or_(Item.name.ilike(search_key), Item.description.ilike(search_key)).all())
        return {"items": [item.to_dict() for item in items]}
    items = Item.query.all()
    return {"items": [item.to_dict() for item in items]}


@item_routes.route("/<int:item_id>")
def item(item_id):
    item = Item.query.get(item_id)

    if not item:
        return abort(404)

    return item.to_dict()
