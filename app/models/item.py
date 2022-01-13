from sqlalchemy.sql import func

from .db import db


class Item(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(
        "categories.id"), nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(
        db.DateTime, server_default=func.now(), onupdate=func.now())

    category = db.relationship('Category', back_populates='items')
    seller = db.relationship('User', back_populates='items')
    review_data = db.relationship(
        'ReviewSummary', back_populates='item', uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'categoryId': self.category_id,
            'name': self.name,
            'description': self.description,
            'image': self.image,
            'price': self.price,
            'stock': self.stock,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'seller': self.seller.to_dict(),
            'category': self.category.name,
            'review_data': self.review_data.to_dict() if self.review_data else None
        }
