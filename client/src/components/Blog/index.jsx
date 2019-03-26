import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import { Form } from '../../components/Article';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    const { onLoad } = this.props;

    axios('http://localhost:8000/api/articles')
      .then((res) => onLoad(res.data));
  }

  handleDelete(id) {
    const { onDelete } = this.props;

    return axios.delete(`http://localhost:8000/api/articles/${id}`)
      .then(() => onDelete(id));
  }

  handleEdit(article) {
    const { setEdit } = this.props;

    setEdit(article);
  }

  render() {
    const { articles } = this.props;


    //TODO:- this is the stuff (styling) I'm currently editing.
    return (
      <div>
          <div>
            <h2>Blog</h2>
            <Form />
          </div>
          <div>
          <div>
            {articles.map((article) => {
              return (
                <div className="">
                  <h3 className="">
                    {article.title}
                  </h3>
                  <p>{article.body}</p>
                  <p className=""><b>{article.author}</b> {moment(new Date(article.createdAt)).fromNow()}</p>
                  <div className="">
                    <div className="">
                      <button onClick={() => this.handleEdit(article)} className="blog-button">
                        Edit
                      </button>
                      <button onClick={() => this.handleDelete(article._id)} className="blog-button">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.home.articles,
});

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data }),
  onDelete: id => dispatch({ type: 'DELETE_ARTICLE', id }),
  setEdit: article => dispatch({ type: 'SET_EDIT', article }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);