import React, { useState, useEffect } from "react";
import styled from "styled-components"
import { useDispatch } from 'react-redux';

const StyledItemPageDiv = styled.div`
      display: flex;
      padding-left: 10vw;
      padding-right: 10vw;
      margin-top: 4vh;

      #item-image-container {
            display: flex;
            justify-content: center;
            width: 50vw;
            // background-color: green;
            border: 1px solid lightgrey;
            border-radius: 8px;
      }

      #item-image {
            display: flex;
            max-width: 100%;
            max-height: 100%;
            border-radius: 8px;
            // background-color: purple;
      }

      #item-seller {
            display: inline;
            // background-color: lime;
      }

      #item-info-container {
            height: 100vh;
            // background-color: lightgrey;
            display: flex;
            flex-direction: column;
            width: 30vw;
            padding-top: 1%;


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
            font-size: large;
      }

      #item-name {
            margin-bottom: 2vh;
            font-size: xx-large;
      }

      #item-price {
            font-size: xx-large;
            font-weight: bolder;

            span {
                  font-size: large;
                  font-weight: normal;
                  position: relative;
                  left: 15vw;
                  text-align: right;
            }
      }

      #coins-icon {
            margin-right: 0.5vw
      }

      #add-to-cart-button {
            margin-bottom: 1vh;
            padding: 1.5vh 0;
            margin-top: 10vh;
            font-size: large;
            border: 2px solid black;
      }
`

const ItemPage = () => {
      const testItem = {
            user_id: 1,
            name: "Heart Container | +1 Heart",
            description: "Heart Containers, also known as Bowls of Hearts, Heart-Shaped Stones, Life Hearts, and Crystal Hearts, are recurring Items in The Legend of Zelda series. They increase Link's Life Gauge, which is represented by a set of Hearts, excluding The Adventure of Link, where his health is symbolized by a life bar.",
            image: "https://purenintendo.com/wp-content/uploads/2012/03/LOZ_OoT_3D_HeartPiece.png",
            price: 500,
            stock: 5
      }

      return(
            <StyledItemPageDiv>
                  <div id="left-side-page-container">
                        <div id="item-image-container">
                              <img id="item-image" src={testItem.image}></img>
                        </div>
                  </div>
                  <div id="item-info-container">
                        <div id="item-seller">Tingle's Shop</div>
                        <div id="item-name">{testItem.name}</div>
                        <div id="item-price">
                              <i className="fas fa-coins" id="coins-icon"></i>
                              {testItem.price}
                              <span><i className="fas fa-check"></i> In stock</span>
                        </div>
                        <button id="add-to-cart-button"><span>Add to cart</span> | Only {testItem.stock} available</button>
                        <div id="item-description">{testItem.description}</div>
                  </div>
            </StyledItemPageDiv>
      )
}

export default ItemPage
