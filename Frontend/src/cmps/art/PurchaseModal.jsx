import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';


function getModalStyle() {

    return {
        top: 0,
        right: 0,
        

        //transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'fixed',
        width: 500,
        backgroundColor: 'white',
        border: '1px solid #3d4246',
        boxShadow: theme.shadows[5],
        padding: '10px',
        textAlign:'center'
    },
}));

export function PurchaseModal({ selectedArt, saveCartItem }) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handlePurchase = () => {
        setOpen(true)
        saveCartItem(selectedArt)
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h4 id="simple-modal-title">JUST ADDED TO YOUR CART</h4>
            <p id="simple-modal-description">
                Added to cart successfully</p>
            <img src={selectedArt.imgUrl} alt={selectedArt.imgUrl} className="purchase-modal-img"/>
            <h2>{selectedArt.title}</h2>
            <p>Artist: {selectedArt.artist?.fullname || ''}</p>
            <p>Price: {selectedArt.price}</p>

            <button><Link to={`/cart`}>VIEW CART</Link></button>
            <Link to={`/art`}> continue shopping</Link>
            <Modal />
        </div>
    );

    return (
        <div>
            <button className="btn-add-to-bag" type="button" onClick={handlePurchase}>
                Add To Bag
      </button>
            <Modal
                open={open}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClick={handleClose}>

                {body}
            </Modal>
        </div>
    );
}