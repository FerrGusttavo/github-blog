import {
  ArrowSquareOut,
  Building,
  GithubLogo,
  Users,
} from "@phosphor-icons/react";
import { SearchInput } from "./search-input";
import { githubAPI } from "../../lib/axios";
import { useEffect, useState } from "react";
import { PostCard } from "./post-card";

interface User {
  avatar_url: string;
  name: string;
  bio: string;
  login: string;
  company: string;
  followers: number;
  html_url: string;
}

interface Post {
  number: number;
  title: string;
  body: string;
  created_at: string;
}

export function Home() {
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);

  async function fetchUser() {
    try {
      const response = await githubAPI.get("/users/ferrgusttavo");
      setUser(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  }

  async function fetchPosts() {
    try {
      const response = await githubAPI.get(
        "/search/issues?q=repo:ferrgusttavo/github-blog",
        {
          params: {
            per_page: 6,
            sort: "created_at",
            order: "desc",
          },
        }
      );
      setPosts(response.data.items);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchUser(), fetchPosts()]);
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="max-w-4xl mx-auto -mt-20 p-4 ">
        <div className="shadow-pattern bg-base-profile rounded-lg px-10 py-8 flex md:flex-row flex-col items-center ">
          <img
            className="md:w-1/4 h-[148px] mr-8"
            src={user?.avatar_url}
            alt=""
          />
          <div className="w-full mt-4">
            <div className="flex justify-between">
              <h2 className="text-base-title font-bold text-2xl">
                {user?.name}
              </h2>
              <a
                className="text-blue font-bold text-xs flex items-center gap-2"
                target="_blank"
                href={user?.html_url}
              >
                GITHUB
                <ArrowSquareOut weight="bold" size={16} />
              </a>
            </div>
            <div className="mt-2 mb-6">
              <p className="text-base-text">{user?.bio}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center gap-2">
                <GithubLogo
                  className="text-base-label"
                  weight="bold"
                  size={18}
                />
                <span className="text-base-subtitle">{user?.login}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="text-base-label" weight="bold" size={18} />
                <span className="text-base-subtitle">{user?.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-base-label" weight="bold" size={18} />
                <span className="text-base-subtitle">
                  {user?.followers} seguidores
                </span>
              </div>
            </div>
          </div>
        </div>
        <SearchInput numberPosts={posts.length} />
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {posts.map((post, index) => (
            <PostCard
              key={index}
              id={post.number}
              title={post.title}
              body={post.body}
              created_at={post.created_at}
            />
          ))}
        </div>
      </main>
    </>
  );
}
