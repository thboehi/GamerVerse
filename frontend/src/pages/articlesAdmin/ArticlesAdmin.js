import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {getAllArticles, getUserArticles} from "../../features/articles/articlesSlice";
import ArticleItem from "../../components/articleItem/ArticleItem";


const ArticlesAdmin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
    const {userArticles, isError, isLoading, isSuccess, message} = useSelector((state) => state.articles)

    useEffect(() => {

        if (!user) {
            navigate('/')
        }
        if (isError) {
            toast.error(message)
        } else {
            dispatch(getUserArticles())
        }

    }, [dispatch, isError, message]);

    return (
        <>
            <section className='heading'>
                <h1>
                    Administration de vos articles
                </h1>
                <p>Ajoutez, modifiez ou supprimez vos articles.</p>
            </section>


            <section className='content'>
                {userArticles.length > 0 ? (
                    <div className='goals'>
                        {userArticles.map((article) => (

                            <ArticleItem article={article} key={article._id} user={user}/>

                        ))}
                    </div>
                ) : (
                    <h3>Aucun article disponible.</h3>
                )}
            </section>
        </>
    );
};

export default ArticlesAdmin;