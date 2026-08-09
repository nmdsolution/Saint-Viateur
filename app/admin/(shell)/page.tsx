import { createClient } from "@/lib/supabase/server";

type RecentConversation = {
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

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [specialties, equipment, news, conversations] = await Promise.all([
    supabase.from("specialties").select("*", { count: "exact", head: true }),
    supabase.from("equipment").select("*", { count: "exact", head: true }),
    supabase.from("news_items").select("*", { count: "exact", head: true }),
    supabase
      .from("chatbot_conversations")
      .select("*", { count: "exact", head: true }),
  ]);

  const { data: recentConversations } = await supabase
    .from("chatbot_conversations")
    .select("id, session_id, last_message_at, chatbot_messages(count)")
    .order("last_message_at", { ascending: false })
    .limit(5)
    .returns<RecentConversation[]>();

  const stats = [
    { label: "Spécialités", value: specialties.count ?? 0 },
    { label: "Équipements", value: equipment.count ?? 0 },
    { label: "Actualités", value: news.count ?? 0 },
    { label: "Conversations Assistant", value: conversations.count ?? 0 },
  ];

  return (
    <>
      <h1 className="adm-page-title">Tableau de bord</h1>

      <div className="adm-stats">
        {stats.map((stat) => (
          <div className="adm-stat-card" key={stat.label}>
            <span className="adm-stat-value">{stat.value}</span>
            <span className="adm-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <section className="adm-panel">
        <h2>Conversations récentes avec l&apos;Assistant Saint Viateur</h2>

        {recentConversations && recentConversations.length > 0 ? (
          <ul className="adm-conversation-list">
            {recentConversations.map((conversation) => (
              <li key={conversation.id} className="adm-conversation-item">
                <span className="adm-conversation-session">
                  {conversation.session_id}
                </span>
                <span className="adm-conversation-meta">
                  {conversation.chatbot_messages?.[0]?.count ?? 0} message(s)
                </span>
                <span className="adm-conversation-meta">
                  {relativeTimeFromNow(conversation.last_message_at)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="adm-empty-state">Aucune conversation pour l&apos;instant.</p>
        )}
      </section>
    </>
  );
}