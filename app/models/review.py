from .db import db, add_prefix_for_prod, SCHEMA, environment
from sqlalchemy.sql import func


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("items.id")), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    created_at = db.Column(
        db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(
        db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False
    )

    item = db.relationship('Item', back_populates='reviews')
    user = db.relationship('User', back_populates='reviews')

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "user": self.user.username,
            "itemId": self.item_id,
            "comment": self.comment,
            "rating": self.rating,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
