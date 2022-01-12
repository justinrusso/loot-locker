from flask_wtf import FlaskForm
from wtforms import SubmitField


class DeleteReviewForm(FlaskForm):
    delete = SubmitField('Delete')
