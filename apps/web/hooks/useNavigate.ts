import { useRouter } from "next/navigation";

export const useNavigate = () => {
  const router = useRouter();

  return ({
    pathname,
    isReplace,
  }: {
    pathname: string;
    isReplace?: boolean;
  }) => {
    const navigationMethod = isReplace ? router.replace : router.push;

    navigationMethod(`/app${pathname}`);
  };
};
