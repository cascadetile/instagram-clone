import React, {
  useState, useEffect,
} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addComment, getPhotoComments, getPostByID } from '../../api';
import './style.scss';

interface ICommentary {
  username: string
  text: string
  profilePicture: string
  dateCreated: string
}

// TODO: this components need a URL of current user pfp and his nickname
export const PostComments: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState<ICommentary[] | null>(null);
  const [isAuthed, setIsAuthed] = useState(true);
  const [isMyPost, setIsMyPost] = useState(false);
  const [session, setSession] = useState('ed41011c-7ecd-48ac-ad1d-53b5c8e7a9df');
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('abc');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  const backButtonHandler = () => {
    if (document.referrer) {
      navigate(-1);
    } else {
      navigate(-1);
    }
  };

  const getComments = async () => {
    try {
      if (id && !Number.isNaN(Number(id))) {
        const resp = await getPhotoComments(Number(id), session);
        setComments(resp.data.comments);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendComment = async (e: React.FormEvent<HTMLFormElement>, text: string) => {
    e.preventDefault();
    try {
      await addComment(Number(id), text, session);
      if (comments) {
        const commentsCopy = [...comments];
        commentsCopy.push({
          username,
          text,
          profilePicture: profilePictureUrl,
          dateCreated: new Date().toString(),
        });
        setComments(commentsCopy);
      }
      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  const convertTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ru', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      {
        comments
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

            <div className="post-comments__input-section">
              <form onSubmit={(e) => sendComment(e, comment)} className="post-comments__form">
                <textarea
                  value={comment}
                  onInput={(e) => setComment((e.target as HTMLInputElement).value)}
                  className="post-comments__textarea"
                  placeholder="Добавьте комментарий"
                />
                <button className="post-comments__form-submit" type="submit">Опубликовать</button>
              </form>
            </div>

            {
              comments.map((comment) => {
                return (
                  <div key={comment.dateCreated} className="post-comments__comment">
                    <div className="post-comments__comment-pfp-wrapper">
                      {
                        comment.profilePicture
                          ? <img className="post-comments__comment-pfp" src={comment.profilePicture} alt="Profile picture" />
                          : <img className="post-comments__comment-pfp" src="/default_avatar.jpg" alt="Profile picture" />
                      }
                    </div>

                    <div>
                      <Link className="post-page__caption-username" to={`/${comment.username}`}>
                        { comment.username }
                      </Link>
                      &nbsp;
                      { comment.text }
                      <div className="post-comments__comment-date">
                        { convertTimestamp(comment.dateCreated) }
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        )
      }
    </>
  );
};

export default PostComments;
