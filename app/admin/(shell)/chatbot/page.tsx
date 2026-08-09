import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type ConversationRow = {
  id: string;
  session_id: string;
  last_message_at: string;
  chatbot_messages: { count: number }[] | null;
};

function relativeTimeFromNow(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffMinutes = Math.round(diffMs / 60000);

  if (diffMinutes < 1) return "à l'instant";
  if (diffMinutes < 60) return `il y a ${diffMinutes} min`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `il y a ${diffHours} h`;

  const diffDays = Math.round(diffHours / 24);
  return `il y a ${diffDays} j`;
}

export default async function ChatbotConversationsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("chatbot_conversations")
    .select("id, session_id, last_message_at, chatbot_messages(count)")
    .order("last_message_at", { ascending: false })
    .returns<ConversationRow[]>();

  const conversations = data ?? [];

  return (
    <>
      <h1 className="adm-page-title">Assistant — conversations</h1>

      <section className="aem-section">
        {conversations.length > 0 ? (
          <table className="aem-table">
            <thead>
              <tr>
                <th>Session</th>
                <th>Messages</th>
                <th>Dernier message</th>
              </tr>
            </thead>
            <tbody>
              {conversations.map((conversation) => (
                <tr key={conversation.id} className="aem-row">
                  <td>
                    <Link href={`/admin/chatbot/${conversation.id}`} className="aem-row-link">
                      {conversation.session_id}
                    </Link>
                  </td>
                  <td>{conversation.chatbot_messages?.[0]?.count ?? 0}</td>
                  <td>{relativeTimeFromNow(conversation.last_message_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="adm-empty-state">
            Aucune conversation pour l&apos;instant — l&apos;assistant n&apos;a pas encore été
            branché à cette persistance (à venir).
          </p>
        )}
      </section>
    </>
  );
}
