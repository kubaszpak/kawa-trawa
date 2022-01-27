import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ProductCard = ({ product }) => {

    return <Card>
        <CardMedia
            component="img"
            image={product.pathToImage}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {product.name}
            </Typography>
            <Typography>Cena: {product.price}zł</Typography>
            <Typography variant="body2" color="text.secondary">
                {product.description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Dodaj do koszyka</Button>
            <Button size="small">Szczegóły</Button>
        </CardActions>
    </Card>
};

export default ProductCard;
