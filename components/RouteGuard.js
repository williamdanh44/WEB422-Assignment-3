// components/RouteGuard.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/lib/authenticate";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { getFavourites } from "@/lib/userData";

const PUBLIC_PATHS = ["/login", "/register", "/about"];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  // Populate atom function
  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

  useEffect(() => {
    // Update atom when component mounts
    updateAtom();

    if (!PUBLIC_PATHS.includes(router.pathname) && !isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
}
