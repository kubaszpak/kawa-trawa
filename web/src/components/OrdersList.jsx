import React from "react";
import Grid from "@mui/material/Grid";
import OrderCard from "./OrderCard";
import { Box } from "@mui/material";
import { makeStyles } from '@mui/styles';

const OrdersList = ({ orders, setOrders }) => {

    const classes = useStyles();

    return (
        <>

            <Box className={classes.productGrid}>
                <Grid container rowSpacing={2} columnSpacing={2} >
                    {orders.map((order, index) => (
                        <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                            <OrderCard key={index} order={order} />
                    </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}

const useStyles = makeStyles(theme => ({
    text: {
        color: "white",
        borderColor: 'white',
    },
    sortPaper: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    alignCenter: {
        display: "flex",
        alignItems: "center",
    },
    justifyCenter: {
        display: "flex",
        justifyContent: "center",
    },
    productGrid: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2)
    }
}));

export default OrdersList;
