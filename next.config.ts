import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // Português é o idioma padrão e não tem prefixo: /pt e /pt/* apontam para a rota sem prefixo.
      { source: "/pt/:path*", destination: "/:path*", permanent: true },
      // Não existe página de índice de projetos: a lista fica na home.
      { source: "/projetos", destination: "/#projetos", permanent: true },
      { source: "/en/projects", destination: "/en#projects", permanent: true },
    ];
  },
};

export default nextConfig;
