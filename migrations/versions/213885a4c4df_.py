"""empty message

Revision ID: 213885a4c4df
Revises:
Create Date: 2021-01-24 15:58:41.403836

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '213885a4c4df'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('commodities',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=50), nullable=False),
                    sa.Column('symbol', sa.String(length=50), nullable=False),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('fullname', sa.String(
                        length=50), nullable=False),
                    sa.Column('username', sa.String(
                        length=40), nullable=False),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('hashed_password', sa.String(
                        length=255), nullable=False),
                    sa.Column('balance', sa.Numeric(
                        precision=10, scale=2), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )
    op.create_table('price_points',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('commodity_id', sa.Integer(), nullable=False),
                    sa.Column('high', sa.Numeric(
                        precision=8, scale=2), nullable=False),
                    sa.Column('low', sa.Numeric(
                        precision=8, scale=2), nullable=False),
                    sa.Column('open_price', sa.Numeric(
                        precision=8, scale=2), nullable=False),
                    sa.Column('last_price', sa.Numeric(
                        precision=8, scale=2), nullable=False),
                    sa.Column('price_date', sa.DateTime(), nullable=False),
                    sa.ForeignKeyConstraint(
                        ['commodity_id'], ['commodities.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('transactions',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('commodity_id', sa.Integer(), nullable=False),
                    sa.Column('amount', sa.Integer(), nullable=False),
                    sa.Column('price', sa.Numeric(
                        precision=8, scale=2), nullable=False),
                    sa.Column('buy_sell', sa.Boolean(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.ForeignKeyConstraint(
                        ['commodity_id'], ['commodities.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('watchlists',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('watchlists-commodities',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('commodity_id', sa.Integer(), nullable=False),
                    sa.Column('watchlist_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(
                        ['commodity_id'], ['commodities.id'], ),
                    sa.ForeignKeyConstraint(
                        ['watchlist_id'], ['watchlists.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('watchlists')
    op.drop_table('transactions')
    op.drop_table('price_points')
    op.drop_table('users')
    op.drop_table('commodities')
    # ### end Alembic commands ###
