import Link from "next/link";

import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { TwitterIcon } from "@/components/icons/TwitterIcon";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const name = "yoseio";
const photo = "https://github.com/yoseio.png";
const twitter = "https://twitter.com/yo_se_o_";
const github = "https://github.com/yoseio";

export function ProfileCard() {
  return (
    <Card className="mb-8 mx-auto">
      <CardContent className="p-6 flex items-center gap-4">
        <Avatar>
          <AvatarImage src={photo} alt={name} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-bold">{name}</h3>
          <div className="flex items-center gap-2 mt-2">
            <Link
              href={twitter}
              className="text-muted-foreground hover:text-primary"
            >
              <TwitterIcon className="w-5 h-5" />
            </Link>
            <Link
              href={github}
              className="text-muted-foreground hover:text-primary"
            >
              <GitHubIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
