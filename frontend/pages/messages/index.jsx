/*<------------------------------ LAYOUT ------------------------------->*/
import Layout from "@/components/Layout";
/*<---------------------------- COMPONENTES ---------------------------->*/
import ChatList from "@/components/Chat/ChatList";
/*<------------------------------ ESTILOS ------------------------------>*/
import styles from "@/styles/Messages.module.css";
/*<------------------------------- HOOKS ------------------------------->*/
import { useConversations } from "@/hooks/useConversation";
/*<------------------------------- CONTEXT ----------------------------->*/
import { useAuth } from "@/context/AuthContext";

export default function Messages() {
  const { conversations, loading, error } = useConversations();
  const { user } = useAuth();

  return (
    <Layout title="Mensajes | NextJS" description="Mensajes privados" navbar={true}>
      <div className={styles.container}>
        <ChatList
          chats={conversations}
          loading={loading}
          error={error}
          currentUserId={user.id}
        />
      </div>
    </Layout>
  );
}
