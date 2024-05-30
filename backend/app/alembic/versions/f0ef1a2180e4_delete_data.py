"""delete data

Revision ID: f0ef1a2180e4
Revises: 8baa6b11fa6c
Create Date: 2024-05-30 11:34:43.174245

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = 'f0ef1a2180e4'
down_revision = '8baa6b11fa6c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('student', 'data')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('student', sa.Column('data', sa.BLOB(), nullable=True))
    # ### end Alembic commands ###
