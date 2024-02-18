import React, {useEffect, useRef, useState} from 'react';
import {deleteArticle, getAllArticles} from "../../features/articles/articlesSlice";
import { fr } from 'date-fns/locale';
import { format, isToday } from 'date-fns';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {FaHeart, FaRegComment, FaRegHeart, FaShare} from "react-icons/fa";
import Swal from "sweetalert2";
import DropdownPostAuthor from "../dropdowns/DropdownPostAuthor";
import DropdownPost from "../dropdowns/DropdownPost";
import {getAllUsers, getUserById, reset} from "../../features/users/usersSlice";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

const ArticleItem = ({article, user = null}) => {

    const dispatch = useDispatch()

    const dropdownRef = useRef(null);

    const [liked, setLiked] = useState(false)
    const [moreOpen, setMoreOpen] = useState(false)

    const {users, isError, isSuccess, isLoading, message} = useSelector((state) => state.users)

    const handleLike = () => {
        setLiked(!liked);
    }

    useEffect(() => {

        if (isError) {
            toast.error(message)
        } else {
            dispatch(getUserById(article.user))
        }

    }, [dispatch, isError, message]);

    console.log(users + "asd")

    const handleMore = () => {
        setMoreOpen(!moreOpen)
    }

    useEffect(() => {
        const closeDropdown = (event) => {
            // Vérifier si le clic a été effectué en dehors du menu dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMoreOpen(false);
            }
        };

        // Ajouter un écouteur d'événements pour les clics sur le document
        document.addEventListener('click', closeDropdown);

        // Nettoyer l'écouteur d'événements lors du démontage du composant
        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, []);

    if (!user) {
        const user = [{"_id": "null"}]
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();

        if (isToday(date)) {
            return `Aujourd'hui à ${format(date, "HH'h'mm", { locale: fr })}`;
        } else {
            return format(date, "d MMMM yyyy 'à' HH'h'mm", { locale: fr });
        }
    };

    return (
        <div className='post'>
            <div className='post-pic-container'>
                <img src="https://i.imgur.com/alAsUhx.jpg" className="post-pic"/>
            </div>
            <div className="post-right">
                <div className="username-name-container">
                    <p className="post-name">Joaquim Phoenix</p>
                    <p className="post-username">@jo_phoen</p>
                </div>
                <p className="post-date">{formatDate(article.createdAt)}</p>
                <p>{article.content}</p>
                {article.image &&
                    <div className='post-img-container'>
                        <img src={article.image} className='post-img'/>
                    </div>
                }

                <div className="post-btn-container">
                    <button className="post-btn"><FaShare style={{fontSize: "1.5em"}} /></button>
                    <button className="post-btn"><FaRegComment style={{fontSize: "1.5em"}} /></button>
                    <button className="post-btn" onClick={handleLike}>
                        {liked ? <FaHeart style={{fontSize: "1.5em", color: "#e31b23"}} /> : <FaRegHeart style={{fontSize: "1.5em"}} />}
                    </button>

                    <div className='btn-dd-container'>
                        <button className="post-btn" onClick={handleMore} ref={dropdownRef}><HiOutlineDotsHorizontal style={{fontSize: "1.5em"}} /></button>
                        {moreOpen &&
                            user._id === article.user &&
                            <DropdownPostAuthor user={user} article={article} />
                        }
                        {moreOpen &&
                            user._id !== article.user &&
                            <DropdownPost user={user} article={article} />
                        }

                    </div>
                </div>
            </div>


        </div>
    );
};

export default ArticleItem;