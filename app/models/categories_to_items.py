from sqlalchemy.orm import query
from sqlalchemy.sql import func

from .db import db

class CategoryToItem(db.Model):
    __tablename__ = 'categories_to_items'

    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

    item = db.relationship('Item')
    category = db.relationship('Category')
