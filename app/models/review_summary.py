from .db import db, environment, SCHEMA, add_prefix_for_prod


class ReviewSummary(db.Model):
    __tablename__ = 'review_summaries'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    item_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("items.id")), primary_key=True, )
    num_of_reviews = db.Column(db.Integer, nullable=False)
    ratings_total = db.Column(db.Integer, nullable=False)

    item = db.relationship(
        'Item', back_populates='review_data', uselist=False)

    def to_dict(self):
        return {
            'count': self.num_of_reviews,
            'rating': round(float(self.ratings_total / self.num_of_reviews), 2) if self.num_of_reviews > 0 else 0
        }
