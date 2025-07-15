import React from 'react'

const dummyHashtags = [
  { tag: "#ReactNative", posts: "12.3K" },
  { tag: "#Expo", posts: "8.5K" },
  { tag: "#DesarrolloWeb", posts: "15.1K" },
  { tag: "#NodeJS", posts: "9.9K" },
  { tag: "#Programación", posts: "20.7K" },
]

export default function HomeHashtags() {
  return (
    <aside style={styles.container}>
      <h2 style={styles.title}>Ultimas tendencias</h2>
      <ul style={styles.list}>
        {dummyHashtags.map((hashtag, index) => (
          <li key={index} style={styles.item}>
            <span style={styles.tag}>{hashtag.tag}</span>
            <span style={styles.posts}>{hashtag.posts} publicaciones</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}

const styles = {
  container: {
    padding: '1rem',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 6px var(--color-shadow)',
    color: 'var(--color-text)',
    minWidth: '250px',
  },
  title: {
    fontSize: '1.25rem',
    marginBottom: '1rem',
    color: 'var(--color-text)',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    padding: '0.5rem 0',
    borderBottom: '1px solid var(--color-border)',
  },
  tag: {
    fontWeight: 'bold',
    display: 'block',
    color: 'var(--color-accent)',
  },
  posts: {
    fontSize: '0.875rem',
    color: 'var(--color-muted)',
  },
}
