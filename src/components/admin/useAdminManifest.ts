"use client";

import { useCallback, useEffect, useState } from "react";
import type { CmsManifest } from "@/lib/cms/types";
import { EMPTY_MANIFEST } from "@/lib/cms/types";
import { readApiJson } from "@/lib/cms/readApiJson";

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
      const parsed = await readApiJson<CmsManifest>(res);
      if (!parsed.ok || !parsed.data) {
        throw new Error(parsed.message || "Не удалось загрузить манифест");
      }
      setManifest(parsed.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const save = useCallback(async (next: CmsManifest) => {
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
      const parsed = await readApiJson<CmsManifest>(res);
      if (!parsed.ok || !parsed.data) {
        throw new Error(parsed.message || "Не удалось сохранить");
      }
      setManifest(parsed.data);
      setMessage("Сохранено");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  }, []);

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
