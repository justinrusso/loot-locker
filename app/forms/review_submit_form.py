from flask_wtf import FlaskForm
from wtforms import RadioField, TextAreaField
from wtforms.validators import DataRequired


class ReviewSubmitForm(FlaskForm):
    rating = RadioField('Rating', choices=[
                        (1, '1'),
                        (2, '2'),
                        (3, '3'),
                        (4, '4'),
                        (5, '5'),
                        ], validators=[DataRequired()])
    comment = TextAreaField('Comment')
