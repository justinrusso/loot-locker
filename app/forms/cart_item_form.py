from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Item


def item_exists(form, field):
    item_id = field.data
    item = Item.query.get(item_id)
    if not item:
        raise ValidationError('Item provided not found')

def above_zero(form, field):
    quantity = field.data
    if quantity <= 0:
        raise ValidationError('Quantity must 1 or greater')

class CartItemForm(FlaskForm):
    itemId = IntegerField(validators=[DataRequired(), item_exists])
    quantity = IntegerField(validators=[DataRequired(), above_zero])
