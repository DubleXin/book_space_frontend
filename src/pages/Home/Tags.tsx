import { useNavigate } from "react-router-dom";
import type { Subject } from "../../types/book";
import { Tag } from "../../components/ui/Tag";

const parseTags = (tag: string): string => tag.replace("_", " ");

type Props = {
  tags: Subject[];
};

const Tags = ({ tags }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-center justify-start gap-3 flex-wrap">
        {tags.map((s) => (
          <Tag variant="outline" key={`subject-tag-${s.name}`}>
            {parseTags(s.name)}
          </Tag>
        ))}
        <Tag onClick={() => navigate("/explore")}>more</Tag>
      </div>
    </div>
  );
};

export default Tags;
