import { SongPreview } from './SongPreview.jsx';

export const SongList = ({ songs }) => {
    return (
        <section className="song-list-container">
            <div className="song-list">
                {songs.map(song => <SongPreview song={song} key={song._id} />)}
            </div>
        </section>
    )
}

