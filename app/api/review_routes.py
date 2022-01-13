from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms import ReviewForm, DeleteReviewForm, validation_errors_to_error_messages

from app.models import db, Review, ReviewSummary

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

        review.rating = form.data['rating']
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

        summary.num_of_ratings -= 1
        summary.ratings_total -= review.rating

        db.session.delete(review)
        db.session.commit()
        return {'message': f'Review {review_id} successfully deleted.'}
