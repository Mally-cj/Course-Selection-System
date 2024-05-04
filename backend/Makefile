migrate:
	alembic revision --autogenerate -m "update"
	alembic upgrade head
init:
	# Let the DB start
	python /app/app/backend_pre_start.py
	# Run migrations
	alembic upgrade head
	# Create initial data in DB
	python /app/app/initial_data.py
dev:
	python3 app/main.py