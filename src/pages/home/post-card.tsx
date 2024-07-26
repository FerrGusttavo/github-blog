import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkEmoji from "remark-emoji";

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  created_at: string;
}

export function PostCard({ title, body, created_at, id }: PostCardProps) {
  const formattedDate = formatDistanceToNow(new Date(created_at), {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <section className="bg-base-post p-8 flex-1 rounded-lg">
      <div className="flex justify-between items-start">
        <a
          href={`post/${id}`}
          className="text-base-title font-bold text-xl max-w-56 line-clamp-3"
        >
          {title}
        </a>
        <span className="text-base-span text-sm flex-shrink-0">
          {formattedDate}
        </span>
      </div>
      <div className="mt-5">
        <p className="line-clamp-4">
          <Markdown
            children={body}
            remarkPlugins={[remarkGfm, remarkBreaks, remarkEmoji]}
          />
        </p>
      </div>
    </section>
  );
}
