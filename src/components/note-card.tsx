import * as Dialog from "@radix-ui/react-dialog"

interface NoteCardProps {
  note: {
    date: Date
    content: string
  }
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col p-5 gap-3 bg-slate-800 overflow-hidden outline-none relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          {note.date.toISOString()}
        </span>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>
        {/*abaixo é feito um gradiente de baixo para cima*/}
        <div className="absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-200">
              {note.date.toISOString()}
            </span>
            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
