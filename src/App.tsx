import "./globals.css"
import logo from "./assets/logo-nlw-expert.svg"
import NoteCard from "./components/note-card"
import NewNoteCard from "./components/new-note-card"
import { ChangeEvent, useState } from "react"

interface Note {
  id: string
  date: Date
  content: string
}

function App() {
  const [search, setSearch] = useState("")
  const [notes, setNotes] = useState<Note[]>(() => {
    // salvar notas no localstorage do navegador
    const notesOnStorage = localStorage.getItem("notes")

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(), // é gerado um id único
      date: new Date(),
      content,
    }

    // [newNote, ...notes] o newNote esta antes do ...notes pois quero que as informações novas aparecam antes das ja fornecidas
    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    // salvar notas no localstorage do navegador
    localStorage.setItem("notes", JSON.stringify(notesArray))
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value

    setSearch(query)
  }

  const filteredNotes =
    search !== ""
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => {
          return <NoteCard key={note.id} note={note} />
        })}
      </div>
    </div>
  )
}

export default App
