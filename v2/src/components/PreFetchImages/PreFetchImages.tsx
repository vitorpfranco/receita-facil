import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchIcons, useSupportedIcons } from "../../hooks/useIcon";

const PreFetchImages: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: icons } = useSupportedIcons();
  useEffect(() => {
    if (!icons) return;
    const iconUrls = Object.values(icons).flat();

    prefetchIcons(iconUrls, queryClient);
  }, [queryClient, icons]);

  return null;
};

export default PreFetchImages;