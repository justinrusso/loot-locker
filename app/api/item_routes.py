from flask import Blueprint, abort
from app.models import Item


item_routes = Blueprint('items', __name__)

@item_routes.route('/')
def items():
    items = Item.query.all()
    return {'items': [item.to_dict() for item in items]}

@item_routes.route('/<int:item_id>')
def item(item_id):
    item = Item.query.get(item_id)

    if not item:
        return abort(404)

    return item.to_dict()
