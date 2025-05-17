import * as Y from 'yjs'
import { equals } from 'ramda'
import Quill from 'quill'
import QuillCursors from 'quill-cursors'
import { useEffect, useRef, useSyncExternalStore } from 'react'
import { QuillBinding } from 'y-quill'
import './App.css'
import 'quill/dist/quill.snow.css'

const ydoc = new Y.Doc()
const ytext = ydoc.getText('quill')

Quill.register('modules/cursors', QuillCursors)

export default function App() {
  const quill = useRef<Quill>(null)
  const quillBinding = useRef<QuillBinding>(null)
  const editorDiv = useRef<HTMLDivElement>(null)

  const prevTextState = useRef<unknown>(null)

  const textState = useSyncExternalStore(
    (callback) => {
      ytext.observe(callback)

      return () => {
        ytext.unobserve(callback)
      }
    },
    () => {
      const state = ytext.toDelta()

      if (equals(state, prevTextState.current)) {
        return prevTextState.current
      }

      prevTextState.current = state
      return state
    },
  )

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
      quillBinding.current = new QuillBinding(ytext, quill.current)
    }
  })

  return (
    <main className="prose p-10">
      <h1>Quill text editor</h1>
      <div id="editor" ref={editorDiv} className="w-full">
        Hello World
      </div>
      <h1 className="mt-5">Internal Text State</h1>
      <pre className="w-full h-96 overflow-auto">
        {JSON.stringify(textState, null, 2)}
      </pre>
    </main>
  )
}
