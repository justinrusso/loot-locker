import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";

import Container from "../common/Container";
import InputField from "../common/InputField";
import Paper from "../common/Paper";
import { createItem } from "../../store/items";
import { useHistory } from "react-router-dom";
import Button from "../common/Button";

const NewItemPageContainer = styled.div`
  padding: 24px 0;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  padding-bottom: 16px;
`;

const NewItemForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;

  ${Paper} {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    width: 100%;

    h2 {
      font-size: 1.2em;
      font-weight: 500;
    }
  }
`;

const PreviewImage = styled.img`
  max-width: 25%;
`;

const NewItemPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createItem({
        name,
        description,
        image: imageSrc,
        price,
        stock,
        categoryId,
      })
    )
      .unwrap()
      .then((newItem) => history.push(`/items/${newItem.id}`));
  };

  return (
    <Container>
      <NewItemPageContainer>
        <Title>Add a new listing</Title>
        <NewItemForm onSubmit={handleSubmit}>
          <Paper as="section" elevation={2}>
            <h2>Image</h2>
            {imageSrc && (
              <PreviewImage src={imageSrc} alt="preview of new item" />
            )}
            <InputField
              fullWidth
              label="Image Url"
              value={imageSrc}
              id="item-image-src"
              onChange={(e) => setImageSrc(e.target.value)}
              inputProps={{
                type: "text",
              }}
              required
            />
          </Paper>

          <Paper as="section" elevation={2}>
            <h2>Listing Details</h2>
            <InputField
              fullWidth
              label="Item Name"
              value={name}
              id="item-name"
              onChange={(e) => setName(e.target.value)}
              inputProps={{
                autoFocus: true,
                type: "text",
              }}
              required
            />
            <InputField
              fullWidth
              label="Category"
              value={categoryId}
              id="item-description"
              onChange={(e) => setCategoryId(e.target.value)}
              inputProps={{
                as: "select",
              }}
              required
            >
              <option value="" />
              {/* TODO: map over categories */}
            </InputField>
            <InputField
              fullWidth
              label="Description"
              value={description}
              id="item-description"
              onChange={(e) => setDescription(e.target.value)}
              inputProps={{
                type: "text",
                as: "textarea",
                rows: 3,
              }}
              required
            />
          </Paper>

          <Paper as="section" elevation={2}>
            <h2>Inventory and pricing</h2>
            <InputField
              fullWidth
              label="Price"
              value={price}
              id="item-price"
              onChange={(e) => setPrice(e.target.value)}
              inputProps={{
                type: "number",
                pattern: "\\d+",
                min: "0",
                step: "1",
              }}
              required
            />
            <InputField
              fullWidth
              label="Stock"
              value={stock}
              id="item-stock"
              onChange={(e) => setStock(e.target.value)}
              inputProps={{
                type: "number",
                pattern: "\\d+",
                min: "0",
                step: "1",
              }}
              required
            />

            <Button type="submit">Publish New Listing</Button>
          </Paper>
        </NewItemForm>
      </NewItemPageContainer>
    </Container>
  );
};

export default NewItemPage;
