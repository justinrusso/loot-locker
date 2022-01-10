from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from sqlalchemy import or_
from app.models import User


# def user_exists(form, field):
#     # Checking if user exists
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if not user:
#         raise ValidationError("Email provided not found")


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    cred = form.data["cred"]
    user = User.query.filter(or_(User.email == cred, User.username == cred)).first()
    if not user:
        raise ValidationError("Login failed with given credentials")
    elif not user.check_password(password):
        raise ValidationError("Login failed with given credentials")


class LoginForm(FlaskForm):
    cred = StringField("cred", validators=[DataRequired()])
    password = StringField("password", validators=[DataRequired(), password_matches])
