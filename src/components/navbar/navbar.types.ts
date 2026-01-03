export type HintKind = "action" | "recent" | "subject" | "author" | "plain";

export type Hint = {
  id: string;
  label: string;
  kind: HintKind;
  value?: string; // query value (for recent/subject) or empty for action
};
