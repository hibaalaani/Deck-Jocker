import React, { Component } from 'react';
import axios from 'axios'
import Card from "./Card"
import "./Cards.css"
const Api_Base_Url = "https://deckofcardsapi.com/api/deck"
class Cards extends Component {

    constructor(props) {
        super(props)
        this.state = {
            deck: null,
            drawer: [],
            loader: false
        }
        this.getCard = this.getCard.bind(this)
    }

    async componentDidMount() {
        let deck = await axios.get(`${Api_Base_Url}/new/shuffle`)
        this.setState({
            deck: deck.data,
            loader: true
        })

    }
    async getCard() {
        let id = this.state.deck.deck_id
        try {
            let card_url = `${Api_Base_Url}/${id}/draw/`
            let cardDraw = await axios.get(card_url)
            console.log(cardDraw)
            if (!cardDraw.data.success) {
                throw new Error("No More Cards")
            }
            console.log(cardDraw.data)
            let card = cardDraw.data.cards[0]
            this.setState(st => ({
                drawer: [
                    ...st.drawer,
                    {
                        id: card.code,
                        image: card.image,
                        name: ` ${card.value} ${card.suit} `
                    }]

            }))
        } catch (err) {
            alert(err)
        }
    }
    render() {
        const cardImg = this.state.loader ? <img src={this.state.deck} alt="" /> : <div className="loader"></div>
        const card =
            this.state.drawer.map(draw => (
                <div  >
                    <Card key={draw.id}
                        image={draw.image}
                        id={draw.id}
                        name={draw.name}
                    />
                </div>
            ))

        return (
            <div>

                <h1 className="Cards-title">Card Dealer</h1>
                <h2 className="Cards-title Subtitle">a little demo made with react</h2>

                <button
                    className="Cards-btn"
                    onClick={this.getCard}>more deck</button>
                <div className="Cards-area" >{card}</div>



            </div>
        )
    }
}
export default Cards;