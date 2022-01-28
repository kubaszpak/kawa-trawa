import React, { useState } from "react";
import { ProductsApi } from "../api/ProductsApi";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from "@mui/material";


const ProductEditor = ({ product, mode, open, setOpen }) => {
    // const [initialValues, setInitialValues] = useState();
    const [name, setName] = useState(product.name || "");
    const [description, setDescription] = useState(product.name || "");
    const [quantity, setQuantity] = useState(product.quantity || 1);
    const [price, setPrice] = useState(product.price || 1);
    const [pathToImage, setPathToImage] = useState(product.pathToImage || "");
    const [category, setCategory] = useState(1);

    const [error, setError] = useState("");

    const submitChange = async fields => {
        const APIRequest = getAPIRequest();
        const payload = getPayload(fields);

        try {
            await APIRequest(payload);
            console.log("successssss!")
            closeDialog();
        } catch (err) {
            console.log("noooooo");
            setError("Error")
        }

    };

    const closeDialog = () => setOpen(false);


    const getAPIRequest = () => {
        if (mode === "ADD") {
            return ProductsApi.addProduct;
        }
        return ProductsApi.editProduct;
    };

    const getPayload = fields => {
        let payload = { name, description, quantity, price, pathToImage, category };

        if (product?.id) {
            payload.id = product.id;
        }

        return payload;
    };
    const tfStyle = {
        marginTop: '16px',
        // width: '500px'
    }

    return (
        <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
            <DialogTitle>{mode === "EDIT" ? "Edytuj produkt" : "Dodaj nowy produkt"}</DialogTitle>
            <DialogContent>
                <Typography color="red">{error}</Typography>

                <TextField
                    fullWidth
                    value={name}
                    style={tfStyle}
                    label="Nazwa"
                    variant="outlined"
                    onChange={(e => setName(e.target.value))} />
                <br />
                <TextField
                    fullWidth
                    value={description}
                    style={tfStyle}
                    label="Opis"
                    multiline
                    variant="outlined"
                    onChange={(e => setDescription(e.target.value))} />
                <br />
                <TextField
                    fullWidth
                    value={quantity}
                    style={tfStyle}
                    label="Ilość"
                    multiline
                    variant="outlined"
                    onChange={(e => setQuantity(e.target.value))} />
                <br />
                <TextField
                    fullWidth
                    value={pathToImage}
                    style={tfStyle}
                    label="Ścieżka do zdjęcia"
                    multiline
                    variant="outlined"
                    onChange={(e => setPathToImage(e.target.value))} />

                <InputLabel htmlFor="outlined-adornment-amount">Cena</InputLabel>
                <OutlinedInput
                    fullWidth
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    startAdornment={<InputAdornment position="start">PLN</InputAdornment>}
                    label="Cena"
                />

                <Select
                    fullWidth
                    style={tfStyle}
                    value={category}
                    label="Kategoria"
                    onChange={e => setCategory(e.target.value)}
                >
                    <MenuItem value={1}>Kawa</MenuItem>
                    <MenuItem value={2}>Trawa</MenuItem>

                </Select>

            </DialogContent>

            <DialogActions>
                <Button onClick={closeDialog} color="primary">
                    Anuluj
                </Button>
                <Button onClick={submitChange} variant="outlined">
                    {mode === "EDIT" ? "Edytuj" : "Dodaj"}
                </Button>
            </DialogActions>

        </Dialog>
    )
};

export default ProductEditor;
