"""empty message

Revision ID: b7bf7771937e
Revises: c857df5a7dd5
Create Date: 2018-11-26 23:28:21.694602

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b7bf7771937e'
down_revision = 'c857df5a7dd5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('bank', sa.Column('district', sa.String(length=50), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('bank', 'district')
    # ### end Alembic commands ###
