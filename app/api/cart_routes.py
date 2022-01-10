from flask import Blueprint
from flask_login import current_user, login_required

from app.models import CartItem, Item


cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/')
@login_required
def cart_items():
    cart_items = CartItem.query.filter(CartItem.user_id == current_user.id).join(Item).all()
    return {'cartItems': [cart_item.to_dict() for cart_item in cart_items]}
