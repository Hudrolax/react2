import { Component } from "react";

import MarvelService from "../../services/MarvelService";

import "./randomChar.scss";
import thor from "../../resources/img/thor.jpeg";
import mjolnir from "../../resources/img/mjolnir.png";

class RandomChar extends Component {
    constructor(props) {
        super(props)
        this.updateChar()
    }
    state = {
        name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null,
    }

    marvelService = new MarvelService();

    updateChar = async () => {
        let ids
        // await this.marvelService.getAllCharacters().then(res => {
        //     ids = res.data.results.map(item => item)
        // })
        // console.log(ids)
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacter(id)
            .then(res => {
                const data = res.data.results[0];
                this.setState({
                    name: data.name,
                    description: data.description,
                    thumbnail: data.thumbnail.path + '.' + data.thumbnail.extension,
                    homepage: data.urls[0].url,
                    wiki: data.urls[1].url,
                })
            })
    }

    render() {
        const { name, description, thumbnail, homepage, wiki } = this.state
        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img" />
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">{description}</p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!
                        <br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">Or choose another one</p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        );
    }
}

export default RandomChar;
