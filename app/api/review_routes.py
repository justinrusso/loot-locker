from flask import Blueprint, request, abort
from flask_login import current_user, login_required
from app.forms import ReviewForm, DeleteReviewForm, validation_errors_to_error_messages

from app.models import db, Review, ReviewSummary, Item

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review.query.get(review_id)
        summary = ReviewSummary.query.get(review.item_id)

        summary.ratings_total -= review.rating

        review.rating = int(form.data['rating'])
        review.comment = form.data['comment']

        summary.ratings_total += review.rating

        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    form = DeleteReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review.query.get(review_id)
        summary = ReviewSummary.query.get(review.item_id)

        summary.num_of_reviews -= 1
        summary.ratings_total -= review.rating

        db.session.delete(review)
        db.session.commit()
        return {'message': 'Review successfully deleted.',
                'reviewId': review_id}


@review_routes.route('/data/<int:review_summary_id>', methods=['GET'])
def get_summary(review_summary_id):
    summary = ReviewSummary.query.get(review_summary_id)

    if not summary:
        return abort(404)

    return summary.to_dict()


@review_routes.route('/data/test', methods=['GET'])
def get_data():
    item = Item.query.get(1)

    return {'data': item.review_data[0].to_dict()}
