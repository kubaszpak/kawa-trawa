import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Box } from '@mui/material';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const classes = useStyles();

    const showDetails = () => {
        navigate(`/products/${product.id}`);
    }

    return <Card
        sx={{ cursor: "pointer", p: "16px" }}
    >
        <CardMedia
            component="img"
            image={product.pathToImage}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {product.name}
            </Typography>
            <Typography>Cena: {product.price}zł</Typography>
            <Box className={classes.description}>
                <Typography variant="body2" color="text.secondary" >
                    {product.description}
                </Typography>
            </Box>
        </CardContent>
        <CardActions>
            <Button size="small" variant="contained" color="secondary">Dodaj do koszyka</Button>
            <Button size="small" variant="contained" color="secondary" onClick={showDetails}>Szczegóły</Button>
        </CardActions>
    </Card >
};

const useStyles = makeStyles(theme => ({
    description: {
        height: 80,
        textOverflow: "ellipsis",
        overflow: "hidden",
        // Addition lines for 4 line ellipsis
        display: "-webkit-box !important",
        "-webkitLine-clamp": 4,
        "-webkit-box-orient": "vertical",
        whiteSpace: "normal",
    }
}));

export default ProductCard;
