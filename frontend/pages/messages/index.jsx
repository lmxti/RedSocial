/*<------------------------------ LAYOUT ------------------------------->*/
import Layout from "@/components/Layout";
/*<---------------------------- COMPONENTES ---------------------------->*/
import ChatItem from "@/components/Chat/ChatItem";
import ChatList from "@/components/Chat/ChatList";
import Spinner from "@/components/Spinner";
/*<------------------------------ ESTILOS ------------------------------>*/
import styles from "@/styles/Messages.module.css";
/*<------------------------------- HOOKS ------------------------------->*/
import { useConversation } from "@/hooks/useConversation";
/*<------------------------------- CONTEXT ----------------------------->*/
import { useAuth } from "@/context/AuthContext";

export default function Messages() {
  const { conversations, loading, error } = useConversation();
  const { user } = useAuth();
    return (
    <Layout title="Mensajes | NextJS" description="Mensajes privados" navbar={true}>
      <div className={styles.container}>
        <ChatList chats={conversations} loading={loading} error={error} currentUserId={user.id}/>
      </div>
    </Layout>
  );
}
