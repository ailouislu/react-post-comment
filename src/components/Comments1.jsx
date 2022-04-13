import React, {useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from "./common/Spinner";
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { getPost } from "../services/postsService";
import { getComments } from "../services/commentsService";
import  "../css/comments.css";
 
function Comments(props) {
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [totalCount, setTotalCount] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    const getData = async () => {
        try {
            const id = props.match.params.id;
            const post = await getPost(id);
            setPost(post.data);
            const comments = await getComments(id);
            setComments(comments.data);
            setTotalCount(comments.data.length);
            setIsLoading(false);
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
            props.history.replace("/not-found");
        }
    }

    useEffect(() =>{
        setIsLoading(true);
        getData();
     }, []);

     const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1
            }}
        />
    );

    const handelBackToPosts = () =>{
        props.history.push('/posts')
    }

    if (isLoading) return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item onClick={handelBackToPosts}>Posts</Breadcrumb.Item>
                <Breadcrumb.Item active>Comments</Breadcrumb.Item>
            </Breadcrumb>
            <Spinner />
        </div>
    )

    const count = {totalCount};
    if (count === 0) return <p><strong>There are no comments about this post:</strong></p>;

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item onClick={handelBackToPosts}>Posts</Breadcrumb.Item>
                <Breadcrumb.Item active>Comments</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col sm={3}>
                </Col>
                <Col sm={9}>
                    <div className="post_title">
                        <h5 className="post_textStyles">
                            <strong>Post: </strong>
                            <label className="post_textStyles">{post.title}</label>
                        </h5>
                        <label className="post_body post_textStyles">
                            {post.body}
                        </label>
                        <label className="post_userId">
                            <strong>UserId: </strong>
                            {post.userId}
                        </label>
                    </div>
                    <div>
                        <p className="totalCount"><strong>Showing {totalCount} comments about this post:</strong></p>
                    </div>
                    <ColoredLine color="black" />
                    <div>
                            {
                                comments.map((cont, index) =>{
                                return (
                                    <div key={cont.id} className="comment">
                                        <div className="comment_email">
                                            <strong>Email: </strong>
                                            <label className="comment_textStyles">{cont.email}</label>
                                        </div>
                                        <h5>
                                            <div className="comment_title comment_textStyles">{cont.name}</div>
                                        </h5>
                                        <label>
                                            <div className="comment_body comment_textStyles">{cont.body}</div>
                                        </label>
                                        <ColoredLine color="black" />
                                    </div>
                                )})
                            }
                    </div>
                    <div className="comment_button">
                        {/* <button data-testid="comment_button" onClick={handelBackToPosts}>Back</button> */}
                        <Button data-testid="comment_button" className="comment_button" variant="primary" onClick={handelBackToPosts}>Back</Button>{''}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Comments

