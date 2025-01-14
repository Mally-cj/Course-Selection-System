"""update

Revision ID: 70647fac3f53
Revises: e0b127e18040
Create Date: 2024-05-05 14:55:08.112185

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '70647fac3f53'
down_revision = 'e0b127e18040'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('teacher', sa.Column('name', sqlmodel.sql.sqltypes.AutoString(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('teacher', 'name')
    # ### end Alembic commands ###
