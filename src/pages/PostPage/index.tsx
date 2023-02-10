import React, {
  useState, useEffect,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPostByID } from '../../api';
import './style.scss';

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
  const [post, setPost] = useState<IPost | null>(null);
  const [load, setLoad] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);

  const getPost = async () => {
    try {
      // TODO: сюда вместо 8 вставлять postID из /p/:postID
      const resp = await getPostByID(8);
      setPost(resp.data.post);
    } catch (error) {
      console.error(error);
    }
  };

  const convertTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("ru", {month: 'long', day: '2-digit', year: 'numeric', timeZone: 'UTC'});
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {
        post && 
        <div className="post-page">
          <div className="post-page__header">
            <Link to={`/${post.username}`} className="post-page__pfp-wrapper">
              {/* TODO: src по умолчанию дефолтная аватарка */}
              <img className="post-page__pfp" src={ post.profilePicture } alt="Profile picture" />
            </Link>
            <Link className="post-page__username" to={`/${post.username}`}>
              { post.username }
            </Link>
            <button onClick={() => {setModalVisibility(true)}} className="post-page__actions-menu-btn" type="button">***</button>
          </div>
          <div className="post-page__img-wrapper">
            <img className="post-page__img" src={ post.image } alt="" />
          </div>
          <div className="post-page__bottom-wrapper">
              <div className="post-page__main-actions">
                <button type="button">Like</button>
                <button type="button">Comments</button>
                <button disabled type="button">Send</button>
                <button className="post-page__save-btn" disabled type="button">Save</button>
              </div>
              <div className="post-page__likes">Нравится: { post.likes }</div>
              {
                post.caption &&
                <div className="post-page__caption">
                  <Link className="post-page__caption-username" to={`/${post.username}`}>
                    { post.username }
                  </Link>
                  &nbsp;
                  { post.caption }
                </div>
              }
              { 
                post.comments.length >= 3
                && <button className="post-page__show-comments-btn" type="button">Посмотреть все комментарии ({ post.comments.length })</button>
              }
              {
                post.comments.map((comment) => {
                  return (
                    <div>
                      { comment.username } { comment.text }
                    </div>
                  );
                })
              }
              <div className="post-page__date-created">
                { convertTimestamp(post.dateCreated) }
              </div>
            </div>
          </div>
      }
      {
        modalVisibility &&
        <div className="post-page__modal-wrapper">
          <div className="post-page__modal">
            <button className="post-page__modal-btn" type="button">Удалить</button>
            <button className="post-page__modal-btn" type="button">Копировать ссылку</button>
            <button onClick={() => {setModalVisibility(false)}} className="post-page__modal-btn" type="button">Отмена</button>
          </div>
        </div>
      }
      
    </>
  );
};

export default PostPage;
