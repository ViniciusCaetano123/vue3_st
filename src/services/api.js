import axios from 'axios'

const url = 'https://www.lefisc.com.br/api/st'

const conteudo = 'conteudo'
export default {
  getNCM() {
    return axios
      .get(`${url}/ncm`)
      .then(res => res)
      .catch(err => err.response)
  },

  getCategoriaLegislacoes() {
    return axios
      .get(`${url}/${conteudo}/legislacao/categoria`)
      .then(response => response.data)
      .catch(err => console.warn(err));
  },
  getLegislacoes(categoria, quantidade) {
    return axios
      .get(`${url}/${conteudo}/legislacao`, { params: {
        categoria,
        quantidade
      }})
      .then(response => response.data)
      .catch(err => console.warn(err));
  },
  getVideos() {
    return axios
      .get(`${url}/${conteudo}/video`)
      .then(response => response.data)
      .catch(err => console.warn(err))
  },
}