"use client";

import { useCallback, useEffect, useState } from "react";
import type { CmsManifest } from "@/lib/cms/types";
import { EMPTY_MANIFEST } from "@/lib/cms/types";

export function useAdminManifest() {
  const [manifest, setManifest] = useState<CmsManifest>(EMPTY_MANIFEST);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/manifest", { cache: "no-store" });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      if (!res.ok) throw new Error("Не удалось загрузить манифест");
      setManifest((await res.json()) as CmsManifest);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const save = useCallback(
    async (next: CmsManifest) => {
      setSaving(true);
      setMessage(null);
      setError(null);
      try {
        const res = await fetch("/api/admin/manifest", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(next),
        });
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as {
            error?: string;
          };
          throw new Error(data.error || "Не удалось сохранить");
        }
        const saved = (await res.json()) as CmsManifest;
        setManifest(saved);
        setMessage("Сохранено");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка сохранения");
      } finally {
        setSaving(false);
      }
    },
    [],
  );

  return {
    manifest,
    setManifest,
    loading,
    saving,
    message,
    error,
    reload,
    save,
  };
}
