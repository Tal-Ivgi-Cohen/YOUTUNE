import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSong, loadSongs } from "../store/song/song.action.js";
import { Loader } from "../cmps/util/Loader.jsx";
import { SongList } from '../cmps/art/SongList.jsx';
import { WishListModal } from "../cmps/art/WishlistModal.jsx"
import { saveCartItem } from "../store/cart/cart.action.js";
import { saveWishItem } from "../store/wishlist/wishlist.action.js"

class _SongDetails extends React.Component {
  state = {
    frame: "none-border",
    filterBy: {
      _id: "",
      singerId: "",
    },
  };

  async componentDidMount() {
    const { songId } = this.props.match.params;
    const { setSong, loadSongs, saveCartItem, saveWishItem } = this.props;
    await setSong(songId);
    const { selectedSong } = this.props;
    const { _id, singer } = selectedSong;
    const filterBy = {
      _id,
      singerId: singer._id,
    };
    this.setState({ filterBy }, () => {
      loadSongs(this.state.filterBy);
    });
    saveCartItem();
    saveWishItem();
  }

  handleChange = (ev) => {
    const frameOption = ev.target.value;
    this.setState({ frame: frameOption });
  };

  render() {
    const { selectedSong, saveCartItem, loggedInUser, saveWishItem } = this.props;
    if (!selectedSong) return <Loader />;
    const { songs } = this.props;
    return (
      <div>
        {selectedSong && (
          <div className="main">
            <section className="main-art-details flex">
              <div className="imgs flex">

                <div className="content-img">

                  <div className="container-img">
                    <img
                      src={selectedSong.imgUrl}
                      className={`img2 ${this.state.frame + '2'}`}
                      alt={selectedSong.imgUrl}
                    />
                  </div>
                </div>
              </div>

              <div className="content-txt">
                <div className="art-details">
                  <p>{selectedSong.singer?.fullname || ""}</p>
                  <h1>{selectedSong.title}</h1>
                  {/*}   <p>
                    {selectedArt.style} ,{selectedArt.technique} on{" "}
                    {selectedArt.material}{" "}
        </p>*/}
                  <p>{selectedSong.year}</p>

                  <button><a href={selectedSong.link}>Listen Me!</a></button>
                </div>

                <div className="details-modals">
                  <WishListModal
                    selectedSong={selectedSong}
                    saveWishItem={saveWishItem}
                  />
                </div>
                <br />
                <p>DESCRIPTION</p>
                <br />
                <p>{selectedSong.description}</p>
              </div>
            </section>



            <div className="artist-list-details flex  column space-between">
              <Link to={`/singer/${selectedSong.singer._id}`}>
                <button className="btn-more-work">More work by {selectedSong.singer.fullname}
                </button>
                {" "}
              </Link>
              <SongList songs={songs} artist={selectedSong.singer.fullname} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedSong: state.songModule.selectedSong,
    songs: state.songModule.songs,
    loggedInUser: state.userModule.loggedInUser,
    cartItem: state.userModule.cartItem,
    wishItem: state.userModule.wishItem,
  };
};

const mapDispatchToProps = {
  setSong,
  loadSongs,
  saveCartItem,
  saveWishItem,
};
export const SongDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SongDetails);
