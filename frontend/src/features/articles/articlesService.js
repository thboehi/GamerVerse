import axios from "axios";

const API_URL = "/api/articles/"

const getAllArticles = async () => {
    const response = await axios(API_URL + 'all')
    return response.data
}

const getUserArticles = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios(API_URL + 'user', config)
    return response.data
}

const deleteArticle = async (articleId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + articleId, config)
}

const createArticle = async (article, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    }
    const response = await axios.post(API_URL + "add", article, config)
}

const articlesService = {
    getAllArticles,
    getUserArticles,
    deleteArticle,
    createArticle
}

export default articlesService