import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components"

import { getAnItem } from "../../store/items"

const StyledItemPageDiv = styled.div`
      display: flex;
      padding-left: 10vw;
      padding-right: 10vw;
      margin-top: 4vh;

      #item-image-container {
            position: relative;
            display: flex;
            justify-content: center;
            width: 45vw;
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
            padding-top: 1%;
            padding-left:2vw;


            div {
                  padding-left: 5%;
                  padding-right: 5%;
            }


            button {
                  margin-left: 5%;
                  margin-right: 5%;
            }

            span {
                  font-weight: bolder;
            }
      }

      #item-seller {
            margin-bottom: 10vh;
            font-size: x-large;
      }

      #item-name {
            display: flex;
            align-items: center;
            margin-bottom: 2vh;
            font-size: xx-large;
      }

      #item-price {
            display: flex;
            align-items: center;
            font-size: xx-large;
            font-weight: bolder;

            span {
                  font-size: large;
                  font-weight: normal;
                  position: relative;
                  left: 15vw;
            }
      }

      #coins-icon {
            margin-right: 0.5vw
      }

      #add-to-cart-button, #description-button, #delete-item-button {
            margin-bottom: 1vh;
            padding: 1.5vh 0;
            margin-top: 10vh;
            font-size: large;
            border: 2px solid black;
      }

      #delete-item-button {
            height: 5vh;
            overflow: hidden;
            position: relative;
            display: flex;
            align-items: center;
            margin-top: 0;
            margin-bottom: 2vh;
            i {
                  color: crimson;
                  margin-right: 0.5vw;
            }
      }

      #dragon-icon {
            display: flex;
            height: 5vh;
            margin-right: 0.5vw;
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
            height: 4vh;
            margin-left: 0.5vw;
      }

      #item-description {
            line-height: 2;
            margin-top: 2vh;
            overflow: hidden;
            height: 20vh;
      }
`

const ItemPage = () => {
      const { itemId } = useParams()
      const dispatch = useDispatch();

      useEffect(() => {
            dispatch(getAnItem(itemId))
      }, [itemId])

      const item = useSelector(state => state.items.entities.items[itemId])

      const [showDescription, setShowDescription] = useState(true)

      const handleSetShowDescription = () => {
            setShowDescription(!showDescription)
      }

      if (!item) {
            return <></>
      }

      return(
            <StyledItemPageDiv>
                  <div id="left-side-page-container">
                        <div id="item-image-container">
                              <img id="item-image" src={item.image}></img>
                              <button id="edit-image-button">
                                    <img id="edit-image-image" src="https://cdn.discordapp.com/attachments/858135958729392152/930594787944456282/bookandfeather.png"></img>
                              </button>
                        </div>
                  </div>
                  <div id="item-info-container">
                        <button id="delete-item-button">
                              <img id="dragon-icon" src="https://cdn.discordapp.com/attachments/858135958729392152/930590127099613214/dragon-front.png"></img>
                              <span>Incinerate this item</span>
                        </button>
                        <div id="item-seller">{item.seller}</div>
                        <div id="item-name">
                              {item.name}
                              <img className="edit-button" src="https://cdn.discordapp.com/attachments/858135958729392152/930594787944456282/bookandfeather.png"></img>
                        </div>
                        <div id="item-price">
                              <i className="fas fa-coins" id="coins-icon"></i>
                              {item.price}
                              <img className="edit-button" src="https://cdn.discordapp.com/attachments/858135958729392152/930594787944456282/bookandfeather.png"></img>
                              {item.stock > 0 && <span><i className="fas fa-check"></i> In stock</span>}
                              {item.stock === 0 && <span><i className="fas fa-times"></i> Out of stock</span>}
                        </div>
                        <div id="item-stock">Stock: {item.stock}</div>
                        <button id="add-to-cart-button">
                              <span>Add to cart </span>
                              {item.stock < 6 && <>| Only {item.stock} available</>}
                        </button>
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
