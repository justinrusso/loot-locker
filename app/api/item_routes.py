from flask import Blueprint, abort, request
from flask_login import current_user, login_required
from app.models import Item, User
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

# delete an item via supplied user_id from session
# if does not match userId of item to delete, do not allow
@item_routes.route("/<int:item_id>", methods=["DELETE"])
@login_required
def delete_item(item_id):
    item = Item.query.get(item_id)
    if item.user_id != current_user.id:
        return abort(403, description="Unauthorized deletion")
    return current_user.to_dict()
