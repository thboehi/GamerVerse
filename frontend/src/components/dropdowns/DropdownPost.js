import React from 'react';
import Swal from "sweetalert2";
import {deleteArticle} from "../../features/articles/articlesSlice";
import {useDispatch} from "react-redux";

const DropdownPost = ({article, user = null}) => {

    const dispatch = useDispatch()

    const handleDelete = () => {
        Swal.fire({
            title: 'Delete this post',
            text: 'Are you sure you want to delete this post? This action cannot be reversed.',
            icon: 'warning',
            confirmButtonText: 'Delete',
            confirmButtonColor: "#ff0000",
            showCancelButton: true,
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Your post',
                    text: 'has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'Close'
                })
                dispatch(deleteArticle(article._id))
            }
        })
    }

    return (
        <>
            <ul className='dropdown-menu'>
                <li>Share</li>
                <li className='drop-red-btn'>Report</li>
            </ul>
        </>
    );
};

export default DropdownPost;