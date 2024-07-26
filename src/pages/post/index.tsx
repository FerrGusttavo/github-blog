/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArrowSquareOut,
  GithubLogo,
  CaretLeft,
  Chat,
  CalendarCheck,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { githubAPI } from "../../lib/axios";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkEmoji from "remark-emoji";

interface Post {
  title: string;
  body: string;
  comments: number;
  created_at: string;
  html_url: string;
  user: {
    login: string;
  };
}

export function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await githubAPI.get(
          `/repos/ferrgusttavo/portfolio/issues/${id}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Erro ao buscar post:", error);
        navigate("/404");
      }
    }
    if (id) {
      fetchPost();
    } else {
      navigate("/404");
    }
  }, [id, navigate]);

  if (!post) {
    return;
  }

  const formattedDate = formatDistanceToNow(new Date(post?.created_at), {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <main className="max-w-4xl mx-auto -mt-20 p-4 ">
      <div className="shadow-pattern bg-base-profile rounded-lg px-10 py-8 flex md:flex-row flex-col items-center">
        <div className="w-full mt-4">
          <div className="flex justify-between">
            <a
              href="/"
              className="text-blue font-bold text-xs flex items-center gap-2"
            >
              <CaretLeft weight="bold" size={16} />
              VOLTAR
            </a>
            <a
              className="text-blue font-bold text-xs flex items-center gap-2"
              target="_blank"
              href={post?.html_url}
            >
              VER NO GITHUB
              <ArrowSquareOut weight="bold" size={16} />
            </a>
          </div>
          <div className="mt-5 mb-2">
            <h2 className="text-base-title font-bold text-2xl">
              {post?.title}
            </h2>
          </div>
          <div className="flex flex-col gap-4 justify-between sm:flex-row sm:justify-normal sm:gap-8">
            <div className="flex items-center gap-2">
              <GithubLogo className="text-base-label" weight="bold" size={18} />
              <span className="text-base-span">{post?.user.login}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarCheck
                className="text-base-label"
                weight="bold"
                size={18}
              />
              <span className="text-base-span">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Chat className="text-base-label" weight="bold" size={18} />
              <span className="text-base-span">
                {post?.comments} comentários
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 px-8">
        <div>
          <Markdown
            children={post?.body}
            remarkPlugins={[remarkGfm, remarkBreaks, remarkEmoji]}
            components={{
              p: ({ node, ...props }) => <p {...props} className="mb-4" />,
              a: ({ node, ...props }) => (
                <a {...props} target="_blank" className="text-blue font-bold" />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  {...props}
                  className="text-base-title font-bold text-xl mb-4"
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5 mb-4" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-5 mb-4" {...props} />
              ),
              li: ({ node, ...props }) => <li className="mb-2" {...props} />,
              h4: ({ node, ...props }) => (
                <h4 {...props} className="mb-4 text-base-title font-bold" />
              ),
              strong: ({ node, ...props }) => (
                <strong {...props} className="font-bold text-base-subtitle" />
              ),
            }}
          />
        </div>
      </div>
    </main>
  );
}
