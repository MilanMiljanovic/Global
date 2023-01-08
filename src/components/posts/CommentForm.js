import React, { useContext, useState } from 'react';
import { db } from '../../lib/firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import LoggedInUserContext from '../../context/LoggedInUserContext';

export default function CommentForm({ postId, posts, setPosts }) {

    const { loggedInUser: { id, username } } = useContext(LoggedInUserContext);
    const [comment, setComment] = useState({ userId: id, username: username, content: "" });

    const commentPost = e => {

        e.preventDefault();

        if (comment.content.trim().length > 0) {

            setPosts([...posts.map(post => {

                if (post.id === postId) {

                    post = { ...post, comments: [...post.comments, { ...comment, content: comment.content.charAt(0).toUpperCase() + comment.content.slice(1) }] };
                }

                return post;
            })]);

            setComment({ ...comment, content: "" });

            updateDoc(doc(db, "posts", postId), {
                comments: arrayUnion({ userId: id, content: comment.content.charAt(0).toUpperCase() + comment.content.slice(1) })
            });
        }
    }

    return (
        <form onSubmit={e => { commentPost(e) }} className='d-flex align-items-center gap-2'>
            <input onChange={({ target }) => { setComment({ ...comment, content: target.value }) }} className='form-control form-control-sm shadow-none' placeholder='Comment...' autoComplete="off" value={comment.content} />
            <button disabled={comment.content.length < 1} type='submit' className='btn btn-primary btn-sm'>Post</button>
        </form>
    )
}
