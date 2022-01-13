import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components"

import { addCartItem } from "../../store/cart-items";
import { getAnItem, deleteItem, editItem } from "../../store/items"
import { selectUser } from "../../store/session";
import { useAuthModal } from "../../context/AuthModalProvider";

const StyledItemPageDiv = styled.div`
      display: flex;
      padding-left: 10vw;
      padding-right: 10vw;
      margin-top: 4vh;

      #left-side-page-container {
            width: 45vw;
      }

      #item-image-container {
            position: relative;
            display: flex;
            justify-content: center;
            border: 1px solid lightgrey;
            border-radius: 8px;
            box-shadow: 2px 2px 5px grey;
      }

      #item-image {
            display: flex;
            max-width: 100%;
            max-height: 100%;
            border-radius: 8px;
      }

      #edit-image-button {
            padding: 4px;
            border: 1px solid black;
            border-radius: 50%;
            position: absolute;
            right: 1vw;
            top: 2vh;
      }

      #edit-image-image {
            height: 4vh;
            padding: 5px;
      }

      #item-info-container {
            height: 100vh;
            display: flex;
            flex-direction: column;
            width: 30vw;
            // padding-top: 1%;
            // padding-left:2vw;
            margin-left: 5%;

            span {
                  font-weight: bolder;
            }
      }

      .edit-item-div {
            height: 7vh;
            background-color: grey;
            display: flex;
            align-items: center;

            form {
                  display: flex;
                  align-items: center;
                  height: 100%;
                  width: 80%;
            }

            input {
                  padding-left: 1vw;
                  border: 2px solid black;
                  border-radius: 30px;
                  // background-color: cyan;
                  height: 80%;
                  width: 100%;
            }
      }

      #item-seller {
            margin-bottom: 10vh;
            font-size: x-large;
      }

      #item-name {
            // background-color: grey;
            display: flex;
            position: relative;
            margin-bottom: 2vh;
            font-size: xx-large;

            #item-name-span {
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  width: 70%;
                  font-weight: normal;
                  padding-left: 0;
            }

            #name-edit-button {
                  position: relative;
                  cursor: pointer;
                  // background-color: lime;
                  padding: 0;
                  height: 5vh;
            }

            .edit {
                  bottom: -55px;
                  right: 2vw;
            }

            .edit-button:hover {
                  + .edit {
                        visibility: visible;
                  }
            }
      }

      #edit-icon-arrow-box-container {
            position: relative;
            // background-color: blue;
            display: flex;
            flex-direction: column;
            width: 5vw;
            height: 5vh;
            // justify-content: center;
            align-items: center;

            .edit-button {
                  margin: 0;
                  padding: 0;
            }

            .arrow_box {
                  // position: relative;
                  left: 0;

            }
      }

      #item-price {
            display: flex;
            position: relative;
            align-items: center;
            font-size: xx-large;
            font-weight: bolder;

            .is-in-stock-span {
                  font-size: large;
                  font-weight: normal;
                  position: relative;
                  left: 15vw;
            }

            .edit-button:hover {
                  + .arrow_box {
                        visibility: visible;
                  }
            }

            .arrow_box {
                  // visibility: visible
            }
      }

      #coins-icon {
            margin-right: 0.5vw
      }

      #item-stock {
            display: flex;
            align-items: center;
            margin-top: 2vh;
            font-size: xx-large;
      }

      #add-to-cart-button, #description-button, #delete-item-button {
            margin-bottom: 1vh;
            padding: 1.5vh 0;
            margin-top: 10vh;
            font-size: large;
            border: 2px solid black;
            border-radius: 30px;
      }

      #delete-item-button {
            height: 5vh;
            // overflow: hidden;
            position: relative;
            display: flex;
            align-items: center;
            margin-top: 0;
            margin-bottom: 2vh;
            i {
                  color: crimson;
                  margin-right: 0.5vw;
            }
            border-radius: 30px;
            justify-content: center;
      }

      #delete-item-button:hover {
            .arrow_box {
                  visibility: visible;
            }
      }

      #dragon-icon {
            display: flex;
            height: 5vh;
            margin-right: 0.5vw;
      }

      .arrow_box {
            z-index: 2;
            display: flex;
            font-size: small;
            justify-content: center;
            align-items: center;
            width: 7vw;
            height: 4vh;
            background-color: black;
            color: #fff;
            position: absolute;
            bottom: -5.8vh;
            border-radius: 10px;
            visibility: hidden;
      }

      .arrow_box:after {
            content: " ";
            position: absolute;
            right: 2.7vw;
            top: -1vh;
            border-top: none;
            border-right: 15px solid transparent;
            border-left: 15px solid transparent;
            border-bottom: 15px solid black;
      }

      #description-button {
            display: flex;
            justify-content: space-between;
            margin-top: 1vh;
            padding-left: 10%;
            padding-right: 10%;
      }

      .edit-button {
            cursor: pointer;
            padding: 2px;
            display: flex;
            height: 5vh;
            margin-left: 0.5vw;
            position: relative;
            bottom: 2px;
      }

      #item-description {
            line-height: 2;
            margin-top: 2vh;
            overflow: hidden;
            height: 20vh;
      }
`
const StyledReviewsSectionDiv = styled.div`
      // background-color: lime;
      margin-top: 5vh;

      #reviews-div {
            height: 6vh;
            display: flex;
            margin-bottom: 4vh;
      }

      #reviews-amt {
            font-size: x-large;
            display: flex;
            align-items: center;
      }

      #reviews-stars-div {
            display: flex;
            align-items: center;
            margin-left: 1vw;
      }

      .star {
            height: 50%;
            padding: 0 1px;
            display: flex;
      }
      `
