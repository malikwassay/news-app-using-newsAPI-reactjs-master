import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalSize: 0,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=90be587ca92c4ad7a722d6fa60fd42f9&page=${this.state.page}&pageSize=12`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      page: 1,
      totalSize: parsedData.totalResults,
      loading: false,
    });
  }

  prevPage = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=90be587ca92c4ad7a722d6fa60fd42f9&page=${
      this.state.page - 1
    }&pageSize=12`;
    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      totalSize: parsedData.totalResults,
      loading: false,
    });
  };

  nextPage = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=90be587ca92c4ad7a722d6fa60fd42f9&page=${
      this.state.page + 1
    }&pageSize=12`;
    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      totalSize: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News Monkey - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row my-3">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-3" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsId={element.url}
                />
              </div>
            );
          })}
          <div
            className="container d-flex justify-content-end"
            style={{ border: "2px , black , solid" }}
          >
            <button
              disabled={this.state.page <= 1}
              type="button"
              onClick={this.prevPage}
              className="btn btn-dark mx-3"
            >
              &larr; Prev
            </button>
            <span>{this.state.page}</span>
            <button
              disabled={
                this.state.page + 1 > Math.ceil(this.state.totalSize / 12)
              }
              type="button"
              onClick={this.nextPage}
              className="btn btn-dark mx-3"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
