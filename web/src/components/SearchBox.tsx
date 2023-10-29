import { ChangeEvent, useRef, useEffect } from "react";

interface Props {
  delay: number;
  onChange: (query: string) => void;
}

const SearchBox = ({ delay, onChange }: Props) => {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  });

  return (
    <div className="flex p-4 w-auto  bg-white shadow-md rounded m-4">
      <input
        type="text"
        placeholder="Search for recipes and ingredients"
        className="w-full focus:outline-none"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);

          timeoutRef.current = setTimeout(() => {
            onChange(e.target.value);
          }, delay);
        }}
      />
    </div>
  );
};

export default SearchBox;
