"""remove img address

Revision ID: 6e3a1b55848e
Revises: 76c5489dd4f9
Create Date: 2024-05-30 15:13:59.038699

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '6e3a1b55848e'
down_revision = '76c5489dd4f9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('student', 'avatar')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('student', sa.Column('avatar', mysql.VARCHAR(length=255), nullable=True))
    # ### end Alembic commands ###