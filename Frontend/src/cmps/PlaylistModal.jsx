import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';


function getModalStyle() {

    return {
        top: 0,
        right: 0,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: '10px',
    },
}));
export function PlayListModal({ selectedSong, savePlayItem }) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);


    const handlePlay = () => {
        setOpen(true)
        savePlayItem(selectedSong)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div id="simple-modal-title-wish">This item has been added to youre playlist</div>
            <div id="simple-modal-description flex">
                <img className="img-wish" src={selectedSong.imgUrl} alt={selectedSong.imgUrl} />
                <p className="flex column">
                    <span>{selectedSong.title}</span>
                    <span>{selectedSong.year} </span>
                </p>
            </div>
            <button><Link to={`/playlist`}>VIEW PLAYLIST</Link></button>
            <Modal />
        </div>
    );

    return (
        <div>
            <button className="btn-wish-list" type="button" onClick={handlePlay}>
            🎧 PLAYLIST
            </button>
            <Modal
                open={open}
                onClick={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
