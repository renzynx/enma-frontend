import { useMeQuery } from "generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useAuth = () => {
  const { data, loading, error } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && error) router.push("/");
  }, [loading, router, error]);

  return data?.me ? data.me.uid : null;
};

export default useAuth;
