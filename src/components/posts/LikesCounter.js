import React, { useContext } from 'react';
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import LoggedInUserContext from '../../context/LoggedInUserContext';
import { db } from '../../lib/firebase';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

export default function LikesCounter({ postId, postLikes, posts, setPosts }) {

  const { loggedInUser: { id } } = useContext(LoggedInUserContext);

  const toggleLike = () => {

    if (postLikes.includes(id)) {

      setPosts([...posts.map(post => {

        if (post.id === postId) {

          post = { ...post, likes: [...post.likes.filter(_id => _id !== id)] };
        }

        return post;

      })]);

      updateDoc(doc(db, "posts", postId), {
        likes: arrayRemove(id)
      });

    }
    else {

      setPosts([...posts.map(post => {

        if (post.id === postId) {

          post = { ...post, likes: [...post.likes, id] };
        }

        return post;

      })]);

      updateDoc(doc(db, "posts", postId), {
        likes: arrayUnion(id)
      });
    }
  }

  return (
    <div className='d-flex align-items-center gap-1'>
      {
        postLikes.includes(id) ?
          <AiFillHeart onClick={() => { toggleLike() }} className='cursor-pointer' size={22} color={"#ff0000"} />
          :
          <AiOutlineHeart onClick={() => { toggleLike() }} className='cursor-pointer' size={22} />
      }
      <b className='font-16'>{postLikes.length}</b>
    </div>
  )
}
