import { useEffect, useState } from "react";
import {
  fetchAllBooks,
  fetchBooksBySubject,
  fetchAllSubjects,
} from "../api/book";
import type { Book, Subject } from "../types/book";

export default function ExplorePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    fetchAllSubjects().then((res) => {
      setSubjects(res.data);
    });
  }, []);

  useEffect(() => {
    fetchAllBooks({ limit: "20" }).then((res) => {
      setBooks(res.data);
    });
  }, []);

  async function loadSubjectBooks(subjectId: string) {
    if (subjectId == "") {
      setSelectedSubject("All");
      fetchAllBooks({ limit: "20" }).then((res) => {
        setBooks(res.data);
      });
      return;
    }
    setSelectedSubject(subjectId);

    const res = await fetchBooksBySubject(subjectId, { limit: "20" });
    setBooks(res.data.books);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Explore Books</h1>

      <div style={{ marginBottom: 20 }}>
        <label>Subject: </label>
        <select
          value={selectedSubject || ""}
          onChange={(e) => loadSubjectBooks(e.target.value)}
        >
          <option value="">All</option>

          {subjects.map((s) => (
            <option key={s.id} value={String(s.id)}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> — {book.author ?? "Unknown"}
          </li>
        ))}
      </ul>

      <button
        onClick={async () => {
          const res = await fetchAllBooks({
            limit: "20",
            offset: "20",
          });
          setBooks(res.data);
        }}
      >
        Load Page 2
      </button>
    </div>
  );
}
