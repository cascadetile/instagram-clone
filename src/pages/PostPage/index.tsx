import React, {
  useState, useEffect,
} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addLike, getPostByID, removeLike } from '../../api';
import './style.scss';
import { PostPageLike } from '../../assets/PostPageLike';
import { PostPageComments } from '../../assets/PostPageComments';

interface IPost {
  id: number
  username: string
  profilePicture: string
  dateCreated: string
  dateUpdated: string
  caption: string
  likes: number
  comments: ICommentary[]
  image: string
}

interface ICommentary {
  username: string
  text: string
}

export const PostPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<IPost | null>(null);
  const [isAuthed, setIsAuthed] = useState(true);
  const [isMyPost, setIsMyPost] = useState(false);
  const [amISubscribedToUser, setAmISubscribedToUser] = useState(true);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [isLikedByMe, setIsLikedByMe] = useState(false);
  const [session, setSession] = useState('ed41011c-7ecd-48ac-ad1d-53b5c8e7a9df');
  const [likesCounter, setLikesCounter] = useState(0);

  const backButtonHandler = () => {
    if (document.referrer) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const modalWrapperClickHandler = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setModalVisibility(false);
    }
  };

  const getPost = async () => {
    try {
      if (id && !Number.isNaN(Number(id))) {
        const resp = await getPostByID(Number(id));
        setPost(resp.data.post);
        setLikesCounter(resp.data.post.likes);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const likeHandler = async () => {
    try {
      if (!isLikedByMe) {
        await addLike(Number(id), session);
        setIsLikedByMe(true);
        setLikesCounter(likesCounter + 1);
      } else {
        await removeLike(Number(id), session);
        setIsLikedByMe(false);
        setLikesCounter(likesCounter - 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const commentsClickHandler = () => {
    navigate(`/p/${id}/comments`);
  };

  const convertTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ru', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
      timeZone: 'UTC',
    });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {
        post
        && (
          <div className="post-page">
            <div className="post-page__main-header">
              <button onClick={() => backButtonHandler()} className="post-page__back-btn" type="button">
                <svg aria-label="Назад" className="_ab6-" color="black" fill="black" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z" />
                </svg>
              </button>
              <h1 className="post-page__main-header-text">Фото</h1>
              <div className="post-page__main-header-dummy" />
            </div>
            <div className="post-page__header">
              <Link to={`/${post.username}`} className="post-page__pfp-wrapper">
                {
                  post.profilePicture
                    ? <img className="post-page__pfp" src={post.profilePicture} alt="Profile picture" />
                    : <img className="post-page__pfp" src="/default_avatar.jpg" alt="Profile picture" />
                }
              </Link>
              <div>
                <Link className="post-page__username" to={`/${post.username}`}>
                  { post.username }
                </Link>
                {
                  !amISubscribedToUser
                  && (
                    <>
                      &nbsp;
                      •
                      &nbsp;
                      <button type="button" className="post-page__header-subscribe-btn">Подписаться</button>
                    </>
                  )
                }
              </div>
              <button onClick={() => setModalVisibility(true)} className="post-page__actions-menu-btn" type="button">
                <svg aria-label="Дополнительно" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="6" cy="12" r="1.5" />
                  <circle cx="18" cy="12" r="1.5" />
                </svg>
              </button>
            </div>
            <div className="post-page__img-wrapper">
              <img className="post-page__img" src={post.image} alt="" />
            </div>
            <div className="post-page__bottom-wrapper">
              <div className="post-page__main-actions">
                <button onClick={() => likeHandler()} className="post-page__like-btn" type="button">
                  <PostPageLike isLiked={isLikedByMe} />
                </button>
                <button onClick={() => commentsClickHandler()} className="post-page__comments-btn" type="button">
                  <PostPageComments />
                </button>
              </div>
              <div className="post-page__likes">
                { likesCounter }
                &nbsp;
                отметок &quot;Нравится&quot;
              </div>
              {
                post.caption
                && (
                  <div className="post-page__caption">
                    <Link className="post-page__caption-username" to={`/${post.username}`}>
                      { post.username }
                    </Link>
                    &nbsp;
                    { post.caption }
                  </div>
                )
              }
              {
                post.comments.length >= 3
                && (
                  <button onClick={() => commentsClickHandler()} className="post-page__show-comments-btn" type="button">
                    Посмотреть все комментарии (
                    { post.comments.length }
                    )
                  </button>
                )
              }
              {
                post.comments.map((comment) => {
                  return (
                    <div>
                      <Link className="post-page__caption-username" to={`/${comment.username}`}>
                        { comment.username }
                      </Link>
                      &nbsp;
                      { comment.text }
                    </div>
                  );
                })
              }
              <div className="post-page__date-created">
                { convertTimestamp(post.dateCreated) }
              </div>
            </div>
          </div>
        )
      }
      {
        modalVisibility
        && (
          <div onClick={(e) => modalWrapperClickHandler(e)} className="post-page__modal-wrapper">
            <div className="post-page__modal">
              {
                isMyPost
                && (
                  <>
                    <button className="post-page__modal-btn" type="button">Удалить</button>
                    <button className="post-page__modal-btn" type="button">Поделиться...</button>
                    <button className="post-page__modal-btn" type="button">Копировать ссылку</button>
                    <button className="post-page__modal-btn" type="button">Вставить на сайт</button>
                  </>
                )
              }
              {
                !isMyPost && amISubscribedToUser
                && (
                  <>
                    <button className="post-page__modal-btn" type="button">Пожаловаться</button>
                    <button className="post-page__modal-btn" type="button">Отменить подписку</button>
                    <button className="post-page__modal-btn" type="button">Добавить в избранное</button>
                    <button className="post-page__modal-btn" type="button">Поделиться...</button>
                    <button className="post-page__modal-btn" type="button">Копировать ссылку</button>
                    <button className="post-page__modal-btn" type="button">Вставить на сайт</button>
                  </>
                )
              }
              {
                !isMyPost && !amISubscribedToUser
                && (
                  <>
                    <button className="post-page__modal-btn" type="button">Пожаловаться</button>
                    <button className="post-page__modal-btn" type="button">Поделиться...</button>
                    <button className="post-page__modal-btn" type="button">Копировать ссылку</button>
                    <button className="post-page__modal-btn" type="button">Вставить на сайт</button>
                  </>
                )
              }
              <button onClick={() => setModalVisibility(false)} className="post-page__modal-btn" type="button">Отмена</button>
            </div>
          </div>
        )
      }
    </>
  );
};

export default PostPage;
