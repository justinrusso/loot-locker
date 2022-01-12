from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms import validation_errors_to_error_messages

from app.models import db, Review

review_routes = Blueprint('reviews', __name__)
