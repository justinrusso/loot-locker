from .cart_item_form import CartItemForm
from .create_item_form import CreateItemForm
from .login_form import LoginForm
from .signup_form import SignUpForm
from .review_form import ReviewForm
from .review_delete_form import DeleteReviewForm
from .delete_item_form import DeleteItemForm
from .edit_item_form import EditItemForm


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{error}")
    return errorMessages

def validation_errors_to_error_messages_dict(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a dict
    """
    errorMessages = dict()
    for field in validation_errors:
        errorMessages[field] = []
        for error in validation_errors[field]:
            errorMessages[field].append(f"{error}")
    return errorMessages