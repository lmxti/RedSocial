import React, { useState } from "react";
import styles from "@/styles/components/PostForm.module.css";
import { createPost } from "@/services/post.service";

export default function CreatePost({ onSubmit, loading: globalLoading }) {
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    const formData = new FormData();
    formData.append("description", description);
    onSubmit(formData);
    setDescription("");
  };

  const isLoading = globalLoading || !description.trim();

  return (
    <div className={styles["content"]}>
      <form action="" className={styles["form"]}>
        <textarea placeholder="Haz una nueva publicación" className={styles["textarea"]} value={description} onChange={handleChange}/>
        <div className={styles["btns"]}>
          <button onClick={handleSubmit} disabled={isLoading}>Publicar</button>
        </div>

      </form>
    </div>
  );
}
