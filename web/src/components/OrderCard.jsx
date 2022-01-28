import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import { Box, Modal } from '@mui/material';
import { useState } from 'react'
import ComplaintModal from "./ComplaintModal"

const OrderCard = ({ order }) => {
    const [isComplaintModalVisible, setIsComplaintModalVisible] = useState(false);
    const classes = useStyles();

    const openComplaintModal = () => {
        setIsComplaintModalVisible(true);
    };

    const closeComplaintModal = () => {
        setIsComplaintModalVisible(false)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    return( 
    <div>
    <Card
    sx={{ cursor: "pointer", p: "16px" }}
>
        <CardContent>
            <Typography gutterBottom variant="h6" component="div">
                {order.date}
            </Typography>
            <Typography>Cena: {order.totalPrice}zł</Typography>

            <Box className={classes.description}>
                <Typography variant="body2">
                    Lista produktów (produkt/ilość):
                </Typography>
                <Typography variant="body2">
                    {JSON.stringify(order.products).split(",").join(",\n")}
                </Typography>
                <Typography variant="body2">
                    Status zamówienia: {order.status}
                </Typography>
            </Box>
        </CardContent>
        <CardActions>
            <Button size="small" variant="contained" color="error" onClick={openComplaintModal}>Zgłoś reklamację</Button>
        </CardActions>
    </Card >

    <Modal open={isComplaintModalVisible} onClose={closeComplaintModal}>
    <Box sx={style}>
        <ComplaintModal closeComplaintModal={closeComplaintModal} order = {order} />
    </Box>
    </Modal>
    </div>);
};

const useStyles = makeStyles(theme => ({
    description: {
        height: 60,
        textOverflow: "ellipsis",
        overflow: "hidden",
        // Addition lines for 4 line ellipsis
        display: "-webkit-box !important",
        "-webkitLine-clamp": 4,
        "-webkit-box-orient": "vertical",
        whiteSpace: "normal",
    }
}));

export default OrderCard;
