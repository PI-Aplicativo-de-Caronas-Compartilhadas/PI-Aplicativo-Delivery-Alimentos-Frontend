import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080"
})

export const buscar = async (url: string, setDados: Function) => {
  const resposta = await api.get(url)
  setDados(resposta.data)
}
