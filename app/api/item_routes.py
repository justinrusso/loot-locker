from flask import Blueprint, abort, request
from wtforms import validators
from app.models import db, Item, Review
from app.forms import ReviewSubmitForm, validation_errors_to_error_messages
from flask_login import current_user, login_required


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


@item_routes.route('/<int:item_id>/reviews', methods=['POST'])
@login_required
def post_review(item_id):
    form = ReviewSubmitForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review(
            user_id=current_user.id,
            item_id=item_id,
            rating=form.data['rating'],
            comment=form.data['comment']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
