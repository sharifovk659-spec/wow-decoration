/** Read response body safely — Vercel often returns plain text like "Request Entity Too Large". */
export async function readApiJson<T = unknown>(
  res: Response,
): Promise<{ ok: boolean; status: number; data: T | null; message: string }> {
  const status = res.status;
  const text = await res.text();
  if (!text) {
    return {
      ok: res.ok,
      status,
      data: null,
      message: res.ok ? "" : `Ошибка сервера (${status})`,
    };
  }

  try {
    const data = JSON.parse(text) as T;
    const msg =
      data &&
      typeof data === "object" &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : res.ok
          ? ""
          : `Ошибка сервера (${status})`;
    return { ok: res.ok, status, data, message: msg };
  } catch {
    const clipped = text.replace(/\s+/g, " ").trim().slice(0, 160);
    let message = clipped || `Ошибка сервера (${status})`;
    if (/request entity too large/i.test(text) || status === 413) {
      message =
        "Файл слишком большой для загрузки через сервер. Используйте фото до ~4 МБ или включите Vercel Blob.";
    }
    return { ok: false, status, data: null, message };
  }
}
