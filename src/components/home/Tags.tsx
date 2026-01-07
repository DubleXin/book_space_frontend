import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Subject } from "../../types/book";
import { Tag } from "../ui/Tag";

const parseTags = (tag: string): string => tag.replaceAll("_", " ");

type Props = {
  tags: Subject[];
  initialCount?: number;
};

const Tags = ({ tags, initialCount = 12 }: Props) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const visibleTags = useMemo(() => {
    if (expanded) return tags;
    return tags.slice(0, initialCount);
  }, [expanded, tags, initialCount]);

  const hasMore = tags.length > initialCount;

  return (
    <div className="rounded-xl border p-4">
      <div className="flex flex-wrap items-center justify-start gap-3">
        {visibleTags.map((s) => (
          <Link key={`subject-tag-${s.name}`} to={`/explore?subject=${s.name}`}>
            <Tag variant="outline">{parseTags(s.name)}</Tag>
          </Link>
        ))}

        {hasMore && (
          <Tag onClick={() => setExpanded((v) => !v)}>
            {expanded ? "Show less" : "Show more"}
          </Tag>
        )}

        <Tag variant="primary" onClick={() => navigate("/explore")}>
          explore
        </Tag>
      </div>
    </div>
  );
};

export default Tags;
