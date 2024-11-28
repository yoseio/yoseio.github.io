import Link from "next/link";

import { SearchIcon } from "@/components/icons/SearchIcon";
import { Input } from "@/components/ui/input";

const name = "yoseio";

export function NavBar() {
  return (
    <div className="flex items-center mb-4">
      <Link href="/">
        <h1 className="text-xl font-bold">{name}</h1>
      </Link>
      <div className="ml-auto">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="px-10 py-2 border rounded-full w-64 focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
}
