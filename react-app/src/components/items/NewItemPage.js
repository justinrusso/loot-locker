import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "../common/Button";
import Container from "../common/Container";
import InputField from "../common/InputField";
import Paper from "../common/Paper";
import { createItem } from "../../store/items";
import { selectSortedCategoriesArray } from "../../store/categories";

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
  const categories = useSelector(selectSortedCategoriesArray());
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [errors, setErrors] = useState({});

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
      .then((newItem) => history.push(`/items/${newItem.id}`))
      .catch((newErrors) => {
        if (newErrors) {
          setErrors(newErrors);
        }
      });
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
              error={!!errors.image}
              helperText={errors.image?.[0]}
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
              error={!!errors.name}
              helperText={errors.name?.[0]}
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
              error={!!errors.categoryId}
              helperText={errors.categoryId?.[0]}
              required
            >
              <option value="" />
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
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
              error={!!errors.description}
              helperText={errors.description?.[0]}
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
              error={!!errors.price}
              helperText={errors.price?.[0]}
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
              error={!!errors.stock}
              helperText={errors.stock?.[0]}
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
