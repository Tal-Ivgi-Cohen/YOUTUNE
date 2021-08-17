import { SongPreview } from './SongPreview.jsx';

export function SongList({ songs }) {
    return (
        <section className="art-list-container">
            <div className="art-list">
                {songs.map(song => <SongPreview song={song} key={song._id} />)}
            </div>
        </section>
    )
}

