import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {FaImage} from "react-icons/fa";
import {toast} from "react-toastify";
import {createArticle} from "../../features/articles/articlesSlice";
import {MdDelete} from "react-icons/md";
import Swal from "sweetalert2";

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const [post, setPost] = useState("")
    const [image, setImage] = useState(null)

    const handlePostChange = (e) => {
        setPost(e.target.value)
    }

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const imageSource = event.target.result;
                const fileType = selectedFile.type;

                // Vérifie si le fichier est .jpg ou .png
                if (fileType === 'image/jpeg' || fileType === 'image/png') {
                    setImage(imageSource);
                } else {
                    toast.error('Please select jpg or png file');
                }
            };

            reader.readAsDataURL(selectedFile);
        }
    }

    const handleShare = () => {
        if (post || image){
            const userData = {"text": post, "image": image}
            dispatch(createArticle(userData))
            console.log(userData)
        }
    }

    const textareaRef = useRef(null)

    useEffect(() => {
        const adjustTextAreaHeight = () => {
            const textarea = textareaRef.current
            textarea.style.height = 'auto'

            const computedHeight = Math.min(textarea.scrollHeight, 300)
            textarea.style.height = `${computedHeight}px`
        }

        adjustTextAreaHeight()
    }, [post])



    return (
        <div className='new-post-container'>
            <div className='new-post-left'>
                <img src="https://i.imgur.com/alAsUhx.jpg" className="post-pic"/>
                <div className='new-post-left-content'>
                    <textarea
                        ref={textareaRef}
                        name='content'
                        value={post}
                        placeholder="A little something to say?..."
                        onChange={handlePostChange}
                        className='new-post-textarea'
                    />
                    <input name='image' id='image' type='file' accept='/image/jpeg, /image/png' className='hidden' onChange={handleImageChange}/>
                    {!image && (
                        <label htmlFor='image'><FaImage /></label>
                    )}
                    {image && (
                        <div className='new-post-img-container'>
                            <img className='new-post-img' src={image} alt="Aperçu de l'image" />
                            <button className='new-post-img-delete' onClick={() => {
                                Swal.fire({
                                    title: 'Remove image',
                                    text: 'Are you sure you want to remove the image from the post?',
                                    icon: 'warning',
                                    confirmButtonText: 'Remove'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        setImage(null)
                                        document.getElementById('image').value = null
                                    }
                                })
                            }
                            }><MdDelete  /></button>
                        </div>
                    )}
                </div>
            </div>

            <div className='new-post-right'>
                <button className='main-button' onClick={handleShare}>Share</button>
            </div>
        </div>
    );
};

export default Header;