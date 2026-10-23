import { sourceCaveat } from "./study-resources"

export default function SourceNotices({ urls }: { urls: string[] }) {
  const notes = [...new Set(urls.map(sourceCaveat).filter((note): note is string => Boolean(note)))]
  if (!notes.length) return null
  return <div>{notes.map((note) => <small className="study-source-caveat" key={note}>{note}</small>)}</div>
}
