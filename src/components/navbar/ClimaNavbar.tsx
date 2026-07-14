import { useEffect, useState } from "react";

interface DadosClima {
  temperatura: number;
  codigoClima: number;
}

function ClimaNavbar() {
  const [clima, setClima] = useState<DadosClima | null>(null);
  const [erro, setErro] = useState<boolean>(false);

  // Mapeia códigos de clima da Open-Meteo para Emojis ilustrativos
  const obterEmojiClima = (codigo: number) => {
    if (codigo === 0) return "☀️"; // Céu limpo
    if (codigo >= 1 && codigo <= 3) return "🌤️"; // Parcialmente nublado
    if (codigo >= 45 && codigo <= 48) return "🌫️"; // Nevoeiro
    if (codigo >= 51 && codigo <= 67) return "🌧️"; // Chuvisco / Chuva
    if (codigo >= 71 && codigo <= 77) return "❄️"; // Neve
    if (codigo >= 80 && codigo <= 82) return "🌦️"; // Pancadas de chuva
    if (codigo >= 95 && codigo <= 99) return "⛈️"; // Tempestade
    return "🌡️";
  };

  useEffect(() => {
    // 1. Solicita a localização do usuário ao navegador
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // 2. Faz a requisição gratuita ao Open-Meteo
            const response = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
            );
            const data = await response.json();
            
            if (data.current_weather) {
              setClima({
                temperatura: Math.round(data.current_weather.temperature),
                codigoClima: data.current_weather.weathercode,
              });
            }
          } catch {
            setErro(true);
          }
        },
        () => {
          // Caso o usuário recuse compartilhar a localização
          setErro(true);
        }
      );
    } else {
      setErro(true);
    }
  }, []);

  if (erro || !clima) {
    // Retorna vazio ou um indicador neutro se der erro ou estiver carregando
    return null;
  }

  return (
    <div className="flex items-center gap-2 bg-[#bbf7d0] text-[#042f17] px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all shadow-sm">
      <span>{obterEmojiClima(clima.codigoClima)}</span>
      <span>{clima.temperatura}°C</span>
    </div>
  );
}

export default ClimaNavbar;