import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Skeleton from 'react-loading-skeleton';
import Post from './Post';

export default function Posts({ usersIds, setPostsLength, isPostUploaded }) {

    const [posts, setPosts] = useState([]);
    const [noPosts, setNoPosts] = useState(false);
    const [loading, setLoading] = useState(false);
    const usersRef = collection(db, "users");

    const getUsersAndGeneratePosts = (_posts) => {

        getDocs(query(usersRef, where("id", "in", [...usersIds])))
            .then(data => {

                const users = data.docs.map(doc => (doc.data()));

                setNoPosts(false);
                setLoading(false);
                setPosts([..._posts.map(post => ({ ...post, user: users.find(user => user.id === post.userId) }))]);

                if (setPostsLength) {

                    setPostsLength(_posts.length);
                }
            })
            .catch(error => {
                setLoading(false);
                console.log(error.message);
            });
    }

    useEffect(() => {

        if (usersIds.length > 0) {

            setLoading(true);

            getDocs(query(collection(db, "posts"), where("userId", "in", [...usersIds])))
                .then(data => {

                    let _posts = data.docs.map(doc => doc.data()).sort((a, b) => b.date - a.date);

                    if (_posts.length > 0) {

                        let commentatorsIds = [];

                        _posts.forEach(post => {

                            if (post.comments.length > 0) {

                                commentatorsIds = [...commentatorsIds, ...post.comments.map(comment => comment.userId)];
                            }
                        });

                        if (commentatorsIds.length > 0) {

                            getDocs(query(usersRef, where("id", "in", [...commentatorsIds])))
                                .then(data => {

                                    let commentators = data.docs.map(doc => ({ ...doc.data() }));

                                    _posts = _posts.map(post => ({ ...post, comments: post.comments.map(comment => ({ ...comment, username: commentators.find(user => comment.userId === user.id).username })) }));

                                    getUsersAndGeneratePosts(_posts);

                                })
                                .catch(error => {
                                    setLoading(false);
                                    console.log(error.message);
                                });
                        }
                        else {

                            getUsersAndGeneratePosts(_posts);
                        }
                    }
                    else {
                        setLoading(false);
                        setNoPosts(true);

                        if (setPostsLength) {
                            setPostsLength(0);
                        }
                    }

                })
                .catch(error => {
                    setLoading(false);
                    console.log(error.message);
                })
        }
        else {
            setLoading(false);
            setNoPosts(true);

            if (setPostsLength) {

                setPostsLength(0);
            }
        }
    }, [isPostUploaded]);

    return (
        <div className='d-flex flex-column gap-3'>
            {
                posts.map(post => {
                    return (
                        <Post key={post.id} post={post} posts={posts} setPosts={setPosts} />
                    )
                })
            }
            {
                loading ?
                    <Skeleton className='post-skeleton rounded-0' />
                    :
                    null
            }
            {
                noPosts ?
                    <p className='bg-white p-2 border text-center mb-0'>No posts yet</p>
                    :
                    null
            }
        </div>
    )
}

