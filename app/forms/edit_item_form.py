import requests

from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Item

# the way API is set up, only the item fields that are being updated are supplied with the request
# thus, all fields in this form are optional, but if they are present, they must be validated

def not_empty(form, field):
    value = field.data

    # we only hit this if they do in fact provide this field, but with an empty string as the value
    # if they just aren't updating this field, the value will be None, so we're good
    if value == "":
        raise ValidationError('Field cannot be blank')

def valid_img_url(form, field):
    image_url = field.data

    if image_url == None:
        return

    image_formats = ("image/png", "image/jpeg", "image/jpg")
    r = requests.head(image_url)
    if r.headers["content-type"] not in image_formats:
      raise ValidationError('Must provide a valid image url')

# may want to add some more robust validators later
class EditItemForm(FlaskForm):
    name = StringField(validators=[not_empty])
    description = StringField(validators=[not_empty])
    image = StringField(validators=[valid_img_url])
    price = IntegerField(validators=[not_empty])
    stock = IntegerField(validators=[not_empty])