const StyledReviewCard = styled.div`
      width: 100%;
      // background-color: lightgrey;
      // margin-top: 2vh;
      margin-bottom: 6vh;


      span {
            font-size: x-large;
      }

      .review-user-and-date {
            // background-color: teal;
            display: flex;
            align-items: center;
            height: 5vh;
            margin-bottom: 0.8vh;
      }

      .profile-icon {
            // background-color: teal;
            height: 110%;
            border: 1px solid black;
            margin-right: 0.5vw;
            padding: 5px;
            border-radius: 50%;
      }

      .review-post-date {
            color: grey;
            margin-left: 1vw;
      }

      .review-star-rating {
            // background-color: salmon;
            padding: 0 1vw;
            display: flex;
            align-items: center;
            height: 5vh;
      }

      .star {
            height: 50%;
            padding: 0 1px;
            display: flex;
      }

      .review-comment {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            // background-color: green;
            font-size: large;
            padding: 0 1vw;
      }
      `
      /**
       *
 * @param {number} stock The amount of stock remaining of the item
 */
const getCartButtonMessage = (stock) => {
      if (stock === 0) {
            return 'Out of stock'
      }

      let messageBase = 'Add to cart';

      if (stock <= 5) {
            messageBase += ` | Only ${stock} available`
      }

      return messageBase;
}

