from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms import CartItemForm, validation_errors_to_error_messages

from app.models import CartItem, Item, db


cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/')
@login_required
def cart_items():
    cart_items = CartItem.query.filter(CartItem.user_id == current_user.id).join(Item).all()
    return {'cartItems': [cart_item.to_dict() for cart_item in cart_items]}

@cart_routes.route('/', methods=['POST'])
@login_required
def add_cart_item():
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        cart_item = CartItem(
            user_id=current_user.id,
            item_id=form.data['itemId'],
            quantity=form.data['quantity']
        )
        db.session.add(cart_item)
        db.session.commit()
        return cart_item.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400
