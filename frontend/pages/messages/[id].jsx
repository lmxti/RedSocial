import { useRouter } from "next/router";
/*<------------------------------ LAYOUT ------------------------------->*/
import Layout from "@/components/Layout";
/*<---------------------------- COMPONENTES ---------------------------->*/
import UserCard from "@/components/User/UserCard";
import Spinner from "@/components/Spinner";
/*<------------------------------ ESTILOS ------------------------------>*/
import styles from "@/styles/ChatPage.module.css";
/*<------------------------------- HOOKS ------------------------------->*/
import { useChat } from "@/hooks/useChat";
/*<------------------------------ CONTEXT ------------------------------>*/
import { useAuth } from "@/context/AuthContext";

export default function ChatPage() {
  const router = useRouter();
  const { id: conversationId } = router.query;
  const { user } = useAuth();

  const { messages, otherUser, loading, messageText, setMessageText, sendMessage, messagesEndRef, isTyping } = useChat(conversationId, user?.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleTyping = (e) => {
    setMessageText(e.target.value);
  };

  return (
    <Layout title="Chat con usuario" description="Chat con usuario" navbar={true} rightComponent={otherUser && <UserCard user={otherUser} />} >
      <div className={styles.chatContainer}>
        
        {/* Contenedor de mensajes */}
        <div className={styles.messagesContainer}>
          {loading ? (
            <Spinner/>
          ) : (
            <>
              {messages.map((msg) => (
                <div key={msg._id} className={ msg.sender._id === user.id ? styles.messageOwn  : styles.messageOther }>
                  {msg.text}
                </div>
              ))}

              {isTyping && (
                <div className={styles.messageOther}>
                  <em>
                    {otherUser?.username || "Usuario"} está escribiendo...
                  </em>
                </div>
              )}

              <div ref={messagesEndRef}></div>
            </>
          )}
        </div>

        {/* Footer de chat */}
        <form className={styles.inputContainer} onSubmit={handleSubmit}>
          <input type="text" value={messageText} onChange={handleTyping} placeholder="Escribe un mensaje..." className={styles.input} />
          <button type="submit" className={styles.sendButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="m0 0l20 10L0 20V0zm0 8v4l10-2L0 8z"/></svg>
          </button>
        </form>
      </div>
    </Layout>
  );
}
