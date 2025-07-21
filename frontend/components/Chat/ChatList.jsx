/*<------------------------------ LAYOUT ------------------------------>*/
/*<---------------------------- COMPONENTES ---------------------------->*/
import ChatItem from "@/components/Chat/ChatItem";
import Spinner from "@/components/Spinner";
/*<------------------------------ ESTILOS ------------------------------>*/
import styles from "@/styles/components/ChatList.module.css";
/*<------------------------------- HOOKS ------------------------------->*/

export default function ChatList({ chats, loading, error, currentUserId }) {
  if (loading) return <Spinner />;

  if (error) return <p className={styles.error}>{error}</p>;

  if (chats.length === 0)
    return <p className={styles.noChats}>No tienes conversaciones aún.</p>;

  return (
    <>
      <ul className={styles.ulItem}>
        {chats.map((chat) => (
          <ChatItem key={chat._id} chat={chat} currentUserId={currentUserId} />
        ))}
      </ul>
    </>
  );
}
