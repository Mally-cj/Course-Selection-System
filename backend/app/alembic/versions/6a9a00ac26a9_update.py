"""update

Revision ID: 6a9a00ac26a9
Revises: 6995af1ccc5a
Create Date: 2024-05-05 14:52:47.304109

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '6a9a00ac26a9'
down_revision = '6995af1ccc5a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('student', sa.Column('student_id', sqlmodel.sql.sqltypes.AutoString(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('student', 'student_id')
    # ### end Alembic commands ###