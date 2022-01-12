from .cart_item_form import CartItemForm
from .login_form import LoginForm
from .signup_form import SignUpForm
from .review_form import ReviewForm


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{error}")
    return errorMessages
