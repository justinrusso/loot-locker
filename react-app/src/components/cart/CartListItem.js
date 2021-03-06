import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeCartItemQuantity, removeCartItem } from "../../store/cart-items";
import Button from "../common/Button";
import QuantitySelector from "./QuantitySelector";

const CartListItemRoot = styled.li`
  display: flex;
  padding: 24px 0;
  gap: 24px;

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.divider};
  }

  h3 {
    font-family: ${(props) => props.theme.typography.fontSans};
  }

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }

  .info {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    gap: 16px;
  }

  .actions {
    display: flex;
    padding: 8px 0;
    gap: 16px;
    align-items: center;
  }

  .price i {
    padding-right: 0.5ch;
  }
`;

/**
 * A list item for the cart to display an individual item
 * @param {{
 *   imgSrc: string;
 *   itemId: number;
 *   name: string;
 *   price: number;
 *   quantity: number;
 * }} props
 */
const CartListItem = ({ imgSrc, itemId, name, price, quantity }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = async (newValue) => {
    if (newValue === quantity) {
      return;
    }
    await dispatch(changeCartItemQuantity({ itemId, quantity: newValue }));
  };

  const handleRemove = async () => {
    await dispatch(removeCartItem(itemId));
  };

  return (
    <CartListItemRoot>
      <img src={imgSrc} alt="" />
      <div className="info">
        <div>
          <Link to={`/items/${itemId}`}>
            <h3>{name}</h3>
          </Link>
          <div className="actions">
            <QuantitySelector
              value={quantity}
              onChange={handleQuantityChange}
            />
            <Button variant="text" onClick={handleRemove}>
              Remove
            </Button>
          </div>
        </div>
        <div className="price">
          <i className="fas fa-coins" />
          {price}
        </div>
      </div>
    </CartListItemRoot>
  );
};

CartListItem.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  itemId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartListItem;
