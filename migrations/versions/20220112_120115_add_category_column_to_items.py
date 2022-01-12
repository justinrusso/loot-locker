"""add category column to items

Revision ID: 366a6fa49471
Revises: a0a65e21f96f
Create Date: 2022-01-12 12:01:15.398481

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '366a6fa49471'
down_revision = 'a0a65e21f96f'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('items', sa.Column('category_id', sa.Integer, nullable=False))
    op.drop_table('categories_to_items')

def downgrade():
    op.drop_column('items', 'category_id')
    op.create_table('categories_to_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('item_id', sa.Integer(), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ),
    sa.ForeignKeyConstraint(['item_id'], ['items.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
