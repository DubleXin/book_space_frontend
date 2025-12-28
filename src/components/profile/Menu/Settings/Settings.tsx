import { Button } from "../../../ui/Button";
import { useAuth } from "../../../../store";
import { useMyProfile } from "../../../../hooks";
import { Input } from "../../../ui/Input";
import { useEffect, useMemo, useState } from "react";
import { Save, Pencil, PencilOff } from "lucide-react";
import { IconButton } from "../../../ui/IconButton";
import { Textarea } from "../../../ui/TextArea";
import { useMutateProfile } from "../../profile.hooks";
import Field from "./Field";

type ActiveState = { username: boolean; bio: boolean };

const Settings = () => {
  const { user, logout } = useAuth();
  const profileQuery = useMyProfile();
  const profile = profileQuery.data;

  const profileMutation = useMutateProfile();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const [active, setActive] = useState<ActiveState>({
    username: false,
    bio: false,
  });

  const isLoading = profileQuery.isPending;
  const isSaving = profileMutation.isPending;

  useEffect(() => {
    if (!profile) return;
    if (active.username || active.bio) return;

    setUsername(profile.username ?? "");
    setBio(profile.bio ?? "");
  }, [profile, profile?.username, profile?.bio, active.username, active.bio]);

  const usernameChanged = useMemo(
    () => (profile?.username ?? "") !== username,
    [profile?.username, username]
  );

  const bioChanged = useMemo(
    () => (profile?.bio ?? "") !== bio,
    [profile?.bio, bio]
  );

  const toggleUsername = () => {
    if (isLoading || isSaving) return;

    if (active.username) {
      if (usernameChanged) profileMutation.mutate({ username });
      setActive((p) => ({ ...p, username: false }));
      return;
    }

    setActive((p) => ({ ...p, username: true }));
  };

  const toggleBio = () => {
    if (isLoading || isSaving) return;

    if (active.bio) {
      if (bioChanged) profileMutation.mutate({ bio });
      setActive((prev) => ({ ...prev, bio: false }));
      return;
    }

    setActive((prev) => ({ ...prev, bio: true }));
  };

  return (
    <section className="max-w-full rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-neutral-950/40">
      <header className="mb-6">
        <p className="mt-1 text-sm text-slate-600 dark:text-white/60">
          Manage your profile information.
        </p>
      </header>

      <div className="space-y-4">
        <Field
          label="Username"
          htmlFor="settings-username"
          action={
            <IconButton
              className="ml-2"
              size="sm"
              label={active.username ? "Save" : "Edit"}
              Icon={active.username ? Save : Pencil}
              onClick={toggleUsername}
              disabled={
                isLoading || isSaving || (active.username && !usernameChanged)
              }
            />
          }
        >
          <Input
            id="settings-username"
            className="rounded-xl"
            variant="outline"
            placeholder="Your username"
            value={isLoading ? "" : username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading || isSaving || !active.username}
          />
        </Field>

        <Field
          label="User ID"
          htmlFor="settings-sub"
          action={
            <IconButton
              className="ml-2"
              size="sm"
              label="Can't edit"
              Icon={PencilOff}
              disabled
            />
          }
        >
          <Input
            id="settings-sub"
            className="rounded-xl"
            variant="outline"
            value={user?.sub ?? ""}
            disabled
          />
        </Field>

        <Field
          label="Email"
          htmlFor="settings-email"
          action={
            <IconButton
              className="ml-2"
              size="sm"
              label="Can't edit"
              Icon={PencilOff}
              disabled
            />
          }
        >
          <Input
            id="settings-email"
            className="rounded-xl"
            variant="outline"
            value={user?.email ?? ""}
            disabled
          />
        </Field>

        <Field
          label="Bio"
          htmlFor="settings-bio"
          hint="This will be visible on your public profile."
          action={
            <IconButton
              className="ml-2"
              size="sm"
              label={active.bio ? "Save" : "Edit"}
              Icon={active.bio ? Save : Pencil}
              onClick={toggleBio}
              disabled={isLoading || isSaving || (active.bio && !bioChanged)}
            />
          }
        >
          <Textarea
            id="settings-bio"
            className="rounded-xl"
            rows={4}
            placeholder="Tell others a bit about you…"
            variant="outline"
            textareaSize="md"
            resize="none"
            value={isLoading ? "" : bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={isLoading || isSaving || !active.bio}
          />
        </Field>

        <div className="pt-2">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/5">
            <div>
              <p className="text-sm font-medium">Log out</p>
              <p className="text-xs text-slate-500 dark:text-white/40">
                You’ll be returned to the login page.
              </p>
            </div>

            <Button
              variant="danger"
              onClick={() => logout()}
              disabled={isSaving}
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
