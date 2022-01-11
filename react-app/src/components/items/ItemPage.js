import React, { useState, useEffect } from "react";
import styled from "styled-components"
import { useDispatch } from 'react-redux';

const StyledItemPageDiv = styled.div`
      display: flex;
      padding-left: 10vw;
      padding-right: 10vw;

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
            // background-color: purple;
      }

      #item-seller {
            display: inline;
            // background-color: lime;
      }

      #item-info-container {
            background-color: lightgrey;
            display: flex;
            flex-direction: column;
            width: 30vw;
      }
`

const ItemPage = () => {
      const testItem = {
            user_id: 1,
            name: "test item",
            description: "Bulbasaur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ivysaur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venusaur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Charmander Lorem ipsum dolor sit amet, consectetur adipiscing elit. Charmeleon Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "https://purenintendo.com/wp-content/uploads/2012/03/LOZ_OoT_3D_HeartPiece.png",
            price: 9001,
            stock: 5
      }

      return(
            <StyledItemPageDiv>
                  <div id="item-image-container">
                        <img id="item-image" src={testItem.image}></img>
                  </div>
                  <div id="item-info-container">
                        <div id="item-seller">Tingle's Shop</div>
                        <div>{testItem.name}</div>
                        <div>{testItem.price}</div>
                        <button>Add to cart | Only {testItem.stock} available</button>
                        <div>{testItem.description}</div>
                  </div>
            </StyledItemPageDiv>
      )
}

export default ItemPage
