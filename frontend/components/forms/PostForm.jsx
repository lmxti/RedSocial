import React from 'react'
import styles from '@/styles/components/PostForm.module.css'

export default function PostForm() {
  return (
    <div>
      <div className={styles['content']}>
        <form action="" className={styles['form']}>
          <input type="text" placeholder='Titulo' />
          <input type="text" placeholder='Descripcion' />
          <div className={styles['btns']}>
            <button>Publicar</button>
          </div>
        </form>

      </div>
      
    </div>
  )
}
