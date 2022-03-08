import { useMeQuery } from "generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useAuth = () => {
  const { loading, error } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && error) router.push("/");
  }, [loading, router, error]);
};

export default useAuth;
