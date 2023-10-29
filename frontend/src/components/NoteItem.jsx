function NoteItem({note}) {
  return (
    <div className="note" style={{
        backgroundColor: note.isAdmin ? 'rgba(0,0,0,0.7)' : '#fff',
        color: note.isAdmin ? '#fff' : '#000'
    }}>
        <h4>Note from {note.isAdmin ? <span>Admin</span> : <span>{note.name}</span>}</h4>
        <p>{note.text}</p>
        <div className="note-date">
            {new Date(note.createdAt).toLocaleString('en-GB')}
        </div>
    </div>
  )
}
export default NoteItem