import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineComment } from "react-icons/ai";
import CommentForm from './CommentForm';
import LikesCounter from './LikesCounter';

export default function Post({ post, posts, setPosts }) {

    return (
        <div className='bg-white border'>
            <header className='d-flex align-items-center gap-2 p-2'>
                <Link to={`/account/${post.userId}`} className='text-decoration-none text-dark d-flex align-items-center gap-2' >
                    <img className='avatar-sm rounded-circle' src={post.user.avatar} alt="" />
                    <span>{post.user.username}</span>
                </Link>
            </header>
            <img className='post-img w-100' src={post.image} alt='' />
            <footer className='d-flex flex-column gap-2 p-2'>
                <div className='d-flex align-items-center gap-2'>
                    <LikesCounter postId={post.id} postLikes={post.likes} posts={posts} setPosts={setPosts} />
                    <div className='d-flex align-items-center gap-1'>
                        <AiOutlineComment size={22} />
                        <b className='font-16'>{post.comments.length}</b>
                    </div>
                </div>
                {
                    post.comments.length > 0 ?
                        <div>
                            {
                                post.comments.map((comment, index) => {
                                    return (
                                        <div className='d-flex align-items-center gap-1' key={index}>
                                            <Link to={`/account/${comment.userId}`} className="text-dark text-decoration-none">
                                                <b className='font-14'>{comment.username}</b>
                                            </Link>
                                            <p className='mb-0'>{comment.content}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        null
                }
                <CommentForm postId={post.id} posts={posts} setPosts={setPosts} />
                <small>{new Date(post.date.seconds * 1000).toLocaleString()}</small>
            </footer>
        </div >
    )
}
