const PUBLIC_API = process.env.REACT_APP_MARVEL_API_KEY;
const BASE_URL = 'https://gateway.marvel.com:443/v1/public/';

class MarvelService {
    _api_key = 'apikey=' + PUBLIC_API

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res) {
            throw new Error(`Could not etch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = (limit = 9, offset = 220) => {
        const params = `?limit=${limit}&offset=${offset}`
        return this.getResource(BASE_URL + 'characters' + params + '&' + this._api_key)
    }

    getCharacter = (id) => {
        return this.getResource(BASE_URL + 'characters' + '/' + id + '?' + this._api_key)
    }
}

export default MarvelService;