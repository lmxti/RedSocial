import React, { useState } from "react";
import styles from "@/styles/components/PostForm.module.css";
import { createPost } from "@/services/post.service";

export default function CreatePost({ onSubmit, loading: globalLoading }) {
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting post:", description);
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("description", description);
      const success = await onSubmit(formData);
      if (success) setDescription("");
      setIsSubmitting(false);
    } catch (error) {
      console.log("Error submitting post:", error);
    }
  };

  const isLoading = globalLoading || isSubmitting;

  return (
    <div className={styles["content"]}>
      <form action="" className={styles["form"]}>
        <textarea
          placeholder="Haz una nueva publicación"
          className={styles["textarea"]}
          value={description}
          onChange={handleChange}
        />
        <div className={styles["btns"]}>
          <button onClick={handleSubmit} disabled={isLoading}>
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
}
