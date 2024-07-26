interface SearchInputProps {
  numberPosts: number;
}

export function SearchInput({ numberPosts }: SearchInputProps) {
  return (
    <div className="mt-16">
      <div className="flex justify-between">
        <h2 className="font-bold text-lg text-base-subtitle">Publicações</h2>
        <span className="text-base-span">{numberPosts} publicações</span>
      </div>
      <div className="mt-3">
        {/* <input
          type="text"
          placeholder="Buscar conteúdo"
          className="w-full py-3 px-4 rounded-md bg-base-input outline-none placeholder:text-base-label border border-base-border"
        /> */}
      </div>
    </div>
  );
}
