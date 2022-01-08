from sqlalchemy import PrimaryKeyConstraint
from sqlalchemy.sql import func

from .db import db


class CartItem(db.Model):
    __tablename__ = 'cart_items'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        PrimaryKeyConstraint(user_id, item_id, name='user_cart_item_pk'),
    )

    item = db.relationship('Item')
