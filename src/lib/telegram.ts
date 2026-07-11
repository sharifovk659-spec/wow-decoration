interface ContactPayload {
  name: string;
  phone: string;
  country: string;
  projectType: string;
  message?: string;
}

/** Sends a contact enquiry to Telegram when bot token and chat id are configured. */
export async function sendContactToTelegram(
  data: ContactPayload,
): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) return false;

  const text = [
    "📩 Новая заявка — World of Wood Decoration",
    "",
    `👤 Имя: ${data.name}`,
    `📞 Телефон: ${data.phone}`,
    `🌍 Страна: ${data.country}`,
    `🏗 Проект: ${data.projectType}`,
    ...(data.message?.trim()
      ? ["", "💬 Сообщение:", data.message.trim()]
      : []),
  ].join("\n");

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
      cache: "no-store",
    },
  );

  return res.ok;
}

export function isTelegramConfigured(): boolean {
  return Boolean(
    process.env.TELEGRAM_BOT_TOKEN?.trim() &&
      process.env.TELEGRAM_CHAT_ID?.trim(),
  );
}
