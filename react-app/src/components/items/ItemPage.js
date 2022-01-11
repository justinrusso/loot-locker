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
            margin-bottom: 2vh;
            font-size: xx-large;
      }

      #item-price {
            display: flex;
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

      #add-to-cart-button, #description-button {
            // background-color: lime;
            margin-bottom: 1vh;
            padding: 1.5vh 0;
            margin-top: 10vh;
            font-size: large;
            border: 2px solid black;
      }

      #description-button {
            display: flex;
            justify-content: space-between;
            margin-top: 1vh;
            padding-left: 10%;
            padding-right: 10%;
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

      const item = useSelector(state => state.items.entities.item)

      const [showDescription, setShowDescription] = useState(true)


      const handleSetShowDescription = () => {
            setShowDescription(!showDescription)
      }

      return(
            <StyledItemPageDiv>
                  <div id="left-side-page-container">
                        <div id="item-image-container">
                              <img id="item-image" src={item.image}></img>
                        </div>
                  </div>
                  <div id="item-info-container">
                        <div id="item-seller">{item.seller}</div>
                        <div id="item-name">{item.name}</div>
                        <div id="item-price">
                              <i className="fas fa-coins" id="coins-icon"></i>
                              {item.price}
                              {item.stock > 0 && <span><i className="fas fa-check"></i> In stock</span>}
                              {item.stock === 0 && <span><i className="fas fa-times"></i> Out of stock</span>}
                        </div>
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
