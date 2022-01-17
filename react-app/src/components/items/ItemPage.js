import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components"

import { addCartItem } from "../../store/cart-items";
import { getAnItem, deleteItem, editItem } from "../../store/items"
import { selectUser } from "../../store/session";
import { useAuthModal } from "../../context/AuthModalProvider";

import ItemReviews from "../reviews/ItemReviews";

const StyledItemPageDiv = styled.div`
      display: flex;
      padding-left: 10vw;
      padding-right: 10vw;
      margin-top: 4vh;

      // TODO: media screens
      // @media screen and (max-width: 900px) {
      //       flex-direction: column;
      //       padding: 0;
      //       align-items: center;
      // }

      #left-side-page-container {
            width: 45vw;
      }

      .edit-item-div {
            height: 7vh;
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
                  height: 80%;
                  width: 100%;
            }
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
            max-height: 100%;
            max-width: 100%;
            border-radius: 8px;
      }

      #edit-image {
            position: absolute;
            top: 1vh;
            right: 4.5vw;
            width: 30vw;
            height: 7vh;
            form {
                  width: 100%;
                  height: 100%;
            }
      }


      #new-image-input {
            position: absolute;
            width: 100%;
            height: 80%;
            top: 1.2vh;
            right: 1vw;
      }

      #camera-and-image-arrow-box {
            display: flex;
            justify-content: center;
            position: absolute;
            right: 2vw;
            top: 2vh;
            #edit-image-button:hover {
                  + .arrow_box {
                        visibility: visible;
                  }
            }
            span {
                  font-weight: bold;
            }
      }

      #edit-image-button {
            padding: 4px;
            cursor: pointer;
            border: 1px solid black;
            border-radius: 50%;
            position: relative;
      }

      #edit-image-image {
            height: 5vh;
            padding: 5px;
      }

      #item-info-container {
            height: 100vh;
            display: flex;
            flex-direction: column;
            width: 30vw;
            margin-left: 5%;
            span {
                  font-weight: bolder;
            }
      }

      #item-seller {
            margin-bottom: 6vh;
            font-size: x-large;
      }

      #item-name {
            display: flex;
            position: relative;
            font-size: xx-large;
            #item-name-span {
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  width: 85%;
                  font-weight: normal;
                  padding-left: 0;
            }
            #name-edit-button {
                  position: relative;
                  cursor: pointer;
                  bottom: 1vh;
                  padding: 0;
                  height: 5vh;
                  align-self: flex-start
            }
      }

      #book-and-name-arrow-box {
            margin-left: 0.5vw;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            #name-edit-button:hover {
                  + .arrow_box {
                        visibility: visible;
                  }
            }
            .arrow_box {
                  right: -2.2vw;
                  top: 6vh;
            }
      }

      #item-price {
            display: flex;
            position: relative;
            align-items: center;
            font-size: xx-large;
            font-weight: bolder;
            margin-top: 2vh;
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
      }
      #coins-icon {
            margin-right: 0.5vw
      }
      #new-item-price {
            width: 40%;
      }

      #book-and-price-arrow-box {
            position: relative;
            margin-left: 0.5vw;
            display: flex;
            justify-content: center;
            .edit-button {
                  margin-left: 0;
            }
            .edit-button:hover {
                  + .arrow_box {
                        visibility: visible;
                  }
            }
            .arrow_box {
                  font-weight: normal;
            }
      }

      #book-and-stock-arrow-box {
            display: flex;
            justify-content: center;
            position: relative;
            margin-left: 0.5vw;

            .edit-button:hover {
                  + .arrow_box {
                        visibility: visible;
                  }
            }

            .edit-button {
                  margin-left: 0;
            }

            .arrow_box {
                  bottom: -5.5vh;
            }
      }

      #item-stock {
            display: flex;
            align-items: center;
            margin-top: 1vh;
            font-size: xx-large;
      }

      #new-item-stock {
            width: 30%;
            font-size: medium;
      }

      #category-container {
            display: flex;
            align-items: center;
            margin-top: 5vh;
            margin-bottom: 5vh;
            img {
                  height: 7vh;
            }
            span {
                  font-size: x-large;
                  margin-left: 0.5vw;
            }
            form {
                  position: relative;
                  top: 0.5vh;
                  border-radius: 10px;
                  height: 5vh;
                  width: 40%;
                  select {
                        border: 2px solid black;
                        border-radius: 30px;
                        padding-left: 0.25vw;
                        height: 100%;
                        width: 100%;
                  }
            }
            #edit-category-and-arrow-box {
                  display: flex;
                  justify-content: center;
                  position: relative;
                  margin-left: 0.5vw;
                  img {
                        height: 5vh;
                        cursor: pointer;
                  }
                  span {
                        font-size: small;
                        margin-left: 0;
                  }
                  img:hover {
                        + .arrow_box {
                              visibility: visible;
                        }
                  }
            }
      }

      #add-to-cart-button, #description-button, #delete-item-button {
            margin-bottom: 1vh;
            padding: 1.5vh 0;
            font-size: large;
            border: 2px solid black;
            border-radius: 30px;
            font-weight: bold;
      }

      #delete-item-button {
            height: 6vh;
            cursor: pointer;
            position: relative;
            display: flex;
            align-items: center;
            margin-top: 0;
            margin-bottom: 2vh;
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
            height: 6vh;
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
            margin-top: 2vh;
            padding-left: 10%;
            padding-right: 10%;
            width: 100%;
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
            margin-top: 1vh;
            overflow: hidden;
            height: 20vh;
      }

      #description-button-and-edit-book {
            display: flex;
            align-items: center;
            position: relative;
      }

      #book-and-description-arrow-box {
            justify-content: center;
            display: flex;
            margin-left: 1vw;
            #edit-description-button:hover {
                  + .arrow_box {
                        visibility: visible;
                  }
            }
            #edit-description-button {
                  cursor: pointer;
                  position: relative;
                  height: 5vh;
                  right: 0;
            }
            .arrow_box {
                  bottom: -4vh;
                  width: 8vw;
            }
            .arrow_box:after {
                  right: 3.2vw;
            }
      }
      #edit-description-textarea {
            padding: 1vh 0.5vw;
            resize: vertical;
            width: 100%;
            height: 20vh;
            border-radius: 10px;
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
            Would buy again, but Tingle will only sell me one. Guess I have to go blow up some rocks to find another one.
            `,
            created_at: "2021-09-08 19:24:00"
      }

      const testDate = new Date(testReview.created_at)

      const renderStarRating = (rating) => {
            // TODO: add support for half star ratings, can probably just adjust this logic
            let content = []
            let key = 5
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

      const renderCategory = () => {
            // render a category div and icon based on the category of the item
            let src
            let text
            switch(item.category) {
                  case "Arms":
                        src = "https://cdn.discordapp.com/attachments/858135958729392152/932409968118878238/sword.png"
                        text = "Arm"
                        break
                  case "Armor":
                        src = "https://cdn.discordapp.com/attachments/858135958729392152/932351759110766633/shield.png"
                        text = "Armor"
                        break
                  case "Accessories":
                        src = "https://cdn.discordapp.com/attachments/858135958729392152/932410334055116850/amulet.png"
                        text = "Accessory"
                        break
                  case "Mounts":
                        src = "https://cdn.discordapp.com/attachments/858135958729392152/932410865171447848/pegasus.png"
                        text = "Mount"
                        break
                  case "Consumables":
                        src = "https://cdn.discordapp.com/attachments/858135958729392152/932411125037957171/bottle.png"
                        text = "Consumable"
                        break
            }

            return(
                  <div id="category-container">
                       {!showEditCategory && <>
                        <img src={src}></img>
                        <span>{text}</span>
                       </>}
                       {showEditCategory && <form onSubmit={(e) => e.preventDefault()}>
                              <select id="new-category">
                                    <option value="" selected>Select item category</option>
                                    <option value="Arms">Arms</option>
                                    <option value="Armor">Armor</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Mounts">Mounts</option>
                                    <option value="Consumables">Consumables</option>
                              </select>
                        </form>}
                       {item.userId === user?.id &&
                       <div id="edit-category-and-arrow-box">
                             {!showEditCategory && <img
                             src="https://cdn.discordapp.com/attachments/858135958729392152/930594787944456282/bookandfeather.png"
                             onClick={() => setShowEditCategory(true)}
                             ></img>}
                             {showEditCategory && <img
                             src="https://cdn.discordapp.com/attachments/858135958729392152/931251654504873984/save-changes.png"
                             onClick={() => handleEditItem("#new-category", "category")}
                             ></img>}
                             <div className="arrow_box">
                                    {!showEditCategory && <span>Edit category</span>}
                                    {showEditCategory && <span>Save category</span>}
                              </div>
                        </div>}
                  </div>
            )

      }

      useEffect(() => {
            dispatch(getAnItem(itemId))
      }, [itemId])

      const item = useSelector(state => state.items.entities.items[itemId])
      const user = useSelector(selectUser())

      const [showDescription, setShowDescription] = useState(true)
      const [showEditDescription, setShowEditDescription] = useState(false)
      const [showEditName, setShowEditName] = useState(false)
      const [showEditPrice, setShowEditPrice] = useState(false)
      const [showEditStock, setShowEditStock] = useState(false)
      const [showEditImg, setShowEditImg] = useState(false)
      const [showEditCategory, setShowEditCategory] = useState(false)

      const shortOrLongButton = () => {
            if (user?.id === item.seller.id) {
                  return {"width": "85%"}
            }
            return {"width": "100%"}
      }

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

      const handleEditItem = async (cssSelector, fieldName) => {
            let categoryId
            let newValue = document.querySelector(cssSelector).value

            // turn the categories into their respective ID counterparts
            if (fieldName === 'category') {
                  switch(newValue) {
                        case 'Arms':
                              categoryId = 1
                              break
                        case 'Armor':
                              categoryId = 2
                              break
                        case 'Accessories':
                              categoryId = 3
                              break
                        case 'Mounts':
                              categoryId = 4
                              break
                        case 'Consumables':
                              categoryId = 5
                              break
                  }
            }

            switch(fieldName) {
                  case 'name':
                        dispatch(editItem({ itemId, item: { name: newValue }}))
                        setShowEditName(false)
                        break
                  case 'description':
                        dispatch(editItem({ itemId, item: { description: newValue }}))
                        setShowEditDescription(false)
                        break
                  case 'image':
                        dispatch(editItem({ itemId, item: { image: newValue } }))
                        setShowEditImg(false)
                        break
                  case 'price':
                        dispatch(editItem({ itemId, item: { price: newValue } }))
                        setShowEditPrice(false)
                        break
                  case 'stock':
                        dispatch(editItem({ itemId, item: { stock: newValue } }))
                        setShowEditStock(false)
                        break
                  case 'category':
                        dispatch(editItem({ itemId, item: { category: categoryId }}))
                        setShowEditCategory(false)
                        break

            }
      }

      const handleDeleteItem = async () => {
            dispatch(deleteItem(itemId))
            history.push("/")
      }

      if (!item) {
            return <></>
      }

      return (
            <StyledItemPageDiv>
                  <div id="left-side-page-container">
                        <div id="item-image-container">
                              <img id="item-image" src={item.image}></img>
                              {showEditImg &&
                              <div className="edit-item-div" id="edit-image">
                                    <form onSubmit={(e) => {
                                          e.preventDefault()
                                          handleEditItem("#new-image-input", "image")
                                    }}>
                                          <input id="new-image-input" placeholder="New image URL"></input>
                                    </form>
                              </div>}
                              {item.userId === user?.id &&
                              <div id="camera-and-image-arrow-box">
                                    <button
                                    onClick={() => {
                                          if (showEditImg) {
                                                handleEditItem("#new-image-input", "image")
                                          }
                                          setShowEditImg(!showEditImg)}}
                                    id="edit-image-button">
                                          {!showEditImg && <img id="edit-image-image" src="https://cdn.discordapp.com/attachments/858135958729392152/931230209666088960/camera.png"></img>}
                                          {showEditImg && <img id="edit-image-image" src="https://cdn.discordapp.com/attachments/858135958729392152/931251654504873984/save-changes.png"></img>}
                                    </button>
                                    <div className="arrow_box">
                                          {!showEditImg && <span>Edit image</span>}
                                          {showEditImg && <span>Save image</span>}
                                    </div>
                              </div>}
                              {/* {showEditImg && item.userId === user?.id && <button
                              id="edit-image-button"
                              onClick={() => handleEditItem("#new-image-input", "image")}
                              >
                                    <img id="edit-image-image" src="https://cdn.discordapp.com/attachments/858135958729392152/931251654504873984/save-changes.png"></img>
                              </button>} */}
                        </div>
                        <ItemReviews itemId={itemId} user={user} reviewData={item.reviewData} />
                  </div>
                  <div id="item-info-container">
                        {item.userId === user?.id && <button id="delete-item-button" onClick={handleDeleteItem}>
                              <img id="dragon-icon"
                              src="https://cdn.discordapp.com/attachments/858135958729392152/930590127099613214/dragon-front.png"
                              ></img>
                              <span>Incinerate this item</span>
                              <div className="arrow_box">
                                    <span>Delete item</span>
                              </div>
                        </button>}
                        <div id="item-seller">{item.seller.username}</div>
                        {!showEditName &&
                        <div id="item-name">
                              <span id="item-name-span">{item.name}</span>
                              {item.userId === user?.id &&
                              <div id="book-and-name-arrow-box">
                                    <img id="name-edit-button"
                                    onClick={() => setShowEditName(true)}
                                    src="https://cdn.discordapp.com/attachments/858135958729392152/930594787944456282/bookandfeather.png"
                                    ></img>
                                    <div className="arrow_box">
                                          <span>Edit name</span>
                                    </div>
                              </div>}
                        </div>}
                        {showEditName &&
                        <div className="edit-item-div">
                              <form onSubmit={e => {
                                    e.preventDefault()
                                    handleEditItem("#new-item-name", "name")
                              }}>
                                    <input id="new-item-name" placeholder="Give your item a new name"></input>
                              </form>
                              <div id="book-and-name-arrow-box">
                                    <img id="name-edit-button"
                                    className="edit-button"
                                    onClick={() => handleEditItem("#new-item-name", "name")}
                                    src="https://cdn.discordapp.com/attachments/858135958729392152/931251654504873984/save-changes.png"
                                    ></img>
                                    <div className="arrow_box">
                                          <span>Save name</span>
                                    </div>
                              </div>
                        </div>}
                        {!showEditPrice &&
                        <div id="item-price">
                              <i className="fas fa-coins" id="coins-icon"></i>
                              {item.price}
                              {item.userId === user?.id &&
                              <div id="book-and-price-arrow-box">
                                    <img className="edit-button"
                                          src="https://cdn.discordapp.com/attachments/858135958729392152/930594787944456282/bookandfeather.png"
                                          onClick={() => setShowEditPrice(true)}
                                    ></img>
                                    <div className="arrow_box">
                                          <span>Edit price</span>
                                    </div>
                              </div>}

                              {item.stock > 0 && <span className="is-in-stock-span"><i className="fas fa-check"></i> In stock</span>}
                              {item.stock === 0 && <span className="is-in-stock-span"><i className="fas fa-times"></i> Out of stock</span>}
                        </div>}
                        {showEditPrice &&
                        <div className="edit-item-div" id="edit-price">
                              <form onSubmit={(e) => {
                                    e.preventDefault()
                                    handleEditItem("#new-item-price", "price")
                              }}>
                                    <input id="new-item-price" placeholder="New price (gold)"></input>
                                    <div id="book-and-price-arrow-box">
                                          <img className="edit-button"
                                          src="https://cdn.discordapp.com/attachments/858135958729392152/931251654504873984/save-changes.png"
                                          onClick={() => handleEditItem("#new-item-price", "price")}
                                          ></img>
                                          <div className="arrow_box">
                                                <span>Save price</span>
                                          </div>
                                    </div>
                              </form>
                              {item.stock > 0 && <span style={{ fontWeight: 'normal' }} className="is-in-stock-span"><i className="fas fa-check"></i> In stock</span>}
                              {item.stock === 0 && <span className="is-in-stock-span"><i className="fas fa-times"></i> Out of stock</span>}
                        </div>}
                        {!showEditStock && item.userId === user?.id && <div id="item-stock">
                              <span id="stock-span">Stock: {item.stock}</span>
                              <div id="book-and-stock-arrow-box">
                                    <img className="edit-button"
                                    src="https://cdn.discordapp.com/attachments/858135958729392152/930594787944456282/bookandfeather.png"
                                    onClick={() => setShowEditStock(true)}
                                    ></img>
                                    <div className="arrow_box">
                                          <span>Edit stock</span>
                                    </div>
                              </div>
                        </div>}
                        {showEditStock && item.userId === user?.id &&
                        <div className="edit-item-div" id="item-stock">
                              <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleEditItem("#new-item-stock", "stock")
                              }}>
                                    <input id="new-item-stock" placeholder="New stock"></input>
                                    <div id="book-and-stock-arrow-box">
                                          <img className="edit-button"
                                          src="https://cdn.discordapp.com/attachments/858135958729392152/931251654504873984/save-changes.png"
                                          onClick={() => handleEditItem("#new-item-stock", "stock")}
                                          ></img>
                                          <div className="arrow_box">
                                          <span>Save stock</span>
                                    </div>
                                    </div>
                              </form>
                        </div>}
                        {renderCategory()}
                        {user?.id !== item.seller.id && (
                              <button
                                    id="add-to-cart-button"
                                    disabled={item.stock === 0}
                                    onClick={handleAddToCart}
                              >
                                    {getCartButtonMessage(item.stock)}
                              </button>
                        )}
                        <div id="description-button-and-edit-book">
                              <button style={shortOrLongButton()} onClick={handleSetShowDescription} id="description-button">
                                    <span>Description</span>
                                    {!showDescription && <i className="fas fa-chevron-down"></i>}
                                    {showDescription && <i className="fas fa-chevron-up"></i>}
                              </button>
                              {!showEditDescription && user?.id === item.seller.id &&
                              <div id="book-and-description-arrow-box">
                                    <img id="edit-description-button"
                                          src="https://cdn.discordapp.com/attachments/858135958729392152/930594787944456282/bookandfeather.png"
                                          onClick={() => setShowEditDescription(true)}
                                    ></img>
                                    <div className="arrow_box">
                                          <span>Edit description</span>
                                    </div>
                              </div>}
                              {showEditDescription && user?.id === item.seller.id &&
                              <div id="book-and-description-arrow-box">
                                    <img id="edit-description-button"
                                    src="https://cdn.discordapp.com/attachments/858135958729392152/931251654504873984/save-changes.png"
                                    onClick={() => handleEditItem("#edit-description-textarea", "description")}
                                    ></img>
                                    <div className="arrow_box">
                                          <span>Save description</span>
                                    </div>
                              </div>}
                        </div>
                        {showDescription && !showEditDescription && <div id="item-description">{item.description}</div>}
                        {showEditDescription &&
                        <div id="edit-item-description">
                              <form>
                                    <textarea id="edit-description-textarea">{item.description}</textarea>
                              </form>
                        </div>}
                  </div>
            </StyledItemPageDiv>
      )
}

export default ItemPage