const ItemPage = () => {
      const { itemId } = useParams()
      const authModal = useAuthModal();
      const dispatch = useDispatch();
      const history = useHistory();


      const testReview = {
            poster: "Link",
            rating: 5,
            comment:
            `
            Would buy again, but Tingle will only sell me one. Guess I have to go blow up some rocks to find another one
            Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda ZeldaZelda Zelda ZeldaZelda Zelda Zelda
            Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda
            Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda Zelda
            Zelda Zelda ZeldaZelda Zelda ZeldaZelda Zelda ZeldaZelda Zelda ZeldaZelda Zelda Zelda
            Zelda Zelda ZeldaZelda Zelda ZeldaZelda Zelda ZeldaZelda Zelda ZeldaZelda Zelda ZeldaZelda Zelda ZeldaZelda Zelda Zelda
            Zelda Zelda ZeldaZelda Zelda ZeldaZelda Zelda ZeldaZelda Zelda ZeldaZelda Zelda ZeldaZelda Zelda ZeldaZelda Zelda Zelda
            `,
            created_at: "2021-09-08 19:24:00"
      }

      const testDate = new Date(testReview.created_at)

      const renderStarRating = (rating) => {
            let content = []
            let key = 5
            // breaks when rating = 1
            for (let i = 0; i < rating; i++) {
                  content.push(<img key={i} className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png"></img>)
            }
            //if rating < 5, populate rest of stars div with grey ones
            while (content.length < 5) {
                  content.push(<img key={key} className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/931062582440255538/star-grey.png"></img>)
                  key++
            }
            return content
      }

      useEffect(() => {
            dispatch(getAnItem(itemId))
      }, [itemId])

      const item = useSelector(state => state.items.entities.items[itemId])
      const user = useSelector(selectUser())

      const [showDescription, setShowDescription] = useState(true)
      const [showEditName, setShowEditName] = useState(false)

      const handleSetShowDescription = () => {
            setShowDescription(!showDescription)
      }

      const handleAddToCart = async () => {
            if (!user) {
                  authModal.show();
                  return;
            }
            await dispatch(addCartItem({
                  itemId,
                  quantity: 1
            }))
      }

      const handleNewItemName = async () => {
            let newName = document.querySelector('#new-item-name').value
            setShowEditName(false)
      }

      const handleDeleteItem = async () => {
            dispatch(deleteItem(itemId))
            history.push("/")
      }

      if (!item) {
            return <></>
      }

      return(
            <StyledItemPageDiv>
                  <div id="left-side-page-container">
                        <div id="item-image-container">
                              <img id="item-image" src={item.image}></img>
                              {item.userId === user?.id && <button id="edit-image-button">
                                    <img id="edit-image-image" src="https://cdn.discordapp.com/attachments/858135958729392152/931230209666088960/camera.png"></img>
                              </button>}
                        </div>
                        <StyledReviewsSectionDiv>
                              <div id="reviews-div">
                                    <span id="reviews-amt">50 shop reviews</span>
                                    <div id="reviews-stars-div">
                                          <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png"></img>
                                          <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png"></img>
                                          <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png"></img>
                                          <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png"></img>
                                          <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png"></img>
                                    </div>
                              </div>
                        </StyledReviewsSectionDiv>
                        {/* test review cards */}
                        <StyledReviewCard>
                              <div className="review-user-and-date">
                                    <img className="profile-icon" src="https://cdn.discordapp.com/attachments/858135958729392152/931055275056717844/skull.png"></img>
                                    <span className="reviewer-name">{testReview.poster}</span>
                                    <span className="review-post-date">{testDate.toString().split(" ").slice(1, 4).join(" ")}</span>
                              </div>
                              <div className="review-star-rating">{renderStarRating(testReview.rating)}</div>
                              <div className="review-comment">{testReview.comment}</div>
                        </StyledReviewCard>
                        <StyledReviewCard>
                              <div className="review-user-and-date">
                                    <img className="profile-icon" src="https://cdn.discordapp.com/attachments/858135958729392152/931055275056717844/skull.png"></img>
                                    <span className="reviewer-name">{testReview.poster}</span>
                                    <span className="review-post-date">{testDate.toString().split(" ").slice(1, 4).join(" ")}</span>
                              </div>
                              <div className="review-star-rating">{renderStarRating(testReview.rating)}</div>
                              <div className="review-comment">{testReview.comment}</div>
                        </StyledReviewCard>
                        <StyledReviewCard>
                              <div className="review-user-and-date">
                                    <img className="profile-icon" src="https://cdn.discordapp.com/attachments/858135958729392152/931055275056717844/skull.png"></img>
                                    <span className="reviewer-name">{testReview.poster}</span>
                                    <span className="review-post-date">{testDate.toString().split(" ").slice(1, 4).join(" ")}</span>
                              </div>
                              <div className="review-star-rating">{renderStarRating(testReview.rating)}</div>
                              <div className="review-comment">{testReview.comment}</div>
                        </StyledReviewCard>
                  </div>
                  <div id="item-info-container">
                        {item.userId === user?.id && <button id="delete-item-button" onClick={handleDeleteItem}>
                              <img id="dragon-icon" src="https://cdn.discordapp.com/attachments/858135958729392152/930590127099613214/dragon-front.png"></img>
                              <span>Incinerate this item</span>
                              <div className="arrow_box">
                                    <span>Delete item</span>
                              </div>
                        </button>}
                        <div id="item-seller">{item.seller.username}</div>
                        {!showEditName && <div id="item-name">
                              <span id="item-name-span">Heart Container | +1 Heart hello hello hello hello hello hello hello hello hello hello hello hello</span>
                              {item.userId === user?.id && <div id="edit-icon-arrow-box-container">
                                    <img id="name-edit-button"
                                    onClick={() => setShowEditName(true)}
                                    src="https://cdn.discordapp.com/attachments/858135958729392152/930594787944456282/bookandfeather.png"></img>
                                    <div className="arrow_box edit">
                                          <span>Edit name</span>
                                    </div>
                              </div>}
                        </div>}
                        {showEditName && <div className="edit-item-div">
                              <form>
                                    <input id="new-item-name" placeholder="Give your item a new name"></input>
                              </form>
                              <img className="edit-button" onClick={handleNewItemName} src="https://cdn.discordapp.com/attachments/858135958729392152/931251654504873984/save-changes.png"></img>
                        </div>
}
                        <div id="item-price">
                              <i className="fas fa-coins" id="coins-icon"></i>
                              {item.price}
                              {item.userId === user?.id && <>
                                    <img className="edit-button" src="https://cdn.discordapp.com/attachments/858135958729392152/930594787944456282/bookandfeather.png"></img>
                                    <div className="arrow_box edit">
                                          <span>Edit price</span>
                                    </div>
                              </>}

                              {item.stock > 0 && <span className="is-in-stock-span"><i className="fas fa-check"></i> In stock</span>}
                              {item.stock === 0 && <span className="is-in-stock-span"><i className="fas fa-times"></i> Out of stock</span>}
                        </div>
                        {item.userId === user?.id && <div id="item-stock">
                              <span id="stock-span">Stock: {item.stock}</span>
                              <img className="edit-button" src="https://cdn.discordapp.com/attachments/858135958729392152/930594787944456282/bookandfeather.png"></img>
                        </div>}
                        {user?.id !== item.seller.id && (
                              <button
                                    id="add-to-cart-button"
                                    disabled={item.stock === 0}
                                    onClick={handleAddToCart}
                              >
                                    {getCartButtonMessage(item.stock)}
                              </button>
                        )}
                        <button onClick={handleSetShowDescription}id="description-button">
                              <span>Description</span>
                              {!showDescription && <i className="fas fa-chevron-down"></i>}
                              {showDescription && <i className="fas fa-chevron-up"></i>}
                        </button>
                        {showDescription && <div id="item-description">{item.description}</div>}
                  </div>
            </StyledItemPageDiv>
      )
}

export default ItemPage
