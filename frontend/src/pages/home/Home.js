import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllArticles, reset} from "../../features/articles/articlesSlice";
import {toast} from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import ArticleItem from "../../components/articleItem/ArticleItem";
import Suggestions from "../../components/suggestions/Suggestions";
import NewPost from "../../components/newPost/NewPost";

const Home = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {articles, isError, isSuccess, isLoading, message} = useSelector((state) => state.articles)
    const {user} = useSelector((state) => state.auth)


    useEffect(() => {

        if (isError) {
            toast.error(message)
        } else {
            dispatch(getAllArticles())
        }

    }, [dispatch, isError, message]);

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <>
            <div className='main-center'>
                <NewPost />

                <section className='feed'>
                    {articles.length > 0 ? (
                        <div className='posts'>
                            {articles.map((article) => (

                                <ArticleItem article={article} key={article._id} user={user}/>

                            ))}
                        </div>
                    ) : (
                        <h3>Aucun article disponible.</h3>
                    )}
                </section>
            </div>
            <Suggestions/>
        </>
    );
};

export default Home;