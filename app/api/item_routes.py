from flask import Blueprint, abort, request
from app.models import db, Item, Review, ReviewSummary
from flask_login import current_user, login_required
from app.models import Item, Category, User, db, Review
from sqlalchemy import or_
from app.forms import DeleteItemForm, EditItemForm, ReviewForm, validation_errors_to_error_messages


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


# delete an item via supplied user_id from session
# if does not match userId of item to delete, do not allow
@item_routes.route("/<int:item_id>", methods=["DELETE"])
@login_required
def delete_item(item_id):
    form = DeleteItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        item = Item.query.get(item_id)

        if item.user_id != current_user.id:
            return abort(403, description="Unauthorized deletion")

        db.session.delete(item)
        db.session.commit()
        return {"itemId": item.id, "message": "Success"}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# edit an item via supplied object of fields we want to update and their new values
@item_routes.route("/<int:item_id>", methods=["PUT"])
@login_required
def update_item(item_id):
    form = EditItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        item = Item.query.get(item_id)
        new_item_info = request.json # {'name': 'new name hello', 'stock': 2}, etc

        for k, v in new_item_info.items():
            print("KEY", k, "VALUE", v)
            setattr(item, k, v)

        db.session.commit()
        return {"item": item.to_dict(), "message": "Success"}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400



@item_routes.route('/<int:item_id>/reviews', methods=['GET'])
def get_reviews(item_id):
    reviews = Item.query.get(item_id).reviews
    return {'reviews': [review.to_dict() for review in reviews]}


@item_routes.route('/<int:item_id>/reviews', methods=['POST'])
@login_required
def post_review(item_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        review = Review(
            user_id=current_user.id,
            item_id=item_id,
            rating=int(form.data['rating']),
            comment=form.data['comment']
        )
        db.session.add(review)

        summary = ReviewSummary.query.get(item_id)
        if not summary:
            summary = ReviewSummary(
                item_id=item_id, num_of_reviews=0, ratings_total=0)
        summary.num_of_reviews += 1
        summary.ratings_total += int(form.data['rating'])

        db.session.add(summary)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
