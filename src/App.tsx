import Quill from 'quill'
import QuillCursors from 'quill-cursors'
import { useEffect, useRef } from 'react'
import './App.css'
import 'quill/dist/quill.snow.css'

Quill.register('modules/cursors', QuillCursors)

export default function App() {
  const quill = useRef<Quill>(null)
  const editorDiv = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorDiv.current && !quill.current) {
      quill.current = new Quill(editorDiv.current, {
        modules: {
          cursors: true,
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block'],
          ],
          history: {
            // Local undo shouldn't undo changes
            // from remote users
            userOnly: true,
          },
        },
        placeholder: 'Start collaborating...',
        theme: 'snow',
      })
    }
  })

  return (
    <main className="prose p-10">
      <h1>Quill text editor</h1>
      <div id="editor" ref={editorDiv} className="w-full">
        Hello World
      </div>
    </main>
  )
}
