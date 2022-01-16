from flask_wtf import FlaskForm
import requests
from wtforms import IntegerField
from wtforms.fields.core import StringField
from wtforms.validators import DataRequired, ValidationError

from app.models.category import Category


def category_exists(form, field):
    category_id = field.data
    category = Category.query.get(category_id)
    if not category:
        raise ValidationError("Category provided not found")

def valid_img_url(form, field):
    image_url = field.data

    if image_url == None:
        return

    image_formats = ("image/png", "image/jpeg", "image/jpg")
    r = requests.head(image_url)
    if r.headers["content-type"] not in image_formats:
      raise ValidationError('Must provide a valid image url')

def zero_or_above(form, field):
    if field.data < 0:
        raise ValidationError('Value must be 0 or higher')

class CreateItemForm(FlaskForm):
    name = StringField(validators=[DataRequired()])
    categoryId = IntegerField(validators=[DataRequired(), category_exists])
    description = StringField(validators=[DataRequired()])
    image = StringField(validators=[DataRequired(), valid_img_url])
    price = IntegerField(validators=[DataRequired(), zero_or_above])
    stock = IntegerField(validators=[DataRequired(), zero_or_above])
