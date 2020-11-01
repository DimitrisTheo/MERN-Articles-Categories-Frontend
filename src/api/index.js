import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
})

// Routes for Articles information
export const getAllArticles = (query) => api.get(`/articles${query}`)
export const getArticleById_or_Title = param => api.get(`/articles/${param}`)
export const createArticle = payload => api.post(`/articles`, payload)
export const updateArticleById_or_Title = (param, payload) => api.post(`/articles/${param}`, payload)
export const deleteArticleById_or_Title = param => api.delete(`/articles/${param}`)

// Routes for Categories information
export const getAllCategories = () => api.get(`/categories`)
export const createCategory = payload => api.post(`/categories`, payload)
export const deleteCategoryByName_or_Id = param => api.delete(`/categories/${param}`)

const apis = {
    getAllArticles,
    getArticleById_or_Title,
    createArticle,
    updateArticleById_or_Title,
    deleteArticleById_or_Title,
    getAllCategories,
    createCategory,
    deleteCategoryByName_or_Id
}

export default apis