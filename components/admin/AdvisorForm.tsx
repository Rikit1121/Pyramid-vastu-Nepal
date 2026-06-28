"use client";

import { useActionState, useRef, useState } from "react";
import type { Advisor } from "@/types";
import { createAdvisor, updateAdvisor, type ActionState } from "@/app/admin/actions";

type Props =
  | { mode: "new" }
  | { mode: "edit"; advisor: Advisor & { id: string } };

const INITIAL: ActionState = {};

const inputClass =
  "w-full rounded-btn border border-border-hairline bg-surface px-4 py-2.5 text-sm text-ivory-text placeholder:text-ivory-text/30 transition-colors duration-200 focus:border-copper/60 focus:outline-none";

export default function AdvisorForm(props: Props) {
  const action = props.mode === "new" ? createAdvisor : updateAdvisor;
  const [state, formAction, pending] = useActionState(action, INITIAL);

  const advisor = props.mode === "edit" ? props.advisor : null;

  const fileRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    advisor?.photo ?? null,
  );

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPreviewUrl(URL.createObjectURL(file));
  }

  return (
    <form action={formAction} className="space-y-7">
      {advisor?.id && (
        <input type="hidden" name="id" value={advisor.id} />
      )}
      {advisor?.photo && (
        <input type="hidden" name="existingPhoto" value={advisor.photo} />
      )}

      {state.error && (
        <div className="rounded-btn border border-copper/40 bg-copper/10 px-4 py-3 text-sm text-ivory-text/80">
          {state.error}
        </div>
      )}

      {/* Photo preview + upload */}
      <div>
        <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-gold-line">
          Photo
        </label>
        <div className="flex items-start gap-5">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Preview"
              className="h-24 w-24 rounded-full border border-border-hairline object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border-hairline bg-surface text-xs text-ivory-text/30">
              No photo
            </div>
          )}
          <div className="flex flex-col gap-2">
            <input
              ref={fileRef}
              type="file"
              name="photo"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex h-9 items-center justify-center rounded-btn border border-border-hairline px-4 text-xs font-medium text-ivory-text/70 transition-colors hover:border-gold-line/50 hover:text-ivory-text"
            >
              {previewUrl ? "Replace photo" : "Upload photo"}
            </button>
            <p className="text-[11px] text-ivory-text/35">
              JPEG or PNG recommended. Square crop looks best.
            </p>
          </div>
        </div>
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="af-name"
          className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-gold-line"
        >
          Name <span className="text-copper">*</span>
        </label>
        <input
          id="af-name"
          name="name"
          type="text"
          required
          defaultValue={advisor?.name ?? ""}
          placeholder="e.g. Pyramid Vaastu Nepal"
          className={inputClass}
          />
        </div>

        {/* Role */}
      <div>
        <label
          htmlFor="af-role"
          className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-gold-line"
        >
          Role / Title
        </label>
        <input
          id="af-role"
          name="role"
          type="text"
          defaultValue={advisor?.role ?? ""}
          placeholder="e.g. Certified Pyramid Vastu Expert · 13 Years in Practice"
          className={inputClass}
        />
      </div>

      {/* WhatsApp number */}
      <div>
        <label
          htmlFor="af-wa"
          className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-gold-line"
        >
          WhatsApp Number
        </label>
        <input
          id="af-wa"
          name="whatsappNumber"
          type="text"
          defaultValue={advisor?.whatsappNumber ?? ""}
          placeholder="e.g. 9779851151618 (international format, no +)"
          className={inputClass}
        />
      </div>

      {/* Languages */}
      <div>
        <label
          htmlFor="af-langs"
          className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-gold-line"
        >
          Languages Spoken
        </label>
        <input
          id="af-langs"
          name="languages"
          type="text"
          defaultValue={advisor?.languages.join(", ") ?? "Nepali, Hindi, English"}
          placeholder="Comma-separated: Nepali, Hindi, English"
          className={inputClass}
        />
      </div>

      {/* Active toggle */}
      <div className="flex items-center gap-3">
        <input
          id="af-active"
          name="isActive"
          type="checkbox"
          defaultChecked={true}
          className="h-4 w-4 rounded accent-copper"
        />
        <label htmlFor="af-active" className="text-sm text-ivory-text/80">
          Active — show this advisor on the public site
        </label>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4 border-t border-border-hairline pt-6">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center justify-center rounded-btn bg-copper px-7 text-sm font-medium text-ivory-text transition-shadow duration-200 hover:shadow-glow-copper disabled:opacity-60"
        >
          {pending
            ? "Saving…"
            : props.mode === "new"
            ? "Add Advisor"
            : "Save Changes"}
        </button>
        <a
          href="/admin/advisors"
          className="text-sm text-ivory-text/55 transition-colors hover:text-ivory-text"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
