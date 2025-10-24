import React from "react";

// Imagem de fundo arena Rocket League (pode ser SVG ou PNG)
// Exemplo de SVG simples, pode ser substituído por imagem real
export const RocketLeagueArenaBg: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/7/7a/Rocket_League_field.svg)', // Exemplo SVG público
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%',
      borderRadius: '1rem',
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      opacity: 0.25,
    }}
  >
    {children}
  </div>
);
