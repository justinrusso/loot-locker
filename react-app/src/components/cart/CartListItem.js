import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CartListItemRoot = styled.li`
  display: flex;
  padding: 24px 0;
  gap: 24px;

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.divider};
  }

  img {
    width: 50px;
  }

  .info {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    gap: 16px;
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
  return (
    <CartListItemRoot>
      <img src={imgSrc} alt="" />
      <div className="info">
        <div>
          <Link to={`/items/${itemId}`}>
            <h3>{name}</h3>
          </Link>
          <div>
            <div>Quantity: {quantity}</div>
          </div>
        </div>
        <div className="price">
          <i className="fas fa-coins" id="coins-icon" />
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
